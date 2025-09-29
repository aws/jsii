import * as spec from '@jsii/spec';

export function containsUnionType(
  typeRef: spec.TypeReference,
): typeRef is spec.UnionTypeReference | spec.CollectionTypeReference {
  return (
    spec.isUnionTypeReference(typeRef) ||
    (spec.isCollectionTypeReference(typeRef) &&
      containsUnionType(typeRef.collection.elementtype))
  );
}
