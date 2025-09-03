import * as jsii from '@jsii/spec';

import { Type } from './type';
import { TypeSystem } from './type-system';

export class TypeReference {
  public constructor(
    public readonly system: TypeSystem,
    public readonly spec?: jsii.TypeReference,
  ) {}

  public toString(): string {
    if (this.void) {
      return 'void';
    }
    if (this.primitive) {
      return this.primitive;
    }
    if (this.fqn) {
      return this.fqn;
    }

    if (this.arrayOfType) {
      return `Array<${this.arrayOfType.toString()}>`;
    }
    if (this.mapOfType) {
      return `Map<string => ${this.mapOfType.toString()}>`;
    }
    if (this.unionOfTypes) {
      const union = this.unionOfTypes.map((x) => x.toString());
      union.sort();
      return union.join(' | ');
    }
    if (this.intersectionOfTypes) {
      const inter = this.intersectionOfTypes.map((x) => x.toString());
      inter.sort();
      return inter.join(' & ');
    }

    throw new Error('Invalid type reference');
  }

  public get void(): boolean {
    return !this.spec;
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

    return this.spec.union.types.map((t) => new TypeReference(this.system, t));
  }

  public get intersectionOfTypes(): TypeReference[] | undefined {
    if (!jsii.isIntersectionTypeReference(this.spec)) {
      return undefined;
    }

    return this.spec.intersection.types.map(
      (t) => new TypeReference(this.system, t),
    );
  }
}
