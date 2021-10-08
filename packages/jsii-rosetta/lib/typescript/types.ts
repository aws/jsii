import * as ts from 'typescript';

import { hasFlag } from '../jsii/jsii-utils';

/**
 * Return the OTHER type from undefined from a union, returns undefined if there is more than one
 */
export function typeWithoutUndefinedUnion(type: ts.Type | undefined): ts.Type | undefined {
  if (!type || !type.isUnion()) {
    return type;
  }
  const remaining = type.types.filter((t) => !hasFlag(t.flags, ts.TypeFlags.Undefined));
  if (remaining.length > 1) {
    return undefined;
  }
  return remaining[0];
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

export type MapAnalysis = { result: 'nonMap' } | { result: 'map'; elementType: ts.Type | undefined };

/**
 * If this is a map type, return the type mapped *to* (key must always be `string` anyway).
 */
export function mapElementType(type: ts.Type, typeChecker: ts.TypeChecker): MapAnalysis {
  if (hasFlag(type.flags, ts.TypeFlags.Object) && type.symbol) {
    if (type.symbol.name === '__type') {
      // Declared map type: {[k: string]: A}
      return { result: 'map', elementType: type.getStringIndexType() };
    }

    if (type.symbol.name === '__object') {
      // Derived map type from object literal: typeof({ k: "value" })
      // For every property, get the node that created it (PropertyAssignment), and get the type of the initializer of that node
      const initializerTypes = type.getProperties().map((p) => {
        const expression = p.valueDeclaration;
        return typeOfObjectLiteralProperty(typeChecker, expression);
      });
      return {
        result: 'map',
        elementType: typeIfSame([...initializerTypes, type.getStringIndexType()].filter(isDefined)),
      };
    }
  }

  return { result: 'nonMap' };
}

/**
 * Try to infer the map element type from the properties if they're all the same
 */
export function inferMapElementType(
  elements: readonly ts.ObjectLiteralElementLike[],
  typeChecker: ts.TypeChecker,
): ts.Type | undefined {
  const types = elements.map((e) => typeOfObjectLiteralProperty(typeChecker, e)).filter(isDefined);

  return types.every((t) => isSameType(types[0], t)) ? types[0] : undefined;
}

function typeOfObjectLiteralProperty(typeChecker: ts.TypeChecker, el: ts.Node): ts.Type | undefined {
  if (ts.isPropertyAssignment(el)) {
    return typeOfExpression(typeChecker, el.initializer);
  }
  if (ts.isShorthandPropertyAssignment(el)) {
    return typeOfExpression(typeChecker, el.name);
  }
  return undefined;
}

function isSameType(a: ts.Type, b: ts.Type) {
  return a.flags === b.flags && a.symbol?.name === b.symbol?.name;
}

function typeIfSame(types: Array<ts.Type | undefined>): ts.Type | undefined {
  let ret: ts.Type | undefined;
  for (const type of types) {
    if (ret === undefined) {
      ret = type;
    } else {
      // Not all the same
      if (type !== undefined && ret.flags !== type.flags) {
        return undefined;
      }
    }
  }
  return ret;
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
