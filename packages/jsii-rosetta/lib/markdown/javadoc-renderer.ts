import * as cm from 'commonmark';

import { makeJavaEscaper } from './escapes';
import { RendererContext } from './markdown';
import { MarkdownRenderer, collapsePara, para, stripTrailingWhitespace, stripPara } from './markdown-renderer';

const ESCAPE = makeJavaEscaper();

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
    return `<code>${ESCAPE.text(node.literal)}</code>`;
  }

  /**
   * Render code blocks for JavaDoc
   *
   * See https://reflectoring.io/howto-format-code-snippets-in-javadoc/
   *
   * Since we need to display @ inside our examples and we don't have to
   * care about writability, the most robust option seems to be <pre>
   * tags with escaping of bad characters.
   */
  public code_block(node: cm.Node, _context: RendererContext) {
    return para(`<blockquote><pre>\n${ESCAPE.text(node.literal)}</pre></blockquote>`);
  }

  public text(node: cm.Node, _context: RendererContext) {
    return ESCAPE.text(node.literal) ?? '';
  }

  public link(node: cm.Node, context: RendererContext) {
    return `<a href="${ESCAPE.attribute(node.destination) ?? ''}">${context.content()}</a>`;
  }

  public document(_node: cm.Node, context: RendererContext) {
    return stripTrailingWhitespace(collapseParaJava(context.content()));
  }

  public heading(node: cm.Node, context: RendererContext) {
    return para(`<h${node.level}>${context.content()}</h${node.level}>`);
  }

  public list(node: cm.Node, context: RendererContext) {
    const tag = node.listType === 'bullet' ? 'ul' : 'ol';

    return para(`<${tag}>\n${context.content()}</${tag}>`);
  }

  public item(_node: cm.Node, context: RendererContext) {
    return `<li>${stripPara(context.content())}</li>\n`;
  }

  public image(node: cm.Node, context: RendererContext) {
    return `<img alt="${ESCAPE.text2attr(context.content())}" src="${ESCAPE.attribute(node.destination) ?? ''}">`;
  }

  public emph(_node: cm.Node, context: RendererContext) {
    return `<em>${context.content()}</em>`;
  }

  public strong(_node: cm.Node, context: RendererContext) {
    return `<strong>${context.content()}</strong>`;
  }

  public thematic_break(_node: cm.Node, _context: RendererContext) {
    return para('<hr>');
  }
}

function collapseParaJava(x: string) {
  return collapsePara(x, '\n<p>\n');
}
