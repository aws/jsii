import * as ts from 'typescript';

import { Span } from '../o-tree';
import { AstRenderer } from '../renderer';

export interface MarkedSpan {
  start: number;
  end: number;
  visible: boolean;
}

export function calculateVisibleSpans(source: string): Span[] {
  return calculateMarkedSpans(source).filter((s) => s.visible);
}

export function calculateMarkedSpans(source: string): MarkedSpan[] {
  const regEx = /\/\/\/ (.*)(\r?\n)?$/gm;

  const ret = new Array<MarkedSpan>();
  let match;
  let spanStart;
  let visible = true;
  while ((match = regEx.exec(source)) != null) {
    const directiveStart = match.index;
    const directive = match[1].trim();
    if (['!hide', '!show'].includes(directive)) {
      const isShow = directive === '!show';
      if (spanStart === undefined) {
        // Add a span at the start which is the reverse of the actual first directive
        ret.push({ start: 0, end: directiveStart, visible: !isShow });
      } else {
        // Else add a span for the current directive
        ret.push({ start: spanStart, end: directiveStart, visible });
      }
      visible = isShow;
      spanStart = match.index + match[0].length;
    }
  }

  // Add the remainder under the last visibility
  ret.push({ start: spanStart || 0, end: source.length, visible });

  // Filter empty spans and return
  return ret.filter((s) => s.start !== s.end);
}

export function stripCommentMarkers(comment: string, multiline: boolean) {
  if (multiline) {
    // The text *must* start with '/*' and end with '*/'.
    // Strip leading '*' from every remaining line (first line because of '**',
    // other lines because of continuations.
    return comment
      .substring(2, comment.length - 2)
      .replace(/^[ \t]+/g, '') // Strip all leading whitepace
      .replace(/[ \t]+$/g, '') // Strip all trailing whitepace
      .replace(/^[ \t]*\*[ \t]?/gm, ''); // Strip "* " from start of line
  }
  // The text *must* start with '//'
  return comment.replace(/^\/\/[ \t]?/gm, '');
}

export function stringFromLiteral(expr: ts.Expression) {
  if (ts.isStringLiteral(expr)) {
    return expr.text;
  }
  return '???';
}

/**
 * All types of nodes that can be captured using `nodeOfType`, and the type of Node they map to
 */
export type CapturableNodes = {
  [ts.SyntaxKind.ImportDeclaration]: ts.ImportDeclaration;
  [ts.SyntaxKind.VariableDeclaration]: ts.VariableDeclaration;
  [ts.SyntaxKind.ExternalModuleReference]: ts.ExternalModuleReference;
  [ts.SyntaxKind.NamespaceImport]: ts.NamespaceImport;
  [ts.SyntaxKind.NamedImports]: ts.NamedImports;
  [ts.SyntaxKind.ImportSpecifier]: ts.ImportSpecifier;
  [ts.SyntaxKind.StringLiteral]: ts.StringLiteral;
};

export type AstMatcher<A> = (nodes?: ts.Node[]) => A | undefined;

/**
 * Return AST children of the given node
 *
 * Difference with node.getChildren():
 *
 * - node.getChildren() must take a SourceFile (will fail if it doesn't get it)
 *   and returns a mix of abstract and concrete syntax nodes.
 * - This function function will ONLY return abstract syntax nodes.
 */
export function nodeChildren(node: ts.Node): ts.Node[] {
  const ret = new Array<ts.Node>();
  node.forEachChild((n) => {
    ret.push(n);
  });
  return ret;
}

/**
 * Match a single node of a given type
 *
 * Capture name is first so that the IDE can detect eagerly that we're falling into
 * that overload and properly autocomplete the recognized node types from CapturableNodes.
 *
 * Looks like SyntaxList nodes appear in the printed AST, but they don't actually appear
 */
