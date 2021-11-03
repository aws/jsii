import * as crypto from 'crypto';

import { TypeScriptSnippet, renderApiLocation } from '../snippet';

/**
 * Determine the key for a code block
 */
export function snippetKey(snippet: TypeScriptSnippet) {
  const h = crypto.createHash('sha256');
  // Mix in API location to distinguish between similar snippets
  h.update(renderApiLocation(snippet.location.api));
  h.update(':');
  h.update(snippet.visibleSource);
  return h.digest('hex');
}
