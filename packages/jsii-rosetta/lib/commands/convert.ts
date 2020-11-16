import { transformMarkdown } from '../markdown/markdown';
import { MarkdownRenderer } from '../markdown/markdown-renderer';
import { ReplaceTypeScriptTransform } from '../markdown/replace-typescript-transform';
import { AstHandler, AstRendererOptions } from '../renderer';
import { TranslateResult, Translator } from '../translate';
import { File } from '../util';

export interface TranslateMarkdownOptions extends AstRendererOptions {
  /**
   * What language to put in the returned markdown blocks
   */
  languageIdentifier?: string;

  /**
   * Whether to operate in `strict` mode or not.
   */
  strict?: boolean;
}

export function translateMarkdown(
  markdown: File,
  visitor: AstHandler<any>,
  { languageIdentifier = '', strict = false }: TranslateMarkdownOptions = {},
): TranslateResult {
  const translator = new Translator(false);

  const translatedMarkdown = transformMarkdown(
    markdown.contents,
    new MarkdownRenderer(),
    new ReplaceTypeScriptTransform(markdown.fileName, strict, (tsSnippet) => {
      const translated = translator
        .translatorFor(tsSnippet)
        .renderUsing(visitor);
      return {
        language: languageIdentifier,
        source: translated,
      };
    }),
  );

  return {
    translation: translatedMarkdown,
    diagnostics: translator.diagnostics,
  };
}
