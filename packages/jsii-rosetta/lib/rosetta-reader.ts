import * as spec from '@jsii/spec';
import * as fs from 'fs-extra';
import * as path from 'path';

import { allTypeScriptSnippets } from './jsii/assemblies';
import { TargetLanguage } from './languages';
import * as logging from './logging';
import { transformMarkdown } from './markdown/markdown';
import { MarkdownRenderer } from './markdown/markdown-renderer';
import { ReplaceTypeScriptTransform } from './markdown/replace-typescript-transform';
import { CodeBlock } from './markdown/types';
import {
  SnippetParameters,
  TypeScriptSnippet,
  updateParameters,
  ApiLocation,
  typeScriptSnippetFromSource,
} from './snippet';
import { snippetKey } from './tablets/key';
import { DEFAULT_TABLET_NAME, LanguageTablet, Translation } from './tablets/tablets';
import { Translator } from './translate';
import { commentToken, printDiagnostics } from './util';

export enum UnknownSnippetMode {
  /**
   * Return the snippet as given (untranslated)
   */
  VERBATIM = 'verbatim',

  /**
   * Live-translate the snippet as best as we can
   */
  TRANSLATE = 'translate',

  /**
   * Throw an error if this occurs
   */
  FAIL = 'fail',
}

export interface RosettaOptions {
  /**
   * Whether or not to live-convert samples
   *
   * @default UnknownSnippetMode.VERBATIM
   */
  readonly unknownSnippets?: UnknownSnippetMode;

  /**
   * Target languages to use for live conversion
   *
   * @default All languages
   */
  readonly targetLanguages?: readonly TargetLanguage[];

  /**
   * Whether to include compiler diagnostics in the compilation results.
   */
  readonly includeCompilerDiagnostics?: boolean;

  /**
   * Whether this Rosetta should operate in "loose" mode, where missing literate
   * source files and missing fixtures are ignored instead of failing.
   *
   * @default false
   */
  readonly loose?: boolean;

  /**
   * Adds a disclaimer to start of snippet if it did not compile.
   *
   * @default false
   */
  readonly prefixDisclaimer?: boolean;
}

/**
 * Entry point class for consumers of Rosetta tablets (primarily: pacmak)
 *
 * Rosetta can work in one of two modes:
 *
 * 1. Live translation of snippets.
 * 2. Read translations from a pre-translated tablet (prepared using `jsii-rosetta extract` command).
 *
 * The second method affords more control over the precise circumstances of
 * sample compilation and is recommended, but the first method will do
 * when the second one is not necessary.
 */
export class RosettaTabletReader {
  /**
   * Newly translated samples
   *
   * In case live translation has been enabled, all samples that have been translated on-the-fly
   * are added to this tablet.
   */
  public readonly liveTablet = new LanguageTablet();

  private readonly loadedTablets: LanguageTablet[] = [];
  private readonly extractedSnippets = new Map<string, TypeScriptSnippet>();
  private readonly translator: Translator;
  private readonly loose: boolean;
  private readonly unknownSnippets: UnknownSnippetMode;
  private readonly _prefixDisclaimer: boolean;

  public constructor(private readonly options: RosettaOptions = {}) {
    this.loose = !!options.loose;
    this.unknownSnippets = options.unknownSnippets ?? UnknownSnippetMode.VERBATIM;
    this.translator = new Translator(options.includeCompilerDiagnostics ?? false);
    this._prefixDisclaimer = options.prefixDisclaimer ?? false;
  }

  /**
   * Diagnostics encountered while doing live translation
   */
  public get diagnostics() {
    return this.translator.diagnostics;
  }

  /**
   * Load a tablet as a source for translateable snippets
   *
   * Note: the snippets loaded from this tablet will NOT be validated for
   * their fingerprints or translator versions! If a matching snippet is found
   * in the tablet, it will always be returned, whether or not it is stale.
   */
  public async loadTabletFromFile(tabletFile: string) {
    const tablet = new LanguageTablet();
    await tablet.load(tabletFile);
    this.addTablet(tablet);
  }

  /**
   * Directly add a tablet to the list of tablets to load translations from
   */
  public addTablet(tablet: LanguageTablet) {
    this.loadedTablets.push(tablet);
  }

  /**
   * Add an assembly
   *
   * If a default tablet file is found in the assembly's directory, it will be
   * loaded (and assumed to contain a complete list of translated snippets for
   * this assembly already).
   *
   * Otherwise, if live conversion is enabled, the snippets in the assembly
   * become available for live translation later. This is necessary because we probably
   * need to fixturize snippets for successful compilation, and the information
   * pacmak sends our way later on is not going to be enough to do that.
   */
  public async addAssembly(assembly: spec.Assembly, assemblyDir: string) {
    const defaultTablet = path.join(assemblyDir, DEFAULT_TABLET_NAME);
    if (await fs.pathExists(defaultTablet)) {
      try {
        await this.loadTabletFromFile(defaultTablet);
        return;
      } catch (e) {
        logging.warn(`Error loading ${defaultTablet}: ${e.message}. Skipped.`);
      }
    }

    // Inventarize the snippets from this assembly, but only if there's a chance
    // we're going to need them.
    if (this.unknownSnippets === UnknownSnippetMode.TRANSLATE) {
      for (const tsnip of await allTypeScriptSnippets([{ assembly, directory: assemblyDir }], this.loose)) {
        this.extractedSnippets.set(snippetKey(tsnip), tsnip);
      }
    }
  }

