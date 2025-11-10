import * as reflect from 'jsii-reflect';
import * as log4js from 'log4js';

import { validateStabilities } from './stability';
import { Analysis, FailedAnalysis, TypeAnalysis } from './type-analysis';
import { IReport } from './types';

const LOG = log4js.getLogger('jsii-diff');

/**
 * The updated type is still nominally assignable to all original base types
 *
 * Make sure the following remains compilable:
 *
 * ```
 * BASE instance = new CLASS();
 * ```
 *
 * Where CLASS ≤: BASE.
 */
export function validateBaseTypeAssignability<T extends reflect.ReferenceType>(
  original: T,
  updated: T,
  fqnRemapping: Record<string, string>,
  mismatches: IReport,
) {
  const ana = assignableToAllBaseTypes(original, updated, fqnRemapping);
  if (!ana.success) {
    mismatches.report({
      ruleKey: 'base-types',
      message: `not assignable to all base types anymore: ${ana.reasons.join(
        ', ',
      )}`,
      violator: original,
    });
  }
}

/**
 * The updated type has not been newly made abstract
 *
 * Make sure the following remains compilable:
 *
 * ```
 * new CLASS();
 * ```
 */
export function validateNotMadeAbstract(
  original: reflect.ClassType,
  updated: reflect.ClassType,
  mismatches: IReport,
) {
  if (updated.abstract && !original.abstract) {
    mismatches.report({
      ruleKey: 'made-abstract',
      message: 'has gone from non-abstract to abstract',
      violator: original,
    });
  }
}

/**
 * The updated type has not had its @subclassable attribute removed
 *
 * This would lift a restriction we can't afford.
 */
export function validateSubclassableNotRemoved<T extends reflect.ReferenceType>(
  original: T,
  updated: T,
  mismatches: IReport,
) {
  if (original.docs.subclassable && !updated.docs.subclassable) {
    mismatches.report({
      ruleKey: 'remove-subclassable',
      message: 'has gone from @subclassable to non-@subclassable',
      violator: original,
    });
  }
}

/**
 * Check that the `static`-ness of a member hasn't changed
 */
export function validateStaticSame<T extends reflect.Method | reflect.Property>(
  original: T,
  updated: T,
  mismatches: IReport,
) {
  if (original.static !== updated.static) {
    mismatches.report({
      ruleKey: 'changed-static',
      violator: original,
      message: `used to be ${
        original.static ? 'static' : 'not static'
      }, is now ${updated.static ? 'static' : 'not static'}`,
    });
  }
}

/**
 * Check that the `async`-ness of a method hasn't changed
 */
export function validateAsyncSame(
  original: reflect.Method,
  updated: reflect.Method,
  mismatches: IReport,
) {
  if (original.async !== updated.async) {
    const origQual = original.async ? 'asynchronous' : 'synchronous';
    const updQual = updated.async ? 'asynchronous' : 'synchronous';
    mismatches.report({
      ruleKey: 'changed-async',
      violator: original,
      message: `was ${origQual}, is now ${updQual}`,
    });
  }
}

/**
 * Once variadic, can never be made non-variadic anymore (because I could always have been passing N+1 arguments)
 */
export function validateNotMadeNonVariadic<
  T extends reflect.Method | reflect.Initializer,
>(original: T, updated: T, mismatches: IReport) {
  if (original.variadic && !updated.variadic) {
    mismatches.report({
      ruleKey: 'changed-variadic',
      violator: original,
      message: 'used to be variadic, not variadic anymore.',
    });
  }
}

/**
 * Check that no new abstract members were added to a subclassable type
 *
 * You cannot have added abstract members to the class/interface, as they are
 * an added burden on potential implementors.
 */
export function validateNoNewAbstractMembers<T extends reflect.ReferenceType>(
  original: T,
  updated: T,
  mismatches: IReport,
) {
  const absMemberNames = new Set(
    updated.allMembers.filter((m) => m.abstract).map((m) => m.name),
  );
  const originalMemberNames = new Set(original.allMembers.map((m) => m.name));
  for (const name of absMemberNames) {
    if (!originalMemberNames.has(name)) {
      mismatches.report({
        ruleKey: 'new-abstract-member',
        message: `adds requirement for subclasses to implement '${name}'.`,
        violator: updated.getMembers(true)[name],
      });
    }
  }
}

