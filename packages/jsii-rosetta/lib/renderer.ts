import ts = require('typescript');
import { NO_SYNTAX, OTree, UnknownSyntax } from './o-tree';
import { commentRangeFromTextRange, extractMaskingVoidExpression, extractShowingVoidExpression, nodeChildren,
  repeatNewlines, scanText } from './typescript/ast-utils';
import { analyzeImportDeclaration, analyzeImportEquals, ImportStatement } from './typescript/imports';

/**
 * Render a TypeScript AST to some other representation (encoded in OTrees)
 *
 * Dispatch the actual conversion to a specific handler which will get the
 * appropriate method called for particular AST nodes. The handler may use
 * context to modify its own operations when traversing the tree hierarchy,
 * the type of which should be expressed via the C parameter.
 */
export class AstRenderer<C> {
  public readonly diagnostics = new Array<ts.Diagnostic>();
  public readonly currentContext: C;

  constructor(
    private readonly sourceFile: ts.SourceFile,
    public readonly typeChecker: ts.TypeChecker,
    private readonly handler: AstHandler<C>,
    private readonly options: AstRendererOptions = {}) {

    this.currentContext = handler.defaultContext;
  }

  /**
   * Merge the new context with the current context and create a new Converter from it
   */
  public updateContext(contextUpdate: Partial<C>): AstRenderer<C> {
    const newContext = this.handler.mergeContext(this.currentContext, contextUpdate);

    // Use prototypal inheritance to create a version of 'this' in which only
    // 'currentContext' is updated.
    return Object.assign(Object.create(this), {
      currentContext: newContext
    });
  }

  /**
   * Convert a single node to an OTree
   */
  public convert(node: ts.Node | undefined): OTree {
    if (node === undefined) { return NO_SYNTAX; }

    // Basic transform of node
    const transformed = this.dispatch(node);
    transformed.setSpan(node.getStart(this.sourceFile), node.getEnd());
    if (!transformed.attachComment) { return transformed; }

    const withTrivia = this.attachLeadingTrivia(node, transformed);
    withTrivia.setSpan(node.getStart(this.sourceFile), node.getEnd());
    return withTrivia;
  }

  /**
   * Convert a set of nodes, filtering out hidden nodes
   */
  public convertAll(nodes: ReadonlyArray<ts.Node>): OTree[] {
    return filterVisible(nodes).map(this.convert.bind(this));
  }

  /**
   * Convert a set of nodes, but update the context for the last one.
   *
   * Takes visibility into account.
   */
  public convertLastDifferently(nodes: ReadonlyArray<ts.Node>, lastContext: C): OTree[] {
    const lastConverter = this.updateContext(lastContext);

    const convert = this.convert.bind(this);
    const lastConvert = lastConverter.convert.bind(lastConverter);

    const ret: OTree[] = [];

    const vis = assignVisibility(nodes);
    for (let i = 0; i < vis.length; i++) {
      const whichConvert = i === vis.length - 1 ? lastConvert : convert;

      const node = vis[i].visible ? vis[i].node : vis[i].maskingVoid;
      if (node) {
        ret.push(whichConvert(node));
      }
    }

    return ret;
  }

  public textOf(node: ts.Node): string {
    return node.getText(this.sourceFile);
  }

  public textAt(pos: number, end: number): string {
    return this.sourceFile.text.substring(pos, end);
  }

  /**
   * Infer type of expression by the argument it is assigned to
   *
   * (Will return undefined for object literals not unified with a declared type)
   */
  public inferredTypeOfExpression(node: ts.Expression) {
    return this.typeChecker.getContextualType(node);
  }

  /**
   * Type of expression from the text of the expression
   *
   * (Will return a map type for object literals)
   */
  public typeOfExpression(node: ts.Expression) {
    return this.typeChecker.getContextualType(node) || this.typeChecker.getTypeAtLocation(node);
  }

  public typeOfType(node: ts.TypeNode): ts.Type {
    return this.typeChecker.getTypeFromTypeNode(node);
  }

  public report(node: ts.Node, messageText: string, category: ts.DiagnosticCategory = ts.DiagnosticCategory.Error) {
    this.diagnostics.push({
      category,
      code: 0,
      source: 'rosetta',
      messageText,
      file: this.sourceFile,
      start: node.getStart(this.sourceFile),
      length: node.getWidth(this.sourceFile)
    });
  }

  public reportUnsupported(node: ts.Node): void {
    const nodeKind = ts.SyntaxKind[node.kind];
    // tslint:disable-next-line:max-line-length
    this.report(node, `This TypeScript language feature (${nodeKind}) is not supported in examples because we cannot translate it. Please rewrite this example.`);
  }

