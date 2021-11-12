import * as spec from '@jsii/spec';

import { TypeFingerprinter } from './jsii/fingerprinting';
import { TARGET_LANGUAGES } from './languages';
import * as logging from './logging';
import { TypeScriptSnippet, completeSource } from './snippet';
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
}

/**
 * Entry point for consumers that want to translate code on-the-fly
 *
 * If you want to generate and translate code on-the-fly, in ways that cannot
 * be achieved by the rosetta CLI, use this class.
 */
export class RosettaTranslator {
  public readonly tablet = new LanguageTablet();
  private readonly fingerprinter: TypeFingerprinter;
  private readonly cache = new LanguageTablet();
  private readonly includeCompilerDiagnostics: boolean;

  public constructor(options: RosettaTranslatorOptions = {}) {
    this.fingerprinter = new TypeFingerprinter(options?.assemblies ?? []);
    this.includeCompilerDiagnostics = options.includeCompilerDiagnostics ?? false;
  }

  public async loadCache(fileName: string) {
    try {
      await this.cache.load(fileName);
    } catch (e) {
      logging.warn(`Error reading cache ${fileName}: ${e.message}`);
    }
  }

  /**
   * For all the given snippets, try to read translations from the cache
   *
   * Will remove the cached snippets from the input array.
   */
  public readFromCache(snippets: TypeScriptSnippet[], addToTablet = true): ReadFromCacheResults {
    const remaining = [...snippets];
    const translations = new Array<TranslatedSnippet>();

    let i = 0;
    while (i < remaining.length) {
      const fromCache = tryReadFromCache(remaining[i], this.cache, this.fingerprinter);
      if (fromCache) {
        if (addToTablet) {
          this.tablet.addSnippet(fromCache);
        }
        remaining.splice(i, 1);
        translations.push(fromCache);
      } else {
        i += 1;
      }
    }

    return { translations, remaining };
  }

  public async translateAll(snippets: TypeScriptSnippet[], addToTablet = true): Promise<TranslateAllResult> {
    const result = await translateAll(snippets, this.includeCompilerDiagnostics);

    const fingerprinted = result.translatedSnippets.map((snippet) =>
      snippet.withFingerprint(this.fingerprinter.fingerprintAll(snippet.fqnsReferenced())),
    );

    if (addToTablet) {
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
function tryReadFromCache(sourceSnippet: TypeScriptSnippet, cache: LanguageTablet, fingerprinter: TypeFingerprinter) {
  const fromCache = cache.tryGetSnippet(snippetKey(sourceSnippet));

  const cacheable =
    fromCache &&
    completeSource(sourceSnippet) === fromCache.snippet.fullSource &&
    Object.entries(TARGET_LANGUAGES).every(
      ([lang, translator]) => fromCache.snippet.translations?.[lang]?.version === translator.version,
    ) &&
    fingerprinter.fingerprintAll(fromCache.fqnsReferenced()) === fromCache.snippet.fqnsFingerprint;

  return cacheable ? fromCache : undefined;
}

export interface ReadFromCacheResults {
  readonly translations: TranslatedSnippet[];
  readonly remaining: TypeScriptSnippet[];
}
