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
    public readonly fqn: string,
    protected readonly submoduleMap: Readonly<Record<string, Submodule>>,
    protected readonly typeMap: Readonly<Record<string, Type>>,
  ) {
    super(system);

    this.name = fqn.split('.').pop()!;
  }
}
