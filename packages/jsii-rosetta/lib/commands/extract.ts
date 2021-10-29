import * as os from 'os';
import * as path from 'path';
import * as workerpool from 'workerpool';

import { loadAssemblies, allTypeScriptSnippets } from '../jsii/assemblies';
import { TypeFingerprinter } from '../jsii/fingerprinting';
import * as logging from '../logging';
import { TypeScriptSnippet, completeSource } from '../snippet';
import { snippetKey } from '../tablets/key';
import { LanguageTablet, TranslatedSnippet } from '../tablets/tablets';
import { RosettaDiagnostic, Translator, makeRosettaDiagnostic } from '../translate';
import type { TranslateBatchRequest, TranslateBatchResponse } from './extract_worker';

export interface ExtractResult {
  diagnostics: RosettaDiagnostic[];
  tablet: LanguageTablet;
}

export interface ExtractOptions {
  readonly outputFile: string;
  readonly includeCompilerDiagnostics: boolean;
  readonly validateAssemblies: boolean;
  readonly only?: string[];

  /**
   * A tablet file to be loaded and used as a source for caching
   */
  readonly cacheTabletFile?: string;
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
  const fingerprinter = new TypeFingerprinter(assemblies.map((a) => a.assembly));

  let snippets = Array.from(allTypeScriptSnippets(assemblies, loose));
  if (only.length > 0) {
    snippets = filterSnippets(snippets, only);
  }

  const tablet = new LanguageTablet();

  if (options.cacheTabletFile) {
    await reuseTranslationsFromCache(snippets, tablet, options.cacheTabletFile, fingerprinter);
  }

  const translateCount = snippets.length;
  const diagnostics = [];
  if (translateCount > 0) {
    logging.info('Translating');
    const startTime = Date.now();

    const result = await translateAll(snippets, options.includeCompilerDiagnostics);

    for (const snippet of result.translatedSnippets) {
      const fingerprinted = snippet.withFingerprint(fingerprinter.fingerprintAll(snippet.fqnsReferenced()));
      tablet.addSnippet(fingerprinted);
    }

    const delta = (Date.now() - startTime) / 1000;
    logging.info(
      `Translated ${translateCount} snippets in ${delta} seconds (${(delta / tablet.count).toPrecision(3)}s/snippet)`,
    );
    diagnostics.push(...result.diagnostics);
  } else {
    logging.info('Nothing left to translate');
  }

  logging.info(`Saving language tablet to ${options.outputFile}`);
  await tablet.save(options.outputFile);

  return { diagnostics, tablet };
}

interface TranslateAllResult {
  translatedSnippets: TranslatedSnippet[];
  diagnostics: RosettaDiagnostic[];
}

/**
 * Only yield the snippets whose id exists in a whitelist
 */
function filterSnippets(ts: TypeScriptSnippet[], includeIds: string[]) {
  return ts.filter((t) => includeIds.includes(snippetKey(t)));
}

/**
 * Translate all snippets
 *
 * We are now always using workers, as we are targeting Node 12+.
 */
async function translateAll(
  snippets: TypeScriptSnippet[],
  includeCompilerDiagnostics: boolean,
): Promise<TranslateAllResult> {
  return workerBasedTranslateAll(snippets, includeCompilerDiagnostics);
}

/**
 * Translate the given snippets using a single compiler
 *
 * Used both here (directly) and via extract_worker to translate a batch of
 * snippets in parallel.
 */
export function singleThreadedTranslateAll(
  snippets: TypeScriptSnippet[],
  includeCompilerDiagnostics: boolean,
): TranslateAllResult {
  const translatedSnippets = new Array<TranslatedSnippet>();

  const failures = new Array<RosettaDiagnostic>();

  const translator = new Translator(includeCompilerDiagnostics);
  for (const block of snippets) {
    try {
      translatedSnippets.push(translator.translate(block));
    } catch (e) {
      failures.push(
        makeRosettaDiagnostic(true, `rosetta: error translating snippet: ${e}\n${e.stack}\n${block.completeSource}`),
      );
    }
  }

  return {
    translatedSnippets,
    diagnostics: [...translator.diagnostics, ...failures],
  };
}

