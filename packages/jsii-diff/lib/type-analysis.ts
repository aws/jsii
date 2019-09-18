import reflect = require('jsii-reflect');
import { flatMap } from './util';

/**
 * Check whether A is a supertype of B
 *
 * Put differently: whether any value of type B would be assignable to a
 * variable of type A.
 *
 * We always check the relationship in the NEW (latest, updated) typesystem.
 */
export function isSuperType(a: reflect.TypeReference, b: reflect.TypeReference, updatedSystem: reflect.TypeSystem): Analysis {
  if (a.void || b.void) { throw new Error('isSuperType() does not handle voids'); }
  if (a.isAny) { return { success: true }; }

  // Assume true if we're currently already checking this.
  if (CURRENTLY_CHECKING.has(a, b)) { return { success: true }; }

  if (a.primitive !== undefined) {
    if (a.primitive === b.primitive) { return { success: true }; }
    return failure(`${b} is not assignable to ${a}`);
  }

  if (a.arrayOfType !== undefined) {   // Arrays are covariant
    if (b.arrayOfType === undefined) { return failure(`${b} is not an array type`); }
    return prependReason(
      isSuperType(a.arrayOfType, b.arrayOfType, updatedSystem),
      `${b} is not assignable to ${a}`
    );
  }

  if (a.mapOfType !== undefined) {  // Maps are covariant (are they?)
    if (b.mapOfType === undefined) { return failure(`${b} is not a map type`); }
    return prependReason(
      isSuperType(a.mapOfType, b.mapOfType, updatedSystem),
      `${b} is not assignable to ${a}`);
  }

  // Every element of B can be assigned to A
  if (b.unionOfTypes !== undefined) {
    const analyses = b.unionOfTypes.map(bbb => isSuperType(a, bbb, updatedSystem));
    if (analyses.every(x => x.success)) { return { success: true }; }
    return failure(
      `some of ${b} are not assignable to ${a}`,
      ...flatMap(analyses, x => x.success ? [] : x.reasons)
    );
  }
  // There should be an element of A which can accept all of B
  if (a.unionOfTypes !== undefined) {
    const analyses = a.unionOfTypes.map(aaa => isSuperType(aaa, b, updatedSystem));
    if (analyses.some(x => x.success)) { return { success: true }; }
    return failure(
      `none of ${b} are assignable to ${a}`,
      ...flatMap(analyses, x => x.success ? [] : x.reasons)
    );
  }

  // We have two named types, recursion might happen so protect against it.
  CURRENTLY_CHECKING.add(a, b);
  try {

    // For named types, we'll always do a nominal typing relationship.
    // That is, if in the updated typesystem someone were to use the type name
    // from the old assembly, do they have a typing relationship that's accepted
    // by a nominal type system. (That check also rules out enums)
    const nominalCheck = isNominalSuperType(a, b, updatedSystem);
    if (nominalCheck.success === false) { return nominalCheck; }

    // At this point, the types are legal in the updated assembly's type system.
    // However, for structs we also structurally check the fields between the OLD
    // and the NEW type system.
    // We could do more complex analysis on typing of methods, but it doesn't seem
    // worth it.
    try {
      const A = a.type!; // Note: lookup in old type system!
      const B = b.type!;
      if (A.isInterfaceType() && A.isDataType() && B.isInterfaceType() && B.datatype) {
        return isStructuralSuperType(A, B, updatedSystem);
      }
    } catch (e) {
      // We might get an exception if the type is supposed to come from a different
      // assembly and the lookup fails.
      return failure(e.message);
    }

    // All seems good
    return { success: true };
  } finally {
    CURRENTLY_CHECKING.remove(a, b);
  }
}

/**
 * Find types A and B in the updated type system, and check whether they have a supertype relationship in the type system
 */
