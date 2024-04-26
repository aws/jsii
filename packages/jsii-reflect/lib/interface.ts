import * as jsii from '@jsii/spec';

import { Assembly } from './assembly';
import { Method } from './method';
import { Property } from './property';
import { ReferenceType } from './reference-type';
import { TypeSystem } from './type-system';

export class InterfaceType extends ReferenceType {
  /** Caches the result of `getInterfaces`. */
  // eslint-disable-next-line @typescript-eslint/explicit-member-accessibility
  readonly #interfaces = new Map<boolean, readonly InterfaceType[]>();

  public constructor(
    public system: TypeSystem,
    public assembly: Assembly,
    public readonly spec: jsii.InterfaceType,
  ) {
    super(system, assembly, spec);
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
    if (!this.spec.interfaces) {
      return [];
    }

    if (this.#interfaces.has(inherited)) {
      return Array.from(this.#interfaces.get(inherited)!);
    }

    const result = new Set<InterfaceType>();
    for (const iface of this.spec.interfaces) {
      const ifaceType = this.system.findInterface(iface);
      if (!result.has(ifaceType) && inherited) {
        ifaceType.getInterfaces(inherited).forEach((i) => result.add(i));
      }
      result.add(ifaceType);
    }
    this.#interfaces.set(inherited, Array.from(result));
    // Returning a copy of the array, distinct from the one we memoized, for safety.
    return Array.from(result);
  }

  /**
   * Lists all properties in this class.
   * @param inherited include all properties inherited from base classes (default: false)
   */
  public getProperties(inherited = false): { [name: string]: Property } {
    return Object.fromEntries(this._getProperties(inherited, this));
  }

  /**
   * List all methods in this class.
   * @param inherited include all methods inherited from base classes (default: false)
   */
  public getMethods(inherited = false): { [name: string]: Method } {
    return Object.fromEntries(this._getMethods(inherited, this));
  }

  public isDataType(): this is InterfaceType {
    return !!this.spec.datatype;
  }

  public isInterfaceType(): this is InterfaceType {
    return true;
  }

  private _getProperties(
    inherited: boolean,
    parentType: ReferenceType,
  ): Map<string, Property> {
    const result = new Map<string, Property>();
    if (inherited) {
      for (const parent of this.getInterfaces()) {
        for (const [key, value] of parent._getProperties(
          inherited,
          parentType,
        )) {
          result.set(key, value);
        }
      }
    }
    for (const p of this.spec.properties ?? []) {
      result.set(
        p.name,
        new Property(this.system, this.assembly, parentType, this, p),
      );
    }
    return result;
  }

  private _getMethods(
    inherited: boolean,
    parentType: ReferenceType,
  ): Map<string, Method> {
    const methods = new Map<string, Method>();
    if (inherited) {
      for (const parent of this.getInterfaces()) {
        for (const [key, value] of parent._getMethods(inherited, parentType)) {
          methods.set(key, value);
        }
      }
    }
    for (const m of this.spec.methods ?? []) {
      methods.set(
        m.name,
        new Method(this.system, this.assembly, parentType, this, m),
      );
    }
    return methods;
  }
}
