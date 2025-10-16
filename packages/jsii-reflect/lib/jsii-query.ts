/* eslint-disable @typescript-eslint/no-implied-eval */
import '@jsii/check-node/run';

// Expressions:
// <OP><KIND>[:<FILTER>]
// +type:name == 'banana'   (for 'type' also 'interface', 'class', 'enum' to imply a type check)
// -member:abstract  (for 'member' also 'property', 'method', 'initializer' to imply a type check)
// .member:...
// + = select
// - = filter negative
// . = filter positive
// First query selector: start empty
// First query filter: start full

import * as spec from '@jsii/spec';

import {
  Callable,
  ClassType,
  Documentable,
  EnumType,
  Initializer,
  InterfaceType,
  Method,
  Parameter,
  Property,
  Type,
  TypeSystem,
} from '../lib';

const JSII_TREE_SUPPORTED_FEATURES: spec.JsiiFeature[] = ['intersection-types'];

export interface JsiiQueryOptions {
  readonly fileName: string;
  readonly expressions: QExpr[];
  readonly closure?: boolean;
  readonly returnTypes?: boolean;
  readonly returnMembers?: boolean;
}

export async function jsiiQuery(
  options: JsiiQueryOptions,
): Promise<ApiElement[]> {
  const typesys = new TypeSystem();

  if (options.closure) {
    await typesys.loadNpmDependencies(options.fileName, {
      validate: false,
      supportedFeatures: JSII_TREE_SUPPORTED_FEATURES,
    });
  } else {
    await typesys.load(options.fileName, {
      validate: false,
      supportedFeatures: JSII_TREE_SUPPORTED_FEATURES,
    });
  }

  const universe = selectAll(typesys);

  const selectedElements = selectApiElements(universe, options.expressions);

  const finalList = expandSelectToParentsAndChildren(
    universe,
    selectedElements,
    options,
  );

  // The keys are sortable, so sort them, then get the original API elements back
  // and return only those that were asked for.

  // Then retain only the kinds we asked for, and sort them
  return Array.from(finalList)
    .sort()
    .map((key) => universe.get(key)!)
    .filter(
      (x) =>
        (isType(x) && options.returnTypes) ||
        (isMember(x) && options.returnMembers),
    );
}

// - if we are asking for types, include any type that's a parent of any of the selected members
// - if we are asking for members, include all members that are a child of any of the selected types
function expandSelectToParentsAndChildren(
  universe: ApiUniverse,
  selected: Set<string>,
  options: JsiiQueryOptions,
): Set<string> {
  const ret = new Set<string>(selected);
  const membersForType = groupMembers(universe.keys());

  if (options.returnTypes) {
    // All type keys from either type keys or member keys
    setAdd(ret, Array.from(selected).map(typeKey));
  }
  if (options.returnMembers) {
    // Add all member keys that are members of a selected type
    for (const sel of selected) {
      setAdd(ret, membersForType.get(sel) ?? []);
    }
  }

  return ret;
}

function groupMembers(universeKeys: Iterable<string>): Map<string, string[]> {
  const ret = new Map<string, string[]>();
  for (const key of universeKeys) {
    if (isTypeKey(key)) {
      continue;
    }

    const tk = typeKey(key);
    if (!ret.has(tk)) {
      ret.set(tk, []);
    }
    ret.get(tk)!.push(key);
  }
  return ret;
}

function isType(x: ApiElement): x is Type {
  return (
    x instanceof ClassType ||
    x instanceof InterfaceType ||
    x instanceof EnumType
  );
}

function isMember(x: ApiElement): x is Callable | Property {
  return x instanceof Callable || x instanceof Property;
}

/**
 * Returns a unique key per API element, used because the jsii-reflect members don't guarantee uniqueness at the object level
 *
 * Keys have the property that parent keys are a prefix of child keys, and that the keys are in sort order
 */
function apiElementKey(x: ApiElement): string {
  if (isType(x)) {
    return `${x.fqn}#`;
  }
  if (isMember(x)) {
    const sort =
      x instanceof Method && x.static
        ? '000'
        : x instanceof Initializer
          ? '001'
          : '002';

    return `${x.parentType.fqn}#${sort}${x.name}(`;
  }
  throw new Error('huh');
}

