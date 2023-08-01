import * as ts from 'typescript';

import { hasAllFlags, hasAnyFlag, resolveEnumLiteral, resolvedSymbolAtLocation } from '../jsii/jsii-utils';
import { isDefined } from '../util';

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

export type BuiltInType = 'any' | 'boolean' | 'number' | 'string' | 'void';
export function builtInTypeName(type: ts.Type): BuiltInType | undefined {
  if (hasAnyFlag(type.flags, ts.TypeFlags.Any | ts.TypeFlags.Unknown)) {
    return 'any';
  }
  if (hasAnyFlag(type.flags, ts.TypeFlags.BooleanLike)) {
    return 'boolean';
  }
  if (hasAnyFlag(type.flags, ts.TypeFlags.NumberLike)) {
    return 'number';
  }
  if (hasAnyFlag(type.flags, ts.TypeFlags.StringLike)) {
    return 'string';
  }
  return undefined;
}

export function renderType(type: ts.Type): string {
  if (type.isClassOrInterface()) {
    return type.symbol.name;
  }
  if (type.isLiteral()) {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions, @typescript-eslint/no-base-to-string
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

export type MapAnalysis = { result: 'nonMap' } | { result: 'map'; elementType: ts.Type | undefined };

/**
 * If this is a map type, return the type mapped *to* (key must always be `string` anyway).
 */
export function mapElementType(type: ts.Type, typeChecker: ts.TypeChecker): MapAnalysis {
  if (hasAnyFlag(type.flags, ts.TypeFlags.Object) && type.symbol) {
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
  const t = typeChecker.getContextualType(node) ?? typeChecker.getTypeAtLocation(node);
  return resolveEnumLiteral(typeChecker, t);
}

/**
 * Infer type of expression by the argument it is assigned to
 *
 * If the type of the expression can include undefined (if the value is
 * optional), `undefined` will be removed from the union.
 *
 * (Will return undefined for object literals not unified with a declared type)
 */
export function inferredTypeOfExpression(typeChecker: ts.TypeChecker, node: ts.Expression) {
  const type = typeChecker.getContextualType(node);
  return type ? typeChecker.getNonNullableType(type) : undefined;
}

export function isNumber(x: any): x is number {
  return typeof x === 'number';
}

export function isEnumAccess(typeChecker: ts.TypeChecker, access: ts.PropertyAccessExpression) {
  const symbol = resolvedSymbolAtLocation(typeChecker, access.expression);
  return symbol ? hasAnyFlag(symbol.flags, ts.SymbolFlags.Enum) : false;
}

export function isStaticReadonlyAccess(typeChecker: ts.TypeChecker, access: ts.PropertyAccessExpression) {
  const symbol = resolvedSymbolAtLocation(typeChecker, access);
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

export function determineReturnType(typeChecker: ts.TypeChecker, node: ts.SignatureDeclaration): ts.Type | undefined {
  const signature = typeChecker.getSignatureFromDeclaration(node);
  if (!signature) {
    return undefined;
  }
  return typeChecker.getReturnTypeOfSignature(signature);
}
