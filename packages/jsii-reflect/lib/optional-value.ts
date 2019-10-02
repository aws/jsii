import jsii = require('jsii-spec');
import { TypeReference } from './type-ref';
import { TypeSystem } from './type-system';

export class OptionalValue {
  public static describe(optionalValue: OptionalValue): string {
    let description = optionalValue.type.toString();

    if (optionalValue.optional && !optionalValue.type.isAny) {
      description = `Optional<${description}>`;
    }

    return description;
  }

  public constructor(public readonly system: TypeSystem, private readonly spec?: jsii.OptionalValue) { }

  public toString(): string {
    return OptionalValue.describe(this);
  }

  public get type(): TypeReference {
    return new TypeReference(this.system, this.spec && this.spec.type);
  }

  public get optional(): boolean {
    return this.spec != null && !!this.spec.optional;
  }
}
