import reflect = require('jsii-reflect');
import log4js = require('log4js');
import { compareStabilities } from './stability';
import { Analysis, FailedAnalysis, isSuperType } from './type-analysis';
import { ComparisonContext } from './types';

const LOG = log4js.getLogger('jsii-diff');

/**
 * Compare two class types
 *
 * We require that all stable properties and methods on the original are
 * present on the new type, and that they match in turn.
 */
export function compareReferenceType<T extends reflect.ReferenceType>(original: T, updated: T, context: ComparisonContext) {
  compareStabilities(original, updated, context);

  if (original.isClassType() && updated.isClassType()) {
    if (updated.abstract && !original.abstract) {
      context.mismatches.report({
        ruleKey: 'made-abstract',
        message: 'has gone from non-abstract to abstract',
        violator: original,
      });
    }

    // JSII assembler has already taken care of inheritance here
    if (original.initializer && updated.initializer) {
      compareMethod(original.initializer, updated.initializer, context);
    }
  }

  if (original.docs.subclassable && !updated.docs.subclassable) {
    context.mismatches.report({
      ruleKey: 'remove-subclassable',
      message: 'has gone from @subclassable to non-@subclassable',
      violator: original,
    });
  }

  for (const [origMethod, updatedElement] of memberPairs(original, original.allMethods, updated, context)) {
    if (reflect.isMethod(origMethod) && reflect.isMethod(updatedElement)) {
      compareMethod(origMethod, updatedElement, context);
    }
  }

  for (const [origProp, updatedElement] of memberPairs(original, original.allProperties, updated, context)) {
    if (reflect.isProperty(origProp) && reflect.isProperty(updatedElement)) {
      compareProperty(origProp, updatedElement, context);
    }
  }

  // You cannot have added abstract members to the class/interface, as they are
  // an added burden on potential implementors.
  //
  // Only for types that are explicitly marked as intended to be subclassed by customers.
  if (subclassableType(original)) {
    noNewAbstractMembers(original, updated, context);
  }
}

export function compareStruct(original: reflect.InterfaceType, updated: reflect.InterfaceType, context: ComparisonContext) {
  compareStabilities(original, updated, context);

  // We don't compare structs here; they will be evaluated for compatibility
  // based on input and output positions.
  //
  // However, even if we don't do full property matching (we don't know yet if
  // the types should be supertype or subtype checked), we still have to check
  // that all members which used to be present are still present. This is because
  // for all non-TypeScript languages it is not allowed to specify members
  // which aren't actually present in the type.
  //
  // A single run of memberPairs() with nothing else will do this check.
  Array.from(memberPairs(original, original.allProperties, updated, context));
}

function noNewAbstractMembers<T extends reflect.ReferenceType>(original: T, updated: T, context: ComparisonContext) {
  const absMemberNames = new Set(updated.allMembers.filter(m => m.abstract).map(m => m.name));
  const originalMemberNames = new Set(original.allMembers.map(m => m.name));
  for (const name of absMemberNames) {
    if (!originalMemberNames.has(name)) {
      context.mismatches.report({
        ruleKey: 'new-abstract-member',
        message: `adds requirement for subclasses to implement '${name}'.`,
        violator: updated.getMembers(true)[name]
      });
    }
  }
}

function describeOptionalValueMatchingFailure(origType: reflect.OptionalValue, updatedType: reflect.OptionalValue, analysis: FailedAnalysis) {
  const origDescr = reflect.OptionalValue.describe(origType);
  const updaDescr = reflect.OptionalValue.describe(updatedType);
  if (origDescr !== updaDescr) {
    return `${updaDescr} (formerly ${origDescr}): ${analysis.reasons.join(', ')}`;
  } 
  return `${updaDescr}: ${analysis.reasons.join(', ')}`;
  
}

