import jsii = require('jsii-spec');
import { Assembly } from './assembly';
import { Docs, Documentable } from './docs';
import { Overridable } from './overridable';
import { Parameter } from './parameter';
import { Type } from './type';
import { TypeReference } from './type-ref';
import { TypeSystem } from './type-system';

export class Method implements Documentable, Overridable {
  constructor(
    public readonly system: TypeSystem,
    public readonly assembly: Assembly,
    public readonly parentType: Type,
    private readonly spec: jsii.Method) { }

  public toString() {
    return `method:${this.parentType.fqn}.${this.name}`;
  }

  /**
   * The name of the method.
   *
   * If this method is an initializer (`method.initializer` is `true`), the name
   * will be "<initializer>".
   */
  public get name(): string {
    if (this.initializer) {
      return '<initializer>';
    }

    if (!this.spec.name) {
      throw new Error(`Method does not have a name and is not an initializer`);
    }

    return this.spec.name;
  }

  /**
   * The return type of the method (undefined if void or initializer)
   */
  public get returns(): TypeReference {
    return new TypeReference(this.system, this.spec.returns);
  }

  /**
   * The parameters of the method/initializer
   */
  public get parameters(): Parameter[] {
    return (this.spec.parameters || []).map(p => new Parameter(this.system, this.parentType, this, p));
  }

  /**
   * True if this method is an initializer, in which case it won't have a return type
   */
  public get initializer(): boolean {
    return !!this.spec.initializer;
  }

  /**
   * Indicates if this method is protected (otherwise it is public)
   */
  public get protected(): boolean {
    return !!this.spec.protected;
  }

  /**
   * Is this method an abstract method (this means the class will also be an abstract class)
   */
  public get abstract(): boolean {
    return !!this.spec.abstract;
  }

  /**
   * Indicates whether this method is variadic or not. When ``true``, the last
   * element of ``#parameters`` will also be flagged ``#variadic``.
   */
  public get variadic(): boolean {
    return !!this.spec.variadic;
  }

  /**
   * Indicates if this is a static method.
   */
  public get static(): boolean {
    return !!this.spec.static;
  }

  public get overrides(): Type | undefined {
    if (!this.spec.overrides) {
      return undefined;
    }

    return this.system.findFqn(this.spec.overrides.fqn);
  }

  public get docs(): Docs {
    return new Docs(this.system, this, this.spec.docs);
  }
}
