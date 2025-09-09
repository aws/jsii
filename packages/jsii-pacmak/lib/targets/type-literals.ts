import * as spec from '@jsii/spec';

const LITERAL_TYPE_PREFIX = '$lit:';

/**
 * Make a type reference that references exactly a literal.
 *
 * This is useful if we don't want to reference a real type but a locally bound
 * type parameter.
 *
 * This is a slightly hacky way to get the rendering functio to render a
 * literal string, without looking it up. It gets us to embed the notion of
 * rendering literal type parameters in the existing jsii spec without having to
 * explicitly model it only for the purpose of a couple of code generators.
 */
export function makeLiteralTypeReference(
  typeParameterName: string,
): spec.NamedTypeReference {
  return { fqn: `${LITERAL_TYPE_PREFIX}${typeParameterName}` };
}

/**
 * Return the type parameter name if the type reference is a type literal
 */
export function literalTypeReference(
  x: spec.TypeReference,
): string | undefined {
  if (!spec.isNamedTypeReference(x)) {
    return undefined;
  }

  return x.fqn.startsWith(LITERAL_TYPE_PREFIX)
    ? x.fqn.slice(LITERAL_TYPE_PREFIX.length)
    : undefined;
}

/**
 * Whether the given type is a literal type reference
 */
export function isLiteralTypeReference(x: spec.TypeReference) {
  return literalTypeReference(x) !== undefined;
}