export function nodeOfType<A>(
  syntaxKind: ts.SyntaxKind,
  children?: AstMatcher<A>,
): AstMatcher<A>;
// eslint-disable-next-line max-len
export function nodeOfType<
  S extends keyof CapturableNodes,
  N extends string,
  A
>(
  capture: N,
  capturableNodeType: S,
  children?: AstMatcher<A>,
): AstMatcher<Omit<A, N> & { [key in N]: CapturableNodes[S] }>;
// eslint-disable-next-line max-len
export function nodeOfType<
  S extends keyof CapturableNodes,
  N extends string,
  A
>(
  syntaxKindOrCaptureName: ts.SyntaxKind | N,
  nodeTypeOrChildren?: S | AstMatcher<A>,
  children?: AstMatcher<A>,
): AstMatcher<A> | AstMatcher<A & { [key in N]: CapturableNodes[S] }> {
  const capturing = typeof syntaxKindOrCaptureName === 'string'; // Determine which overload we're in (SyntaxKind is a number)

  const realNext =
    (capturing ? children : (nodeTypeOrChildren as AstMatcher<A>)) || DONE;
  const realCapture = capturing ? (syntaxKindOrCaptureName as N) : undefined;
  const realSyntaxKind = capturing
    ? nodeTypeOrChildren
    : syntaxKindOrCaptureName;

  return (nodes) => {
    for (const node of nodes ?? []) {
      if (node.kind === realSyntaxKind) {
        const ret = realNext(nodeChildren(node));
        if (!ret) {
          continue;
        }

        if (realCapture) {
          return Object.assign(ret, {
            [realCapture]: node as CapturableNodes[S],
          }) as any;
        }
        return ret;
      }
    }
    return undefined;
  };
}

export function anyNode(): AstMatcher<Record<string, unknown>>;
export function anyNode<A>(children: AstMatcher<A>): AstMatcher<A>;
export function anyNode<A>(
  children?: AstMatcher<A>,
): AstMatcher<A> | AstMatcher<any> {
  const realNext = children || DONE;
  return (nodes) => {
    for (const node of nodes ?? []) {
      const m = realNext(nodeChildren(node));
      if (m) {
        return m;
      }
    }
    return undefined;
  };
}

// Does not capture deeper because how would we even represent that?
export function allOfType<S extends keyof CapturableNodes, N extends string, A>(
  s: S,
  name: N,
  children?: AstMatcher<A>,
): AstMatcher<{ [key in N]: Array<CapturableNodes[S]> }> {
  type ArrayType = Array<CapturableNodes[S]>;
  type ReturnType = { [key in N]: ArrayType };
  const realNext = children || DONE;

  return (nodes) => {
    let ret: ReturnType | undefined;
    for (const node of nodes ?? []) {
      if (node.kind === s) {
        if (realNext(nodeChildren(node))) {
          if (!ret) {
            ret = { [name]: new Array<CapturableNodes[S]>() } as ReturnType;
          }
          ret[name].push(node as any);
        }
      }
    }
    return ret;
  };
}

export const DONE: AstMatcher<Record<string, unknown>> = () => ({});

/**
 * Run a matcher against a node and return (or invoke a callback with) the accumulated bindings
 */
export function matchAst<A>(
  node: ts.Node,
  matcher: AstMatcher<A>,
): A | undefined;
export function matchAst<A>(
  node: ts.Node,
  matcher: AstMatcher<A>,
  cb: (bindings: A) => void,
): boolean;
export function matchAst<A>(
  node: ts.Node,
  matcher: AstMatcher<A>,
  cb?: (bindings: A) => void,
): boolean | A | undefined {
  const matched = matcher([node]);
  if (cb) {
    if (matched) {
      cb(matched);
    }
    return !!matched;
  }
  return matched;
}

/**
 * Count the newlines in a given piece of string that aren't in comment blocks
 */
