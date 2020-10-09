import * as cm from 'commonmark';

import {
  cmNodeChildren,
  CommonMarkRenderer,
  prefixLines,
  RendererContext,
} from './markdown';

/**
 * A renderer that will render a CommonMark tree back to MarkDown
 */
export class MarkdownRenderer implements CommonMarkRenderer {
  public block_quote(_node: cm.Node, context: RendererContext) {
    return para(prefixLines('> ', collapsePara(context.content())));
  }

  public code(node: cm.Node, _context: RendererContext) {
    return `\`${node.literal}\``;
  }

  public code_block(node: cm.Node, _context: RendererContext) {
    return para(`\`\`\`${node.info ?? ''}\n${node.literal}\`\`\``);
  }

  public text(node: cm.Node, _context: RendererContext) {
    return node.literal ?? '';
  }

  public softbreak(_node: cm.Node, _context: RendererContext) {
    return '\n';
  }

  public linebreak(_node: cm.Node, _context: RendererContext) {
    return '\\\n';
  }

  public emph(_node: cm.Node, context: RendererContext) {
    return `*${context.content()}*`;
  }

  public strong(_node: cm.Node, context: RendererContext) {
    return `**${context.content()}**`;
  }

  public html_inline(node: cm.Node, _context: RendererContext) {
    return node.literal ?? '';
  }

  public html_block(node: cm.Node, _context: RendererContext) {
    return node.literal ?? '';
  }

  public link(node: cm.Node, context: RendererContext) {
    return `[${context.content()}](${node.destination ?? ''})`;
  }

  public image(node: cm.Node, context: RendererContext) {
    return `![${context.content()}](${node.destination ?? ''})`;
  }

  public document(_node: cm.Node, context: RendererContext) {
    return stripTrailingWhitespace(collapsePara(context.content()));
  }

  public paragraph(_node: cm.Node, context: RendererContext) {
    return para(context.content());
  }

  public list(node: cm.Node, context: RendererContext) {
    // A list is not wrapped in a paragraph, but items may contain paragraphs.
    // All elements of a list are definitely 'item's.
    const items = [];

    let i = 1;
    for (const item of cmNodeChildren(node)) {
      const firstLinePrefix = determineItemPrefix(node, i);
      const hangingPrefix = ' '.repeat(firstLinePrefix.length);

      const rendered = context.recurse(item);
      // Prefix the first line with a different text than subsequent lines
      const prefixed =
        firstLinePrefix +
        prefixLines(hangingPrefix, rendered).substr(hangingPrefix.length);

      items.push(prefixed);

      i += 1;
    }

    return para(items.join('\n'));
  }

  public item(_node: cm.Node, context: RendererContext) {
    return collapsePara(context.content());
  }

  public heading(node: cm.Node, context: RendererContext) {
    return para(`${'#'.repeat(node.level)} ${context.content()}`);
  }

  public thematic_break(_node: cm.Node, _context: RendererContext) {
    return '---\n';
  }

  public custom_block(_node: cm.Node, context: RendererContext) {
    return `<custom>${context.content()}</custom>`;
  }

  public custom_inline(_node: cm.Node, context: RendererContext) {
    return `<custom>${context.content()}</custom>`;
  }
}

const PARA_BREAK = '\u001d';

export function para(x: string) {
  return `${PARA_BREAK}${x}${PARA_BREAK}`;
}

/**
 * Collapse paragraph markers
 */
export function collapsePara(x: string, brk = '\n\n') {
  /* eslint-disable no-control-regex */
  return x
    .replace(/^\u001d+/, '')
    .replace(/\u001d+$/, '')
    .replace(/\u001d+/g, brk);
  /* eslint-enable no-control-regex */
}

/**
 * Strip paragraph markers from start and end
 */
export function stripPara(x: string) {
  /* eslint-disable-next-line no-control-regex */
  return x.replace(/^\u001d+/, '').replace(/\u001d+$/, '');
}

function determineItemPrefix(listNode: cm.Node, index: number) {
  if (listNode.listType === 'bullet') {
    return '* ';
  }
  return `${index}${listNode.listDelimiter} `;
}

export function stripTrailingWhitespace(x: string) {
  return x.replace(/[ \t]+$/gm, '');
}