  /**
   * Return a newline if the given node is preceded by at least one newline
   *
   * Used to mirror newline use between matchin brackets (such as { ... } and [ ... ]).
   */
  public mirrorNewlineBefore(viz?: ts.Node, suffix: string = ''): string {
    if (viz === undefined) { return suffix; }

    // Return a newline if the given node is preceded by newlines
    const leadingRanges = scanText(this.sourceFile.text, viz.getFullStart(), viz.getStart(this.sourceFile));
    const newlines = [];

    for (const range of leadingRanges) {
      if (range.type === 'other') {
        newlines.push(repeatNewlines(this.sourceFile.text.substring(range.pos, range.end)));
      }
    }

    return (newlines.join('').length > 0 ? '\n' : '') + suffix;
  }

  /**
   * Dispatch node to handler
   */
  private dispatch(tree: ts.Node): OTree {
    // Special nodes
    if (ts.isEmptyStatement(tree)) {
      // Additional semicolon where it doesn't belong.
      return NO_SYNTAX;
    }

    const visitor = this.handler;
    const context = this;

    // Nodes with meaning
    if (ts.isSourceFile(tree)) { return visitor.sourceFile(tree, this); }
    if (ts.isImportEqualsDeclaration(tree)) { return visitor.importStatement(analyzeImportEquals(tree, context), context); }
    if (ts.isImportDeclaration(tree)) { return visitor.importStatement(analyzeImportDeclaration(tree, context), context); }
    if (ts.isStringLiteral(tree)) { return visitor.stringLiteral(tree, context); }
    if (ts.isFunctionDeclaration(tree)) { return visitor.functionDeclaration(tree, context); }
    if (ts.isIdentifier(tree)) { return visitor.identifier(tree, context); }
    if (ts.isBlock(tree)) { return visitor.block(tree, context); }
    if (ts.isParameter(tree)) { return visitor.parameterDeclaration(tree, context); }
    if (ts.isReturnStatement(tree)) { return visitor.returnStatement(tree, context); }
    if (ts.isBinaryExpression(tree)) { return visitor.binaryExpression(tree, context); }
    if (ts.isIfStatement(tree)) { return visitor.ifStatement(tree, context); }
    if (ts.isPropertyAccessExpression(tree)) { return visitor.propertyAccessExpression(tree, context); }
    if (ts.isCallExpression(tree)) { return visitor.callExpression(tree, context); }
    if (ts.isExpressionStatement(tree)) { return visitor.expressionStatement(tree, context); }
    if (ts.isNoSubstitutionTemplateLiteral(tree)) { return visitor.noSubstitutionTemplateLiteral(tree, context); }
    if (ts.isToken(tree)) { return visitor.token(tree, context); }
    if (ts.isObjectLiteralExpression(tree)) { return visitor.objectLiteralExpression(tree, context); }
    if (ts.isNewExpression(tree)) { return visitor.newExpression(tree, context); }
    if (ts.isPropertyAssignment(tree)) { return visitor.propertyAssignment(tree, context); }
    if (ts.isVariableStatement(tree)) { return visitor.variableStatement(tree, context); }
    if (ts.isVariableDeclarationList(tree)) { return visitor.variableDeclarationList(tree, context); }
    if (ts.isVariableDeclaration(tree)) { return visitor.variableDeclaration(tree, context); }
    if (ts.isJSDoc(tree)) { return visitor.jsDoc(tree, context); }
    if (ts.isArrayLiteralExpression(tree)) { return visitor.arrayLiteralExpression(tree, context); }
    if (ts.isShorthandPropertyAssignment(tree)) { return visitor.shorthandPropertyAssignment(tree, context); }
    if (ts.isForOfStatement(tree)) { return visitor.forOfStatement(tree, context); }
    if (ts.isClassDeclaration(tree)) { return visitor.classDeclaration(tree, context); }
    if (ts.isConstructorDeclaration(tree)) { return visitor.constructorDeclaration(tree, context); }
    if (ts.isPropertyDeclaration(tree)) { return visitor.propertyDeclaration(tree, context); }
    if (ts.isMethodDeclaration(tree)) { return visitor.methodDeclaration(tree, context); }
    if (ts.isInterfaceDeclaration(tree)) { return visitor.interfaceDeclaration(tree, context); }
    if (ts.isPropertySignature(tree)) { return visitor.propertySignature(tree, context); }
    if (ts.isAsExpression(tree)) { return visitor.asExpression(tree, context); }
    if (ts.isPrefixUnaryExpression(tree)) { return visitor.prefixUnaryExpression(tree, context); }
    if (ts.isSpreadAssignment(tree)) {
       if (context.textOf(tree) === '...') { return visitor.ellipsis(tree, context); }
       return visitor.spreadAssignment(tree, context);
    }
    if (ts.isSpreadElement(tree)) {
      if (context.textOf(tree) === '...') { return visitor.ellipsis(tree, context); }
      return visitor.spreadElement(tree, context);
    }
    if (ts.isTemplateExpression(tree)) { return visitor.templateExpression(tree, context); }
    if (ts.isNonNullExpression(tree)) { return visitor.nonNullExpression(tree, context); }
    if (ts.isParenthesizedExpression(tree)) { return visitor.parenthesizedExpression(tree, context); }
    if (ts.isVoidExpression(tree)) { return visitor.maskingVoidExpression(tree, context); }

    context.reportUnsupported(tree);

    if (this.options.bestEffort !== false) {
      // When doing best-effort conversion and we don't understand the node type, just return the complete text of it as-is
      return new OTree([context.textOf(tree)]);
    } else {
      // Otherwise, show a placeholder indicating we don't recognize the type
      const nodeKind = ts.SyntaxKind[tree.kind];
      return new UnknownSyntax([`<${nodeKind} ${context.textOf(tree)}>`], [
          '\n',
          ...nodeChildren(tree).map(this.convert.bind(this))
        ], {
        indent: 2,
      });
    }
  }

