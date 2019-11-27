import { loadAssemblies, allTypeScriptSnippets } from '../jsii/assemblies';
import logging = require('../logging');
import os = require('os');
import path = require('path');
import ts = require('typescript');
import { LanguageTablet, TranslatedSnippet } from '../tablets/tablets';
import { Translator } from '../translate';
import { TypeScriptSnippet } from '../snippet';
import { divideEvenly } from '../util';

export interface ExtractResult {
  diagnostics: ts.Diagnostic[];
  tablet: LanguageTablet;
}

/**
 * Extract all samples from the given assemblies into a tablet
 */
export async function extractSnippets(assemblyLocations: string[], outputFile: string, includeCompilerDiagnostics: boolean): Promise<ExtractResult> {
  logging.info(`Loading ${assemblyLocations.length} assemblies`);
  const assemblies = await loadAssemblies(assemblyLocations);

  const snippets = allTypeScriptSnippets(assemblies);

  const tablet = new LanguageTablet();

  logging.info('Translating');
  const startTime = Date.now();

  const result = await translateAll(snippets, includeCompilerDiagnostics);

  for (const snippet of result.translatedSnippets) {
    tablet.addSnippet(snippet);
  }

  const delta = (Date.now() - startTime) / 1000;
  logging.info(`Converted ${tablet.count} snippets in ${delta} seconds (${(delta / tablet.count).toPrecision(3)}s/snippet)`);
  logging.info(`Saving language tablet to ${outputFile}`);
  await tablet.save(outputFile);

  return { diagnostics: result.diagnostics, tablet };
}

interface TranslateAllResult {
  translatedSnippets: TranslatedSnippet[];
  diagnostics: ts.Diagnostic[];
}

/**
 * Translate all snippets
 *
 * Uses a worker-based parallel translation if available, falling back to a single-threaded workflow if not.
 */
async function translateAll(snippets: IterableIterator<TypeScriptSnippet>, includeCompilerDiagnostics: boolean): Promise<TranslateAllResult> {
  try {
    const worker = await import('worker_threads');

    return workerBasedTranslateAll(worker, snippets, includeCompilerDiagnostics);
  } catch(e) {
    if (e.code !== 'MODULE_NOT_FOUND') { throw e; }
    logging.warn('Worker threads not available (use NodeJS >= 10.5 and --experimental-worker). Working sequentially.');

    return singleThreadedTranslateAll(snippets, includeCompilerDiagnostics);
  }
}

/**
 * Translate the given snippets using a single compiler
 *
 * Used both here (directly) and via extract_worker to translate a batch of
 * snippets in parallel.
 */
export function singleThreadedTranslateAll(snippets: IterableIterator<TypeScriptSnippet>, includeCompilerDiagnostics: boolean): TranslateAllResult {
  const translatedSnippets = new Array<TranslatedSnippet>();

  const translator = new Translator(includeCompilerDiagnostics);
  for (const block of snippets) {
    translatedSnippets.push(translator.translate(block));
  }

  return { translatedSnippets, diagnostics: translator.diagnostics };
}

/**
 * Divide the work evenly over all processors by running 'extract_worker' in Worker Threads, then combine results
 *
 * Never include 'extract_worker' directly, only do TypeScript type references (so that in
 * the script we may assume that 'worker_threads' successfully imports).
 */
async function workerBasedTranslateAll(worker: typeof import('worker_threads'), snippets: IterableIterator<TypeScriptSnippet>, includeCompilerDiagnostics: boolean): Promise<TranslateAllResult> {
  // Use about half the advertised cores because hyperthreading doesn't seem to help that
  // much (on my machine, using more than half the cores actually makes it slower).
  const N = Math.max(1, Math.ceil(os.cpus().length / 2));
  const snippetArr = Array.from(snippets);
  const groups = divideEvenly(N, snippetArr);
  logging.info(`Translating ${snippetArr.length} snippets using ${groups.length} workers`);

  // Run workers
  const responses = await Promise.all(groups
    .map(snippets => ({ snippets, includeCompilerDiagnostics }))
    .map(runWorker));

  // Combine results
  const x = responses.reduce((acc, current) => {
    // Modifying 'acc' in place to not incur useless copying
    acc.translatedSnippetSchemas.push(...current.translatedSnippetSchemas);
    acc.diagnostics.push(...current.diagnostics);
    return acc;
  }, { translatedSnippetSchemas: [], diagnostics: [] });
  // Hydrate TranslatedSnippets from data back to objects
  return { diagnostics: x.diagnostics, translatedSnippets: x.translatedSnippetSchemas.map(s => TranslatedSnippet.fromSchema(s)) };

  /**
   * Turn running the worker into a nice Promise.
   */
  async function runWorker(request: import('./extract_worker').TranslateRequest): Promise<import('./extract_worker').TranslateResponse> {
    return new Promise((resolve, reject) => {
      const wrk = new worker.Worker(path.join(__dirname, 'extract_worker.js'), { workerData: request });
      wrk.on('message', resolve);
      wrk.on('error', reject);
      wrk.on('exit', code => {
        if (code !== 0) {
          reject(new Error(`Worker exited with code ${code}`));
        }
      });
    });
  }
}
