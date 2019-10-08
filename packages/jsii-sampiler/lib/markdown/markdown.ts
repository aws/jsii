import cm = require('commonmark');

export function transformMarkdown(source: string, renderer: CommonMarkRenderer, transform?: CommonMarkVisitor) {
  const parser = new cm.Parser();
  const doc = parser.parse(source);
  if (transform) {
    visitCommonMarkTree(doc, transform);
  }
  return renderCommonMarkTree(doc, renderer);
}

export interface RendererContext {
  recurse(node: cm.Node): string;
  children(): string[];
  content(): string;
}

export interface CommonMarkRenderer {
  block_quote(node: cm.Node, context: RendererContext): string;
  code(node: cm.Node, context: RendererContext): string;
  code_block(node: cm.Node, context: RendererContext): string;
  text(node: cm.Node, context: RendererContext): string;
  softbreak(node: cm.Node, context: RendererContext): string;
  linebreak(node: cm.Node, context: RendererContext): string;
  emph(node: cm.Node, context: RendererContext): string;
  strong(node: cm.Node, context: RendererContext): string;
  html_inline(node: cm.Node, context: RendererContext): string;
  html_block(node: cm.Node, context: RendererContext): string;
  link(node: cm.Node, context: RendererContext): string;
  image(node: cm.Node, context: RendererContext): string;
  document(node: cm.Node, context: RendererContext): string;
  paragraph(node: cm.Node, context: RendererContext): string;
  list(node: cm.Node, context: RendererContext): string;
  item(node: cm.Node, context: RendererContext): string;
  heading(node: cm.Node, context: RendererContext): string;
  thematic_break(node: cm.Node, context: RendererContext): string;
  custom_block(node: cm.Node, context: RendererContext): string;
  custom_inline(node: cm.Node, context: RendererContext): string;
}

export function renderCommonMarkTree(node: cm.Node, renderer: CommonMarkRenderer) {
  const context: RendererContext = {
    recurse(n: cm.Node): string {
      return renderCommonMarkTree(n, renderer);
    },

    content() {
      return this.children().join('');
    },

    children() {
      const parts = [];
      for (const child of cmNodeChildren(node)) {
        parts.push(renderCommonMarkTree(child, renderer));
      }
      return parts;
    }
  };

  return renderer[node.type].call(renderer, node, context);
}

export function visitCommonMarkTree(node: cm.Node, visitor: CommonMarkVisitor) {
  visitor[node.type].call(visitor, node);
  for (const child of cmNodeChildren(node)) {
    visitCommonMarkTree(child, visitor);
  }
}

export function prefixLines(prefix: string, x: string) {
  return x.split('\n').map(l => prefix + l).join('\n');
}

export function* cmNodeChildren(node: cm.Node): IterableIterator<cm.Node> {
  for (let child = node.firstChild; child !== null; child = child.next) {
    yield child;
  }
}

export interface CommonMarkVisitor {
  block_quote(node: cm.Node): void;
  code(node: cm.Node): void;
  code_block(node: cm.Node): void;
  text(node: cm.Node): void;
  softbreak(node: cm.Node): void;
  linebreak(node: cm.Node): void;
  emph(node: cm.Node): void;
  strong(node: cm.Node): void;
  html_inline(node: cm.Node): void;
  html_block(node: cm.Node): void;
  link(node: cm.Node): void;
  image(node: cm.Node): void;
  document(node: cm.Node): void;
  paragraph(node: cm.Node): void;
  list(node: cm.Node): void;
  item(node: cm.Node): void;
  heading(node: cm.Node): void;
  thematic_break(node: cm.Node): void;
  custom_block(node: cm.Node): void;
  custom_inline(node: cm.Node): void;
}