  /**
   * Attach any leading whitespace and comments to the given output tree
   *
   * Regardless of whether it's declared to be able to accept such or not.
   */
  private attachLeadingTrivia(node: ts.Node, transformed: OTree): OTree {
    // Add comments and leading whitespace
    const leadingRanges = scanText(this.sourceFile.text, node.getFullStart(), node.getStart(this.sourceFile));

    const precede: OTree[] = [];
    for (const range of leadingRanges) {
      switch (range.type) {
        case 'other':
          precede.push(new OTree([repeatNewlines(this.sourceFile.text.substring(range.pos, range.end))], [], {
            renderOnce: `ws-${range.pos}`
          }));
          break;
        case 'linecomment':
        case 'blockcomment':
          precede.push(this.handler.commentRange(commentRangeFromTextRange(range), this));
          break;

        case 'directive':
          break;
      }
    }

    // FIXME: No trailing comments for now, they're too tricky

    if (precede.length > 0 && !transformed.isEmpty) {
      return new OTree([...precede, transformed], [], { canBreakLine: true });
    } else {
      return transformed;
    }
  }
}

/**
 * Interface for AST handlers
 *
 * C is the type of hierarchical context the handler uses. Context
 * needs 2 operations: a constructor for a default context, and a
 * merge operation to combine 2 contexts to yield a new one.
 *
 * Otherwise, the handler should return an OTree for every type
 * of AST node.
 */
export interface AstHandler<C> {
  readonly defaultContext: C;
  mergeContext(old: C, update: Partial<C>): C;

