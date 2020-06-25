// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import * as crypto from 'crypto';
import { TypeScriptSnippet } from '../snippet';

/**
 * Determine the key for a code block
 */
export function snippetKey(snippet: TypeScriptSnippet) {
  const h = crypto.createHash('sha256');
  h.update(snippet.visibleSource);
  return h.digest('hex');
}
