import * as ts from 'typescript';

import { TargetLanguage } from './languages';
import { NO_SYNTAX, OTree, UnknownSyntax, Span } from './o-tree';
import {
  commentRangeFromTextRange,
  extractMaskingVoidExpression,
  extractShowingVoidExpression,
  nodeChildren,
  repeatNewlines,
  scanText,
} from './typescript/ast-utils';
import { analyzeImportDeclaration, analyzeImportEquals, ImportStatement } from './typescript/imports';
import { typeOfExpression, inferredTypeOfExpression } from './typescript/types';

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

  public constructor(
    private readonly sourceFile: ts.SourceFile,
    public readonly typeChecker: ts.TypeChecker,
    private readonly handler: AstHandler<C>,
    private readonly options: AstRendererOptions = {},
  ) {
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
      currentContext: newContext,
    });
  }

  /**
   * Convert a single node to an OTree
   */
  public convert(node: ts.Node | undefined): OTree {
    if (node === undefined) {
      return NO_SYNTAX;
    }

    // Basic transform of node
    const transformed = this.dispatch(node);
    transformed.setSpan(node.getStart(this.sourceFile), node.getEnd());
    if (!transformed.attachComment) {
      return transformed;
    }

    const withTrivia = this.attachLeadingTrivia(node, transformed);
    withTrivia.setSpan(node.getStart(this.sourceFile), node.getEnd());
    return withTrivia;
  }

  /**
   * Convert a set of nodes, filtering out hidden nodes
   */
  public convertAll(nodes: readonly ts.Node[]): OTree[] {
    return filterVisible(nodes).map(this.convert.bind(this));
  }

  public convertWithModifier(
    nodes: readonly ts.Node[],
    makeContext: (context: this, node: ts.Node, index: number) => AstRenderer<C>,
  ): OTree[] {
    const vis = assignVisibility(nodes);
    const result = new Array<OTree>();
    for (const [idx, { node, visible, maskingVoid }] of vis.entries()) {
      const renderedNode = visible ? node : maskingVoid;
      if (renderedNode) {
        const context = makeContext(this, renderedNode, idx);
        result.push(context.convert(renderedNode));
      }
    }
    return result;
  }

  /**
   * Convert a set of nodes, but update the context for the last one.
   *
   * Takes visibility into account.
   */
  public convertLastDifferently(nodes: readonly ts.Node[], lastContext: C): OTree[] {
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

  public getPosition(node: ts.Node): Span {
    return {
      start: node.getStart(this.sourceFile),
      end: node.getEnd(),
    };
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
   * If the type of the expression can include undefined (if the value is
   * optional), `undefined` will be removed from the union.
   *
   * (Will return undefined for object literals not unified with a declared type)
   *
   * @deprecated Use `inferredTypeOfExpression` instead
   */
  public inferredTypeOfExpression(node: ts.Expression) {
    return inferredTypeOfExpression(this.typeChecker, node);
  }

  /**
   * Type of expression from the text of the expression
   *
   * (Will return a map type for object literals)
   *
   * @deprecated Use `typeOfExpression` directly
   */
  public typeOfExpression(node: ts.Expression): ts.Type {
    return typeOfExpression(this.typeChecker, node);
  }

  public typeOfType(node: ts.TypeNode): ts.Type {
    return this.typeChecker.getTypeFromTypeNode(node);
  }

  public typeToString(type: ts.Type) {
    return this.typeChecker.typeToString(type);
  }

  public report(node: ts.Node, messageText: string, category: ts.DiagnosticCategory = ts.DiagnosticCategory.Error) {
    this.diagnostics.push({
      category,
      code: 0,
      source: 'rosetta',
      messageText,
      file: this.sourceFile,
      start: node.getStart(this.sourceFile),
      length: node.getWidth(this.sourceFile),
    });
  }

  public reportUnsupported(node: ts.Node, language: TargetLanguage | undefined): void {
    const nodeKind = ts.SyntaxKind[node.kind];
    // tslint:disable-next-line:max-line-length
    if (language) {
      this.report(
        node,
        `This TypeScript feature (${nodeKind}) is not supported in examples because we cannot translate it to ${language}. Please rewrite this example.`,
      );
    } else {
      this.report(
        node,
        `This TypeScript feature (${nodeKind}) is not supported in examples. Please rewrite this example.`,
      );
    }
  }

  /**
   * Whether there is non-whitespace on the same line before the given position
   */
  public codeOnLineBefore(pos: number) {
    const text = this.sourceFile.text;
    while (pos > 0) {
      const c = text[--pos];
      if (c === '\n') {
        return false;
      }
      if (c !== ' ' && c !== '\r' && c !== '\t') {
        return true;
      }
    }
    return false;
  }

  /**
   * Return a newline if the given node is preceded by at least one newline
   *
   * Used to mirror newline use between matchin brackets (such as { ... } and [ ... ]).
   */
  public mirrorNewlineBefore(viz?: ts.Node, suffix = '', otherwise = ''): string {
    if (viz === undefined) {
      return suffix;
    }

    // Return a newline if the given node is preceded by newlines
    const leadingRanges = scanText(this.sourceFile.text, viz.getFullStart(), viz.getStart(this.sourceFile));
    const newlines = [];

    for (const range of leadingRanges) {
      if (range.type === 'other') {
        newlines.push(repeatNewlines(this.sourceFile.text.substring(range.pos, range.end)));
      }
    }

    return (newlines.join('').length > 0 ? '\n' : otherwise) + suffix;
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

    // Nodes with meaning
    if (ts.isSourceFile(tree)) {
      return visitor.sourceFile(tree, this);
    }
    if (ts.isImportEqualsDeclaration(tree)) {
      return visitor.importStatement(analyzeImportEquals(tree, this), this);
    }
    if (ts.isImportDeclaration(tree)) {
      return visitor.importStatement(analyzeImportDeclaration(tree, this), this);
    }
    if (ts.isStringLiteral(tree) || ts.isNoSubstitutionTemplateLiteral(tree)) {
      return visitor.stringLiteral(tree, this);
    }
    if (ts.isNumericLiteral(tree)) {
      return visitor.numericLiteral(tree, this);
    }
    if (ts.isFunctionDeclaration(tree)) {
      return visitor.functionDeclaration(tree, this);
    }
    if (ts.isIdentifier(tree)) {
      return visitor.identifier(tree, this);
    }
    if (ts.isBlock(tree)) {
      return visitor.block(tree, this);
    }
    if (ts.isParameter(tree)) {
      return visitor.parameterDeclaration(tree, this);
    }
    if (ts.isReturnStatement(tree)) {
      return visitor.returnStatement(tree, this);
    }
    if (ts.isBinaryExpression(tree)) {
      return visitor.binaryExpression(tree, this);
    }
    if (ts.isIfStatement(tree)) {
      return visitor.ifStatement(tree, this);
    }
    if (ts.isPropertyAccessExpression(tree)) {
      return visitor.propertyAccessExpression(tree, this);
    }
    if (ts.isAwaitExpression(tree)) {
      return visitor.awaitExpression(tree, this);
    }
    if (ts.isCallExpression(tree)) {
      return visitor.callExpression(tree, this);
    }
    if (ts.isExpressionStatement(tree)) {
      return visitor.expressionStatement(tree, this);
    }
    if (ts.isToken(tree)) {
      return visitor.token(tree, this);
    }
    if (ts.isObjectLiteralExpression(tree)) {
      return visitor.objectLiteralExpression(tree, this);
    }
    if (ts.isNewExpression(tree)) {
      return visitor.newExpression(tree, this);
    }
    if (ts.isPropertyAssignment(tree)) {
      return visitor.propertyAssignment(tree, this);
    }
    if (ts.isVariableStatement(tree)) {
      return visitor.variableStatement(tree, this);
    }
    if (ts.isVariableDeclarationList(tree)) {
      return visitor.variableDeclarationList(tree, this);
    }
    if (ts.isVariableDeclaration(tree)) {
      return visitor.variableDeclaration(tree, this);
    }
    if (ts.isJSDoc(tree)) {
      return visitor.jsDoc(tree, this);
    }
    if (ts.isArrayLiteralExpression(tree)) {
      return visitor.arrayLiteralExpression(tree, this);
    }
    if (ts.isShorthandPropertyAssignment(tree)) {
      return visitor.shorthandPropertyAssignment(tree, this);
    }
    if (ts.isForOfStatement(tree)) {
      return visitor.forOfStatement(tree, this);
    }
    if (ts.isClassDeclaration(tree)) {
      return visitor.classDeclaration(tree, this);
    }
    if (ts.isConstructorDeclaration(tree)) {
      return visitor.constructorDeclaration(tree, this);
    }
    if (ts.isPropertyDeclaration(tree)) {
      return visitor.propertyDeclaration(tree, this);
    }
    if (ts.isComputedPropertyName(tree)) {
      return visitor.computedPropertyName(tree.expression, this);
    }
    if (ts.isMethodDeclaration(tree)) {
      return visitor.methodDeclaration(tree, this);
    }
    if (ts.isInterfaceDeclaration(tree)) {
      return visitor.interfaceDeclaration(tree, this);
    }
    if (ts.isPropertySignature(tree)) {
      return visitor.propertySignature(tree, this);
    }
    if (ts.isMethodSignature(tree)) {
      return visitor.methodSignature(tree, this);
    }
    if (ts.isAsExpression(tree)) {
      return visitor.asExpression(tree, this);
    }
    if (ts.isPrefixUnaryExpression(tree)) {
      return visitor.prefixUnaryExpression(tree, this);
    }
    if (ts.isSpreadAssignment(tree)) {
      if (this.textOf(tree) === '...') {
        return visitor.ellipsis(tree, this);
      }
      return visitor.spreadAssignment(tree, this);
    }
    if (ts.isSpreadElement(tree)) {
      if (this.textOf(tree) === '...') {
        return visitor.ellipsis(tree, this);
      }
      return visitor.spreadElement(tree, this);
    }
    if (ts.isElementAccessExpression(tree)) {
      return visitor.elementAccessExpression(tree, this);
    }
    if (ts.isTemplateExpression(tree)) {
      return visitor.templateExpression(tree, this);
    }
    if (ts.isNonNullExpression(tree)) {
      return visitor.nonNullExpression(tree, this);
    }
    if (ts.isParenthesizedExpression(tree)) {
      return visitor.parenthesizedExpression(tree, this);
    }
    if (ts.isVoidExpression(tree)) {
      return visitor.maskingVoidExpression(tree, this);
    }

    this.reportUnsupported(tree, undefined);

    if (this.options.bestEffort !== false) {
      // When doing best-effort conversion and we don't understand the node type, just return the complete text of it as-is
      return new OTree([this.textOf(tree)]);
    }
    // Otherwise, show a placeholder indicating we don't recognize the type
    const nodeKind = ts.SyntaxKind[tree.kind];
    return new UnknownSyntax(
      [`<${nodeKind} ${this.textOf(tree)}>`],
      ['\n', ...nodeChildren(tree).map(this.convert.bind(this))],
      {
        indent: 2,
      },
    );
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
      let trivia: OTree | undefined = undefined;
      switch (range.type) {
        case 'other':
          trivia = new OTree([repeatNewlines(this.sourceFile.text.substring(range.pos, range.end))], [], {
            renderOnce: `ws-${range.pos}`,
          });
          break;
        case 'linecomment':
        case 'blockcomment':
          trivia = this.handler.commentRange(
            commentSyntaxFromCommentRange(commentRangeFromTextRange(range), this),
            this,
          );
          break;

        case 'directive':
          break;
      }
      if (trivia != null) {
        // Set spans on comments to make sure their visibility is toggled correctly.
        trivia.setSpan(range.pos, range.end);
        precede.push(trivia);
      }
    }

    // FIXME: No trailing comments for now, they're too tricky

    if (precede.length > 0 && !transformed.isEmpty) {
      return new OTree([...precede, transformed], [], { canBreakLine: true });
    }
    return transformed;
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
  readonly indentChar?: ' ' | '\t';
  mergeContext(old: C, update: Partial<C>): C;

  sourceFile(node: ts.SourceFile, context: AstRenderer<C>): OTree;
  commentRange(node: CommentSyntax, context: AstRenderer<C>): OTree;
  importStatement(node: ImportStatement, context: AstRenderer<C>): OTree;
  stringLiteral(node: ts.StringLiteral | ts.NoSubstitutionTemplateLiteral, children: AstRenderer<C>): OTree;
  numericLiteral(node: ts.NumericLiteral, children: AstRenderer<C>): OTree;
  functionDeclaration(node: ts.FunctionDeclaration, children: AstRenderer<C>): OTree;
  identifier(node: ts.Identifier, children: AstRenderer<C>): OTree;
  block(node: ts.Block, children: AstRenderer<C>): OTree;
  parameterDeclaration(node: ts.ParameterDeclaration, children: AstRenderer<C>): OTree;
  returnStatement(node: ts.ReturnStatement, context: AstRenderer<C>): OTree;
  binaryExpression(node: ts.BinaryExpression, context: AstRenderer<C>): OTree;
  ifStatement(node: ts.IfStatement, context: AstRenderer<C>): OTree;
  propertyAccessExpression(node: ts.PropertyAccessExpression, context: AstRenderer<C>): OTree;
  awaitExpression(node: ts.AwaitExpression, context: AstRenderer<C>): OTree;
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
  computedPropertyName(node: ts.Expression, context: AstRenderer<C>): OTree;
  methodDeclaration(node: ts.MethodDeclaration, context: AstRenderer<C>): OTree;
  interfaceDeclaration(node: ts.InterfaceDeclaration, context: AstRenderer<C>): OTree;
  propertySignature(node: ts.PropertySignature, context: AstRenderer<C>): OTree;
  methodSignature(node: ts.MethodSignature, context: AstRenderer<C>): OTree;
  asExpression(node: ts.AsExpression, context: AstRenderer<C>): OTree;
  prefixUnaryExpression(node: ts.PrefixUnaryExpression, context: AstRenderer<C>): OTree;
  spreadElement(node: ts.SpreadElement, context: AstRenderer<C>): OTree;
  spreadAssignment(node: ts.SpreadAssignment, context: AstRenderer<C>): OTree;
  templateExpression(node: ts.TemplateExpression, context: AstRenderer<C>): OTree;
  nonNullExpression(node: ts.NonNullExpression, context: AstRenderer<C>): OTree;
  parenthesizedExpression(node: ts.ParenthesizedExpression, context: AstRenderer<C>): OTree;
  maskingVoidExpression(node: ts.VoidExpression, context: AstRenderer<C>): OTree;
  elementAccessExpression(node: ts.ElementAccessExpression, context: AstRenderer<C>): OTree;

  // Not a node, called when we recognize a spread element/assignment that is only
  // '...' and nothing else.
  ellipsis(node: ts.SpreadElement | ts.SpreadAssignment, context: AstRenderer<C>): OTree;
}

export function nimpl<C>(node: ts.Node, context: AstRenderer<C>, options: { additionalInfo?: string } = {}) {
  const children = nodeChildren(node).map((c) => context.convert(c));

  let syntaxKind = ts.SyntaxKind[node.kind];
  if (syntaxKind === 'FirstPunctuation') {
    // These have the same identifier but this name is more descriptive
    syntaxKind = 'OpenBraceToken';
  }

  const parts = [`(${syntaxKind}`];
  if (options.additionalInfo) {
    parts.push(`{${options.additionalInfo}}`);
  }
  parts.push(context.textOf(node));

  return new UnknownSyntax([parts.join(' ')], children.length > 0 ? ['\n', ...children] : [], {
    indent: 2,
    suffix: ')',
    separator: '\n',
    canBreakLine: true,
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

function filterVisible(nodes: readonly ts.Node[]): ts.Node[] {
  return assignVisibility(nodes)
    .map((c) => (c.visible ? c.node : c.maskingVoid))
    .filter(notUndefined);
}

function assignVisibility(nodes: readonly ts.Node[]): ClassifiedNode[] {
  const ret: ClassifiedNode[] = [];

  let visible = true;
  for (const node of nodes) {
    const maskingVoid = extractMaskingVoidExpression(node);
    if (visible && maskingVoid) {
      visible = false;
    }

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

/**
 * Our own representation of comments
 *
 * (So we can synthesize 'em
 */
export interface CommentSyntax {
  pos: number;
  text: string;
  hasTrailingNewLine?: boolean;
  kind: ts.CommentKind;

  /**
   * Whether it's at the end of a code line (so we can render a separating space)
   */
  isTrailing?: boolean;
}

function commentSyntaxFromCommentRange(rng: ts.CommentRange, renderer: AstRenderer<any>): CommentSyntax {
  return {
    hasTrailingNewLine: rng.hasTrailingNewLine,
    kind: rng.kind,
    pos: rng.pos,
    text: renderer.textAt(rng.pos, rng.end),
    isTrailing: renderer.codeOnLineBefore(rng.pos),
  };
}
