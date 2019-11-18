import cm = require('commonmark');
import { prefixLines, RendererContext } from './markdown';
import { MarkdownRenderer, para, stripPara } from './markdown-renderer';

/**
 * A renderer that will render a CommonMark tree to .NET XML comments
 *
 * Mostly concerns itself with code annotations and escaping; tags that the
 * XML formatter doesn't have equivalents for will be rendered back to MarkDown.
 */
export class CSharpXmlCommentRenderer extends MarkdownRenderer {
  public block_quote(_node: cm.Node, context: RendererContext) {
    return para(prefixLines('    ', stripPara(context.content())));
  }

  public code(node: cm.Node, _context: RendererContext) {
    return '<c>' + escapeAngleBrackets(node.literal) + '</c>';
  }

  public code_block(node: cm.Node, _context: RendererContext) {
    return para(`<code><![CDATA[\n${node.literal}]]></code>`);
  }

  public text(node: cm.Node, _context: RendererContext) {
    return escapeAngleBrackets(node.literal) || '';
  }

  public link(node: cm.Node, context: RendererContext) {
    return `${context.content()} (${node.destination || ''})`;
  }

  public emph(_node: cm.Node, context: RendererContext) {
    return `<em>${context.content()}</em>`;
  }

  public strong(_node: cm.Node, context: RendererContext) {
    return `<strong>${context.content()}</strong>`;
  }

  public heading(node: cm.Node, context: RendererContext) {
    return para(`<h${node.level}>${context.content()}</h${node.level}>`);
  }

  public list(node: cm.Node, context: RendererContext) {
    const listType = node.listType === 'bullet' ? 'bullet' : 'number';

    return para(`<list type="${listType}">\n${context.content()}</list>`);
  }

  public item(_node: cm.Node, context: RendererContext) {
    return `<description>${stripPara(context.content())}</description>\n`;
  }

  public image(node: cm.Node, context: RendererContext) {
    return `<img alt="${context.content()}" src="${node.destination || ''}">`;
  }
}

function escapeAngleBrackets(x: string | null): string {
  return x ? x.replace(/</g, '&lt;').replace(/>/g, '&gt;') : '';
}
