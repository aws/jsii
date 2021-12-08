import { submodule } from '@scope/jsii-calc-lib';
import { Reflector } from '@scope/jsii-calc-lib/lib/submodule';

/**
 * Ensures submodule-imported types from dependencies can be used correctly.
 */
export class UpcasingReflectable implements submodule.IReflectable {
  /**
   * Check that we can reference a type from a submodule using a scoped name
   */
  public static readonly reflector = new submodule.Reflector();

  /**
   * Check that we can reference a type from a submodule if we import it directly
   *
   * We don't need to use the type, just referencing it and having the jsii compiler
   * not throw an error is good enough.
   */
  public static readonly reflector2 = new Reflector();

  public constructor(private readonly delegate: Record<string, unknown>) {}

  public get entries(): submodule.ReflectableEntry[] {
    return Object.entries(this.delegate).map(([key, value]) => ({
      key: key.toLocaleUpperCase(),
      value,
    }));
  }
}
