import jsii = require('jsii-spec');
import { Assembly } from './assembly';
import { Method } from './method';
import { Property } from './property';
import { Type } from './type';
import { TypeSystem } from './type-system';

export class InterfaceType extends Type {
  constructor(
    public system: TypeSystem,
    public assembly: Assembly,
    private interfaceSpec: jsii.InterfaceType) {
    super(system, assembly, interfaceSpec);
  }

  public get kind(): jsii.TypeKind {
    return this.interfaceSpec.kind;
  }

  /**
   * All the base interfaces that this interface extends.
   */
  public get interfaces(): InterfaceType[] {
    if (!this.interfaceSpec.interfaces) {
      return [];
    }

    return this.interfaceSpec.interfaces.map(i => this.system.findInterface(i.fqn));
  }

  /**
   * List of methods.
   */
  public get methods(): Method[] {
    return this.getMethods();
  }

  /**
   * List of properties.
   */
  get properties(): Property[] {
    return this.getProperties();
  }

  /**
   * True if this interface only contains properties. Different backends might
   * have idiomatic ways to allow defining concrete instances such interfaces.
   * For example, in Java, the generator will produce a PoJo and a builder
   * which will allow users to create a concrete object with data which
   * adheres to this interface.
   */
  public get datatype(): boolean {
    return !!this.datatype;
  }

  public getMethods(inherited = false) {
    const out = new Array<Method>();
    if (inherited) {
      for (const base of this.interfaces) {
        out.push(...base.getMethods(inherited));
      }
    }
    if (this.interfaceSpec.methods) {
      out.push(...this.interfaceSpec.methods.map(m => new Method(this.system, this.assembly, this, m)));
    }
    return out;
  }

  public getProperties(inherited = false) {
    const out = new Array<Property>();
    if (inherited) {
      for (const base of this.interfaces) {
        out.push(...base.getProperties(inherited));
      }
    }
    if (this.interfaceSpec.properties) {
      out.push(...this.interfaceSpec.properties.map(p => new Property(this.system, this.assembly, this, p)));
    }
    return out;
  }
}