/**
 * Divide the work evenly over all processors by running 'extract_worker' in Worker Threads, then combine results
 *
 * The workers are fed small queues of work each. We used to divide the entire queue into N
 * but since the work is divided unevenly that led to some workers stopping early, idling while
 * waiting for more work.
 *
 * Never include 'extract_worker' directly, only do TypeScript type references (so that in
 * the script we may assume that 'worker_threads' successfully imports).
 */
async function workerBasedTranslateAll(
  snippets: TypeScriptSnippet[],
  includeCompilerDiagnostics: boolean,
): Promise<TranslateAllResult> {
  // Use about half the advertised cores because hyperthreading doesn't seem to
  // help that much, or we become I/O-bound at some point. On my machine, using
  // more than half the cores actually makes it slower.
  // Cap to a reasonable top-level limit to prevent thrash on machines with many, many cores.
  const maxWorkers = parseInt(process.env.JSII_ROSETTA_MAX_WORKER_COUNT ?? '16');
  const N = Math.min(maxWorkers, Math.max(1, Math.ceil(os.cpus().length / 2)));
  const snippetArr = Array.from(snippets);
  logging.info(`Translating ${snippetArr.length} snippets using ${N} workers`);

  const pool = workerpool.pool(path.join(__dirname, 'extract_worker.js'), {
    maxWorkers: N,
  });

  try {
    const requests = batchSnippets(snippetArr, includeCompilerDiagnostics);

    const responses: TranslateBatchResponse[] = await Promise.all(
      requests.map((request) => pool.exec('translateBatch', [request])),
    );

    const diagnostics = new Array<RosettaDiagnostic>();
    const translatedSnippets = new Array<TranslatedSnippet>();

    // Combine results
    for (const response of responses) {
      diagnostics.push(...response.diagnostics);
      translatedSnippets.push(...response.translatedSchemas.map(TranslatedSnippet.fromSchema));
    }
    return { diagnostics, translatedSnippets };
  } finally {
    // Not waiting on purpose
    void pool.terminate();
  }
}

function batchSnippets(
  snippets: TypeScriptSnippet[],
  includeCompilerDiagnostics: boolean,
  batchSize = 10,
): TranslateBatchRequest[] {
  const ret = [];

  for (let i = 0; i < snippets.length; i += batchSize) {
    ret.push({
      snippets: snippets.slice(i, i + batchSize),
      includeCompilerDiagnostics,
    });
  }

  return ret;
}

/**
 * Try and read as many snippet translations from the cache as possible, adding them to the target tablet
 *
 * Removes the already translated snippets from the input array.
 */
async function reuseTranslationsFromCache(
  snippets: TypeScriptSnippet[],
  tablet: LanguageTablet,
  cacheFile: string,
  fingerprinter: TypeFingerprinter,
) {
  try {
    const cache = await LanguageTablet.fromFile(cacheFile);

    let snippetsFromCacheCtr = 0;
    let i = 0;
    while (i < snippets.length) {
      const fromCache = tryReadFromCache(snippets[i], cache, fingerprinter);
      if (fromCache) {
        tablet.addSnippet(fromCache);
        snippets.splice(i, 1);
        snippetsFromCacheCtr += 1;
      } else {
        i += 1;
      }
    }

    logging.info(`Reused ${snippetsFromCacheCtr} translations from cache ${cacheFile}`);
  } catch (e) {
    logging.warn(`Error reading cache ${cacheFile}: ${e.message}`);
  }
}

/**
 * Try to find the translation for the given snippet in the given cache
 *
 * Rules for cacheability are:
 * - id is the same (== visible source didn't change)
 * - complete source is the same (== fixture didn't change)
 * - all types involved have the same fingerprint (== API surface didn't change)
 */
function tryReadFromCache(sourceSnippet: TypeScriptSnippet, cache: LanguageTablet, fingerprinter: TypeFingerprinter) {
  const fromCache = cache.tryGetSnippet(snippetKey(sourceSnippet));

  if (fromCache) {
    if (completeSource(sourceSnippet) !== fromCache.snippet.fullSource) {
      console.log(sourceSnippet);
      console.log(completeSource(sourceSnippet));
      console.log('---------------------------------------');
      console.log(fromCache.snippet.fullSource);
      console.log('=========================================');
    }
  }

  const cacheable =
    fromCache &&
    completeSource(sourceSnippet) === fromCache.snippet.fullSource &&
    fingerprinter.fingerprintAll(fromCache.fqnsReferenced()) === fromCache.snippet.fqnsFingerprint;

  return cacheable ? fromCache : undefined;
}
