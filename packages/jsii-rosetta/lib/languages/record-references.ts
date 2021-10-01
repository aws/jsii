import * as ts from 'typescript';

import { findPackageJson } from '../jsii/packages';
import { TargetLanguage } from '../languages/target-language';
import { OTree } from '../o-tree';
import { AstRenderer } from '../renderer';
import { DefaultVisitor } from './default';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface RecordReferencesContext {}

type RecordReferencesRenderer = AstRenderer<RecordReferencesContext>;

// FIXME: ignore references from hidden spans

export class RecordReferencesVisitor extends DefaultVisitor<RecordReferencesContext> {
  public readonly language = TargetLanguage.PYTHON; // Doesn't matter, but we need it :(
  public readonly defaultContext = {};
  private readonly references = new Set<string>();

  public fqnsReferenced() {
    return Array.from(this.references).sort();
  }

  public mergeContext(old: RecordReferencesContext, update: Partial<RecordReferencesContext>): RecordReferencesContext {
    return Object.assign({}, old, update);
  }

  public newExpression(node: ts.NewExpression, context: RecordReferencesRenderer): OTree {
    // Constructor
    this.recordNode(node.expression, context);
    if (node.arguments) {
      this.visitArgumentTypes(node.arguments, context);
    }

    return super.newExpression(node, context);
  }

  public propertyAccessExpression(node: ts.PropertyAccessExpression, context: RecordReferencesRenderer): OTree {
    // The property itself
    this.recordNode(node, context);

    // FIXME: should we record the return type?

    return super.propertyAccessExpression(node, context);
  }

  public regularCallExpression(node: ts.CallExpression, context: RecordReferencesRenderer): OTree {
    // The method itself
    this.recordNode(node.expression, context);

    if (node.arguments) {
      this.visitArgumentTypes(node.arguments, context);
    }

    // FIXME: should we record the return type?

    return super.regularCallExpression(node, context);
  }

  /**
   * Visit the arguments by type (instead of by node)
   *
   * This will make sure we recognize the use of a `BucketProps` in a `new Bucket(..., { ... })` call.
   */
  private visitArgumentTypes(args: ts.NodeArray<ts.Expression>, context: RecordReferencesRenderer) {
    for (const argument of args) {
      const type = context.inferredTypeOfExpression(argument);
      this.recordSymbol(type?.symbol, context);
    }
  }

  private recordNode(node: ts.Node, context: RecordReferencesRenderer) {
    this.recordSymbol(context.typeChecker.getSymbolAtLocation(node), context);
  }

  private recordSymbol(symbol: ts.Symbol | undefined, context: RecordReferencesRenderer) {
    if (!symbol) {
      return;
    }

    const fqn = jsiiFqnFromSymbol(context.typeChecker, symbol);
    if (!fqn) {
      return;
    }

    this.references.add(fqn);
  }
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
function jsiiFqnFromSymbol(typeChecker: ts.TypeChecker, sym: ts.Symbol): string | undefined {
  const inFileNameParts: string[] = [];

  let decl: ts.Node | undefined = sym.declarations[0];
  while (decl && !ts.isSourceFile(decl)) {
    if (isDeclaration(decl)) {
      const name = ts.getNameOfDeclaration(decl);
      const declSym = name ? typeChecker.getSymbolAtLocation(name) : undefined;
      if (declSym) {
        inFileNameParts.unshift(declSym.name);
      }
    }
    decl = decl.parent;
  }
  if (!decl) {
    return undefined;
  }

  const packageJson = findPackageJson(decl.fileName);
  if (!packageJson) {
    return undefined;
  }

  return `${packageJson.name}.${inFileNameParts.join('.')}`;
}

function isDeclaration(x: ts.Node): x is ts.Declaration {
  return (
    ts.isClassDeclaration(x) ||
    ts.isNamespaceExportDeclaration(x) ||
    ts.isNamespaceExport(x) ||
    ts.isEnumDeclaration(x) ||
    ts.isEnumMember(x) ||
    ts.isInterfaceDeclaration(x) ||
    ts.isMethodDeclaration(x) ||
    ts.isMethodSignature(x) ||
    ts.isPropertyDeclaration(x) ||
    ts.isPropertySignature(x)
  );
}
