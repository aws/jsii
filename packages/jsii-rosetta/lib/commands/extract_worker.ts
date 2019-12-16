/**
 * Pool worker for extract.ts
 */
import { TypeScriptSnippet } from '../snippet';
import * as ts from 'typescript';
import { singleThreadedTranslateAll } from './extract';
import * as worker from 'worker_threads';
import { TranslatedSnippetSchema } from '../tablets/schema';

export interface TranslateRequest {
  includeCompilerDiagnostics: boolean;
  snippets: TypeScriptSnippet[];
}

export interface TranslateResponse {
  diagnostics: ts.Diagnostic[];
  // Cannot be 'TranslatedSnippet' because needs to be serializable
  translatedSnippetSchemas: TranslatedSnippetSchema[];
}

function translateSnippet(request: TranslateRequest): TranslateResponse {
  const result = singleThreadedTranslateAll(request.snippets[Symbol.iterator](), request.includeCompilerDiagnostics);

  return { diagnostics: result.diagnostics, translatedSnippetSchemas: result.translatedSnippets.map(s => s.toSchema()) };
}

if (worker.isMainThread) {
  // Throw an error to prevent accidental require() of this module. In principle not a big
  // deal, but we want to be compatible with run modes where 'worker_threads' is not available
  // and by doing this people on platforms where 'worker_threads' is available don't accidentally
  // add a require().
  throw new Error('This script should be run as a worker, not included directly.');
}

const request = worker.workerData;
const response = translateSnippet(request);
worker.parentPort!.postMessage(response);