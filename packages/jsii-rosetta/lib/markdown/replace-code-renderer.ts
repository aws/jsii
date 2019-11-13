import cm = require('commonmark');
import { CommonMarkVisitor } from './markdown';

export type CodeReplacer = (code: CodeBlock) => CodeBlock;

export interface CodeBlock {
  source: string;
  language: string;
}

/**
 * Renderer that replaces code blocks in a MarkDown document
 */
export class ReplaceCodeTransform implements CommonMarkVisitor {
  constructor(private readonly replacer: CodeReplacer) {
  }

  public code_block(node: cm.Node) {
    const ret = this.replacer({ language: node.info || '', source: node.literal || '' });
    node.info = ret.language;
    node.literal = ret.source + (!ret.source || ret.source.endsWith('\n') ? '' : '\n');
  }

  public block_quote(): void { /* nothing */ }
  public code(): void { /* nothing */ }
  public text(): void { /* nothing */ }
  public softbreak(): void { /* nothing */ }
  public linebreak(): void { /* nothing */ }
  public emph(): void { /* nothing */ }
  public strong(): void { /* nothing */ }
  public html_inline(): void { /* nothing */ }
  public html_block(): void { /* nothing */ }
  public link(): void { /* nothing */ }
  public image(): void { /* nothing */ }
  public document(): void { /* nothing */ }
  public paragraph(): void { /* nothing */ }
  public list(): void { /* nothing */ }
  public item(): void { /* nothing */ }
  public heading(): void { /* nothing */ }
  public thematic_break(): void { /* nothing */ }
  public custom_block(): void { /* nothing */ }
  public custom_inline(): void { /* nothing */ }
}