import * as jsii from '@jsii/spec';

import { memoizedWhenLocked } from './_memoized';
import { Assembly } from './assembly';
import { Initializer } from './initializer';
import { InterfaceType } from './interface';
import { Method } from './method';
import { Property } from './property';
import { ReferenceType } from './reference-type';
import { TypeSystem } from './type-system';

export class ClassType extends ReferenceType {
  public constructor(
    public readonly system: TypeSystem,
    public readonly assembly: Assembly,
    public readonly spec: jsii.ClassType,
  ) {
    super(system, assembly, spec);
  }

  /**
   * Base class (optional).
   */
  @memoizedWhenLocked
  public get base(): ClassType | undefined {
    if (!this.spec.base) {
      return undefined;
    }

    const type = this.system.findFqn(this.spec.base);
    if (!(type instanceof ClassType)) {
      throw new Error(
        `FQN for base class points to a non-class type: ${this.spec.base}`,
      );
    }

    return type;
  }

  /**
   * Initializer (constructor) method.
   */
  public get initializer(): Initializer | undefined {
    if (!this.spec.initializer) {
      return undefined;
    }

    return new Initializer(
      this.system,
      this.assembly,
      this,
      this.spec.initializer,
    );
  }

  /**
   * Indicates if this class is an abstract class.
   */
  public get abstract(): boolean {
    return !!this.spec.abstract;
  }

  /**
   * Returns list of all base classes (first is the direct base and last is the top-most).
   *
   * @deprecated use ClassType.ancestors instead
   */
  public getAncestors() {
    return this.ancestors;
  }

  /**
   * Returns list of all base classes (first is the direct base and last is the top-most).
   */
  @memoizedWhenLocked
  public get ancestors() {
    const out = new Array<ClassType>();
    if (this.base) {
      out.push(this.base);
      out.push(...this.base.ancestors);
    }
    return out;
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

  /**
   * Lists all interfaces this class implements.
   * @param inherited include all interfaces implemented by all base classes (default: false)
   */
  public getInterfaces(inherited = false) {
    const out = new Array<InterfaceType>();
    if (inherited && this.base) {
      out.push(...this.base.getInterfaces(inherited));
    }
    if (this.spec.interfaces) {
      out.push(
        ...flatten(
          this.spec.interfaces
            .map((fqn) => this.system.findInterface(fqn))
            .map((iface) => [
              iface,
              ...(inherited ? iface.getInterfaces(true) : []),
            ]),
        ),
      );
    }
    return out;
  }

  public isClassType(): this is ClassType {
    return true;
  }

  private _getProperties(
    inherited: boolean,
    parentType: ReferenceType,
  ): Map<string, Property> {
    const result =
      inherited && this.base
        ? this.base._getProperties(inherited, parentType)
        : new Map<string, Property>();
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
    const result =
      inherited && this.base
        ? this.base._getMethods(inherited, parentType)
        : new Map<string, Method>();
    for (const m of this.spec.methods ?? []) {
      result.set(
        m.name,
        new Method(this.system, this.assembly, parentType, this, m),
      );
    }
    return result;
  }
}

function flatten<A>(xs: A[][]): A[] {
  return Array.prototype.concat([], ...xs);
}
