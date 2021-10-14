import * as ts from 'typescript';

import { AstRenderer } from '../renderer';
import { typeContainsUndefined } from '../typescript/types';
import { findPackageJson } from './packages';

export function isNamedLikeStruct(name: string) {
  // Start with an I and another uppercase character
  return !/^I[A-Z]/.test(name);
}

export function analyzeStructType(type: ts.Type): 'struct' | 'local-struct' | false {
  if (
    !type.isClassOrInterface() ||
    !hasAllFlags(type.objectFlags, ts.ObjectFlags.Interface) ||
    !isNamedLikeStruct(type.symbol.name)
  ) {
    return false;
  }

  if (refersToJsiiSymbol(type.symbol)) {
    return 'struct';
  }

  return 'local-struct';
}

export function hasAllFlags<A extends number>(flags: A, test: A) {
  // tslint:disable-next-line:no-bitwise
  return test !== 0 && (flags & test) === test;
}

export function hasAnyFlag<A extends number>(flags: A, test: A) {
  // tslint:disable-next-line:no-bitwise
  return test !== 0 && (flags & test) !== 0;
}

export interface StructProperty {
  name: string;
  type: ts.Type | undefined;
  questionMark: boolean;
}

export function propertiesOfStruct(type: ts.Type, context: AstRenderer<any>): StructProperty[] {
  return type.isClassOrInterface()
    ? type.getProperties().map((s) => {
        let propType;
        let questionMark = false;

        const propSymbol = type.getProperty(s.name)!;
        const symbolDecl = propSymbol.valueDeclaration;
        if (ts.isPropertyDeclaration(symbolDecl) || ts.isPropertySignature(symbolDecl)) {
          questionMark = symbolDecl.questionToken !== undefined;
          propType = symbolDecl.type && context.typeOfType(symbolDecl.type);
        }

        return {
          name: s.name,
          type: propType,
          questionMark,
        };
      })
    : [];
}

export function structPropertyAcceptsUndefined(prop: StructProperty): boolean {
  return prop.questionMark || (!!prop.type && typeContainsUndefined(prop.type));
}

/**
 * Whether or not the given call expression seems to refer to a jsii symbol
 *
 * If it does, we treat it differently than if it's a class or symbol defined
 * in the same example source.
 *
 * To do this, we look for whether it's defined in a directory that's compiled
 * for jsii and has a jsii assembly.
 *
 * FIXME: Look up the actual symbol identifier when we finally have those.
 *
 * For tests, we also treat symbols in a file that has the string '/// fake-from-jsii'
 * as coming from jsii.
 */
export function refersToJsiiSymbol(symbol: ts.Symbol): boolean {
  const declaration = symbol.declarations[0];
  if (!declaration) {
    return false;
  }

  const declaringFile = declaration.getSourceFile();
  if (/^\/\/\/ fake-from-jsii/m.test(declaringFile.getFullText())) {
    return true;
  }

  const pj = findPackageJson(declaringFile.fileName);
  return !!(pj && pj.jsii);
}
