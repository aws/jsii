import jsii = require('jsii-spec');
import { Callable } from './callable';
import { Docs, Documentable } from './docs';
import { Type } from './type';
import { TypeReference } from './type-ref';
import { TypeSystem } from './type-system';

export class Parameter implements Documentable {
  constructor(
    public readonly system: TypeSystem,
    public readonly parentType: Type,
    public readonly method: Callable,
    private readonly spec: jsii.Parameter,
    private readonly index: number) { }

  /**
   * The name of the parameter.
   */
  public get name(): string {
    return this.spec.name;
  }

  /**
   * The type of the parameter.
   */
  public get type(): TypeReference {
    return new TypeReference(this.system, this.spec.type);
  }

  /**
   * Whether this argument is the "rest" of a variadic signature.
   * The ``#type`` is that of every individual argument of the variadic list.
   */
  public get variadic(): boolean {
    return !!this.spec.variadic;
  }

  /**
   * Whether this argument is optional, meaning that it's value is optional, and
   * all subsequent parameters are also optional or variadic.
   */
  public get optional(): boolean {
    return this.type.optional
      && this.method.parameters.find((p, i) => i > this.index && (p.optional || p.variadic)) == null;
  }

  public get docs(): Docs {
    return new Docs(this.system, this, this.spec.docs || {});
  }
}
