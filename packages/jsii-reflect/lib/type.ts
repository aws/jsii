import jsii = require('jsii-spec');
import { Assembly } from './assembly';
import { ClassType } from './class';
import { Docs, Documentable } from './docs';
import { EnumType } from './enum';
import { InterfaceType } from './interface';
import { TypeSystem } from './type-system';

export abstract class Type implements Documentable {
  constructor(
    public readonly system: TypeSystem,
    public readonly assembly: Assembly,
    private readonly spec: jsii.Type) { }

  public toString(): string {
    return `${this.kind} ${this.fqn}`;
  }

  /**
   * The fully qualified name of the type (``<assembly>.<namespace>.<name>``)
   */
  public get fqn(): string {
    return this.spec.fqn;
  }

  /**
   * The namespace of the type (``foo.bar.baz``). When undefined, the type is located at the root of the assembly
   * (it's ``fqn`` would be like ``<assembly>.<name>``). If the `namespace` corresponds to an existing type's
   * namespace-qualified (e.g: ``<namespace>.<name>``), then the current type is a nested type.
   */
  public get namespace(): string | undefined {
    return this.spec.namespace;
  }

  /**
   * The simple name of the type (MyClass).
   */
  public get name(): string {
    return this.spec.name;
  }

  /**
   * The kind of the type.
   */
  public get kind(): jsii.TypeKind {
    return this.spec.kind;
  }

  public get docs(): Docs {
    return new Docs(this.system, this, this.spec.docs || {});
  }

  /**
   * Determines whether this is a Class type or not.
   */
  public isClassType(): this is ClassType {
    return false;
  }

  /**
   * Determines whether this is a Data Type (that is, an interface with no methods) or not.
   */
  public isDataType(): this is InterfaceType {
    return false;
  }

  /**
   * Determines whether this is an Enum type or not.
   */
  public isEnumType(): this is EnumType {
    return false;
  }

  /**
   * Determines whether this is an Interface type or not.
   */
  public isInterfaceType(): this is InterfaceType {
    return false;
  }

  /**
   * Determines whether this type extends a given base or not.
   *
   * @param base the candidate base type.
   */
  public extends(base: Type): boolean {
    if (this === base) {
      return true;
    }
    if ((this.isInterfaceType() || this.isClassType()) && base.isInterfaceType()) {
      return this.getInterfaces(true).some(iface => iface === base);
    }
    if (this.isClassType() && base.isClassType()) {
      return this.getAncestors().some(clazz => clazz === base);
    }
    return false;
  }

  /**
   * Finds all type that:
   * - extend this, if this is a ClassType
   * - implement this, if this is an InterfaceType (this includes interfaces extending this)
   *
   * As classes and interfaces are considered to extend themselves, "this" will be part of all return values when called
   * on classes and interfaces.
   *
   * The result will always be empty for types that are neither ClassType nor InterfaceType.
   */
  public get allImplementations(): Type[] {
    if (this.isClassType() || this.isInterfaceType()) {
      return [
        ...this.system.classes.filter(c => c.extends(this)),
        ...this.system.interfaces.filter(i => i.extends(this)),
      ];
    }
    return [];
  }
}
