import jsii = require('jsii-spec');
import { Type } from './type';
import { TypeInstance } from './type-instance';
import { TypeSystem } from './type-system';

export class TypeReference {
  constructor(
    public readonly system: TypeSystem,
    private readonly spec?: jsii.TypeReference) { }

  public toString(): string {
    if (this.void) { return 'void'; }
    if (this.primitive) { return this.primitive; }
    if (this.fqn) { return this.fqn; }

    if (this.arrayOfType) { return `Array<${this.arrayOfType}>`; }
    if (this.mapOfType) { return `Map<string => ${this.mapOfType}>`; }
    if (this.unionOfTypes) {
      return this.unionOfTypes.map(x => x.toString()).join(' | ');
    }

    throw new Error(`Invalid type reference`);
  }

  public get void(): boolean {
    return (!this.spec);
  }

  public get isAny(): boolean {
    return this.primitive === 'any';
  }

  public get primitive(): string | undefined {
    if (!jsii.isPrimitiveTypeReference(this.spec)) {
      return undefined;
    }

    return this.spec.primitive;
  }

  public get fqn(): string | undefined {
    return jsii.isNamedTypeReference(this.spec) ? this.spec.fqn : undefined;
  }

  public get type(): Type | undefined {
    if (!jsii.isNamedTypeReference(this.spec)) {
      return undefined;
    }

    return this.system.findFqn(this.spec.fqn);
  }

  public get arrayOfType(): TypeInstance | undefined {
    if (!jsii.isCollectionTypeReference(this.spec)) {
      return undefined;
    }

    if (this.spec.collection.kind !== jsii.CollectionKind.Array) {
      return undefined;
    }

    return new TypeInstance(this.system, this.spec.collection.elementtype);
  }

  public get mapOfType(): TypeInstance | undefined {
    if (!jsii.isCollectionTypeReference(this.spec)) {
      return undefined;
    }

    if (this.spec.collection.kind !== jsii.CollectionKind.Map) {
      return undefined;
    }

    return new TypeInstance(this.system, this.spec.collection.elementtype);
  }

  public get unionOfTypes(): TypeInstance[] | undefined {
    if (!jsii.isUnionTypeReference(this.spec)) {
      return undefined;
    }

    return this.spec.union.types.map(t => new TypeInstance(this.system, t));
  }
}
