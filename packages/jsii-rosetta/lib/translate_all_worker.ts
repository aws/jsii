/**
 * Pool worker for extract.ts
 */
import * as workerpool from 'workerpool';

import { TypeScriptSnippet } from './snippet';
import { TranslatedSnippetSchema } from './tablets/schema';
import { TranslatedSnippet } from './tablets/tablets';
import { RosettaDiagnostic, Translator, makeRosettaDiagnostic } from './translate';
import { TranslateAllResult } from './translate_all';

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

/**
 * Translate the given snippets using a single compiler
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

workerpool.worker({ translateBatch });
