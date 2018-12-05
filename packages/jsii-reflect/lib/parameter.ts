import jsii = require('jsii-spec');
import { Documentable } from './doc';
import { Method } from './method';
import { Type } from './type';
import { TypeReference } from './type-ref';
import { TypeSystem } from './type-system';

export class Parameter implements Documentable {
  constructor(
    public readonly system: TypeSystem,
    public readonly parentType: Type,
    public readonly method: Method,
    private readonly spec: jsii.Parameter) { }

  /**
   * The name of the parameter.
   * @minLength 1
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
   * Whather this argument is the "rest" of a variadic signature.
   * The ``#type`` is that of every individual argument of the variadic list.
   */
  public get variadic(): boolean {
    return !!this.spec.variadic;
  }

  public get docs(): jsii.Docs | undefined {
    return this.spec.docs;
  }
}
