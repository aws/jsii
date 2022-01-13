import * as spec from '@jsii/spec';
import * as fs from 'fs-extra';

import { TypeFingerprinter } from './jsii/fingerprinting';
import { TARGET_LANGUAGES } from './languages';
import * as logging from './logging';
import { TypeScriptSnippet, completeSource } from './snippet';
import { collectDependencies, validateAvailableDependencies, prepareDependencyDirectory } from './snippet-dependencies';
import { snippetKey } from './tablets/key';
import { LanguageTablet, TranslatedSnippet } from './tablets/tablets';
import { translateAll, TranslateAllResult } from './translate_all';

export interface RosettaTranslatorOptions {
  /**
   * Assemblies to use for fingerprinting
   *
   * The set of assemblies here are used to invalidate the cache. Any types that are
   * used in snippets are looked up in this set of assemblies. If found, their type
   * information is fingerprinted and compared to the type information at the time
   * compilation of the cached sample. If different, this is considered to be a cache
   * miss.
   *
   * You must use the same set of assemblies when generating and reading the cache
   * file, otherwise the fingerprint is guaranteed to be different and the cache will
   * be useless (e.g. if you generate the cache WITH assembly information but
   * read it without, or vice versa).
   *
   * @default No assemblies.
   */
  readonly assemblies?: spec.Assembly[];

  /**
   * Whether to include compiler diagnostics in the compilation results.
   *
   * @default false
   */
  readonly includeCompilerDiagnostics?: boolean;

  /**
   * Allow reading dirty translations from cache
   *
   * @default false
   */
  readonly allowDirtyTranslations?: boolean;
}

/**
 * Entry point for consumers that want to translate code on-the-fly
 *
 * If you want to generate and translate code on-the-fly, in ways that cannot
 * be achieved by the rosetta CLI, use this class.
 */
export class RosettaTranslator {
  /**
   * Tablet with fresh translations
   *
   * All new translations (not read from cache) are added to this tablet.
   */
  public readonly tablet = new LanguageTablet();

  public readonly cache = new LanguageTablet();

  private readonly fingerprinter: TypeFingerprinter;
  private readonly includeCompilerDiagnostics: boolean;
  private readonly allowDirtyTranslations: boolean;

  public constructor(options: RosettaTranslatorOptions = {}) {
    this.fingerprinter = new TypeFingerprinter(options?.assemblies ?? []);
    this.includeCompilerDiagnostics = options.includeCompilerDiagnostics ?? false;
    this.allowDirtyTranslations = options.allowDirtyTranslations ?? false;
  }

  /**
   * @deprecated use `addToCache` instead
   */
  public async loadCache(fileName: string) {
    try {
      await this.cache.load(fileName);
    } catch (e) {
      logging.warn(`Error reading cache ${fileName}: ${e.message}`);
    }
  }

  public async addToCache(filename: string) {
    const tab = await LanguageTablet.fromOptionalFile(filename);
    this.cache.addTablet(tab);
  }

  public addTabletsToCache(...tablets: LanguageTablet[]) {
    for (const tab of tablets) {
      this.cache.addTablet(tab);
    }
  }

  public hasCache() {
    return this.cache.count > 0;
  }

  /**
   * For all the given snippets, try to read translations from the cache
   *
   * Will remove the cached snippets from the input array.
   */
  public readFromCache(snippets: TypeScriptSnippet[], addToTablet = true, compiledOnly = false): ReadFromCacheResults {
    const translations = new Array<TranslatedSnippet>();
    const remaining = new Array<TypeScriptSnippet>();

    let infusedCount = 0;
    let dirtyCount = 0;
    let dirtySourceCount = 0;
    let dirtyTypesCount = 0;
    let dirtyTranslatorCount = 0;
    let dirtyDidntCompile = 0;

    for (const snippet of snippets) {
      const fromCache = tryReadFromCache(snippet, this.cache, this.fingerprinter, compiledOnly);
      switch (fromCache.type) {
        case 'hit':
          if (addToTablet) {
            this.tablet.addSnippet(fromCache.snippet);
          }
          translations.push(fromCache.snippet);

          infusedCount += fromCache.infused ? 1 : 0;
          break;

        case 'dirty':
          dirtyCount += 1;
          dirtySourceCount += fromCache.dirtySource ? 1 : 0;
          dirtyTranslatorCount += fromCache.dirtyTranslator ? 1 : 0;
          dirtyTypesCount += fromCache.dirtyTypes ? 1 : 0;
          dirtyDidntCompile += fromCache.dirtyDidntCompile ? 1 : 0;

          if (this.allowDirtyTranslations) {
            translations.push(fromCache.translation);
          } else {
            remaining.push(snippet);
          }
          break;

        case 'miss':
          remaining.push(snippet);
          break;
      }
    }

    return {
      translations,
      remaining,
      infusedCount,
      dirtyCount,
      dirtySourceCount,
      dirtyTranslatorCount,
      dirtyTypesCount,
      dirtyDidntCompile,
    };
  }

