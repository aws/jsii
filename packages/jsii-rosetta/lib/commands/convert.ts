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
}

export function translateMarkdown(
  markdown: File,
  visitor: AstHandler<any>,
  options: TranslateMarkdownOptions = {},
): TranslateResult {
  const translator = new Translator(false);

  const translatedMarkdown = transformMarkdown(
    markdown.contents,
    new MarkdownRenderer(),
    new ReplaceTypeScriptTransform(markdown.fileName, (tsSnippet) => {
      const translated = translator
        .translatorFor(tsSnippet)
        .renderUsing(visitor);
      return {
        language: options.languageIdentifier ?? '',
        source: translated,
      };
    }),
  );

  return {
    translation: translatedMarkdown,
    diagnostics: translator.diagnostics,
  };
}
