import cm = require('commonmark');
import { CommonMarkRenderer, prefixLines, RendererContext } from './markdown';

/**
 * A renderer that will render a CommonMark tree to show its structure
 */
export class StructureRenderer implements CommonMarkRenderer {
  public block_quote(node: cm.Node, context: RendererContext) { return this.handle('block_quote', node, context); }
  public code(node: cm.Node, context: RendererContext) { return this.handle('code', node, context); }
  public code_block(node: cm.Node, context: RendererContext) { return this.handle('code_block', node, context); }
  public text(node: cm.Node, context: RendererContext) { return this.handle('text', node, context); }
  public softbreak(node: cm.Node, context: RendererContext) { return this.handle('softbreak', node, context); }
  public linebreak(node: cm.Node, context: RendererContext) { return this.handle('linebreak', node, context); }
  public emph(node: cm.Node, context: RendererContext) { return this.handle('emph', node, context); }
  public strong(node: cm.Node, context: RendererContext) { return this.handle('strong', node, context); }
  public html_inline(node: cm.Node, context: RendererContext) { return this.handle('html_inline', node, context); }
  public html_block(node: cm.Node, context: RendererContext) { return this.handle('html_block', node, context); }
  public link(node: cm.Node, context: RendererContext) { return this.handle('link', node, context); }
  public image(node: cm.Node, context: RendererContext) { return this.handle('image', node, context); }
  public document(node: cm.Node, context: RendererContext) { return this.handle('document', node, context); }
  public paragraph(node: cm.Node, context: RendererContext) { return this.handle('paragraph', node, context); }
  public list(node: cm.Node, context: RendererContext) { return this.handle('list', node, context); }
  public item(node: cm.Node, context: RendererContext) { return this.handle('item', node, context); }
  public heading(node: cm.Node, context: RendererContext) { return this.handle('heading', node, context); }
  public thematic_break(node: cm.Node, context: RendererContext) { return this.handle('thematic_break', node, context); }
  public custom_block(node: cm.Node, context: RendererContext) { return this.handle('custom_block', node, context); }
  public custom_inline(node: cm.Node, context: RendererContext) { return this.handle('custom_inline', node, context); }

  private handle(name: string, node: cm.Node, context: RendererContext) {
    const contents = context.content();

    const enterText = [name, inspectNode(node)].filter(x => x).join(' ');

    if (contents) {
      return `(${enterText}\n${prefixLines('  ', contents)})\n`;
    } else {
      return `(${enterText})\n`;
    }
  }
}

function inspectNode(n: cm.Node): string {
  const INTERESTING_KEYS = [
    'literal', 'destination', 'title', 'info', 'level', 'listType', 'listTight', 'listStart', 'listDelimiter',
  ];
  const ret: any = {};
  // tslint:disable-next-line:forin
  for (const key of INTERESTING_KEYS) {
    const value = (n as any)[key];
    if (typeof value === 'string' || typeof value === 'number') {
      ret[key] = value;
    }
  }
  return JSON.stringify(ret);
}