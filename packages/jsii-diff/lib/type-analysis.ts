/* eslint-disable complexity */
import * as reflect from 'jsii-reflect';

import { flatMap } from './util';

/**
 * Check whether A is a supertype of B
 *
 * Put differently: whether any value of type B would be assignable to a
 * variable of type A.
 *
 * We always check the relationship in the NEW (latest, updated) typesystem.
 */
export function isSuperType(
  a: reflect.TypeReference,
  b: reflect.TypeReference,
  updatedSystem: reflect.TypeSystem,
): Analysis {
  if (a.void || b.void) {
    throw new Error('isSuperType() does not handle voids');
  }
  if (a.isAny) {
    return { success: true };
  }

  if (a.primitive !== undefined) {
    if (a.primitive === b.primitive) {
      return { success: true };
    }
    return failure(`${b.toString()} is not assignable to ${a.toString()}`);
  }

  if (a.arrayOfType !== undefined) {
    // Arrays are covariant
    if (b.arrayOfType === undefined) {
      return failure(`${b.toString()} is not an array type`);
    }
    return prependReason(
      isSuperType(a.arrayOfType, b.arrayOfType, updatedSystem),
      `${b.toString()} is not assignable to ${a.toString()}`,
    );
  }

  if (a.mapOfType !== undefined) {
    // Maps are covariant (are they?)
    if (b.mapOfType === undefined) {
      return failure(`${b.toString()} is not a map type`);
    }
    return prependReason(
      isSuperType(a.mapOfType, b.mapOfType, updatedSystem),
      `${b.toString()} is not assignable to ${a.toString()}`,
    );
  }

  // Every element of B can be assigned to A
  if (b.unionOfTypes !== undefined) {
    const analyses = b.unionOfTypes.map((bbb) =>
      isSuperType(a, bbb, updatedSystem),
    );
    if (analyses.every((x) => x.success)) {
      return { success: true };
    }
    return failure(
      `some of ${b.toString()} are not assignable to ${a.toString()}`,
      ...flatMap(analyses, (x) => (x.success ? [] : x.reasons)),
    );
  }
  // There should be an element of A which can accept all of B
  if (a.unionOfTypes !== undefined) {
    const analyses = a.unionOfTypes.map((aaa) =>
      isSuperType(aaa, b, updatedSystem),
    );
    if (analyses.some((x) => x.success)) {
      return { success: true };
    }
    return failure(
      `none of ${b.toString()} are assignable to ${a.toString()}`,
      ...flatMap(analyses, (x) => (x.success ? [] : x.reasons)),
    );
  }

  // We have two named types, recursion might happen so protect against it.
  try {
    // For named types, we'll always do a nominal typing relationship.
    // That is, if in the updated typesystem someone were to use the type name
    // from the old assembly, do they have a typing relationship that's accepted
    // by a nominal type system. (That check also rules out enums)
    const nominalCheck = isNominalSuperType(a, b, updatedSystem);
    if (nominalCheck.success === false) {
      return nominalCheck;
    }

    // At this point, the only thing left to do is recurse into the structs.
    // We used to do that here, but we don't anymore; structs check themselves
    // for structural weakening/strengthening.
    return { success: true };
  } catch (e) {
    return failure(e.message);
  }
}

/**
 * Find types A and B in the updated type system, and check whether they have a supertype relationship in the type system
 */
export function isNominalSuperType(
  a: reflect.TypeReference,
  b: reflect.TypeReference,
  updatedSystem: reflect.TypeSystem,
): Analysis {
  if (a.fqn === undefined) {
    throw new Error(`I was expecting a named type, got '${a.toString()}'`);
  }

  // Named type vs a non-named type
  if (b.fqn === undefined) {
    return failure(`${b.toString()} is not assignable to ${a.toString()}`);
  }

  // Short-circuit of the types are the same name, saves us some lookup
  if (a.fqn === b.fqn) {
    return { success: true };
  }

  // We now need to do subtype analysis on the
  // Find A in B's typesystem, and see if B is a subtype of A'
  const B = updatedSystem.tryFindFqn(b.fqn);
  const A = updatedSystem.tryFindFqn(a.fqn);

  if (!B) {
    return failure(`could not find type ${b.toString()}`);
  }
  if (!A) {
    return failure(`could not find type ${a.toString()}`);
  }

  // If they're enums, they should have been exactly the same (tested above)
  // enums are never subtypes of any other type.
  if (A.isEnumType()) {
    return failure(`${a.toString()} is an enum different from ${b.toString()}`);
  }
  if (B.isEnumType()) {
    return failure(`${b.toString()} is an enum different from ${a.toString()}`);
  }

  if (B.extends(A)) {
    return { success: true };
  }
  return failure(`${b.toString()} does not extend ${a.toString()}`);
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
export function isStructuralSuperType(
  a: reflect.InterfaceType,
  b: reflect.InterfaceType,
  updatedSystem: reflect.TypeSystem,
): Analysis {
  // We know all members can only be properties, so that makes it easier.
  const bProps = b.getProperties(true);

  // Use timing words in error message to make it more understandable
  const formerly = b.system === updatedSystem ? 'formerly' : 'newly';
  const is = b.system === updatedSystem ? 'is' : 'used to be';
  const removed = b.system === updatedSystem ? 'removed' : 'added';

  for (const [name, aProp] of Object.entries(a.getProperties(true))) {
    const bProp = bProps[name];

    if (aProp.optional) {
      // Optional field, only requirement is that IF it exists, the type must match.
      if (!bProp) {
        continue;
      }
    } else {
      if (!bProp) {
        return failure(`${formerly} required property '${name}' ${removed}`);
      }
      if (bProp.optional) {
        return failure(
          `${formerly} required property '${name}' ${is} optional`,
        );
      }
    }

    const ana = isSuperType(aProp.type, bProp.type, updatedSystem);
    if (!ana.success) {
      return failure(`property ${name}`, ...ana.reasons);
    }
  }

  return { success: true };
}

// Oh tagged union types I love you so much!
export type Analysis = { success: true } | FailedAnalysis;

export type FailedAnalysis = { success: false; reasons: string[] };

function failure(...reasons: string[]): FailedAnalysis {
  return { success: false, reasons };
}

export function prependReason(analysis: Analysis, message: string): Analysis {
  if (analysis.success) {
    return analysis;
  }
  return failure(message, ...analysis.reasons);
}