export function countNakedNewlines(str: string) {
  let ret = 0;
  scanText(str, 0, str.length)
    .filter((s) => s.type === 'other' || s.type === 'blockcomment')
    .forEach((s) => {
      if (s.type === 'other') {
        // Count newlines in non-comments
        for (let i = s.pos; i < s.end; i++) {
          if (str[i] === '\n') {
            ret++;
          }
        }
      } else {
        // Discount newlines at the end of block comments
        if (s.hasTrailingNewLine) {
          ret--;
        }
      }
    });
  return ret;
}

export function repeatNewlines(str: string) {
  return '\n'.repeat(Math.min(2, countNakedNewlines(str)));
}

const WHITESPACE = [' ', '\t', '\r', '\n'];

/**
 * Extract single-line and multi-line comments from the given string
 *
 * Rewritten because I can't get ts.getLeadingComments and ts.getTrailingComments to do what I want.
 */
export function extractComments(
  text: string,
  start: number,
): ts.CommentRange[] {
  return scanText(text, start)
    .filter((s) => s.type === 'blockcomment' || s.type === 'linecomment')
    .map(commentRangeFromTextRange);
}

export function commentRangeFromTextRange(rng: TextRange): ts.CommentRange {
  return {
    kind:
      rng.type === 'blockcomment'
        ? ts.SyntaxKind.MultiLineCommentTrivia
        : ts.SyntaxKind.SingleLineCommentTrivia,
    pos: rng.pos,
    end: rng.end,
    hasTrailingNewLine: rng.type !== 'blockcomment' && rng.hasTrailingNewLine,
  };
}

interface TextRange {
  pos: number;
  end: number;
  type: 'linecomment' | 'blockcomment' | 'other' | 'directive';
  hasTrailingNewLine: boolean;
}

/**
 * Extract spans of comments and non-comments out of the string
 *
 * Stop at 'end' when given, or the first non-whitespace character in a
 * non-comment if not given.
 */
export function scanText(
  text: string,
  start: number,
  end?: number,
): TextRange[] {
  const ret: TextRange[] = [];

  let pos = start;
  const stopAtCode = end === undefined;
  if (end === undefined) {
    end = text.length;
  }
  while (pos < end) {
    const ch = text[pos];

    if (WHITESPACE.includes(ch)) {
      pos++;
      continue;
    }

    if (ch === '/' && text[pos + 1] === '/') {
      accumulateTextBlock();
      scanSinglelineComment();
      continue;
    }

    if (ch === '/' && text[pos + 1] === '*') {
      accumulateTextBlock();
      scanMultilineComment();
      continue;
    }

    // Non-whitespace, non-comment, must be regular token. End if we're not scanning
    // to a particular location, otherwise continue.
    if (stopAtCode) {
      break;
    }

    pos++;
  }

  accumulateTextBlock();

  return ret;

  function scanMultilineComment() {
    const endOfComment = findNext('*/', pos + 2);
    ret.push({
      type: 'blockcomment',
      hasTrailingNewLine: ['\n', '\r'].includes(text[endOfComment + 2]),
      pos,
      end: endOfComment + 2,
    });
    pos = endOfComment + 2;
    start = pos;
  }

  function scanSinglelineComment() {
    const nl = Math.min(findNext('\r', pos + 2), findNext('\n', pos + 2));

    if (text[pos + 2] === '/') {
      // Special /// comment
      ret.push({
        type: 'directive',
        hasTrailingNewLine: true,
        pos: pos + 1,
        end: nl,
      });
    } else {
      // Regular // comment
      ret.push({
        type: 'linecomment',
        hasTrailingNewLine: true,
        pos,
        end: nl,
      });
    }
    pos = nl + 1;
    start = pos;
  }

  function accumulateTextBlock() {
    if (pos - start > 0) {
      ret.push({
        type: 'other',
        hasTrailingNewLine: false,
        pos: start,
        end: pos,
      });
      start = pos;
    }
  }

  function findNext(sub: string, startPos: number) {
    const f = text.indexOf(sub, startPos);
    if (f === -1) {
      return text.length;
    }
    return f;
  }
}