/**
 * Validate that a method return type is the same or strengthened
 *
 * Make sure the following remains compilable:
 *
 * ```
 * T value = object.method();
 * ```
 *
 * Where RETURN_TYPE(method) ≤: T.
 */
export function validateReturnTypeNotWeakened(
  original: reflect.Method,
  updated: reflect.Method,
  fqnRemapping: Record<string, string>,
  mismatches: IReport,
) {
  const retAna = isCompatibleReturnType(
    original.returns,
    updated.returns,
    fqnRemapping,
  );
  if (!retAna.success) {
    mismatches.report({
      ruleKey: 'change-return-type',
      violator: original,
      message: `returns ${describeOptionalValueMatchingFailure(
        original.returns,
        updated.returns,
        retAna,
      )}`,
    });
  }
}

/**
 * Validate that a method return type is the exact same
 *
 * Necessary for subclassable types in C#.
 */
export function validateReturnTypeSame(
  original: reflect.Method,
  updated: reflect.Method,
  mismatches: IReport,
) {
  const origDescr = reflect.OptionalValue.describe(original.returns);
  const updaDescr = reflect.OptionalValue.describe(updated.returns);
  if (origDescr !== updaDescr) {
    mismatches.report({
      ruleKey: 'change-return-type',
      violator: original,
      message: `returns ${updaDescr} (formerly ${origDescr})`,
    });
  }
}

/**
 * Validate that a property type is the same or strengthened
 *
 * Make sure the following remains compilable:
 *
 * ```
 * T value = object.prop;
 * ```
 *
 * Where RETURN_TYPE(prop) ≤: T.
 */
export function validatePropertyTypeNotWeakened(
  original: reflect.Property,
  updated: reflect.Property,
  fqnRemapping: Record<string, string>,
  mismatches: IReport,
) {
  const ana = isCompatibleReturnType(original, updated, fqnRemapping);
  if (!ana.success) {
    mismatches.report({
      ruleKey: 'changed-type',
      violator: original,
      message: `type ${describeOptionalValueMatchingFailure(
        original,
        updated,
        ana,
      )}`,
    });
  }
}

/**
 * Validate that a property type is the exact same
 *
 * Necessary for subclassable types in C#.
 */
export function validatePropertyTypeSame(
  original: reflect.Property,
  updated: reflect.Property,
  mismatches: IReport,
) {
  const oldDesc = reflect.OptionalValue.describe(original);
  const newDesc = reflect.OptionalValue.describe(updated);
  if (oldDesc !== newDesc) {
    mismatches.report({
      ruleKey: 'changed-type',
      violator: original,
      message: `changed to ${newDesc} (formerly ${oldDesc})`,
    });
  }
}

/**
 * Validate that a method return type is the same or weakened
 *
 * Make sure the following remains compilable if U is changed:
 *
 * ```
 * function method(arg: U) { ... }
 *
 * object.method(<T>value);
 * ```
 *
 * Where T ≤: U.
 */
export function validateParameterTypeWeakened(
  method: reflect.Method | reflect.Initializer,
  original: reflect.Parameter,
  updated: reflect.Parameter,
  fqnRemapping: Record<string, string>,
  mismatches: IReport,
) {
  const argAna = isCompatibleArgumentType(
    original.type,
    updated.type,
    fqnRemapping,
  );
  if (!argAna.success) {
    mismatches.report({
      ruleKey: 'incompatible-argument',
      violator: method,
      message: `argument ${
        original.name
      }, takes ${describeOptionalValueMatchingFailure(
        original,
        updated,
        argAna,
      )}`,
    });
    return;
  }
}

/**
 * Validate that a method parameter type is the exact same
 *
 * Necessary for subclassable types in C#.
 */
export function validateParameterTypeSame(
  method: reflect.Method | reflect.Initializer,
  original: reflect.Parameter,
  updated: reflect.Parameter,
  mismatches: IReport,
) {
  if (original.type.toString() !== updated.type.toString()) {
    mismatches.report({
      ruleKey: 'incompatible-argument',
      violator: method,
      message: `argument ${
        original.name
      }, takes ${updated.type.toString()} (formerly ${original.type.toString()}): type is @subclassable`,
    });
  }
}

