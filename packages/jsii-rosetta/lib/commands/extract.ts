import { loadAssemblies, allTypeScriptSnippets } from '../jsii/assemblies';
import * as logging from '../logging';
import { RosettaTranslator, RosettaTranslatorOptions } from '../rosetta-translator';
import { TypeScriptSnippet } from '../snippet';
import { snippetKey } from '../tablets/key';
import { LanguageTablet } from '../tablets/tablets';
import { RosettaDiagnostic } from '../translate';
import { infuse } from './infuse';

export interface ExtractResult {
  diagnostics: RosettaDiagnostic[];
  tablet: LanguageTablet;
}

export interface ExtractOptions {
  readonly outputFile: string;
  readonly append?: boolean;
  readonly includeCompilerDiagnostics: boolean;
  readonly validateAssemblies: boolean;
  readonly only?: string[];

  /**
   * A tablet file to be loaded and used as a source for caching
   */
  readonly cacheTabletFile?: string;

  /**
   * Make a translator (just for testing)
   */
  readonly translatorFactory?: (opts: RosettaTranslatorOptions) => RosettaTranslator;
}

export async function extractAndInfuse(
  assemblyLocations: string[],
  options: ExtractOptions,
  loose = false,
): Promise<ExtractResult> {
  const result = await extractSnippets(assemblyLocations, options, loose);
  await infuse(assemblyLocations, options.outputFile, {
    tabletOutputFile: options.outputFile,
  });
  return result;
}

/**
 * Extract all samples from the given assemblies into a tablet
 */
export async function extractSnippets(
  assemblyLocations: string[],
  options: ExtractOptions,
  loose = false,
): Promise<ExtractResult> {
  const only = options.only ?? [];

  logging.info(`Loading ${assemblyLocations.length} assemblies`);
  const assemblies = await loadAssemblies(assemblyLocations, options.validateAssemblies);

  let snippets = Array.from(allTypeScriptSnippets(assemblies, loose));
  if (only.length > 0) {
    snippets = filterSnippets(snippets, only);
  }

  const translatorOptions: RosettaTranslatorOptions = {
    includeCompilerDiagnostics: options.includeCompilerDiagnostics,
    assemblies: assemblies.map((a) => a.assembly),
    tablet: options.append ? await LanguageTablet.fromOptionalFile(options.outputFile) : undefined,
  };

  const translator = options.translatorFactory
    ? options.translatorFactory(translatorOptions)
    : new RosettaTranslator(translatorOptions);

  // Choose the cache if provided, or the output file if we plan to append to it.
  const cacheTabletFile = options.cacheTabletFile ?? (options.append ? options.outputFile : undefined);
  if (cacheTabletFile) {
    await translator.loadCache(cacheTabletFile);
    const { translations, remaining } = translator.readFromCache(snippets);
    logging.info(`Reused ${translations.length} translations from cache ${cacheTabletFile}`);
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

  logging.info(`Saving language tablet to ${options.outputFile}`);
  await translator.tablet.save(options.outputFile);

  return { diagnostics, tablet: translator.tablet };
}

/**
 * Only yield the snippets whose id exists in a whitelist
 */
function filterSnippets(ts: TypeScriptSnippet[], includeIds: string[]) {
  return ts.filter((t) => includeIds.includes(snippetKey(t)));
}
