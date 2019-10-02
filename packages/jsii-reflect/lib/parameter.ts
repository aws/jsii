import jsii = require('jsii-spec');
import { Callable } from './callable';
import { Docs, Documentable } from './docs';
import { OptionalValue } from './optional-value';
import { Type } from './type';
import { TypeSystem } from './type-system';

export class Parameter extends OptionalValue implements Documentable {
  public constructor(
    system: TypeSystem,
    public readonly parentType: Type,
    public readonly method: Callable,
    private readonly paramSpec: jsii.Parameter) {
    super(system, paramSpec);
  }

  /**
   * The name of the parameter.
   */
  public get name(): string {
    return this.paramSpec.name;
  }

  /**
   * Whether this argument is the "rest" of a variadic signature.
   * The ``#type`` is that of every individual argument of the variadic list.
   */
  public get variadic(): boolean {
    return !!this.paramSpec.variadic;
  }

  public get docs(): Docs {
    return new Docs(this.system, this, this.paramSpec.docs || {});
  }
}
