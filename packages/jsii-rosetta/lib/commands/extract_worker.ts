/**
 * Pool worker for extract.ts
 */
import * as workerpool from 'workerpool';

import { TypeScriptSnippet } from '../snippet';
import { TranslatedSnippetSchema } from '../tablets/schema';
import { RosettaDiagnostic } from '../translate';
import { singleThreadedTranslateAll } from './extract';

export interface TranslateBatchRequest {
  readonly snippets: TypeScriptSnippet[];
  readonly includeCompilerDiagnostics: boolean;
}

export interface TranslateBatchResponse {
  // Cannot be 'TranslatedSnippet' because needs to be serializable
  readonly translatedSchemas: TranslatedSnippetSchema[];
  readonly diagnostics: RosettaDiagnostic[];
}

function translateBatch(request: TranslateBatchRequest): TranslateBatchResponse {
  const result = singleThreadedTranslateAll(request.snippets, request.includeCompilerDiagnostics);

  return {
    translatedSchemas: result.translatedSnippets.map((s) => s.snippet),
    diagnostics: result.diagnostics,
  };
}

workerpool.worker({ translateBatch });
