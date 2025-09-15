import * as spec from '@jsii/spec';

export interface TypeReferenceVisitor<A = void> {
  named(ref: spec.NamedTypeReference): A;
  primitive(ref: spec.PrimitiveTypeReference): A;
  collection(ref: spec.CollectionTypeReference): A;
  union(ref: spec.UnionTypeReference): A;
  intersection(ref: spec.IntersectionTypeReference): A;
}

export function visitTypeReference<A>(
  typeRef: spec.TypeReference,
  visitor: TypeReferenceVisitor<A>,
) {
  if (spec.isNamedTypeReference(typeRef)) {
    return visitor.named(typeRef);
  } else if (spec.isPrimitiveTypeReference(typeRef)) {
    return visitor.primitive(typeRef);
  } else if (spec.isCollectionTypeReference(typeRef)) {
    return visitor.collection(typeRef);
  } else if (spec.isUnionTypeReference(typeRef)) {
    return visitor.union(typeRef);
  } else if (spec.isIntersectionTypeReference(typeRef)) {
    return visitor.intersection(typeRef);
  }
  throw new Error(`Unknown type reference: ${JSON.stringify(typeRef)}`);
}

export interface TypeVisitor<A = void> {
  classType(t: spec.ClassType): A;
  interfaceType(t: spec.InterfaceType): A;
  dataType(t: spec.InterfaceType): A;
  enumType(t: spec.EnumType): A;
}

export function visitType<A>(t: spec.Type, visitor: TypeVisitor<A>) {
  if (spec.isClassType(t)) {
    return visitor.classType(t);
  } else if (spec.isInterfaceType(t) && t.datatype) {
    return visitor.dataType(t);
  } else if (spec.isInterfaceType(t)) {
    return visitor.interfaceType(t);
  } else if (spec.isEnumType(t)) {
    return visitor.enumType(t);
  }
  throw new Error(`Unknown type: ${JSON.stringify(t)}`);
}

export function isDataType(t: spec.Type): t is spec.InterfaceType {
  return spec.isInterfaceType(t) && !!t.datatype;
}

export function isBehavioralInterfaceType(
  t: spec.Type,
): t is spec.InterfaceType {
  return spec.isInterfaceType(t) && !t.datatype;
}
