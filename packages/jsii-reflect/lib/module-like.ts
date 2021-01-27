import * as jsii from '@jsii/spec';

import { ClassType } from './class';
import { EnumType } from './enum';
import { InterfaceType } from './interface';
import { Submodule } from './submodule';
import { Type } from './type';
import { TypeSystem } from './type-system';

export abstract class ModuleLike {
  public declare abstract readonly fqn: string;

  /**
   * Return direct submodules
   */
  public declare abstract readonly submodules: readonly Submodule[];
  public declare abstract readonly types: readonly Type[];

  /**
   * A map of target name to configuration, which is used when generating packages for
   * various languages.
   */
  public declare abstract readonly targets?: jsii.AssemblyTargets;
  public declare abstract readonly readme?: jsii.ReadMe;

  protected constructor(public readonly system: TypeSystem) {}

  public get classes(): readonly ClassType[] {
    return this.types
      .filter((t) => t instanceof ClassType)
      .map((t) => t as ClassType);
  }

  public get interfaces(): readonly InterfaceType[] {
    return this.types
      .filter((t) => t instanceof InterfaceType)
      .map((t) => t as InterfaceType);
  }

  public get enums(): readonly EnumType[] {
    return this.types
      .filter((t) => t instanceof EnumType)
      .map((t) => t as EnumType);
  }

  public tryFindType(fqn: string): Type | undefined {
    const ownType = this.types.find((type) => type.fqn === fqn);
    if (ownType != null) {
      return ownType;
    }

    if (!fqn.startsWith(`${this.fqn}.`)) {
      return undefined;
    }

    const myFqnLength = this.fqn.split('.').length;
    const subFqn = fqn
      .split('.')
      .slice(0, myFqnLength + 1)
      .join('.');
    const sub = this.submodules.find((sub) => sub.fqn === subFqn);
    return sub?.tryFindType(fqn);
  }
}
