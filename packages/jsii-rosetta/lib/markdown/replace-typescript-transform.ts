import { TypeScriptSnippet, typeScriptSnippetFromSource, parseKeyValueList } from '../snippet';
import { ReplaceCodeTransform } from './replace-code-renderer';
import { CodeBlock } from './types';

export type TypeScriptReplacer = (code: TypeScriptSnippet) => CodeBlock | undefined;

/**
 * A specialization of ReplaceCodeTransform that maintains state about TypeScript snippets
 */
export class ReplaceTypeScriptTransform extends ReplaceCodeTransform {
  private readonly where: string;

  public constructor(where: string, strict: boolean, replacer: TypeScriptReplacer) {
    super((block, line) => {
      const languageParts = block.language ? block.language.split(' ') : [];
      if (languageParts[0] !== 'typescript' && languageParts[0] !== 'ts') {
        return block;
      }

      const tsSnippet = typeScriptSnippetFromSource(
        block.source,
        this.where,
        `-L${line}`,
        strict,
        parseKeyValueList(languageParts.slice(1)),
      );

      return replacer(tsSnippet) ?? block;
    });

    this.where = where;
  }
}