  /**
   * Translate the given snippet for the given target language
   *
   * This will either:
   *
   * - Find an existing translation in a tablet and return that, if available.
   * - Otherwise, find a fixturized version of this snippet in an assembly that
   *   was loaded beforehand, and translate it on-the-fly. Finding the fixture
   *   will be based on the snippet key, which consists of a hash of the
   *   visible source and the API location.
   * - Otherwise, translate the snippet as-is (without fixture information).
   *
   * This will do and store a full conversion of the given snippet, even if it only
   * returns one language. Subsequent retrievals for the same snippet in other
   * languages will reuse the translation from cache.
   *
   * If you are calling this for the side effect of adding translations to the live
   * tablet, you only need to do that for one language.
   */
  public translateSnippet(source: TypeScriptSnippet, targetLang: TargetLanguage): Translation | undefined {
    // Look for it in loaded tablets (or previous conversions)
    for (const tab of this.allTablets) {
      const ret = tab.lookup(source, targetLang);
      if (ret !== undefined) {
        return this.prefixDisclaimer(ret, this._prefixDisclaimer);
      }
    }

    if (this.unknownSnippets === UnknownSnippetMode.VERBATIM) {
      return this.prefixDisclaimer(
        {
          language: targetLang,
          source: source.visibleSource,
        },
        this._prefixDisclaimer,
      );
    }

    if (this.unknownSnippets === UnknownSnippetMode.FAIL) {
      const message = [
        'The following snippet was not found in any of the loaded tablets:',
        source.visibleSource,
        `Location: ${JSON.stringify(source.location)}`,
        `Language: ${targetLang}`,
      ].join('\n');
      throw new Error(message);
    }

    if (this.options.targetLanguages && !this.options.targetLanguages.includes(targetLang)) {
      throw new Error(
        `Rosetta configured for live conversion to ${this.options.targetLanguages.join(
          ', ',
        )}, but requested ${targetLang}`,
      );
    }

    // See if we can find a fixturized version of this snippet. If so, use that do the live
    // conversion.
    const extracted = this.extractedSnippets.get(snippetKey(source));
    if (extracted !== undefined) {
      const snippet = this.translator.translate(extracted, this.options.targetLanguages);
      this.liveTablet.addSnippet(snippet);
      return this.prefixDisclaimer(snippet.get(targetLang), this._prefixDisclaimer);
    }

    // Try to live-convert it as-is.
    const snippet = this.translator.translate(source, this.options.targetLanguages);
    this.liveTablet.addSnippet(snippet);
    return this.prefixDisclaimer(snippet.get(targetLang), this._prefixDisclaimer);
  }

  /**
   * Translate a snippet found in the "@ example" section of a jsii assembly
   *
   * Behaves exactly like `translateSnippet`, so see that method for documentation.
   */
  public translateExample(
    apiLocation: ApiLocation,
    example: string,
    targetLang: TargetLanguage,
    strict: boolean,
    compileDirectory = process.cwd(),
  ): Translation {
    const location = { api: apiLocation, field: { field: 'example' } } as const;

    const snippet = typeScriptSnippetFromSource(example, location, strict, {
      [SnippetParameters.$COMPILATION_DIRECTORY]: compileDirectory,
    });

    const translated = this.translateSnippet(snippet, targetLang);

    return translated ?? { language: 'typescript', source: example };
  }

  /**
   * Translate all TypeScript snippets found in a block of Markdown text
   *
   * For each snippet, behaves exactly like `translateSnippet`, so see that
   * method for documentation.
   */
  public translateSnippetsInMarkdown(
    apiLocation: ApiLocation,
    markdown: string,
    targetLang: TargetLanguage,
    strict: boolean,
    translationToCodeBlock: (x: Translation) => CodeBlock = id,
    compileDirectory = process.cwd(),
  ): string {
    return transformMarkdown(
      markdown,
      new MarkdownRenderer(),
      new ReplaceTypeScriptTransform(apiLocation, strict, (tsSnip) => {
        const translated = this.translateSnippet(
          updateParameters(tsSnip, {
            [SnippetParameters.$COMPILATION_DIRECTORY]: compileDirectory,
          }),
          targetLang,
        );
        if (!translated) {
          return undefined;
        }

        return translationToCodeBlock(translated);
      }),
    );
  }

  public printDiagnostics(stream: NodeJS.WritableStream) {
    printDiagnostics(this.diagnostics, stream);
  }

  public get hasErrors() {
    return this.diagnostics.some((d) => d.isError);
  }

  private get allTablets(): LanguageTablet[] {
    return [...this.loadedTablets, this.liveTablet];
  }

  /**
   * Adds a disclaimer to the front of the example if the prefixDisclaimer
   * flag is set and we know it does not compile.
   */
  private prefixDisclaimer(translation: Translation | undefined, prefixDisclaimer: boolean): Translation | undefined {
    if (!prefixDisclaimer || translation?.didCompile !== false) {
      return translation;
    }
    const comment = commentToken(translation.language);
    const disclaimer = 'Example automatically generated from non-compiling source. May contain errors.';
    return {
      ...translation,
      source: `${comment} ${disclaimer}\n${translation.source}`,
    };
  }
}

function id(x: Translation) {
  return x;
}

/**
 * Backwards compatibility
 *
 * @deprecated use RosettaTabletReader instead
 */
export class Rosetta extends RosettaTabletReader {}
