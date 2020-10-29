import * as cm from 'commonmark';

import { makeXmlEscaper } from './escapes';
import { prefixLines, RendererContext } from './markdown';
import { MarkdownRenderer, para, stripPara } from './markdown-renderer';

const ESCAPE = makeXmlEscaper();

// The types for 'xmldom' are not complete.
/* eslint-disable-next-line @typescript-eslint/no-var-requires,@typescript-eslint/no-require-imports */
const { DOMParser, XMLSerializer } = require('xmldom');

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
    return `<c>${ESCAPE.text(node.literal)}</c>`;
  }

  public code_block(node: cm.Node, _context: RendererContext) {
    return para(`<code><![CDATA[\n${node.literal}]]></code>`);
  }

  public text(node: cm.Node, _context: RendererContext) {
    return ESCAPE.text(node.literal) ?? '';
  }

  public link(node: cm.Node, context: RendererContext) {
    return `<a href="${
      ESCAPE.attribute(node.destination) ?? ''
    }">${context.content()}</a>`;
  }

  public image(node: cm.Node, context: RendererContext) {
    return `<img alt="${ESCAPE.text2attr(context.content())}" src="${
      ESCAPE.attribute(node.destination) ?? ''
    }" />`;
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

  public thematic_break(_node: cm.Node, _context: RendererContext) {
    return para('<hr />');
  }

  /**
   * HTML needs to be converted to XML
   *
   * If we don't do this, the parser will reject the whole XML block once it seens an unclosed
   * <img> tag.
   */
  public html_inline(node: cm.Node, _context: RendererContext) {
    const html = node.literal ?? '';
    const doc = new DOMParser().parseFromString(html, 'text/html');
    return new XMLSerializer().serializeToString(doc);
  }

  /**
   * HTML needs to be converted to XML
   *
   * If we don't do this, the parser will reject the whole XML block once it seens an unclosed
   * <img> tag.
   */
  public html_block(node: cm.Node, _context: RendererContext) {
    const html = node.literal ?? '';
    const doc = new DOMParser().parseFromString(html, 'text/html');
    return new XMLSerializer().serializeToString(doc);
  }
}
