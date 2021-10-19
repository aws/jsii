/**
 * Pool worker for extract.ts
 */
import * as worker from 'worker_threads';

import { TypeScriptSnippet } from '../snippet';
import { TranslatedSnippetSchema } from '../tablets/schema';
import { RosettaDiagnostic } from '../translate';
import { WorkRequest, WorkResponse } from '../worker-pool';
import { singleThreadedTranslateAll } from './extract';

export type TranslateRequest = WorkRequest<TypeScriptSnippet, TranslateMetadata>;
export type TranslateResponse = WorkResponse<SnippetBatchResult>;

export interface TranslateMetadata {
  readonly includeCompilerDiagnostics: boolean;
}

export interface SnippetBatchResult {
  readonly diagnostics: RosettaDiagnostic[];
  // Cannot be 'TranslatedSnippet' because needs to be serializable
  readonly translatedSchema: TranslatedSnippetSchema;
}

function translateSnippetBatch(snippets: TypeScriptSnippet[], metadata: TranslateMetadata): SnippetBatchResult[] {
  const result = singleThreadedTranslateAll(snippets[Symbol.iterator](), metadata.includeCompilerDiagnostics);

  // The following is a bit silly: since we won't actually know which snippet a diagnostic
  // originated from, and the protocol requires us to return an array of snippets, we'll
  // just attach all diagnostics to the first snippet we return. It doesn't matter since they
  // all get collated on the other end anyway.
  const ret: SnippetBatchResult[] = result.translatedSnippets.map((s) => ({
    translatedSchema: s.toSchema(),
    diagnostics: [],
  }));
  if (ret.length > 0) {
    ret[0].diagnostics.push(...result.diagnostics);
  }

  return ret;
}

if (worker.isMainThread) {
  // Throw an error to prevent accidental require() of this module. In principle not a big
  // deal, but we want to be compatible with run modes where 'worker_threads' is not available
  // and by doing this people on platforms where 'worker_threads' is available don't accidentally
  // add a require().
  throw new Error('This script should be run as a worker, not included directly.');
}

worker.parentPort!.on('message', (m: TranslateRequest) => {
  try {
    const responses = translateSnippetBatch(m.requests, m.metadata!);
    worker.parentPort!.postMessage({ id: m.id, responses } as TranslateResponse);
  } catch (e) {
    worker.parentPort!.postMessage({ id: m.id, error: e } as TranslateResponse);
  }
});
