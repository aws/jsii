import * as os from 'os';
import * as path from 'path';
import * as ts from 'typescript';
import * as workerpool from 'workerpool';

import { loadAssemblies, allTypeScriptSnippets } from '../jsii/assemblies';
import * as logging from '../logging';
import { TypeScriptSnippet } from '../snippet';
import { snippetKey } from '../tablets/key';
import { LanguageTablet, TranslatedSnippet } from '../tablets/tablets';
import { RosettaDiagnostic, Translator, rosettaDiagFromTypescript } from '../translate';
import type { TranslateBatchRequest, TranslateBatchResponse } from './extract_worker';

export interface ExtractResult {
  diagnostics: RosettaDiagnostic[];
  tablet: LanguageTablet;
}

export interface ExtractOptions {
  outputFile: string;
  includeCompilerDiagnostics: boolean;
  validateAssemblies: boolean;
  only?: string[];
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

  let snippets = allTypeScriptSnippets(assemblies, loose);
  if (only.length > 0) {
    snippets = filterSnippets(snippets, only);
  }

  const tablet = new LanguageTablet();

  logging.info('Translating');
  const startTime = Date.now();

  const result = await translateAll(snippets, options.includeCompilerDiagnostics);

  for (const snippet of result.translatedSnippets) {
    tablet.addSnippet(snippet);
  }

  const delta = (Date.now() - startTime) / 1000;
  logging.info(
    `Converted ${tablet.count} snippets in ${delta} seconds (${(delta / tablet.count).toPrecision(3)}s/snippet)`,
  );
  logging.info(`Saving language tablet to ${options.outputFile}`);
  await tablet.save(options.outputFile);

  return { diagnostics: result.diagnostics, tablet };
}

interface TranslateAllResult {
  translatedSnippets: TranslatedSnippet[];
  diagnostics: RosettaDiagnostic[];
}

/**
 * Only yield the snippets whose id exists in a whitelist
 */
function* filterSnippets(ts: IterableIterator<TypeScriptSnippet>, includeIds: string[]) {
  for (const t of ts) {
    if (includeIds.includes(snippetKey(t))) {
      yield t;
    }
  }
}

/**
 * Translate all snippets
 *
 * We are now always using workers, as we are targeting Node 12+.
 */
async function translateAll(
  snippets: IterableIterator<TypeScriptSnippet>,
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
  snippets: IterableIterator<TypeScriptSnippet>,
  includeCompilerDiagnostics: boolean,
): TranslateAllResult {
  const translatedSnippets = new Array<TranslatedSnippet>();

  const failures = new Array<ts.Diagnostic>();

  const translator = new Translator(includeCompilerDiagnostics);
  for (const block of snippets) {
    try {
      translatedSnippets.push(translator.translate(block));
    } catch (e) {
      failures.push({
        category: ts.DiagnosticCategory.Error,
        code: 999,
        messageText: `rosetta: error translating snippet: ${e}\n${e.stack}\n${block.completeSource}`,
        file: undefined,
        start: undefined,
        length: undefined,
      });
    }
  }

  return {
    translatedSnippets,
    diagnostics: [...translator.diagnostics, ...failures].map(rosettaDiagFromTypescript),
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
  snippets: IterableIterator<TypeScriptSnippet>,
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