  sourceFile(node: ts.SourceFile, context: AstRenderer<C>): OTree;
  commentRange(node: ts.CommentRange, context: AstRenderer<C>): OTree;
  importStatement(node: ImportStatement, context: AstRenderer<C>): OTree;
  stringLiteral(node: ts.StringLiteral, children: AstRenderer<C>): OTree;
  functionDeclaration(node: ts.FunctionDeclaration, children: AstRenderer<C>): OTree;
  identifier(node: ts.Identifier, children: AstRenderer<C>): OTree;
  block(node: ts.Block, children: AstRenderer<C>): OTree;
  parameterDeclaration(node: ts.ParameterDeclaration, children: AstRenderer<C>): OTree;
  returnStatement(node: ts.ReturnStatement, context: AstRenderer<C>): OTree;
  binaryExpression(node: ts.BinaryExpression, context: AstRenderer<C>): OTree;
  ifStatement(node: ts.IfStatement, context: AstRenderer<C>): OTree;
  propertyAccessExpression(node: ts.PropertyAccessExpression, context: AstRenderer<C>): OTree;
  callExpression(node: ts.CallExpression, context: AstRenderer<C>): OTree;
  expressionStatement(node: ts.ExpressionStatement, context: AstRenderer<C>): OTree;
  token<A extends ts.SyntaxKind>(node: ts.Token<A>, context: AstRenderer<C>): OTree;
  objectLiteralExpression(node: ts.ObjectLiteralExpression, context: AstRenderer<C>): OTree;
  newExpression(node: ts.NewExpression, context: AstRenderer<C>): OTree;
  propertyAssignment(node: ts.PropertyAssignment, context: AstRenderer<C>): OTree;
  variableStatement(node: ts.VariableStatement, context: AstRenderer<C>): OTree;
  variableDeclarationList(node: ts.VariableDeclarationList, context: AstRenderer<C>): OTree;
  variableDeclaration(node: ts.VariableDeclaration, context: AstRenderer<C>): OTree;
  jsDoc(node: ts.JSDoc, context: AstRenderer<C>): OTree;
  arrayLiteralExpression(node: ts.ArrayLiteralExpression, context: AstRenderer<C>): OTree;
  shorthandPropertyAssignment(node: ts.ShorthandPropertyAssignment, context: AstRenderer<C>): OTree;
  forOfStatement(node: ts.ForOfStatement, context: AstRenderer<C>): OTree;
  classDeclaration(node: ts.ClassDeclaration, context: AstRenderer<C>): OTree;
  constructorDeclaration(node: ts.ConstructorDeclaration, context: AstRenderer<C>): OTree;
  propertyDeclaration(node: ts.PropertyDeclaration, context: AstRenderer<C>): OTree;
  methodDeclaration(node: ts.MethodDeclaration, context: AstRenderer<C>): OTree;
  interfaceDeclaration(node: ts.InterfaceDeclaration, context: AstRenderer<C>): OTree;
  propertySignature(node: ts.PropertySignature, context: AstRenderer<C>): OTree;
  asExpression(node: ts.AsExpression, context: AstRenderer<C>): OTree;
  prefixUnaryExpression(node: ts.PrefixUnaryExpression, context: AstRenderer<C>): OTree;
  spreadElement(node: ts.SpreadElement, context: AstRenderer<C>): OTree;
  spreadAssignment(node: ts.SpreadAssignment, context: AstRenderer<C>): OTree;
  templateExpression(node: ts.TemplateExpression, context: AstRenderer<C>): OTree;
  nonNullExpression(node: ts.NonNullExpression, context: AstRenderer<C>): OTree;
  parenthesizedExpression(node: ts.ParenthesizedExpression, context: AstRenderer<C>): OTree;
  maskingVoidExpression(node: ts.VoidExpression, context: AstRenderer<C>): OTree;
  noSubstitutionTemplateLiteral(node: ts.NoSubstitutionTemplateLiteral, context: AstRenderer<C>): OTree;

  // Not a node, called when we recognize a spread element/assignment that is only
  // '...' and nothing else.
  ellipsis(node: ts.SpreadElement | ts.SpreadAssignment, context: AstRenderer<C>): OTree;
}

export function nimpl<C>(node: ts.Node, context: AstRenderer<C>, options: { additionalInfo?: string} = {}) {
  const children = nodeChildren(node).map(c => context.convert(c));

  let syntaxKind = ts.SyntaxKind[node.kind];
  if (syntaxKind === 'FirstPunctuation') {
    // These have the same identifier but this name is more descriptive
    syntaxKind = 'OpenBraceToken';
  }

  const parts = [`(${syntaxKind}`];
  if (options.additionalInfo) { parts.push(`{${options.additionalInfo}}`); }
  parts.push(context.textOf(node));

  return new UnknownSyntax([parts.join(' ')], children.length > 0 ? ['\n', ...children] : [], {
    indent: 2,
    suffix: ')',
    separator: '\n',
    canBreakLine: true
  });
}

export interface AstRendererOptions {
  /**
   * If enabled, don't translate the text of unknown nodes
   *
   * @default true
   */
  bestEffort?: boolean;
}

interface ClassifiedNode {
  node: ts.Node;
  visible: boolean;
  maskingVoid?: ts.VoidExpression;
}

function filterVisible(nodes: ReadonlyArray<ts.Node>): ts.Node[] {
  return assignVisibility(nodes).map(c => c.visible ? c.node : c.maskingVoid).filter(notUndefined);
}

function assignVisibility(nodes: ReadonlyArray<ts.Node>): ClassifiedNode[] {
  const ret: ClassifiedNode[] = [];

  let visible = true;
  for (const node of nodes) {
    const maskingVoid = extractMaskingVoidExpression(node);
    if (visible && maskingVoid) { visible = false; }

    ret.push({ node, maskingVoid, visible });

    if (!visible) {
      const showing = extractShowingVoidExpression(node);
      if (showing) {
        visible = true;
      }
    }
  }

  return ret;
}

function notUndefined<A>(x: A | undefined): x is A {
  return x !== undefined;
}