import * as jsii from '@jsii/spec';

import { ModuleLike } from './module-like';
import { Type } from './type';
import { TypeSystem } from './type-system';

export class Submodule extends ModuleLike {
  /**
   * The simple name of the submodule (the last segment of the `fullName`).
   */
  public readonly name: string;

  public constructor(
    system: TypeSystem,
    public readonly spec: jsii.Submodule,
    public readonly fqn: string,
    public readonly submodules: readonly Submodule[],
    public readonly types: readonly Type[],
  ) {
    super(system);

    this.name = fqn.split('.').pop()!;
  }

  /**
   * A map of target name to configuration, which is used when generating packages for
   * various languages.
   */
  public get targets() {
    return this.spec.targets;
  }

  /**
   * The top-level readme document for this assembly (if any).
   */
  public get readme() {
    return this.spec.readme;
  }
}