  public async translateAll(snippets: TypeScriptSnippet[], addToTablet?: boolean): Promise<TranslateAllResult>;
  public async translateAll(snippets: TypeScriptSnippet[], options?: TranslateAllOptions): Promise<TranslateAllResult>;
  public async translateAll(
    snippets: TypeScriptSnippet[],
    optionsOrAddToTablet?: boolean | TranslateAllOptions,
  ): Promise<TranslateAllResult> {
    const options =
      optionsOrAddToTablet && typeof optionsOrAddToTablet === 'object'
        ? optionsOrAddToTablet
        : { addToTablet: optionsOrAddToTablet };

    const exampleDependencies = collectDependencies(snippets);

    let compilationDirectory;
    let cleanCompilationDir = false;
    if (options?.compilationDirectory) {
      // If the user provided a directory, we're going to trust-but-confirm.
      await validateAvailableDependencies(options.compilationDirectory, exampleDependencies);
      compilationDirectory = options.compilationDirectory;
    } else {
      compilationDirectory = await prepareDependencyDirectory(exampleDependencies);
      cleanCompilationDir = true;
    }

    const origDir = process.cwd();
    // Easiest way to get a fixed working directory (for sources) in is to chdir
    process.chdir(compilationDirectory);

    let result;
    try {
      result = await translateAll(snippets, this.includeCompilerDiagnostics);
    } finally {
      process.chdir(origDir);
      if (cleanCompilationDir) {
        await fs.remove(compilationDirectory);
      }
    }

    const fingerprinted = result.translatedSnippets.map((snippet) =>
      snippet.withFingerprint(this.fingerprinter.fingerprintAll(snippet.fqnsReferenced())),
    );

    if (options?.addToTablet ?? true) {
      for (const translation of fingerprinted) {
        this.tablet.addSnippet(translation);
      }
    }

    return {
      translatedSnippets: fingerprinted,
      diagnostics: result.diagnostics,
    };
  }
}

/**
 * Try to find the translation for the given snippet in the given cache
 *
 * Rules for cacheability are:
 * - id is the same (== visible source didn't change)
 * - complete source is the same (== fixture didn't change)
 * - all types involved have the same fingerprint (== API surface didn't change)
 * - the versions of all translations match the versions on the available translators (== translator itself didn't change)
 *
 * For the versions check: we could have selectively picked some translations
 * from the cache while performing others. However, since the big work is in
 * parsing the TypeScript, and the rendering itself is peanutes (assumption), it
 * doesn't really make a lot of difference.  So, for simplification's sake,
 * we'll regen all translations if there's at least one that's outdated.
 */
function tryReadFromCache(
  sourceSnippet: TypeScriptSnippet,
  cache: LanguageTablet,
  fingerprinter: TypeFingerprinter,
  compiledOnly: boolean,
): CacheHit {
  const fromCache = cache.tryGetSnippet(snippetKey(sourceSnippet));

  if (!fromCache) {
    return { type: 'miss' };
  }

  // infused snippets won't pass the full source check or the fingerprinter
  // but there is no reason to try to recompile it, so return cached snippet
  // if there exists one.
  if (isInfused(sourceSnippet)) {
    return { type: 'hit', snippet: fromCache, infused: true };
  }

  const dirtySource = completeSource(sourceSnippet) !== fromCache.snippet.fullSource;
  const dirtyTranslator = !Object.entries(TARGET_LANGUAGES).every(
    ([lang, translator]) => fromCache.snippet.translations?.[lang]?.version === translator.version,
  );
  const dirtyTypes = fingerprinter.fingerprintAll(fromCache.fqnsReferenced()) !== fromCache.snippet.fqnsFingerprint;
  const dirtyDidntCompile = compiledOnly && !fromCache.snippet.didCompile;

  if (dirtySource || dirtyTranslator || dirtyTypes || dirtyDidntCompile) {
    return { type: 'dirty', translation: fromCache, dirtySource, dirtyTranslator, dirtyTypes, dirtyDidntCompile };
  }
  return { type: 'hit', snippet: fromCache, infused: false };
}

export type CacheHit =
  | { readonly type: 'miss' }
  | { readonly type: 'hit'; readonly snippet: TranslatedSnippet; readonly infused: boolean }
  | {
      readonly type: 'dirty';
      readonly translation: TranslatedSnippet;
      readonly dirtySource: boolean;
      readonly dirtyTranslator: boolean;
      readonly dirtyTypes: boolean;
      readonly dirtyDidntCompile: boolean;
    };

function isInfused(snippet: TypeScriptSnippet) {
  return snippet.parameters?.infused !== undefined;
}

export interface ReadFromCacheResults {
  /**
   * Successful translations
   */
  readonly translations: TranslatedSnippet[];

  /**
   * Successful but dirty hits
   */
  readonly remaining: TypeScriptSnippet[];

  /**
   * How many successfully hit translations were infused
   */
  readonly infusedCount: number;

  readonly dirtyCount: number;

  // Counts for dirtiness (a single snippet may be dirty for more than one reason)
  readonly dirtySourceCount: number;
  readonly dirtyTranslatorCount: number;
  readonly dirtyTypesCount: number;
  readonly dirtyDidntCompile: number;
}

export interface TranslateAllOptions {
  /**
   * @default - Create a temporary directory with all necessary packages
   */
  readonly compilationDirectory?: string;

  /**
   * @default true
   */
  readonly addToTablet?: boolean;
}