function isNominalSuperType(a: reflect.TypeReference, b: reflect.TypeReference, updatedSystem: reflect.TypeSystem): Analysis {
  if (a.fqn === undefined) {
    throw new Error(`I was expecting a named type, got '${a}'`);
  }

  // Named type vs a non-named type
  if (b.fqn === undefined) { return failure(`${b} is not assignable to ${a}`); }

  // Short-circuit of the types are the same name, saves us some lookup
  if (a.fqn === b.fqn) { return { success: true }; }

  // We now need to do subtype analysis on the
  // Find A in B's typesystem, and see if B is a subtype of A'
  const B = updatedSystem.tryFindFqn(b.fqn);
  const A = updatedSystem.tryFindFqn(a.fqn);

  if (!B) { return failure(`could not find type ${b}`); }
  if (!A) { return failure(`could not find type ${a}`); }

  // If they're enums, they should have been exactly the same (tested above)
  // enums are never subtypes of any other type.
  if (A.isEnumType()) { return failure(`${a} is an enum different from ${b}`); }
  if (B.isEnumType()) { return failure(`${b} is an enum different from ${a}`); }

  if (B.extends(A)) { return { success: true }; }
  return failure(`${b} does not extend ${a}`);
}

/**
 * Is struct A a structural supertype of struct B?
 *
 * Trying to answer the question, is this assignment legal for all values
 * of `expr in B`.
 *
 * ```ts
 * const var: A = expr as B;
 * ```
 *
 * A is a structural supertype of B if all required members of A are also
 * required in B, and of a compatible type.
 *
 * Nullable members of A must either not exist in B, or be of a compatible
 * type.
 */
function isStructuralSuperType(a: reflect.InterfaceType, b: reflect.InterfaceType, updatedSystem: reflect.TypeSystem): Analysis {
  // We know all members can only be properties, so that makes it easier.
  const bProps = b.getProperties(true);

  // Use timing words in error message to make it more understandable
  const formerly = b.system === updatedSystem ? 'formerly' : 'newly';
  const is = b.system === updatedSystem ? 'is' : 'used to be';

  for (const [name, aProp] of Object.entries(a.getProperties(true))) {
    const bProp = bProps[name];

    if (aProp.optional) {
      // Optional field, only requirement is that IF it exists, the type must match.
      if (!bProp) { continue; }
    } else {
      if (!bProp) { return failure(`${formerly} required property '${name}' ${is} missing in ${b.fqn}`); }
      if (bProp.optional) { return failure(`${formerly} required property '${name}' ${is} optional in ${b.fqn}`); }
    }

    const ana = isSuperType(aProp.type, bProp.type, updatedSystem);
    if (!ana.success) { return failure(`property ${name}`, ...ana.reasons); }
  }

  return { success: true };
}

// Oh tagged union types I love you so much!
export type Analysis = { success: true } | FailedAnalysis;

export type FailedAnalysis = { success: false, reasons: string[] };

function failure(...reasons: string[]): FailedAnalysis {
  return { success: false, reasons };
}

export function prependReason(analysis: Analysis, message: string): Analysis {
  if (analysis.success) { return analysis; }
  return failure(message, ...analysis.reasons);
}

/**
 * Keep a set of type pairs.
 *
 * Needs more code than it should because JavaScript has an anemic runtime.
 *
 * (The ideal type would have been Set<[string, string]> but different
 * instances of those pairs wouldn't count as "the same")
 */
class TypePairs {
  private readonly pairs = new Map<string, Set<string>>();

  public add(a: reflect.TypeReference, b: reflect.TypeReference): void {
    if (!a.fqn || !b.fqn) { return; } // Only for user-defined types

    let image = this.pairs.get(a.fqn);
    if (!image) {
      this.pairs.set(a.fqn, image = new Set<string>());
    }
    image.add(b.fqn);
  }

  public remove(a: reflect.TypeReference, b: reflect.TypeReference): void {
    if (!a.fqn || !b.fqn) { return; } // Only for user-defined types

    const image = this.pairs.get(a.fqn);
    if (image) {
      image.delete(b.fqn);
    }
  }

  public has(a: reflect.TypeReference, b: reflect.TypeReference): boolean {
    if (!a.fqn || !b.fqn) { return false; } // Only for user-defined types

    const image = this.pairs.get(a.fqn);
    return !!image && image.has(b.fqn);
  }
}

/**
 * To avoid recursion, we keep a set of relationships we're *currently*
 * checking, so that if we're recursing we can just assume the subtyping
 * relationship holds (and let the other struct members falsify that
 * statement).
 */
const CURRENTLY_CHECKING = new TypePairs();
