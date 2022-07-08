import * as crypto from 'crypto';

import { RecordReferencesVisitor } from '../languages/record-references';
import { TypeScriptSnippet, renderApiLocation } from '../snippet';

/**
 * Determine the key for a code block
 */
export function snippetKey(snippet: TypeScriptSnippet) {
  const h = crypto.createHash('sha256');
  h.update(String(RecordReferencesVisitor.VERSION));
  // Mix in API location to distinguish between similar snippets
  h.update(renderApiLocation(snippet.location.api));
  h.update(':');
  h.update(snippet.visibleSource);
  return h.digest('hex');
}
