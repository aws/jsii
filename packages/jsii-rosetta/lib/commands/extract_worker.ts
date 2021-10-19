/**
 * Pool worker for extract.ts
 */
import * as worker from 'worker_threads';

import * as logging from '../logging';
import { TypeScriptSnippet } from '../snippet';
import { TranslatedSnippetSchema } from '../tablets/schema';
import { RosettaDiagnostic } from '../translate';
import { singleThreadedTranslateAll } from './extract';

export interface TranslateRequest {
  includeCompilerDiagnostics: boolean;
  snippets: TypeScriptSnippet[];
}

export interface TranslateResponse {
  diagnostics: RosettaDiagnostic[];
  // Cannot be 'TranslatedSnippet' because needs to be serializable
  translatedSnippetSchemas: TranslatedSnippetSchema[];
}

function translateSnippet(request: TranslateRequest): TranslateResponse {
  const result = singleThreadedTranslateAll(request.snippets[Symbol.iterator](), request.includeCompilerDiagnostics);

  return {
    diagnostics: result.diagnostics,
    translatedSnippetSchemas: result.translatedSnippets.map((s) => s.toSchema()),
  };
}

if (worker.isMainThread) {
  // Throw an error to prevent accidental require() of this module. In principle not a big
  // deal, but we want to be compatible with run modes where 'worker_threads' is not available
  // and by doing this people on platforms where 'worker_threads' is available don't accidentally
  // add a require().
  throw new Error('This script should be run as a worker, not included directly.');
}

const request: TranslateRequest = worker.workerData;
const startTime = Date.now();
const response = translateSnippet(request);
const delta = (Date.now() - startTime) / 1000;
// eslint-disable-next-line prettier/prettier
logging.info(`Finished translation of ${request.snippets.length} in ${delta.toFixed(0)}s (${response.translatedSnippetSchemas.length} responses)`);
worker.parentPort!.postMessage(response);
