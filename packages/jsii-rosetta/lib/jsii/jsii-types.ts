import * as ts from 'typescript';
import { inferredTypeOfExpression, mapElementType } from '../typescript/types';
import { hasFlag } from './jsii-utils';




export type ObjectLiteralAnalysis = (
  { readonly kind: 'struct', readonly type: ts.Type }
  | { readonly kind: 'map', readonly elementType?: ts.Type });


export function analyzeObjectLiteral(typeChecker: ts.TypeChecker, node: ts.ObjectLiteralExpression): ObjectLiteralAnalysis {
  const type = inferredTypeOfExpression(typeChecker, node);
  if (!type) { return { kind: 'map' }};

  if (hasFlag(type.flags, ts.TypeFlags.Any)) {
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