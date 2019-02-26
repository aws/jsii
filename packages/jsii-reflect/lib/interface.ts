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

  /**
   * All the base interfaces that this interface extends.
   */
  public get interfaces(): InterfaceType[] {
    return this.getInterfaces();
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
  public get properties(): Property[] {
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

  /**
   * Lists all interfaces this interface extends.
   * @param inherited include all interfaces implemented by all super interfaces (default: false)
   */
  public getInterfaces(inherited = false): InterfaceType[] {
    if (!this.interfaceSpec.interfaces) {
      return [];
    }

    const result = new Set<InterfaceType>();
    for (const iface of this.interfaceSpec.interfaces) {
      const ifaceType = this.system.findInterface(iface.fqn);
      if (!result.has(ifaceType) && inherited) {
        ifaceType.getInterfaces(inherited).forEach(i => result.add(i));
      }
      result.add(ifaceType);
    }
    return Array.from(result);
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

  public isDataType() {
    return !!this.interfaceSpec.datatype;
  }

  public isInterfaceType() {
    return true;
  }
}