function describeOptionalValueMatchingFailure(
  origType: reflect.OptionalValue,
  updatedType: reflect.OptionalValue,
  analysis: FailedAnalysis,
) {
  const origDescr = reflect.OptionalValue.describe(origType);
  const updaDescr = reflect.OptionalValue.describe(updatedType);
  if (origDescr !== updaDescr) {
    return `${updaDescr} (formerly ${origDescr}): ${analysis.reasons.join(
      ', ',
    )}`;
  }
  return `${updaDescr}: ${analysis.reasons.join(', ')}`;
}

/**
 * Validate that each param in the old callable is still available in the new callable, and apply custom validation to the pairs
 *
 * Make sure the following remains compilable:
 *
 * ```
 * object.method(a1, a2, ..., aN);
 * ```
 *
 * (All types still assignable)
 */
export function validateExistingParams<
  T extends reflect.Initializer | reflect.Method,
>(
  original: T,
  updated: T,
  mismatches: IReport,
  validateParam: (
    oldParam: reflect.Parameter,
    newParam: reflect.Parameter,
  ) => void,
) {
  original.parameters.forEach((param, i) => {
    const updatedParam = findParam(updated.parameters, i);
    if (updatedParam === undefined) {
      mismatches.report({
        ruleKey: 'removed-argument',
        violator: original,
        message: `argument ${param.name}, not accepted anymore.`,
      });
      return;
    }

    validateParam(param, updatedParam);
  });
}

/**
 * Validate that no new required params got added to the end of the method
 *
 * Make sure the following remains compilable:
 *
 * ```
 * object.method(a1, a2, ..., aN);
 * ```
 *
 * (Not too few arguments)
 */
export function validateNoNewRequiredParams<
  T extends reflect.Initializer | reflect.Method,
>(original: T, updated: T, mismatches: IReport) {
  updated.parameters.forEach((param, i) => {
    if (param.optional) {
      return;
    }

    const origParam = findParam(original.parameters, i);
    if (!origParam || origParam.optional) {
      mismatches.report({
        ruleKey: 'new-argument',
        violator: original,
        message: `argument ${param.name}, newly required argument.`,
      });
    }
  });
}

export function validateMethodCompatible<
  T extends reflect.Method | reflect.Initializer,
>(
  original: T,
  updated: T,
  fqnRemapping: Record<string, string>,
  mismatches: IReport,
) {
  validateStabilities(original, updated, mismatches);

  // Type guards on original are duplicated on updated to help tsc... They are required to be the same type by the declaration.
  if (reflect.isMethod(original) && reflect.isMethod(updated)) {
    validateStaticSame(original, updated, mismatches);
    validateAsyncSame(original, updated, mismatches);
    validateReturnTypeNotWeakened(original, updated, fqnRemapping, mismatches);
  }

  validateNotMadeNonVariadic(original, updated, mismatches);

  // Check that every original parameter can still be mapped to a parameter in the updated method
  validateExistingParams(
    original,
    updated,
    mismatches,
    (oldParam, newParam) => {
      validateParameterTypeWeakened(
        original,
        oldParam,
        newParam,
        fqnRemapping,
        mismatches,
      );
    },
  );

  validateNoNewRequiredParams(original, updated, mismatches);
}

/**
 * Check if a class/interface has been marked as @subclassable
 */
export function subclassableType(x: reflect.Documentable) {
  return x.docs.subclassable;
}

/**
 * Find the indicated parameter with the given index
 *
 * May return the last parameter if it's variadic
 */
function findParam(
  parameters: reflect.Parameter[],
  i: number,
): reflect.Parameter | undefined {
  if (i < parameters.length) {
    return parameters[i];
  }
  const lastParam =
    parameters.length > 0 ? parameters[parameters.length - 1] : undefined;
  if (lastParam && lastParam.variadic) {
    return lastParam;
  }
  return undefined;
}

/**
 * Validate that a previously mutable property is not made immutable
 *
 * Make sure the following remains compilable:
 *
 * ```
 * object.prop = value;
 * ```
 */
export function validateNotMadeImmutable(
  original: reflect.Property,
  updated: reflect.Property,
  mismatches: IReport,
) {
  if (updated.immutable && !original.immutable) {
    mismatches.report({
      ruleKey: 'removed-mutability',
      violator: original,
      message: 'used to be mutable, is now immutable',
    });
  }
}

export function* memberPairs<
  T extends reflect.TypeMember,
  U extends reflect.ReferenceType,
