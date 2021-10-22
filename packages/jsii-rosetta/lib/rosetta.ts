import * as spec from '@jsii/spec';
import * as fs from 'fs-extra';
import * as path from 'path';
import { isError } from 'util';

import { allTypeScriptSnippets } from './jsii/assemblies';
import { TargetLanguage } from './languages';
import { transformMarkdown } from './markdown/markdown';
import { MarkdownRenderer } from './markdown/markdown-renderer';
import { ReplaceTypeScriptTransform } from './markdown/replace-typescript-transform';
import { CodeBlock } from './markdown/types';
import { SnippetParameters, TypeScriptSnippet, updateParameters } from './snippet';
import { DEFAULT_TABLET_NAME, LanguageTablet, Translation } from './tablets/tablets';
import { Translator, rosettaDiagFromTypescript } from './translate';
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
  private readonly loadedTablets: LanguageTablet[] = [];
  private readonly liveTablet = new LanguageTablet();
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
    return this.translator.diagnostics.map(rosettaDiagFromTypescript);
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
   * loaded.
   *
   * Otherwise, if live conversion is enabled, the snippets in the assembly
   * become available for live translation later.
   *
   * (We do it like this to centralize the logic around the "where" calculation,
   * otherwise each language generator has to reimplement a way to describe API
   * elements while spidering the jsii assembly).
   */
  public async addAssembly(assembly: spec.Assembly, assemblyDir: string) {
    if (await fs.pathExists(path.join(assemblyDir, DEFAULT_TABLET_NAME))) {
      await this.loadTabletFromFile(path.join(assemblyDir, DEFAULT_TABLET_NAME));
      return;
    }

    if (this.options.liveConversion) {
      for (const tsnip of allTypeScriptSnippets([{ assembly, directory: assemblyDir }], this.loose)) {
        this.extractedSnippets.set(tsnip.visibleSource, tsnip);
      }
    }
  }

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

  public translateSnippetsInMarkdown(
    markdown: string,
    targetLang: TargetLanguage,
    strict: boolean,
    translationToCodeBlock: (x: Translation) => CodeBlock = id,
    compileDirectory = process.cwd(),
  ): string {
    return transformMarkdown(
      markdown,
      new MarkdownRenderer(),
      new ReplaceTypeScriptTransform('markdown', strict, (tsSnip) => {
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
