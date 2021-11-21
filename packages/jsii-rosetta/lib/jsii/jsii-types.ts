import * as ts from 'typescript';

import { inferredTypeOfExpression, BuiltInType, builtInTypeName, mapElementType } from '../typescript/types';
import { hasAnyFlag, analyzeStructType, JsiiSymbol } from './jsii-utils';

// eslint-disable-next-line prettier/prettier
export type JsiiType =
  | { kind: 'unknown' }
  | { kind: 'error'; message: string }
  | { kind: 'map'; elementType: JsiiType }
  | { kind: 'list'; elementType: JsiiType }
  | { kind: 'namedType'; name: string }
  | { kind: 'builtIn'; builtIn: BuiltInType };

export function determineJsiiType(typeChecker: ts.TypeChecker, type: ts.Type): JsiiType {
  // this means the snippet didn't have enough info for the TypeScript compiler to figure out the type -
  // so, just render the fallback
  if ((type as any).intrinsicName === 'error') {
    return { kind: 'unknown' };
  }

  type = type.getNonNullableType();

  const mapValuesType = mapElementType(type, typeChecker);
  if (mapValuesType.result === 'map') {
    return {
      kind: 'map',
      elementType: mapValuesType.elementType
        ? determineJsiiType(typeChecker, mapValuesType.elementType)
        : { kind: 'builtIn', builtIn: 'any' },
    };
  }

  if (type.symbol?.name === 'Array') {
    const typeRef = type as ts.TypeReference;

    if (typeRef.typeArguments?.length === 1) {
      return {
        kind: 'list',
        elementType: determineJsiiType(typeChecker, typeRef.typeArguments[0]),
      };
    }

    return {
      kind: 'list',
      elementType: { kind: 'builtIn', builtIn: 'any' },
    };
  }

  // User-defined or aliased type
  if (type.aliasSymbol) {
    return { kind: 'namedType', name: type.aliasSymbol.name };
  }
  if (type.symbol) {
    return { kind: 'namedType', name: type.symbol.name };
  }

  const typeScriptBuiltInType = builtInTypeName(type);
  if (typeScriptBuiltInType) {
    return { kind: 'builtIn', builtIn: typeScriptBuiltInType };
  }

  if (type.isUnion() || type.isIntersection()) {
    return {
      kind: 'error',
      message: `Type unions or intersections are not supported in examples, got: ${typeChecker.typeToString(type)}`,
    };
  }
  return { kind: 'unknown' };
}

export type ObjectLiteralAnalysis = ObjectLiteralStruct | { readonly kind: 'map' } | { readonly kind: 'unknown' };

export type ObjectLiteralStruct =
  | { readonly kind: 'struct'; readonly type: ts.Type; readonly jsiiSym: JsiiSymbol }
  | { readonly kind: 'local-struct'; readonly type: ts.Type };

export function analyzeObjectLiteral(
  typeChecker: ts.TypeChecker,
  node: ts.ObjectLiteralExpression,
): ObjectLiteralAnalysis {
  const type = inferredTypeOfExpression(typeChecker, node);
  if (!type) {
    return { kind: 'unknown' };
  }

  const call = findEnclosingCallExpression(node);
  const isDeclaredCall = !!(call && typeChecker.getResolvedSignature(call)?.declaration);

  if (hasAnyFlag(type.flags, ts.TypeFlags.Any)) {
    // The type checker by itself won't tell us the difference between an `any` that
    // was literally declared as a type in the code, vs an `any` it assumes because it
    // can't find a function's type declaration.
    //
    // Search for the function's declaration and only if we can't find it,
    // the type is actually unknown (otherwise it's a literal 'any').
    return isDeclaredCall ? { kind: 'map' } : { kind: 'unknown' };
  }

  // If the type is a union between a struct and something else, return the first possible struct
  const structCandidates = type.isUnion() ? type.types : [type];
  for (const candidate of structCandidates) {
    const structType = analyzeStructType(typeChecker, candidate);
    if (structType) {
      return structType;
    }
  }

  return { kind: 'map' };
}

function findEnclosingCallExpression(node?: ts.Node): ts.CallLikeExpression | undefined {
  while (node) {
    if (ts.isCallLikeExpression(node)) {
      return node;
    }
    node = node.parent;
  }

  return undefined;
}
