import * as ts from 'typescript';

/**
 * An object that is capable of emitting stuff.
 */
export interface Emitter {
  /**
   * Attempts to emit stuff.
   *
   * @return the result of attempting to emit stuff.
   */
  emit(): ts.EmitResult;
}