/**
 * Given a type or member key, return the type key
 */
function typeKey(x: string): string {
  return `${x.split('#')[0]}#`;
}

function isTypeKey(x: string) {
  return typeKey(x) === x;
}

function selectApiElements(
  universe: ApiUniverse,
  expressions: QExpr[],
): Set<string> {
  const allKeys = new Set(universe.keys());

  let selected =
    expressions.length === 0 || expressions[0].op === 'filter'
      ? new Set(universe.keys())
      : new Set<string>();

  for (const expr of expressions) {
    if (expr.op === 'filter') {
      // Filter retains elements from the current set
      selected = new Set(filterElements(universe, selected, expr));
    } else {
      // Select adds elements (by filtering from the full set and adding to the current one)
      // Selecting implicitly also adds all elements underneath
      const fromUniverse = Array.from(
        filterElements(universe, allKeys, {
          op: 'filter',
          invert: false,
          kind: expr.kind,
          expression: expr.expression,
        }),
      );

      const newElements = Array.from(allKeys).filter((uniKey) =>
        fromUniverse.some((key) => uniKey.startsWith(key)),
      );

      setAdd(selected, newElements);
    }
  }

  return selected;
}

function* filterElements(
  universe: ApiUniverse,
  elements: Set<string>,
  expr: QFilter,
): IterableIterator<string> {
  const pred = new Predicate(expr.expression, expr.invert);

  for (const key of elements) {
    const el = universe.get(key);
    if (!el) {
      throw new Error(`Key not in universe: ${key}`);
    }
    if (matches(el, expr.kind, pred)) {
      yield key;
    }
  }
}

export class Predicate {
  private readonly fn: (...args: any[]) => boolean;

  public constructor(expr?: string, invert?: boolean) {
    if (!expr) {
      this.fn = invert ? () => false : () => true;
    } else {
      const args = API_ELEMENT_ATTRIBUTES.join(',');
      const neg = invert ? '!' : '';

      const body = `return ${neg}Boolean(${expr});`;

      try {
        this.fn = Function(args, body) as any;
      } catch (e: any) {
        throw new Error(`Syntax error in selector: ${body}: ${e}`);
      }
    }
  }

  public apply(context: Record<string, unknown>) {
    return this.fn(...API_ELEMENT_ATTRIBUTES.map((attr) => context[attr]));
  }
}

/**
 * Whether a given API element matches the filter
 */
function matches(el: ApiElement, kind: string, pred: Predicate): boolean {
  const context: Record<string, unknown> = {};
  if (el instanceof ClassType) {
    if (!['type', 'class'].includes(kind)) return false;

    context.kind = 'class';
  }
  if (el instanceof InterfaceType) {
    const moreSpecificInterfaceType = el.datatype ? 'struct' : 'interface';
    if (!['type', moreSpecificInterfaceType].includes(kind)) return false;

    context.kind = moreSpecificInterfaceType;
  }
  if (el instanceof EnumType) {
    if (!['type', 'enum'].includes(kind)) return false;

    context.kind = 'enum';
  }
  if (el instanceof Property) {
    if (!['member', 'property'].includes(kind)) return false;

    context.kind = 'property';
  }
  if (el instanceof Callable) {
    const moreSpecificCallable =
      el instanceof Initializer ? 'initializer' : 'method';
    if (!['member', moreSpecificCallable].includes(kind)) return false;

    context.kind = moreSpecificCallable;
  }

  Object.assign(
    context,
    Object.fromEntries(
      API_ELEMENT_ATTRIBUTES.map((attr) => [attr, (el as any)[attr]]),
    ),
  );
  const ret = pred.apply(context);
  return ret;
}

function selectAll(typesys: TypeSystem): ApiUniverse {
  return new Map(
    [
      ...typesys.classes,
      ...typesys.interfaces,
      ...typesys.enums,
      ...typesys.methods,
      ...typesys.properties,
    ].map((el) => [apiElementKey(el), el]),
  );
}

