import * as cm from 'commonmark';

import { visitCommonMarkTree } from '../markdown/markdown';
import { TypeScriptSnippet, ApiLocation } from '../snippet';
import { ReplaceTypeScriptTransform } from './replace-typescript-transform';
import { CodeBlock } from './types';

export type TypeScriptReplacer = (code: TypeScriptSnippet) => CodeBlock | undefined;

export function extractTypescriptSnippetsFromMarkdown(
  markdown: string,
  location: ApiLocation,
  strict: boolean,
): TypeScriptSnippet[] {
  const parser = new cm.Parser();
  const doc = parser.parse(markdown);

  const ret: TypeScriptSnippet[] = [];

  visitCommonMarkTree(
    doc,
    new ReplaceTypeScriptTransform(location, strict, (ts) => {
      ret.push(ts);
      return undefined;
    }),
  );

  return ret;
}