>(
  origClass: U,
  xs: T[],
  updatedClass: U,
  mismatches: IReport,
): IterableIterator<[T, reflect.TypeMember]> {
  for (const origMember of xs) {
    LOG.trace(`${origClass.fqn}#${origMember.name}`);

    const updatedMember = updatedClass.allMembers.find(
      (m) => m.name === origMember.name,
    );
    if (!updatedMember) {
      mismatches.report({
        ruleKey: 'removed',
        violator: origMember,
        message: 'has been removed',
      });
      continue;
    }

    if (origMember.kind !== updatedMember.kind) {
      mismatches.report({
        ruleKey: 'changed-kind',
        violator: origMember,
        message: `changed from ${origMember.kind} to ${updatedMember.kind}`,
      });
    }

    if (!origMember.protected && updatedMember.protected) {
      mismatches.report({
        ruleKey: 'hidden',
        violator: origMember,
        message: "changed from 'public' to 'protected'",
      });
    }

    yield [origMember, updatedMember];
  }
}

/**
 * Whether we are strengthening the postcondition (output type of a method or property)
 *
 * Strengthening output values is allowed!
 */
function isCompatibleReturnType(
  original: reflect.OptionalValue,
  updated: reflect.OptionalValue,
  fqnRemapping: Record<string, string>,
): Analysis {
  if (original.type.void) {
    return { success: true };
  } // If we didn't use to return anything, returning something now is fine
  if (updated.type.void) {
    return { success: false, reasons: ["now returning 'void'"] };
  } // If we used to return something, we can't stop doing that
  if (!original.optional && updated.optional) {
    return { success: false, reasons: ['output type is now optional'] };
  }
  return new TypeAnalysis(updated.system, fqnRemapping).isSuperType(
    original.type,
    updated.type,
  );
}

/**
 * Whether we are weakening the pre (input type of a method)
 *
 * Weakening preconditions is allowed!
 */
function isCompatibleArgumentType(
  original: reflect.TypeReference,
  updated: reflect.TypeReference,
  fqnRemapping: Record<string, string>,
): Analysis {
  // Input can never be void, so no need to check
  return new TypeAnalysis(updated.system, fqnRemapping).isSuperType(
    updated,
    original,
  );
}

/**
 * Verify assignability to supertypes
 *
 * For every base type B of type T, someone could have written:
 *
 * ```
 * const variable: B = new T();
 * ```
 *
 * This code needs to be valid in the updated assembly, so for each
 * B an updated type B' needs to exist in the new assembly which is
 * still a supertype of T'.
 */
function assignableToAllBaseTypes(
  original: reflect.ReferenceType,
  updated: reflect.ReferenceType,
  fqnRemapping: Record<string, string>,
): Analysis {
  for (const B of baseTypes(original)) {
    const result = new TypeAnalysis(
      updated.system,
      fqnRemapping,
    ).isNominalSuperType(B.reference, updated.reference);
    if (!result.success) {
      return result;
    }
  }
  return { success: true };
}

/**
 * Return all base types of the given reference type
 */
function baseTypes(type: reflect.ReferenceType) {
  const ret = new Array<reflect.ReferenceType>();
  const todo: reflect.ReferenceType[] = [type];
  const seen = new Set<string>();

  while (todo.length > 0) {
    const next = todo.pop()!;
    if (seen.has(next.fqn)) {
      continue;
    }
    ret.push(next);
    seen.add(next.fqn);

    todo.push(...next.interfaces);
    if (next.isClassType() && next.base) {
      todo.push(next.base);
    }
  }

  return ret;
}

/**
 * Validate that each enum member in the old enum enum, and apply custom validation to the enums
 *
 * Make sure the following remains compilable:
 *
 * ```
 * T x = ENUM.member;
 * ```
 *
 * (For every member of enum)
 */
export function validateExistingMembers(
  original: reflect.EnumType,
  updated: reflect.EnumType,
  mismatches: IReport,
  validateMember: (
    oldParam: reflect.EnumMember,
    newParam: reflect.EnumMember,
  ) => void,
) {
  for (const origMember of original.members) {
    const updatedMember = updated.members.find(
      (m) => m.name === origMember.name,
    );
    if (!updatedMember) {
      mismatches.report({
        ruleKey: 'removed',
        violator: origMember,
        message: `member ${origMember.name} has been removed`,
      });
      continue;
    }

    validateMember(origMember, updatedMember);
  }
}
