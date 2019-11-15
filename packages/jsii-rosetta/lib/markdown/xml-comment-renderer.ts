import cm = require('commonmark');
import { prefixLines, RendererContext } from './markdown';
import { MarkdownRenderer, collapsePara, para } from './markdown-renderer';

/**
 * A renderer that will render a CommonMark tree to .NET XML comments
 *
 * Mostly concerns itself with code annotations and escaping; tags that the
 * XML formatter doesn't have equivalents for will be rendered back to MarkDown.
 */
export class CSharpXmlCommentRenderer extends MarkdownRenderer {
  public block_quote(_node: cm.Node, context: RendererContext) {
    return para(prefixLines('    ', collapsePara(context.content())));
  }

  public code(node: cm.Node, _context: RendererContext) {
    return '<c>' + escapeAngleBrackets(node.literal) + '</c>';
  }

  public code_block(node: cm.Node, _context: RendererContext) {
    return para(`<code>\n${escapeAngleBrackets(node.literal)}</code>`);
  }

  public text(node: cm.Node, _context: RendererContext) {
    return escapeAngleBrackets(node.literal) || '';
  }

  public link(node: cm.Node, context: RendererContext) {
    return `${context.content()} (${node.destination || ''})`;
  }
}

function escapeAngleBrackets(x: string | null): string {
  return x ? x.replace(/</g, '&lt;').replace(/>/g, '&gt;') : '';
}
