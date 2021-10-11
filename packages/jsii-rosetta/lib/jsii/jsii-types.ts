import * as ts from 'typescript';
import { hasAnyFlag } from './jsii-utils';
import { inferredTypeOfExpression, BuiltInType, builtInTypeName, mapElementType } from '../typescript/types';



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

  if (type.isUnion() || type.isIntersection()) {
    return { kind: 'error', message: 'Type unions or intersections are not supported in examples' };
  }

  const mapValuesType = mapElementType(type, typeChecker);
  if (mapValuesType) {
    return { kind: 'map', elementType: determineJsiiType(typeChecker, mapValuesType) };
  }

  // User-defined or aliased type
  if (type.aliasSymbol) {
    return { kind: 'namedType', name: type.aliasSymbol.name };
  }
  if (type.symbol) {
    return { kind: 'namedType', name: type.symbol.name };
  }

  const typeScriptBuiltInType = builtInTypeName(type);
  if (!typeScriptBuiltInType) {
    return { kind: 'unknown' };
  }

  return { kind: 'builtIn', builtIn: typeScriptBuiltInType };
}

export type ObjectLiteralAnalysis = (
  { readonly kind: 'struct', readonly type: ts.Type }
  | { readonly kind: 'map', readonly elementType?: ts.Type });


export function analyzeObjectLiteral(typeChecker: ts.TypeChecker, node: ts.ObjectLiteralExpression): ObjectLiteralAnalysis {
  const type = inferredTypeOfExpression(typeChecker, node);
  if (!type) { return { kind: 'map' }};

  if (hasAnyFlag(type.flags, ts.TypeFlags.Any)) {
    // The type checker by itself won't tell us the difference between an `any` that
    // was literally declared as a type in the code, vs an `any` it assumes because it
    // can't find a function's type declaration.
    //
    // Search for the function's declaration and only if we can't find it,
    // the type is actually unknown (otherwise it's a literal 'any').
    const call = findEnclosingCallExpression(node);
    const signature = call ? typeChecker.getResolvedSignature(call) : undefined;
    if (!signature?.declaration) {

      return { kind: 'map', elementType: mapElementType(type,  };
    }
  }
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
