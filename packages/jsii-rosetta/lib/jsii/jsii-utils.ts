import * as ts from 'typescript';

import { AstRenderer } from '../renderer';
import { typeContainsUndefined } from '../typescript/types';
import { ObjectLiteralStruct } from './jsii-types';
import { findPackageJson } from './packages';

export function isNamedLikeStruct(name: string) {
  // Start with an I and another uppercase character
  return !/^I[A-Z]/.test(name);
}

export function analyzeStructType(typeChecker: ts.TypeChecker, type: ts.Type): ObjectLiteralStruct | false {
  if (
    !type.isClassOrInterface() ||
    !hasAllFlags(type.objectFlags, ts.ObjectFlags.Interface) ||
    !isNamedLikeStruct(type.symbol.name)
  ) {
    return false;
  }

  const jsiiFqn = refersToJsiiSymbol(typeChecker, type.symbol);
  if (jsiiFqn) {
    return { kind: 'struct', type, fqn: jsiiFqn };
  }

  return { kind: 'local-struct', type };
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
export function refersToJsiiSymbol(typeChecker: ts.TypeChecker, symbol: ts.Symbol): string | undefined {
  const declaration = symbol.declarations[0];
  if (!declaration) {
    return undefined;
  }

  const declaringFile = declaration.getSourceFile();
  if (/^\/\/\/ fake-from-jsii/m.test(declaringFile.getFullText())) {
    return `fake_jsii.${symbol.name}`;
  }

  return jsiiFqnFromSymbol(typeChecker, symbol);
}

/**
 * Returns the jsii FQN for a TypeScript (class or type) symbol
 *
 * TypeScript only knows the symbol NAME plus the FILE the symbol is defined
 * in. We need to extract two things:
 *
 * 1. The package name (extracted from the nearest `package.json`)
 * 2. The submodule name (...?? don't know how to get this yet)
 * 3. Any containing type names or namespace names.
 */
export function jsiiFqnFromSymbol(typeChecker: ts.TypeChecker, sym: ts.Symbol): string | undefined {
  const inFileNameParts: string[] = [];

  let decl: ts.Node | undefined = sym.declarations?.[0];
  while (decl && !ts.isSourceFile(decl)) {
    if (isDeclaration(decl)) {
      const name = ts.getNameOfDeclaration(decl);
      const declSym = name ? typeChecker.getSymbolAtLocation(name) : undefined;
      if (declSym) {
        inFileNameParts.unshift(declSym.name);
        if (hasAnyFlag(declSym.flags, ts.SymbolFlags.Method | ts.SymbolFlags.Property | ts.SymbolFlags.EnumMember)) {
          // Add in a separator to show where we went from class/interface to
          // member, replace that later to remove the '.'s on either side.
          inFileNameParts.unshift('#');
        }
      }
    }
    decl = decl.parent;
  }
  if (!decl) {
    return undefined;
  }

  const packageJson = findPackageJson(decl.fileName);
  if (!packageJson || !packageJson.jsii) {
    return undefined;
  }

  return `${packageJson.name}.${inFileNameParts.join('.')}`.replace(/\.#\./, '#');
}

function isDeclaration(x: ts.Node): x is ts.Declaration {
  return (
    ts.isClassDeclaration(x) ||
    ts.isNamespaceExportDeclaration(x) ||
    ts.isNamespaceExport(x) ||
    ts.isModuleDeclaration(x) ||
    ts.isEnumDeclaration(x) ||
    ts.isEnumMember(x) ||
    ts.isInterfaceDeclaration(x) ||
    ts.isMethodDeclaration(x) ||
    ts.isMethodSignature(x) ||
    ts.isPropertyDeclaration(x) ||
    ts.isPropertySignature(x)
  );
}
