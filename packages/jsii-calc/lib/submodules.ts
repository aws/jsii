import { submodule } from '@scope/jsii-calc-lib';

/**
 * Ensures submodule-imported types from dependencies can be used correctly.
 */
export class UpcasingReflectable implements submodule.IReflectable {
  public static readonly reflector = new submodule.Reflector();

  public constructor(private readonly delegate: Record<string, unknown>) {}

  public get entries(): submodule.ReflectableEntry[] {
    return Object.entries(this.delegate).map(([key, value]) => ({
      key: key.toLocaleUpperCase(),
      value,
    }));
  }
}
