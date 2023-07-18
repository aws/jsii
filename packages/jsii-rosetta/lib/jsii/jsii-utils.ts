import * as spec from '@jsii/spec';
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

/**
 * Whether the given type is a protocol AND comes from jsii
 *
 * - Protocol: a TypeScript interface that is *not* a "struct" type.
 *   A.k.a. "behavioral interface".
 * - From jsii: whether the interface type is defined in and exported
 *   via a jsii assembly. There can be literal interfaces defined
 *   in an example, and they will not be mangled in the same way
 *   as a jsii interface would be.
 *
 *
 * Examples:
 *
 * ```ts
 * // isJsiiProtocolType() -> false: not a protocol
 * interface Banana {
 *   readonly arc: number;
 * }
 *
 * // isJsiiProtocolType() -> might be true: depends on whether it was defined
 * // in a jsii assembly.
 * interface IHello {
 *   sayIt(): void;
 * }
 *
 * // isJsiiProtocolType() -> false: declared to not be a protocol, even though
 * // it has the naming scheme of one
 * /**
 *  * @struct
 *  * /
 * interface IPAddress {
 *   readonly octets: number[];
 * }
 * ```
 */
export function isJsiiProtocolType(typeChecker: ts.TypeChecker, type: ts.Type): boolean | undefined {
  if (!type.isClassOrInterface() || !hasAllFlags(type.objectFlags, ts.ObjectFlags.Interface)) {
    return false;
  }

  const sym = lookupJsiiSymbol(typeChecker, type.symbol);
  if (!sym) {
    return false;
  }

  if (!sym.sourceAssembly) {
    // No source assembly, so this is a 'fake-from-jsii' type
    return !isNamedLikeStruct(type.symbol.name);
  }

  const jsiiType = resolveJsiiSymbolType(sym);
  return spec.isInterfaceType(jsiiType) && !jsiiType.datatype;
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

export function resolveJsiiSymbolType(jsiiSymbol: JsiiSymbol): spec.Type {
  if (jsiiSymbol.symbolType !== 'type') {
    throw new Error(
      `Expected symbol to refer to a 'type', got '${jsiiSymbol.fqn}' which is a '${jsiiSymbol.symbolType}'`,
    );
  }

  if (!jsiiSymbol.sourceAssembly) {
    throw new Error('`resolveJsiiSymbolType: requires an actual source assembly');
  }

  const type = jsiiSymbol.sourceAssembly?.assembly.types?.[jsiiSymbol.fqn];
  if (!type) {
    throw new Error(
      `resolveJsiiSymbolType: ${jsiiSymbol.fqn} not found in assembly ${jsiiSymbol.sourceAssembly.assembly.name}`,
    );
  }
  return type;
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
    const sourceAssembly = findTypeLookupAssembly(decl.fileName);
    return fmap(
      sourceAssembly,
      (asm) =>
        ({
          fqn:
            fmap(
              symbolIdentifier(
                typeChecker,
                sym,
                fmap(sourceAssembly, (sa) => ({ assembly: sa.assembly })),
              ),
              (symbolId) => sourceAssembly?.symbolIdMap[symbolId],
            ) ?? sourceAssembly?.assembly.name,
          sourceAssembly: asm,
          symbolType: 'module',
        }) as JsiiSymbol,
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
  const sourceAssembly = findTypeLookupAssembly(fileName);
  const symbolId = symbolIdentifier(typeChecker, declSym, { assembly: sourceAssembly?.assembly });
  if (!symbolId) {
    return undefined;
  }

  return fmap(/([^#]*)(#.*)?/.exec(symbolId), ([, typeSymbolId, memberFragment]) => {
    if (memberFragment) {
      return fmap(sourceAssembly?.symbolIdMap[typeSymbolId], (fqn) => ({
        fqn: `${fqn}${memberFragment}`,
        sourceAssembly,
        symbolType: 'member',
      }));
    }

    return fmap(sourceAssembly?.symbolIdMap[typeSymbolId], (fqn) => ({ fqn, sourceAssembly, symbolType: 'type' }));
  });
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
