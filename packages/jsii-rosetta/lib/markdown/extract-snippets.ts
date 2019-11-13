import cm = require('commonmark');
import { visitCommonMarkTree } from '../markdown/markdown';
import { CodeBlock } from '../markdown/replace-code-renderer';
import { TypeScriptSnippet } from '../snippet';
import { ReplaceTypeScriptTransform } from './replace-typescript-transform';

export type TypeScriptReplacer = (code: TypeScriptSnippet) => CodeBlock | undefined;

export function extractTypescriptSnippetsFromMarkdown(markdown: string, wherePrefix: string): TypeScriptSnippet[] {
  const parser = new cm.Parser();
  const doc = parser.parse(markdown);

  const ret: TypeScriptSnippet[] = [];

  visitCommonMarkTree(doc, new ReplaceTypeScriptTransform(wherePrefix, (ts) => {
    ret.push(ts);
    return undefined;
  }));

  return ret;
}