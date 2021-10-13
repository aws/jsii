import type { IRandomNumberGenerator } from '../../calculator';

/**
 * This type demonstrates the ability to receive a callback argument that has a
 * type from a submodule not explicitly imported in the user's code. This checks
 * that all types available in the assembly can be resolved by the runtime
 * library, regardless of whether they were explicitly referenced or not.
 *
 * @see https://github.com/aws/aws-cdk/issues/16625
 */
export class UnimportedSubmoduleType implements IRandomNumberGenerator {
  public constructor(private readonly value: number) {}

  /**
   * Not quite random, but it'll do.
   *
   * @returns 1337
   */
  public next(): number {
    return this.value;
  }
}
