import * as ts from 'typescript';

import { hasAnyFlag } from '../jsii/jsii-utils';
import { findPackageJson } from '../jsii/packages';
import { TargetLanguage } from '../languages/target-language';
import { OTree, NO_SYNTAX } from '../o-tree';
import { AstRenderer } from '../renderer';
import { Spans } from '../typescript/visible-spans';
import { DefaultVisitor } from './default';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface RecordReferencesContext {}

type RecordReferencesRenderer = AstRenderer<RecordReferencesContext>;

/**
 * A visitor that collects all types referenced in a particular piece of sample code
 */
export class RecordReferencesVisitor extends DefaultVisitor<RecordReferencesContext> {
  public readonly language = TargetLanguage.PYTHON; // Doesn't matter, but we need it to use the visitor infra :(
  public readonly defaultContext = {};
  private readonly references = new Set<string>();

  public constructor(private readonly visibleSpans: Spans) {
    super();
  }

  public fqnsReferenced() {
    return Array.from(this.references).sort();
  }

  public mergeContext(old: RecordReferencesContext, update: Partial<RecordReferencesContext>): RecordReferencesContext {
    return Object.assign({}, old, update);
  }

  /**
   * For a variable declaration, a type counts as "referenced" if it gets assigned a value via an initializer
   *
   * This skips "declare" statements which aren't really interesting.
   */
  public variableDeclaration(node: ts.VariableDeclaration, renderer: RecordReferencesRenderer): OTree {
    if (this.visibleSpans.containsStartOfNode(node) && node.initializer) {
      const type =
        (node.type && renderer.typeOfType(node.type)) ||
        (node.initializer && renderer.typeOfExpression(node.initializer));

      this.recordSymbol(type?.symbol, renderer);
    }

    return super.variableDeclaration(node, renderer);
  }

  public newExpression(node: ts.NewExpression, context: RecordReferencesRenderer): OTree {
    // Constructor
    if (this.visibleSpans.containsStartOfNode(node)) {
      this.recordNode(node.expression, context);
      if (node.arguments) {
        this.visitArgumentTypes(node.arguments, context);
      }
    }

    return super.newExpression(node, context);
  }

  public propertyAccessExpression(node: ts.PropertyAccessExpression, context: RecordReferencesRenderer): OTree {
    if (this.visibleSpans.containsStartOfNode(node)) {
      // The property itself
      this.recordNode(node, context);

      // Not currently considering the return type as "referenced"
    }

    return super.propertyAccessExpression(node, context);
  }

  public regularCallExpression(node: ts.CallExpression, context: RecordReferencesRenderer): OTree {
    if (this.visibleSpans.containsStartOfNode(node)) {
      // The method itself
      this.recordNode(node.expression, context);

      if (node.arguments) {
        this.visitArgumentTypes(node.arguments, context);
      }

      // Not currently considering the return type as "referenced"
    }

    return super.regularCallExpression(node, context);
  }

  public objectLiteralExpression(node: ts.ObjectLiteralExpression, context: RecordReferencesRenderer): OTree {
    context.convertAll(node.properties);
    return NO_SYNTAX;
  }

  public propertyAssignment(node: ts.PropertyAssignment, renderer: RecordReferencesRenderer): OTree {
    const type = renderer.typeOfExpression(node.initializer).getNonNullableType();
    this.recordSymbol(type?.symbol, renderer);
    return super.propertyAssignment(node, renderer);
  }

  public shorthandPropertyAssignment(node: ts.ShorthandPropertyAssignment, renderer: RecordReferencesRenderer): OTree {
    const type = renderer.typeOfExpression(node.name).getNonNullableType();
    this.recordSymbol(type?.symbol, renderer);
    return super.shorthandPropertyAssignment(node, renderer);
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
  if (!packageJson) {
    return undefined;
  }

  return `${packageJson.name}.${inFileNameParts.join('.')}`.replace(/\.#\./, '#');
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
