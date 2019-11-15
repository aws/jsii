import cm = require('commonmark');
import { prefixLines, RendererContext } from './markdown';
import { MarkdownRenderer, collapsePara, para } from './markdown-renderer';

/**
 * A renderer that will render a CommonMark tree to JavaDoc comments
 *
 * Mostly concerns itself with code annotations and escaping; tags that the
 * XML formatter doesn't have equivalents for will be rendered back to MarkDown.
 */
export class JavaDocRenderer extends MarkdownRenderer {
  public block_quote(_node: cm.Node, context: RendererContext) {
    return para(prefixLines('    ', collapsePara(context.content())));
  }

  public code(node: cm.Node, _context: RendererContext) {
    return '<code>' + escapeAngleBrackets(node.literal) + '</code>';
  }

  public code_block(node: cm.Node, _context: RendererContext) {
    return para(`<blockquote><pre>{@code\n${node.literal}}</pre></blockquote>`);
  }

  public text(node: cm.Node, _context: RendererContext) {
    return escapeAngleBrackets(node.literal) || '';
  }

  public link(node: cm.Node, context: RendererContext) {
    return `${context.content()} {@link ${node.destination || ''}}`;
  }

  public document(_node: cm.Node, context: RendererContext) {
    // Remove trailing whitespace on every line, then replace empty lines with <p>
    return collapsePara(context.content()).replace(/[ \t]+$/gm, '').replace(/\n\n+/g, '\n<p>\n');
  }

  public heading(node: cm.Node, context: RendererContext) {
    return para(`<h${node.level}>${context.content()}</h${node.level}>`);
  }

  public list(node: cm.Node, context: RendererContext) {
    const tag = node.listType === 'bullet' ? 'ul': 'ol';

    return para(`<${tag}>\n${context.content()}\n</${tag}>`);
  }

  public item(_node: cm.Node, context: RendererContext) {
    return collapsePara(`<li>${collapsePara(context.content())}</li>\n`);
  }
}

function escapeAngleBrackets(x: string | null): string {
  return x ? x.replace(/</g, '&lt;').replace(/>/g, '&gt;') : '';
}