const VOID_SHOW_KEYWORD = 'show';

export function extractMaskingVoidExpression(
  node: ts.Node,
): ts.VoidExpression | undefined {
  const expr = extractVoidExpression(node);
  if (!expr) {
    return undefined;
  }
  if (
    ts.isStringLiteral(expr.expression) &&
    expr.expression.text === VOID_SHOW_KEYWORD
  ) {
    return undefined;
  }
  return expr;
}

export function extractShowingVoidExpression(
  node: ts.Node,
): ts.VoidExpression | undefined {
  const expr = extractVoidExpression(node);
  if (!expr) {
    return undefined;
  }
  if (
    ts.isStringLiteral(expr.expression) &&
    expr.expression.text === VOID_SHOW_KEYWORD
  ) {
    return expr;
  }
  return undefined;
}

/**
 * Return the string argument to a void expression if it exists
 */
export function voidExpressionString(
  node: ts.VoidExpression,
): string | undefined {
  if (ts.isStringLiteral(node.expression)) {
    return node.expression.text;
  }
  return undefined;
}

/**
 * We use void directives as pragmas. Extract the void directives here
 */
export function extractVoidExpression(
  node: ts.Node,
): ts.VoidExpression | undefined {
  if (ts.isVoidExpression(node)) {
    return node;
  }
  if (ts.isExpressionStatement(node)) {
    return extractVoidExpression(node.expression);
  }
  if (ts.isParenthesizedExpression(node)) {
    return extractVoidExpression(node.expression);
  }
  if (
    ts.isBinaryExpression(node) &&
    node.operatorToken.kind === ts.SyntaxKind.CommaToken
  ) {
    return extractVoidExpression(node.left);
  }
  return undefined;
}

export function quoteStringLiteral(x: string) {
  return x.replace(/\\/g, '\\\\').replace(/"/g, '\\"');
}

export function visibility(
  x: ts.PropertyLikeDeclaration | ts.FunctionLikeDeclarationBase,
) {
  const flags = ts.getCombinedModifierFlags(x);
  if (flags & ts.ModifierFlags.Private) {
    return 'private';
  }
  if (flags & ts.ModifierFlags.Protected) {
    return 'protected';
  }
  return 'public';
}

export function isReadOnly(
  x: ts.PropertyLikeDeclaration | ts.FunctionLikeDeclarationBase,
) {
  const flags = ts.getCombinedModifierFlags(x);
  return (flags & ts.ModifierFlags.Readonly) !== 0;
}

/**
 * Return the super() call from a method body if found
 */
export function findSuperCall(
  node: ts.Block | ts.Expression | undefined,
  renderer: AstRenderer<any>,
): ts.SuperCall | undefined {
  if (node === undefined) {
    return undefined;
  }
  if (ts.isCallExpression(node)) {
    if (renderer.textOf(node.expression) === 'super') {
      return (node as unknown) as ts.SuperCall;
    }
  }
  if (ts.isExpressionStatement(node)) {
    return findSuperCall(node.expression, renderer);
  }
  if (ts.isBlock(node)) {
    for (const statement of node.statements) {
      if (ts.isExpressionStatement(statement)) {
        const s = findSuperCall(statement.expression, renderer);
        if (s) {
          return s;
        }
      }
    }
  }
  return undefined;
}

/**
 * Return the names of all private property declarations
 */
export function privatePropertyNames(
  members: readonly ts.ClassElement[],
  renderer: AstRenderer<any>,
): string[] {
  const props = members.filter((m) =>
    ts.isPropertyDeclaration(m),
  ) as ts.PropertyDeclaration[];
  return props
    .filter((m) => visibility(m) === 'private')
    .map((m) => renderer.textOf(m.name));
}
