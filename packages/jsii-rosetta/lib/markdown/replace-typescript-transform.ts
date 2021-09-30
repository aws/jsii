import { TypeScriptSnippet, typeScriptSnippetFromSource, parseKeyValueList } from '../snippet';
import { ReplaceCodeTransform } from './replace-code-renderer';
import { CodeBlock } from './types';

export type TypeScriptReplacer = (code: TypeScriptSnippet) => CodeBlock | undefined;

/**
 * A specialization of ReplaceCodeTransform that maintains state about TypeScript snippets
 */
export class ReplaceTypeScriptTransform extends ReplaceCodeTransform {
  private readonly wherePrefix: string;

  public constructor(wherePrefix: string, strict: boolean, replacer: TypeScriptReplacer) {
    let count = 0;
    super((block) => {
      const languageParts = block.language ? block.language.split(' ') : [];
      if (languageParts[0] !== 'typescript' && languageParts[0] !== 'ts') {
        return block;
      }

      count += 1;
      const tsSnippet = typeScriptSnippetFromSource(
        block.source,
        this.addSnippetNumber(count),
        strict,
        parseKeyValueList(languageParts.slice(1)),
      );

      return replacer(tsSnippet) ?? block;
    });

    this.wherePrefix = wherePrefix;
  }

  private addSnippetNumber(snippetNumber: number) {
    // First snippet (most cases) will not be numbered
    if (snippetNumber === 1) {
      return this.wherePrefix;
    }

    return `${this.wherePrefix}-snippet${snippetNumber}`;
  }
}
