import * as assert from 'assert';

import { IRandomNumberGenerator } from '../calculator';
import { UnimportedSubmoduleType } from './donotimport';

export * as donotimport from './donotimport';

export abstract class Cdk16625 {
  /**
   * Implement this functin to return `gen.next()`. It is extremely important
   * that the `donotimport` submodule is NEVER explicitly loaded in the testing
   * application (otherwise this test is void).
   *
   * @param gen a VERY pseudo random number generator.
   */
  protected abstract unwrap(gen: IRandomNumberGenerator): number;

  /**
   * Run this function to verify that everything is working as it should.
   */
  public test(): void {
    const value = 1337;
    const rng = new UnimportedSubmoduleType(value);
    assert(this.unwrap(rng) === value);
  }
}
