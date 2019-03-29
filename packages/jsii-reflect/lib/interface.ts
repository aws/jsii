import jsii = require('jsii-spec');
import { Assembly } from './assembly';
import { Method } from './method';
import { Property } from './property';
import { Type } from './type';
import { TypeMember } from './type-member';
import { TypeSystem } from './type-system';
import { indexBy } from './util';

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
    return Object.values(this.getMethods());
  }

  /**
   * List of properties.
   */
  public get properties(): Property[] {
    return Object.values(this.getProperties());
  }

  /**
   * True if this interface only contains properties. Different backends might
   * have idiomatic ways to allow defining concrete instances such interfaces.
   * For example, in Java, the generator will produce a PoJo and a builder
   * which will allow users to create a concrete object with data which
   * adheres to this interface.
   */
  public get datatype(): boolean {
    return this.isDataType();
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

  /**
   * Lists all properties in this class.
   * @param inherited include all properties inherited from base classes (default: false)
   */
  public getProperties(inherited = false): {[name: string]: Property} {
    const base: {[name: string]: Property}  = {};
    if (inherited) {
      for (const parent of this.getInterfaces()) {
        Object.assign(base, parent.getProperties(inherited));
      }
    }
    return Object.assign(base, indexBy(
      (this.interfaceSpec.properties || []).map(p => new Property(this.system, this.assembly, this, p)),
      p => p.name));
  }

  /**
   * List all methods in this class.
   * @param inherited include all methods inherited from base classes (default: false)
   */
  public getMethods(inherited = false): {[name: string]: Method} {
    const base: {[name: string]: Property}  = {};
    if (inherited) {
      for (const parent of this.getInterfaces()) {
        Object.assign(base, parent.getMethods(inherited));
      }
    }
    return Object.assign(base, indexBy(
      (this.interfaceSpec.methods || []).map(m => new Method(this.system, this.assembly, this, m)),
      m => m.name));
  }

  public isDataType() {
    return !!this.interfaceSpec.datatype;
  }

  public isInterfaceType() {
    return true;
  }

  public getMembers(inherited = false): {[name: string]: TypeMember} {
    return Object.assign(
      this.getMethods(inherited),
      this.getProperties(inherited)
    );
  }

  public get members(): TypeMember[] {
    return Object.values(this.getMembers(false));
  }

}
