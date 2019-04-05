import jsii = require('jsii-spec');
import { TypeReference } from './type-ref';
import { TypeSystem } from './type-system';

export class TypeInstance {
  public readonly type: TypeReference;

  constructor(
    public readonly system: TypeSystem,
    private readonly spec?: jsii.TypeInstance<jsii.TypeReference>) {
    this.type = new TypeReference(this.system, spec && spec.type);
  }

  public toString(): string {
    let description = this.type.toString();
    if (this.optional && !this.type.isAny) {
      description = `Optional<${description}>`;
    }
    if (this.promise) {
      description = `Promise<${description}>`;
    }
    return description;
  }

  /**
   * Indicates if this value is optional.
   */
  public get optional(): boolean {
    return this.spec != null && !!this.spec.optional;
  }

  /**
   * Indicates if this type refers to a promise.
   */
  public get promise(): boolean {
    return this.spec != null && !!this.spec.promise;
  }
}
