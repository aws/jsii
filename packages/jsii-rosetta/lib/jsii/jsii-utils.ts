import { symbolIdentifier } from 'jsii';
import * as ts from 'typescript';

import { AstRenderer } from '../renderer';
import { typeContainsUndefined } from '../typescript/types';
import { fmap } from '../util';
import { findTypeLookupAssembly, TypeLookupAssembly } from './assemblies';
import { ObjectLiteralStruct } from './jsii-types';

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

  const jsiiSym = lookupJsiiSymbol(typeChecker, type.symbol);
  if (jsiiSym) {
    return { kind: 'struct', type, jsiiSym };
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
 * A TypeScript symbol resolved to its jsii type
 */
export interface JsiiSymbol {
  /**
   * FQN of the symbol
   *
   * Is either the FQN of a type (for a type). For a membr, the FQN looks like:
   * 'type.fqn#memberName'.
   */
  readonly fqn: string;

  /**
   * What kind of symbol this is
   */
  readonly symbolType: 'module' | 'type' | 'member';

  /**
   * Assembly where the type was found
   *
   * Might be undefined if the type was FAKE from jsii (for tests)
   */
  readonly sourceAssembly?: TypeLookupAssembly;
}

export function lookupJsiiSymbolFromNode(typeChecker: ts.TypeChecker, node: ts.Node): JsiiSymbol | undefined {
  return fmap(typeChecker.getSymbolAtLocation(node), (s) => lookupJsiiSymbol(typeChecker, s));
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
 *
 * For tests, we also treat symbols in a file that has the string '/// fake-from-jsii'
 * as coming from jsii.
 */
export function lookupJsiiSymbol(typeChecker: ts.TypeChecker, sym: ts.Symbol): JsiiSymbol | undefined {
  // Resolve alias, if it is one. This comes into play if the symbol refers to a module,
  // we need to resolve the alias to find the ACTUAL module.
  if (hasAnyFlag(sym.flags, ts.SymbolFlags.Alias)) {
    sym = typeChecker.getAliasedSymbol(sym);
  }

  const decl: ts.Node | undefined = sym.declarations?.[0];
  if (!decl) {
    return undefined;
  }

  if (ts.isSourceFile(decl)) {
    // This is a module.
    // FIXME: for now assume this is the assembly root. Handle the case where it isn't later.
    const sourceAssembly = findTypeLookupAssembly(decl.fileName);
    return fmap(
      sourceAssembly,
      (asm) =>
        ({
          fqn:
            fmap(symbolIdentifier(typeChecker, sym), (symbolId) => sourceAssembly?.symbolIdMap[symbolId]) ??
            sourceAssembly?.assembly.name,
          sourceAssembly: asm,
          symbolType: 'module',
        } as JsiiSymbol),
    );
  }

  if (!isDeclaration(decl)) {
    return undefined;
  }

  const declaringFile = decl.getSourceFile();
  if (/^\/\/\/ fake-from-jsii/m.test(declaringFile.getFullText())) {
    return { fqn: `fake_jsii.${sym.name}`, symbolType: 'type' };
  }

  const declSym = getSymbolFromDeclaration(decl, typeChecker);
  if (!declSym) {
    return undefined;
  }

  const fileName = decl.getSourceFile().fileName;
  if (hasAnyFlag(declSym.flags, ts.SymbolFlags.Method | ts.SymbolFlags.Property | ts.SymbolFlags.EnumMember)) {
    return lookupMemberSymbol(typeChecker, sym, fileName);
  }
  return lookupTypeSymbol(typeChecker, sym, fileName);
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

/**
 * Look up the jsii fqn for a given type symbol
 */
function lookupTypeSymbol(
  typeChecker: ts.TypeChecker,
  typeSymbol: ts.Symbol,
  fileName: string,
): JsiiSymbol | undefined {
  const symbolId = symbolIdentifier(typeChecker, typeSymbol);
  if (!symbolId) {
    return undefined;
  }

  const sourceAssembly = findTypeLookupAssembly(fileName);
  return fmap(sourceAssembly?.symbolIdMap[symbolId], (fqn) => ({ fqn, sourceAssembly, symbolType: 'type' }));
}

function lookupMemberSymbol(
  typeChecker: ts.TypeChecker,
  memberSymbol: ts.Symbol,
  fileName: string,
): JsiiSymbol | undefined {
  const declParent = memberSymbol.declarations?.[0]?.parent;
  if (!declParent || !isDeclaration(declParent)) {
    return undefined;
  }

  const declParentSym = getSymbolFromDeclaration(declParent, typeChecker);
  if (!declParentSym) {
    return undefined;
  }

  const result = lookupTypeSymbol(typeChecker, declParentSym, fileName);
  return fmap(result, (result) => ({ ...result, fqn: `${result.fqn}#${memberSymbol.name}`, symbolType: 'member' }));
}

/**
 * If the given type is an enum literal, resolve to the enum type
 */
export function resolveEnumLiteral(typeChecker: ts.TypeChecker, type: ts.Type) {
  if (!hasAnyFlag(type.flags, ts.TypeFlags.EnumLiteral)) {
    return type;
  }

  return typeChecker.getBaseTypeOfLiteralType(type);
}

export function resolvedSymbolAtLocation(typeChecker: ts.TypeChecker, node: ts.Node) {
  let symbol = typeChecker.getSymbolAtLocation(node);
  while (symbol && hasAnyFlag(symbol.flags, ts.SymbolFlags.Alias)) {
    symbol = typeChecker.getAliasedSymbol(symbol);
  }
  return symbol;
}

function getSymbolFromDeclaration(decl: ts.Node, typeChecker: ts.TypeChecker): ts.Symbol | undefined {
  if (!isDeclaration(decl)) {
    return undefined;
  }

  const name = ts.getNameOfDeclaration(decl);
  return name ? typeChecker.getSymbolAtLocation(name) : undefined;
}

export function parentSymbol(sym: JsiiSymbol): JsiiSymbol | undefined {
  const parts = sym.fqn.split('.');
  if (parts.length === 1) {
    return undefined;
  }

  return {
    fqn: parts.slice(0, -1).join('.'),
    symbolType: 'module', // Might not be true, but probably good enough
    sourceAssembly: sym.sourceAssembly,
  };
}

/**
 * Get the last part of a dot-separated string
 */
export function simpleName(x: string) {
  return x.split('.').slice(-1)[0];
}

/**
 * Get all parts except the last of a dot-separated string
 */
export function namespaceName(x: string) {
  return x.split('.').slice(0, -1).join('.');
}