function compareMethod<T extends (reflect.Method | reflect.Initializer)>(
  original: T,
  updated: T,
  context: ComparisonContext) {
  compareStabilities(original, updated, context);

  // Type guards on original are duplicated on updated to help tsc... They are required to be the same type by the declaration.
  if (reflect.isMethod(original) && reflect.isMethod(updated)) {
    if (original.static !== updated.static) {
      const origQual = original.static ? 'static' : 'not static';
      const updQual = updated.static ? 'static' : 'not static';
      context.mismatches.report({
        ruleKey: 'changed-static',
        violator: original,
        message: `was ${origQual}, is now ${updQual}.`
      });
    }

    if (original.async !== updated.async) {
      const origQual = original.async ? 'asynchronous' : 'synchronous';
      const updQual = updated.async ? 'asynchronous' : 'synchronous';
      context.mismatches.report({
        ruleKey: 'changed-async',
        violator: original,
        message: `was ${origQual}, is now ${updQual}`
      });
    }
  }

  if (original.variadic && !updated.variadic) {
    // Once variadic, can never be made non-variadic anymore (because I could always have been passing N+1 arguments)
    context.mismatches.report({
      ruleKey: 'changed-variadic',
      violator: original,
      message: 'used to be variadic, not variadic anymore.'
    });
  }

  if (reflect.isMethod(original) && reflect.isMethod(updated)) {
    const retAna = isCompatibleReturnType(original.returns, updated.returns);
    if (!retAna.success) {
      context.mismatches.report({
        ruleKey: 'change-return-type',
        violator: original,
        message: `returns ${describeOptionalValueMatchingFailure(original.returns, updated.returns, retAna)}`
      });
    }
  }

  // Check that every original parameter can still be mapped to a parameter in the updated method
  original.parameters.forEach((param, i) => {
    const updatedParam = findParam(updated.parameters, i);
    if (updatedParam === undefined) {
      context.mismatches.report({
        ruleKey: 'removed-argument',
        violator: original,
        message: `argument ${param.name}, not accepted anymore.`
      });
      return;
    }

    const argAna = isCompatibleArgumentType(param.type, updatedParam.type);
    if (!argAna.success) {
      context.mismatches.report({
        ruleKey: 'incompatible-argument',
        violator: original,
        message: `argument ${param.name}, takes ${describeOptionalValueMatchingFailure(param, updatedParam, argAna)}`
      });
      return;
    }
  });

  // Check that no new required parameters got added.
  updated.parameters.forEach((param, i) => {
    if (param.optional) { return; }

    const origParam = findParam(original.parameters, i);
    if (!origParam || origParam.optional) {
      context.mismatches.report({
        ruleKey: 'new-argument',
        violator: original,
        message: `argument ${param.name}, newly required argument.`
      });
    }
  });
}

/**
 * Check if a class/interface has been marked as @subclassable
 */
function subclassableType(x: reflect.Documentable) {
  return x.docs.subclassable;
}

/**
 * Find the indicated parameter with the given index
 *
 * May return the last parameter if it's variadic
 */
function findParam(parameters: reflect.Parameter[], i: number): reflect.Parameter | undefined {
  if (i < parameters.length) { return parameters[i]; }
  const lastParam = parameters.length > 0 ? parameters[parameters.length - 1] : undefined;
  if (lastParam && lastParam.variadic) { return lastParam; }
  return undefined;
}

function compareProperty(original: reflect.Property, updated: reflect.Property, context: ComparisonContext) {
  compareStabilities(original, updated, context);

  if (original.static !== updated.static) {
    context.mismatches.report({
      ruleKey: 'changed-static',
      violator: original,
      message: `used to be ${original.static ? 'static' : 'not static'}, is now ${updated.static ? 'static' : 'not static'}`
    });
  }

  const ana = isCompatibleReturnType(original, updated);
  if (!ana.success) {
    context.mismatches.report({
      ruleKey: 'changed-type',
      violator: original,
      message: `type ${describeOptionalValueMatchingFailure(original, updated, ana)}`
    });
  }

  if (updated.immutable && !original.immutable) {
    context.mismatches.report({
      ruleKey: 'removed-mutability',
      violator: original,
      message: 'used to be mutable, is now immutable'
    });
  }
}

function* memberPairs<T extends reflect.TypeMember, U extends reflect.ReferenceType>(
  origClass: U,
  xs: T[],
  updatedClass: U,
  context: ComparisonContext
): IterableIterator<[T, reflect.TypeMember]> {
  for (const origMember of xs) {
    LOG.trace(`${origClass.fqn}#${origMember.name}`);

    const updatedMember = updatedClass.allMembers.find(m => m.name === origMember.name);
    if (!updatedMember) {
      context.mismatches.report({
        ruleKey: 'removed',
        violator: origMember,
        message: 'has been removed'
      });
      continue;
    }

    if (origMember.kind !== updatedMember.kind) {
      context.mismatches.report({
        ruleKey: 'changed-kind',
        violator: origMember,
        message: `changed from ${origMember.kind} to ${updatedMember.kind}`
      });
    }

    if (!origMember.protected && updatedMember.protected) {
      context.mismatches.report({
        ruleKey: 'hidden',
        violator: origMember,
        message: "changed from 'public' to 'protected'"
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
function isCompatibleReturnType(original: reflect.OptionalValue, updated: reflect.OptionalValue): Analysis {
  if (original.type.void) { return { success: true }; }  // If we didn't use to return anything, returning something now is fine
  if (updated.type.void) { return { success: false, reasons: ["now returning 'void'"] }; } // If we used to return something, we can't stop doing that
  if (!original.optional && updated.optional) {
    return { success: false, reasons: ['output type is now optional'] };
  }
  return isSuperType(original.type, updated.type, updated.system);
}

/**
 * Whether we are weakening the pre (input type of a method)
 *
 * Weakening preconditions is allowed!
 */
function isCompatibleArgumentType(original: reflect.TypeReference, updated: reflect.TypeReference): Analysis {
  // Input can never be void, so no need to check
  return isSuperType(updated, original, updated.system);
}
