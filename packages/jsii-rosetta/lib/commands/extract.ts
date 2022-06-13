import * as path from 'path';

import { loadAssemblies, allTypeScriptSnippets, loadAllDefaultTablets } from '../jsii/assemblies';
import * as logging from '../logging';
import { RosettaTranslator, RosettaTranslatorOptions } from '../rosetta-translator';
import { TypeScriptSnippet, SnippetParameters } from '../snippet';
import { snippetKey } from '../tablets/key';
import { LanguageTablet, DEFAULT_TABLET_NAME } from '../tablets/tablets';
import { RosettaDiagnostic } from '../translate';
import { groupBy, isDefined } from '../util';
import { infuse } from './infuse';

export interface ExtractResult {
  diagnostics: RosettaDiagnostic[];
  tablet: LanguageTablet;
}

export interface ExtractOptions {
  readonly includeCompilerDiagnostics?: boolean;
  readonly validateAssemblies?: boolean;
  readonly only?: string[];

  /**
   * A tablet file to be loaded and used as a source for caching
   */
  readonly cacheFromFile?: string;

  /**
   * A tablet file to append translated snippets to
   */
  readonly cacheToFile?: string;

  /**
   * Trim cache to only contain translations found in the current assemblies
   *
   * @default false
   */
  readonly trimCache?: boolean;

  /**
   * Write translations to implicit tablets (`.jsii.tabl.json`)
   *
   * @default true
   */
  readonly writeToImplicitTablets?: boolean;

  /**
   * What directory to compile the samples in
   *
   * @default - Rosetta manages the compilation directory
   * @deprecated Samples declare their own dependencies instead
   */
  readonly compilationDirectory?: string;

  /**
   * Make a translator (just for testing)
   */
  readonly translatorFactory?: (opts: RosettaTranslatorOptions) => RosettaTranslator;

  /**
   * Turn on 'loose mode' or not
   *
   * Loose mode ignores failures during fixturizing, and undoes 'strict mode' for
   * diagnostics.
   *
   * @default false
   */
  readonly loose?: boolean;

  /**
   * Accept dirty translations from the cache
   *
   * @default false
   */
  readonly allowDirtyTranslations?: boolean;
}

export async function extractAndInfuse(assemblyLocations: string[], options: ExtractOptions): Promise<ExtractResult> {
  const result = await extractSnippets(assemblyLocations, options);
  await infuse(assemblyLocations, {
    cacheFromFile: options.cacheFromFile,
    cacheToFile: options.cacheToFile,
  });
  return result;
}

/**
 * Extract all samples from the given assemblies into a tablet
 */
export async function extractSnippets(
  assemblyLocations: readonly string[],
  options: ExtractOptions = {},
): Promise<ExtractResult> {
  const only = options.only ?? [];

  logging.info(`Loading ${assemblyLocations.length} assemblies`);
  const assemblies = await loadAssemblies(assemblyLocations, options.validateAssemblies ?? false);

  let snippets = Array.from(await allTypeScriptSnippets(assemblies, options.loose));
  if (only.length > 0) {
    snippets = filterSnippets(snippets, only);
  }

  // Map every assembly to a list of snippets, so that we know what implicit
  // tablet to write the translations to later on.
  const snippetsPerAssembly = groupBy(
    snippets.map((s) => ({ key: snippetKey(s), location: projectDirectory(s) })),
    (x) => x.location,
  );

  const translatorOptions: RosettaTranslatorOptions = {
    includeCompilerDiagnostics: options.includeCompilerDiagnostics ?? false,
    assemblies: assemblies.map((a) => a.assembly),
    allowDirtyTranslations: options.allowDirtyTranslations,
  };

  const translator = options.translatorFactory
    ? options.translatorFactory(translatorOptions)
    : new RosettaTranslator(translatorOptions);

  // Prime the snippet cache with:
  // - Cache source file
  // - Default tablets found next to each assembly
  if (options.cacheFromFile) {
    await translator.addToCache(options.cacheFromFile);
  }
  translator.addTabletsToCache(...Object.values(await loadAllDefaultTablets(assemblies)));

  if (translator.hasCache()) {
    const { translations, remaining } = translator.readFromCache(snippets, true, options.includeCompilerDiagnostics);
    logging.info(`Reused ${translations.length} translations from cache`);
    snippets = remaining;
  }

  const diagnostics = [];
  if (snippets.length > 0) {
    logging.info('Translating');
    const startTime = Date.now();

    const result = await translator.translateAll(snippets);

    const delta = (Date.now() - startTime) / 1000;
    logging.info(
      `Translated ${snippets.length} snippets in ${delta} seconds (${(delta / snippets.length).toPrecision(
        3,
      )}s/snippet)`,
    );
    diagnostics.push(...result.diagnostics);
  } else {
    logging.info('Nothing left to translate');
  }

  // Save to individual tablet files, and optionally append to the output file
  if (options.writeToImplicitTablets ?? true) {
    await Promise.all(
      Object.entries(snippetsPerAssembly).map(async ([location, snips]) => {
        const asmTabletFile = path.join(location, DEFAULT_TABLET_NAME);
        logging.debug(`Writing ${snips.length} translations to ${asmTabletFile}`);
        const translations = snips.map(({ key }) => translator.tablet.tryGetSnippet(key)).filter(isDefined);

        const asmTablet = new LanguageTablet();
        asmTablet.addSnippets(...translations);
        await asmTablet.save(asmTabletFile);
      }),
    );
  }

  if (options.cacheToFile) {
    logging.info(`Adding translations to ${options.cacheToFile}`);
    const output = options.trimCache
      ? new LanguageTablet()
      : await LanguageTablet.fromOptionalFile(options.cacheToFile);
    output.addTablet(translator.tablet);
    await output.save(options.cacheToFile);
  }

  return { diagnostics, tablet: translator.tablet };
}

/**
 * Only yield the snippets whose id exists in a whitelist
 */
function filterSnippets(ts: TypeScriptSnippet[], includeIds: string[]) {
  return ts.filter((t) => includeIds.includes(snippetKey(t)));
}

function projectDirectory(ts: TypeScriptSnippet) {
  const dir = ts.parameters?.[SnippetParameters.$PROJECT_DIRECTORY];
  if (!dir) {
    throw new Error(`Snippet does not have associated project directory: ${JSON.stringify(ts.location)}`);
  }
  return dir;
}
