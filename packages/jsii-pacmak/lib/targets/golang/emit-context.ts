import { CodeMaker } from 'codemaker';
import { Rosetta } from 'jsii-rosetta';

/**
 * The context in which Golang code is emitted.
 */
export interface EmitContext {
  /** A CodeMaker to write out source code. */
  readonly code: CodeMaker;
  /** A Rosetta stone to translate code examples. */
  readonly rosetta: Rosetta;
}
