import jsii = require('jsii-spec');
import { Assembly } from './assembly';
import { Initializer } from './initializer';
import { InterfaceType } from './interface';
import { Method } from './method';
import { Property } from './property';
import { ReferenceType } from './reference-type';
import { TypeSystem } from './type-system';
import { indexBy } from './util';

export class ClassType extends ReferenceType {
  public constructor(
    public readonly system: TypeSystem,
    public readonly assembly: Assembly,
    private readonly classSpec: jsii.ClassType) {
    super(system, assembly, classSpec);
  }

  /**
   * Base class (optional).
   */
  public get base(): ClassType | undefined {
    if (!this.classSpec.base) {
      return undefined;
    }

    const type = this.system.findFqn(this.classSpec.base);
    if (!(type instanceof ClassType)) {
      throw new Error(`FQN for base class points to a non-class type: ${this.classSpec.base}`);
    }

    return type;
  }

  /**
   * Initializer (constructor) method.
   */
  public get initializer(): Initializer | undefined {
    if (!this.classSpec.initializer) {
      return undefined;
    }

    return new Initializer(this.system, this.assembly, this, this.classSpec.initializer);
  }

  /**
   * Indicates if this class is an abstract class.
   */
  public get abstract(): boolean {
    return !!this.classSpec.abstract;
  }

  /**
   * Returns list of all base classes (first is the direct base and last is the top-most).
   */
  public getAncestors() {
    const out = new Array<ClassType>();
    if (this.base) {
      out.push(this.base);
      out.push(...this.base.getAncestors());
    }
    return out;
  }

  /**
   * Lists all properties in this class.
   * @param inherited include all properties inherited from base classes (default: false)
   */
  public getProperties(inherited = false): {[name: string]: Property} {
    return this._getProperties(inherited, this);
  }

  /**
   * List all methods in this class.
   * @param inherited include all methods inherited from base classes (default: false)
   */
  public getMethods(inherited = false): {[name: string]: Method} {
    return this._getMethods(inherited, this);
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
    if (this.classSpec.interfaces) {
      out.push(...this.classSpec.interfaces.map(iface => this.system.findInterface(iface)));
    }
    return out;
  }

  public isClassType() {
    return true;
  }

  private _getProperties(inherited: boolean, parentType: ReferenceType): {[name: string]: Property} {
    const base = inherited && this.base ? this.base._getProperties(inherited, parentType) : {};
    return Object.assign(base, indexBy(
      (this.classSpec.properties || []).map(p => new Property(this.system, this.assembly, parentType, this, p)),
      p => p.name));
  }

  private _getMethods(inherited: boolean, parentType: ReferenceType): {[name: string]: Method} {
    const base = inherited && this.base ? this.base._getMethods(inherited, parentType) : {};
    return Object.assign(base, indexBy(
      (this.classSpec.methods || []).map(m => new Method(this.system, this.assembly, parentType, this, m)),
      m => m.name));
  }
}