type QExpr = QSelect | QFilter;

/**
 * Select adds elements
 */
interface QSelect {
  readonly op: 'select';
  readonly kind: ApiKind;
  readonly expression?: string;
}

/**
 * Filter retains elements
 */
interface QFilter {
  readonly op: 'filter';
  readonly invert: boolean;
  readonly kind: ApiKind;
  readonly expression?: string;
}

const KIND_ALIASES = {
  t: 'type',
  c: 'class',
  i: 'interface',
  s: 'struct',
  e: 'enum',
  p: 'property',
  prop: 'property',
  mem: 'member',
  m: 'method',
  init: 'initializer',
  ctr: 'initializer',
  constructor: 'initializer',
};

export function parseExpression(expr: string): QExpr {
  if (!['-', '+', '.'].includes(expr[0])) {
    throw new Error(`Invalid operator: ${expr} (must be +, - or .)`);
  }
  const operator = expr[0] as '-' | '+' | '.';
  const [kind_, ...expressionParts] = expr.slice(1).split(':');
  const kind = (KIND_ALIASES[kind_ as keyof typeof KIND_ALIASES] ??
    kind_) as ApiKind;

  if (!VALID_KINDS.includes(kind)) {
    throw new Error(
      `Invalid kind: ${kind} (must be one of ${VALID_KINDS.join(', ')})`,
    );
  }

  return {
    op: operator === '+' ? 'select' : 'filter',
    invert: operator === '-',
    kind,
    expression: expressionParts?.join(':'),
  };
}

export function renderElement(el: ApiElement) {
  if (el instanceof ClassType) {
    return combine(el.abstract ? 'abstract' : '', 'class', el.fqn);
  }
  if (el instanceof InterfaceType) {
    if (el.spec.datatype) {
      return combine('struct', el.fqn);
    }
    return combine('interface', el.fqn);
  }
  if (el instanceof EnumType) {
    return combine('enum', el.fqn);
  }
  if (el instanceof Property) {
    const opt = el.optional ? '?' : '';
    return combine(
      el.static ? 'static' : '',
      el.immutable ? 'readonly' : '',
      `${el.parentType.fqn}#${el.name}${opt}: ${el.type.toString()}`,
    );
  }
  if (el instanceof Method) {
    return combine(
      el.static ? 'static' : '',
      `${el.parentType.fqn}#${el.name}(${renderParams(el.parameters)}): ${el.returns.toString()}`,
    );
  }
  if (el instanceof Initializer) {
    return `${el.parentType.fqn}(${renderParams(el.parameters)}`;
  }

  return '???';
}

function renderParams(ps?: Parameter[]) {
  return (ps ?? [])
    .map((p) => {
      const opt = p.optional ? '?' : '';
      const varia = p.variadic ? '...' : '';
      return `${varia}${p.name}${opt}: ${p.type.toString()}`;
    })
    .join(', ');
}

function combine(...xs: string[]) {
  return xs.filter((x) => x).join(' ');
}

function setAdd<A>(a: Set<A>, b: Iterable<A>) {
  for (const x of b) {
    a.add(x);
  }
}

// A list of all valid API element kinds

const VALID_KINDS = [
  // Types
  'type',
  'interface',
  'class',
  'enum',
  'struct',
  // Members
  'member',
  'property',
  'method',
  'initializer',
] as const;

type ApiKind = (typeof VALID_KINDS)[number];

// A list of all possible API element attributes

type ApiElementAttribute =
  | keyof ClassType
  | keyof InterfaceType
  | keyof EnumType
  | keyof Property
  | keyof Method
  | keyof Initializer
  | 'kind';

const API_ELEMENT_ATTRIBUTES: ApiElementAttribute[] = [
  'kind',
  // Types
  'ancestors',
  'abstract',
  'base',
  'datatype',
  'docs',
  'interfaces',
  'name',
  // Members
  'initializer',
  'optional',
  'overrides',
  'protected',
  'returns',
  'parameters',
  'static',
  'variadic',
  'type',
];

type ApiElement = Documentable;

type ApiUniverse = Map<string, ApiElement>;
