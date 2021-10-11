import * as ts from 'typescript';

import { hasAllFlags, hasAnyFlag } from '../jsii/jsii-utils';
import { AstRenderer } from '../renderer';

/**
 * Return the first non-undefined type from a union
 */
export function firstTypeInUnion(typeChecker: ts.TypeChecker, type: ts.Type): ts.Type {
  type = typeChecker.getNonNullableType(type);

  if (!type.isUnion()) {
    return type;
  }

  return type.types[0];
}

export type BuiltInType = 'any' | 'boolean' | 'number' | 'string';
export function builtInTypeName(type: ts.Type): BuiltInType | undefined {
  const map: { readonly [k: number]: BuiltInType } = {
    [ts.TypeFlags.Any]: 'any',
    [ts.TypeFlags.Unknown]: 'any',
    [ts.TypeFlags.Boolean]: 'boolean',
    [ts.TypeFlags.Number]: 'number',
    [ts.TypeFlags.String]: 'string',
    [ts.TypeFlags.StringLiteral]: 'string',
    [ts.TypeFlags.NumberLiteral]: 'number',
    [ts.TypeFlags.BooleanLiteral]: 'boolean',
  };
  return map[type.flags];
}

export function renderType(type: ts.Type): string {
  if (type.isClassOrInterface()) {
    return type.symbol.name;
  }
  if (type.isLiteral()) {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    return `${type.value}`;
  }
  return renderTypeFlags(type);
}

export function parameterAcceptsUndefined(param: ts.ParameterDeclaration, type?: ts.Type): boolean {
  if (param.initializer !== undefined) {
    return true;
  }
  if (param.questionToken !== undefined) {
    return true;
  }
  if (type) {
    return typeContainsUndefined(type);
  }
  return false;
}

/**
 * This is a simplified check that should be good enough for most purposes
 */
export function typeContainsUndefined(type: ts.Type): boolean {
  if (type.getFlags() & ts.TypeFlags.Undefined) {
    return true;
  }
  if (type.isUnion()) {
    return type.types.some(typeContainsUndefined);
  }
  return false;
}

export function renderTypeFlags(type: ts.Type): string {
  return renderFlags(type.flags, ts.TypeFlags);
}

/**
 * If this is a map type, return the type mapped *to* (key must always be `string` anyway).
 */
export function mapElementType(type: ts.Type, typeChecker: ts.TypeChecker): ts.Type | undefined {
  if (type.flags & ts.TypeFlags.Object && type.symbol) {
    if (type.symbol.name === '__type') {
      // Declared map type: {[k: string]: A}
      return type.getStringIndexType();
    }

    if (type.symbol.name === '__object') {
      // Derived map type from object literal: typeof({ k: "value" })
      // For every property, get the node that created it (PropertyAssignment), and get the type of the initializer of that node
      const initializerTypes = type.getProperties().map((p) => {
        if (ts.isPropertyAssignment(p.valueDeclaration)) {
          return typeOfExpression(typeChecker, p.valueDeclaration.initializer);
        }
        return undefined;
      });
      return typeIfSame([...initializerTypes, type.getStringIndexType()]);
    }
  }

  return undefined;
}

/**
 * Try to infer the map element type from the properties if they're all the same
 */
export function inferMapElementType(
  elements: ts.NodeArray<ts.ObjectLiteralElementLike>,
  renderer: AstRenderer<any>,
): ts.Type | undefined {
  const nodes = elements.map(elementValueNode).filter(isDefined);
  const types = nodes.map((x) => renderer.typeOfExpression(x));

  return types.every((t) => isSameType(types[0], t)) ? types[0] : undefined;

  function elementValueNode(el: ts.ObjectLiteralElementLike): ts.Expression | undefined {
    if (ts.isPropertyAssignment(el)) {
      return el.initializer;
    }
    if (ts.isShorthandPropertyAssignment(el)) {
      return el.name;
    }
    return undefined;
  }
}

function isSameType(a: ts.Type, b: ts.Type) {
  return a.flags === b.flags && a.symbol?.name === b.symbol?.name;
}

function typeIfSame(types: Array<ts.Type | undefined>): ts.Type | undefined {
  const ttypes = types.filter(isDefined);
  if (types.length === 0) {
    return undefined;
  }

  return ttypes.every((t) => isSameType(ttypes[0], t)) ? ttypes[0] : undefined;
}

/**
 * If this is an array type, return the element type of the array
 */
export function arrayElementType(type: ts.Type): ts.Type | undefined {
  if (type.symbol && type.symbol.name === 'Array') {
    const tr = type as ts.TypeReference;
    return tr.aliasTypeArguments && tr.aliasTypeArguments[0];
  }
  return undefined;
}

export function typeOfExpression(typeChecker: ts.TypeChecker, node: ts.Expression) {
  return typeChecker.getContextualType(node) ?? typeChecker.getTypeAtLocation(node);
}

function isDefined<A>(x: A): x is NonNullable<A> {
  return x !== undefined;
}

export function isNumber(x: any): x is number {
  return typeof x === 'number';
}

export function isEnumAccess(typeChecker: ts.TypeChecker, access: ts.PropertyAccessExpression) {
  const symbol = typeChecker.getSymbolAtLocation(access.expression);
  return symbol ? hasAnyFlag(symbol.flags, ts.SymbolFlags.Enum) : false;
}

export function isStaticReadonlyAccess(typeChecker: ts.TypeChecker, access: ts.PropertyAccessExpression) {
  const symbol = typeChecker.getSymbolAtLocation(access);
  const decl = symbol?.getDeclarations();
  if (decl && decl[0] && ts.isPropertyDeclaration(decl[0])) {
    const flags = ts.getCombinedModifierFlags(decl[0]);
    return hasAllFlags(flags, ts.ModifierFlags.Readonly | ts.ModifierFlags.Static);
  }
  return false;
}

export function renderFlags(flags: number | undefined, flagObject: Record<string, number | string>) {
  if (flags === undefined) {
    return '';
  }

  return Object.values(flagObject)
    .filter(isNumber)
    .filter((f) => hasAllFlags(flags, f))
    .map((f) => flagObject[f])
    .join(',');
}
