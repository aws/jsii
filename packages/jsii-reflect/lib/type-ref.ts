import jsii = require('jsii-spec');
import { Type } from './type';
import { TypeSystem } from './type-system';

export class TypeReference {
  constructor(
    public readonly system: TypeSystem,
    private readonly spec?: jsii.TypeReference) { }

  public toString(): string {
    const options = new Array<string>();

    if (this.optional) {
      options.push('optional');
    }

    if (this.promise) {
      options.push('promise');
    }

    const opts = options.length === 0 ? '' : ` (${options.join(',')})`;

    if (this.void) {
      return 'void';
    }

    if (this.primitive) {
      return `primitive:${this.primitive}${opts}`;
    }

    if (this.fqn) {
      return `${this.fqn}${opts}`;
    }

    if (this.arrayOfType) {
      return `Array<${this.arrayOfType}>`;
    }

    if (this.mapOfType) {
      return `Map<string => ${this.mapOfType}>`;
    }

    if (this.unionOfTypes) {
      return this.unionOfTypes.map(x => x.toString()).join(' | ');
    }

    throw new Error(`Invalid type reference`);
  }

  public get void(): boolean {
    return (!this.spec);
  }

  public get primitive(): string | undefined {
    if (!jsii.isPrimitiveTypeReference(this.spec)) {
      return undefined;
    }

    return this.spec.primitive;
  }

  public get fqn(): Type | undefined {
    if (!jsii.isNamedTypeReference(this.spec)) {
      return undefined;
    }

    return this.system.findFqn(this.spec.fqn);
  }

  public get arrayOfType(): TypeReference | undefined {
    if (!jsii.isCollectionTypeReference(this.spec)) {
      return undefined;
    }

    if (this.spec.collection.kind !== jsii.CollectionKind.Array) {
      return undefined;
    }

    return new TypeReference(this.system, this.spec.collection.elementtype);
  }

  public get mapOfType(): TypeReference | undefined {
    if (!jsii.isCollectionTypeReference(this.spec)) {
      return undefined;
    }

    if (this.spec.collection.kind !== jsii.CollectionKind.Map) {
      return undefined;
    }

    return new TypeReference(this.system, this.spec.collection.elementtype);
  }

  public get unionOfTypes(): TypeReference[] | undefined {
    if (!jsii.isUnionTypeReference(this.spec)) {
      return undefined;
    }

    return this.spec.union.types.map(t => new TypeReference(this.system, t));
  }

  /**
   * Indicates if this value is optional.
   */
  public get optional(): boolean {
    if (!this.spec) { return false; }
    return !!this.spec.optional;
  }

  /**
   * Indicates if this type refers to a promise.
   */
  public get promise(): boolean {
    if (!this.spec) { return false; }
    return !!this.spec.promise;
  }
}