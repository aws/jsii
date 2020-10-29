import { CodeMaker } from 'codemaker';

import { Documentation } from './documentation';

/**
 * The context in which Golang code is emitted.
 */
export interface EmitContext {
  /** A CodeMaker to write out source code. */
  readonly code: CodeMaker;

  /** A Documentation generator. Includes Rosetta stone to translate code examples. */
  readonly documenter: Documentation;
}
