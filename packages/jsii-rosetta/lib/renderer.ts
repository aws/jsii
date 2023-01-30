import * as ts from 'typescript';

import { TargetLanguage } from './languages';
import { NO_SYNTAX, OTree, UnknownSyntax, Span } from './o-tree';
import { SubmoduleReference, SubmoduleReferenceMap } from './submodule-reference';
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
    public readonly submoduleReferences: SubmoduleReferenceMap = new Map(),
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
    const visitor = this.handler;

    // Using a switch on tree.kind + forced down-casting, because this is significantly faster than
    // doing a cascade of `if` statements with the `ts.is<NodeType>` functions, since `tree.kind` is
    // effectively integers, and this switch statement is hence optimizable to a jump table. This is
    // a VERY significant enhancement to the debugging experience, too.
    switch (tree.kind) {
      case ts.SyntaxKind.EmptyStatement:
        // Additional semicolon where it doesn't belong.
        return NO_SYNTAX;
      case ts.SyntaxKind.SourceFile:
        return visitor.sourceFile(tree as ts.SourceFile, this);
      case ts.SyntaxKind.ImportEqualsDeclaration:
        return visitor.importStatement(analyzeImportEquals(tree as ts.ImportEqualsDeclaration, this), this);
      case ts.SyntaxKind.ImportDeclaration:
        return new OTree(
          [],
          analyzeImportDeclaration(tree as ts.ImportDeclaration, this, this.submoduleReferences).map((import_) =>
            visitor.importStatement(import_, this),
          ),
          { canBreakLine: true, separator: '\n' },
        );
      case ts.SyntaxKind.StringLiteral:
      case ts.SyntaxKind.NoSubstitutionTemplateLiteral:
        return visitor.stringLiteral(tree as ts.StringLiteral | ts.NoSubstitutionTemplateLiteral, this);
      case ts.SyntaxKind.NumericLiteral:
        return visitor.numericLiteral(tree as ts.NumericLiteral, this);
      case ts.SyntaxKind.FunctionDeclaration:
        return visitor.functionDeclaration(tree as ts.FunctionDeclaration, this);
      case ts.SyntaxKind.Identifier:
        return visitor.identifier(tree as ts.Identifier, this);
      case ts.SyntaxKind.Block:
        return visitor.block(tree as ts.Block, this);
      case ts.SyntaxKind.Parameter:
        return visitor.parameterDeclaration(tree as ts.ParameterDeclaration, this);
      case ts.SyntaxKind.ReturnStatement:
        return visitor.returnStatement(tree as ts.ReturnStatement, this);
      case ts.SyntaxKind.BinaryExpression:
        return visitor.binaryExpression(tree as ts.BinaryExpression, this);
      case ts.SyntaxKind.IfStatement:
        return visitor.ifStatement(tree as ts.IfStatement, this);
      case ts.SyntaxKind.PropertyAccessExpression:
        const submoduleReference = this.submoduleReferences?.get(tree as ts.PropertyAccessExpression);
        return visitor.propertyAccessExpression(tree as ts.PropertyAccessExpression, this, submoduleReference);
      case ts.SyntaxKind.AwaitExpression:
        return visitor.awaitExpression(tree as ts.AwaitExpression, this);
      case ts.SyntaxKind.CallExpression:
        return visitor.callExpression(tree as ts.CallExpression, this);
      case ts.SyntaxKind.ExpressionStatement:
        return visitor.expressionStatement(tree as ts.ExpressionStatement, this);
      case ts.SyntaxKind.ObjectLiteralExpression:
        return visitor.objectLiteralExpression(tree as ts.ObjectLiteralExpression, this);
      case ts.SyntaxKind.NewExpression:
        return visitor.newExpression(tree as ts.NewExpression, this);
      case ts.SyntaxKind.PropertyAssignment:
        return visitor.propertyAssignment(tree as ts.PropertyAssignment, this);
      case ts.SyntaxKind.VariableStatement:
        return visitor.variableStatement(tree as ts.VariableStatement, this);
      case ts.SyntaxKind.VariableDeclarationList:
        return visitor.variableDeclarationList(tree as ts.VariableDeclarationList, this);
      case ts.SyntaxKind.VariableDeclaration:
        return visitor.variableDeclaration(tree as ts.VariableDeclaration, this);
      case ts.SyntaxKind.ArrayLiteralExpression:
        return visitor.arrayLiteralExpression(tree as ts.ArrayLiteralExpression, this);
      case ts.SyntaxKind.ShorthandPropertyAssignment:
        return visitor.shorthandPropertyAssignment(tree as ts.ShorthandPropertyAssignment, this);
      case ts.SyntaxKind.ForOfStatement:
        return visitor.forOfStatement(tree as ts.ForOfStatement, this);
      case ts.SyntaxKind.ClassDeclaration:
        return visitor.classDeclaration(tree as ts.ClassDeclaration, this);
      case ts.SyntaxKind.Constructor:
        return visitor.constructorDeclaration(tree as ts.ConstructorDeclaration, this);
      case ts.SyntaxKind.PropertyDeclaration:
        return visitor.propertyDeclaration(tree as ts.PropertyDeclaration, this);
      case ts.SyntaxKind.ComputedPropertyName:
        return visitor.computedPropertyName((tree as ts.ComputedPropertyName).expression, this);
      case ts.SyntaxKind.MethodDeclaration:
        return visitor.methodDeclaration(tree as ts.MethodDeclaration, this);
      case ts.SyntaxKind.InterfaceDeclaration:
        return visitor.interfaceDeclaration(tree as ts.InterfaceDeclaration, this);
      case ts.SyntaxKind.PropertySignature:
        return visitor.propertySignature(tree as ts.PropertySignature, this);
      case ts.SyntaxKind.MethodSignature:
        return visitor.methodSignature(tree as ts.MethodSignature, this);
      case ts.SyntaxKind.AsExpression:
        return visitor.asExpression(tree as ts.AsExpression, this);
      case ts.SyntaxKind.PrefixUnaryExpression:
        return visitor.prefixUnaryExpression(tree as ts.PrefixUnaryExpression, this);
      case ts.SyntaxKind.SpreadAssignment:
        if (this.textOf(tree) === '...') {
          return visitor.ellipsis(tree as ts.SpreadAssignment, this);
        }
        return visitor.spreadAssignment(tree as ts.SpreadAssignment, this);
      case ts.SyntaxKind.SpreadElement:
        if (this.textOf(tree) === '...') {
          return visitor.ellipsis(tree as ts.SpreadElement, this);
        }
        return visitor.spreadElement(tree as ts.SpreadElement, this);
      case ts.SyntaxKind.ElementAccessExpression:
        return visitor.elementAccessExpression(tree as ts.ElementAccessExpression, this);
      case ts.SyntaxKind.TemplateExpression:
        return visitor.templateExpression(tree as ts.TemplateExpression, this);
      case ts.SyntaxKind.NonNullExpression:
        return visitor.nonNullExpression(tree as ts.NonNullExpression, this);
      case ts.SyntaxKind.ParenthesizedExpression:
        return visitor.parenthesizedExpression(tree as ts.ParenthesizedExpression, this);
      case ts.SyntaxKind.VoidExpression:
        return visitor.maskingVoidExpression(tree as ts.VoidExpression, this);
      case ts.SyntaxKind.JSDocComment:
        return visitor.jsDoc(tree as ts.JSDoc, this);
      default:
        if (ts.isToken(tree)) {
          return visitor.token(tree, this);
        }
        this.reportUnsupported(tree, undefined);
    }

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
  readonly language: TargetLanguage;

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
  propertyAccessExpression(
    node: ts.PropertyAccessExpression,
    context: AstRenderer<C>,
    submoduleReference: SubmoduleReference | undefined,
  ): OTree;
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
