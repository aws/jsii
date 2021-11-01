import { TypeScriptSnippet, typeScriptSnippetFromSource, parseKeyValueList, ApiLocation } from '../snippet';
import { ReplaceCodeTransform } from './replace-code-renderer';
import { CodeBlock } from './types';

export type TypeScriptReplacer = (code: TypeScriptSnippet) => CodeBlock | undefined;

/**
 * A specialization of ReplaceCodeTransform that maintains state about TypeScript snippets
 */
export class ReplaceTypeScriptTransform extends ReplaceCodeTransform {
  public constructor(api: ApiLocation, strict: boolean, replacer: TypeScriptReplacer) {
    super((block, line) => {
      const languageParts = block.language ? block.language.split(' ') : [];
      if (languageParts[0] !== 'typescript' && languageParts[0] !== 'ts') {
        return block;
      }

      const tsSnippet = typeScriptSnippetFromSource(
        block.source,
        { api, field: { field: 'markdown', line } },
        strict,
        parseKeyValueList(languageParts.slice(1)),
      );

      return replacer(tsSnippet) ?? block;
    });
  }
}
