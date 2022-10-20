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
   * A map of target name to configuration, which is used when generating packages for
   * various languages.
   */
  public declare abstract readonly targets?: jsii.AssemblyTargets;
  public declare abstract readonly readme?: jsii.ReadMe;

  protected declare abstract readonly submoduleMap: ReadonlyMap<
    string,
    Submodule
  >;
  protected declare abstract readonly typeMap: ReadonlyMap<string, Type>;

  /**
   * Cache for the results of `tryFindType`.
   */
  private readonly typeLocatorCache = new Map<string, Type | undefined>();

  protected constructor(public readonly system: TypeSystem) {}

  public get submodules(): readonly Submodule[] {
    return Array.from(this.submoduleMap.values());
  }

  /**
   * All types in this module/namespace (not submodules)
   */
  public get types(): readonly Type[] {
    return Array.from(this.typeMap.values());
  }

  /**
   * All classes in this module/namespace (not submodules)
   */
  public get classes(): readonly ClassType[] {
    return this.types
      .filter((t) => t instanceof ClassType)
      .map((t) => t as ClassType);
  }

  /**
   * All interfaces in this module/namespace (not submodules)
   */
  public get interfaces(): readonly InterfaceType[] {
    return this.types
      .filter((t) => t instanceof InterfaceType)
      .map((t) => t as InterfaceType);
  }

  /**
   * All enums in this module/namespace (not submodules)
   */
  public get enums(): readonly EnumType[] {
    return this.types
      .filter((t) => t instanceof EnumType)
      .map((t) => t as EnumType);
  }

  public tryFindType(fqn: string): Type | undefined {
    if (this.typeLocatorCache.has(fqn)) {
      return this.typeLocatorCache.get(fqn);
    }

    const ownType = this.typeMap.get(fqn);
    if (ownType != null) {
      this.typeLocatorCache.set(fqn, ownType);
      return ownType;
    }

    if (!fqn.startsWith(`${this.fqn}.`)) {
      this.typeLocatorCache.set(fqn, undefined);
      return undefined;
    }

    const myFqnLength = this.fqn.split('.').length;
    const subFqn = fqn
      .split('.')
      .slice(0, myFqnLength + 1)
      .join('.');
    const sub = this.submoduleMap.get(subFqn);
    const submoduleType = sub?.tryFindType(fqn);
    this.typeLocatorCache.set(fqn, submoduleType);
    return submoduleType;
  }
}
