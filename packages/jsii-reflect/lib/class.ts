import jsii = require('jsii-spec');
import { Assembly } from './assembly';
import { InterfaceType } from './interface';
import { Method } from './method';
import { Property } from './property';
import { Type } from './type';
import { TypeSystem } from './type-system';

export class ClassType extends Type {
  constructor(
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

    const type = this.system.findFqn(this.classSpec.base.fqn);
    if (!(type instanceof ClassType)) {
      throw new Error(`FQN for base class points to a non-class type: ${this.classSpec.base.fqn}`);
    }

    return type;
  }

  /**
   * Initializer (constructor) method.
   */
  public get initializer(): Method | undefined {
    if (!this.classSpec.initializer) {
      return undefined;
    }

    return new Method(this.system, this.assembly, this, this.classSpec.initializer);
  }

  /**
   * List of all properties (without inherited properties).
   *
   * You can use `getProperties(true)` to list all properties including inherited.
   */
  public get properties(): Property[] {
    return this.getProperties(false);
  }

  /**
   * List of methods (without inherited methods).
   *
   * You can use `getMethods(true)` to list all methods including inherited.
   */
  public get methods(): Method[] {
    return this.getMethods(false);
  }

  /**
   * Indicates if this class is an abstract class.
   */
  public get abstract(): boolean {
    return !!this.classSpec.abstract;
  }

  /**
   * The set of interfaces implemented by this class (not including interfaces implemented by base classes).
   *
   * You can use `getInterfaces(true)` to list all interfaces implemented by base classes as well.
   */
  public get interfaces(): InterfaceType[] {
    return this.getInterfaces();
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
  public getProperties(inherited = false) {
    const out = new Array<Property>();
    if (inherited && this.base) {
      out.push(...this.base.getProperties(inherited));
    }
    if (this.classSpec.properties) {
      out.push(...this.classSpec.properties.map(p => new Property(this.system, this.assembly, this, p)));
    }
    return out;
  }

  /**
   * List all methods in this class.
   * @param inherited include all methods inherited from base classes (default: false)
   */
  public getMethods(inherited = false) {
    const out = new Array<Method>();
    if (inherited && this.base) {
      out.push(...this.base.getMethods(inherited));
    }
    if (this.classSpec.methods) {
      out.push(...this.classSpec.methods.map(m => new Method(this.system, this.assembly, this, m)));
    }
    return out;
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
      out.push(...this.classSpec.interfaces.map(i => this.system.findInterface(i.fqn)));
    }
    return out;
  }
}
