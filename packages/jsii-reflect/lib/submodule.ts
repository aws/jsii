import * as jsii from '@jsii/spec';

import { Assembly } from './assembly';
import { ModuleLike } from './module-like';
import { Type } from './type';
import { TypeSystem } from './type-system';

export class Submodule extends ModuleLike {
  /**
   * The simple name of the submodule (the last segment of the `fullName`).
   */
  public readonly name: string;

  /**
   * The parent assembly of the submodule.
   */
  public readonly parent: Assembly;

  public constructor(
    system: TypeSystem,
    public readonly spec: jsii.Submodule,
    public readonly fqn: string,
    protected readonly submoduleMap: ReadonlyMap<string, Submodule>,
    protected readonly typeMap: ReadonlyMap<string, Type>,
    parent: Assembly,
  ) {
    super(system);

    this.name = fqn.split('.').pop()!;
    this.parent = parent;
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
