import * as spec from '@jsii/spec';
import * as fs from 'fs-extra';
import * as path from 'path';
import { isError } from 'util';

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
import { DEFAULT_TABLET_NAME, LanguageTablet, Translation } from './tablets/tablets';
import { Translator } from './translate';
import { printDiagnostics } from './util';

export interface RosettaOptions {
  /**
   * Whether or not to live-convert samples
   *
   * @default false
   */
  readonly liveConversion?: boolean;

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
}

/**
 * Entry point class for consumers for Rosetta functionality
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
export class Rosetta {
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

  public constructor(private readonly options: RosettaOptions = {}) {
    this.loose = !!options.loose;
    this.translator = new Translator(options.includeCompilerDiagnostics ?? false);
  }

  /**
   * Diagnostics encountered while doing live translation
   */
  public get diagnostics() {
    return this.translator.diagnostics;
  }

  /**
   * Load a tablet as a source for translateable snippets
   */
  public async loadTabletFromFile(tabletFile: string) {
    const tablet = new LanguageTablet();
    await tablet.load(tabletFile);
    this.addTablet(tablet);
  }

  /**
   * Directly add a tablet
   *
   * Should only be needed for testing, use `loadTabletFromFile` and `addAssembly` instead.
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
   * need to fixture snippets for successful compilation, and the information
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

    if (this.options.liveConversion) {
      for (const tsnip of allTypeScriptSnippets([{ assembly, directory: assemblyDir }], this.loose)) {
        this.extractedSnippets.set(tsnip.visibleSource, tsnip);
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
   */
  public translateSnippet(source: TypeScriptSnippet, targetLang: TargetLanguage): Translation | undefined {
    // Look for it in loaded tablets
    for (const tab of this.allTablets) {
      const ret = tab.lookup(source, targetLang);
      if (ret !== undefined) {
        return ret;
      }
    }

    if (!this.options.liveConversion) {
      return undefined;
    }
    if (this.options.targetLanguages && !this.options.targetLanguages.includes(targetLang)) {
      throw new Error(
        `Rosetta configured for live conversion to ${this.options.targetLanguages.join(
          ', ',
        )}, but requested ${targetLang}`,
      );
    }

    // See if we're going to live-convert it with full source information
    const extracted = this.extractedSnippets.get(source.visibleSource);
    if (extracted !== undefined) {
      const snippet = this.translator.translate(extracted, this.options.targetLanguages);
      this.liveTablet.addSnippet(snippet);
      return snippet.get(targetLang);
    }

    // Try to live-convert it on the spot (we won't have "where" information or fixtures)
    const snippet = this.translator.translate(source, this.options.targetLanguages);
    return snippet.get(targetLang);
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
    return this.diagnostics.some(isError);
  }

  private get allTablets(): LanguageTablet[] {
    return [...this.loadedTablets, this.liveTablet];
  }
}

function id(x: Translation) {
  return x;
}
