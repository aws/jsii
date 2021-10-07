import * as ts from 'typescript';

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

type BuiltInType = 'any' | 'boolean' | 'number' | 'string';
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

export function renderTypeFlags(type: ts.Type) {
  const ret = [];
  for (const flag of Object.values(ts.TypeFlags)) {
    if (typeof flag === 'number' && type.flags & flag) {
      ret.push(ts.TypeFlags[flag]);
    }
  }
  return ret.join(',');
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

/**
 * If this is a map type, return the type mapped *to* (key must always be `string` anyway).
 */
export function mapElementType(type: ts.Type, renderer: AstRenderer<any>): ts.Type | undefined {
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
          return renderer.typeOfExpression(p.valueDeclaration.initializer);
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

  console.log(
    'inferMapElementtType',
    nodes.map((x) => renderer.typeOfExpression(x)).map((x) => renderer.typeToString(x)),
  );

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

function isDefined<A>(x: A): x is NonNullable<A> {
  return x !== undefined;
}
