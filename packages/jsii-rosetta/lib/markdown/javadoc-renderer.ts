import * as cm from 'commonmark';
import { RendererContext } from './markdown';
import { MarkdownRenderer, collapsePara, para, stripTrailingWhitespace, stripPara } from './markdown-renderer';

/* eslint-disable @typescript-eslint/camelcase */

/**
 * A renderer that will render a CommonMark tree to JavaDoc comments
 *
 * Mostly concerns itself with code annotations and escaping; tags that the
 * XML formatter doesn't have equivalents for will be rendered back to MarkDown.
 */
export class JavaDocRenderer extends MarkdownRenderer {
  public block_quote(_node: cm.Node, context: RendererContext) {
    return `<blockquote>${context.content()}</blockquote>`;
  }

  public code(node: cm.Node, _context: RendererContext) {
    return `<code>${escapeAngleBrackets(node.literal)}</code>`;
  }

  /* eslint-disable-next-line @typescript-eslint/camelcase */
  public code_block(node: cm.Node, _context: RendererContext) {
    return para(`<blockquote><pre>{@code\n${node.literal}}</pre></blockquote>`);
  }

  public text(node: cm.Node, _context: RendererContext) {
    return escapeAngleBrackets(node.literal) || '';
  }

  public link(node: cm.Node, context: RendererContext) {
    return `<a href="${node.destination || ''}">${context.content()}</a>`;
  }

  public document(_node: cm.Node, context: RendererContext) {
    return stripTrailingWhitespace(collapseParaJava(context.content()));
  }

  public heading(node: cm.Node, context: RendererContext) {
    return para(`<h${node.level}>${context.content()}</h${node.level}>`);
  }

  public list(node: cm.Node, context: RendererContext) {
    const tag = node.listType === 'bullet' ? 'ul': 'ol';

    return para(`<${tag}>\n${context.content()}</${tag}>`);
  }

  public item(_node: cm.Node, context: RendererContext) {
    return `<li>${stripPara(context.content())}</li>\n`;
  }

  public image(node: cm.Node, context: RendererContext) {
    return `<img alt="${context.content()}" src="${node.destination || ''}">`;
  }

  public emph(_node: cm.Node, context: RendererContext) {
    return `<em>${context.content()}</em>`;
  }

  public strong(_node: cm.Node, context: RendererContext) {
    return `<strong>${context.content()}</strong>`;
  }

  /* eslint-disable-next-line @typescript-eslint/camelcase */
  public thematic_break(_node: cm.Node, _context: RendererContext) {
    return para('<hr>');
  }
}

function escapeAngleBrackets(x: string | null): string {
  return x ? x.replace(/</g, '&lt;').replace(/>/g, '&gt;') : '';
}

function collapseParaJava(x: string) {
  return collapsePara(x, '\n<p>\n');
}
