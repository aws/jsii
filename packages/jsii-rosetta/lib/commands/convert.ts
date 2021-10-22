import { transformMarkdown } from '../markdown/markdown';
import { MarkdownRenderer } from '../markdown/markdown-renderer';
import { ReplaceTypeScriptTransform } from '../markdown/replace-typescript-transform';
import { AstHandler, AstRendererOptions } from '../renderer';
import { TranslateResult, Translator, rosettaDiagFromTypescript } from '../translate';
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
  opts: TranslateMarkdownOptions = {},
): TranslateResult {
  const translator = new Translator(false);

  const translatedMarkdown = transformMarkdown(
    markdown.contents,
    new MarkdownRenderer(),
    new ReplaceTypeScriptTransform(markdown.fileName, opts.strict ?? false, (tsSnippet) => {
      const translated = translator.translatorFor(tsSnippet).renderUsing(visitor);
      return {
        language: opts.languageIdentifier ?? '',
        source: translated,
      };
    }),
  );

  return {
    translation: translatedMarkdown,
    diagnostics: translator.diagnostics.map(rosettaDiagFromTypescript),
  };
}
