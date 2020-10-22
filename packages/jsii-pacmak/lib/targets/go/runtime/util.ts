import { CodeMaker } from 'codemaker';

import { JSII_INIT_ALIAS, JSII_INIT_FUNC } from './constants';

// Emits call to initialize runtime client if not already
export function emitInitialization(code: CodeMaker) {
  code.line(`${JSII_INIT_ALIAS}.${JSII_INIT_FUNC}()`);
}

/**
 * Slugify a name by appending '_' at the end until the resulting name is not
 * present in the list of reserved names.
 *
 * @param name     the name to be slugified
 * @param reserved the list of names that are already sued in-scope
 *
 * @returns the slugified name
 */
export function slugify(name: string, reserved: Iterable<string>): string {
  const used = new Set(reserved);
  while (used.has(name)) {
    name += '_';
  }
  return name;
}
