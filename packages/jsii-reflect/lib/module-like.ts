import { ClassType } from './class';
import { EnumType } from './enum';
import { InterfaceType } from './interface';
import { Submodule } from './submodule';
import { Type } from './type';
import { TypeSystem } from './type-system';

export abstract class ModuleLike {
  public declare abstract readonly fqn: string;
  public declare abstract readonly submodules: readonly Submodule[];
  public declare abstract readonly types: readonly Type[];

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

    const [subName] = fqn.slice(this.fqn.length + 1).split('.');
    const sub = this.submodules.find((sub) => sub.name === subName);
    return sub?.tryFindType(fqn);
  }
}
