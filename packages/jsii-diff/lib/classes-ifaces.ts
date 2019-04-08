import reflect = require('jsii-reflect');
import log4js = require('log4js');
import { Analysis, FailedAnalysis, isSuperType } from './type-analysis';
import { ComparisonContext, shouldInspect } from './types';

const LOG = log4js.getLogger('jsii-diff');

/**
 * Compare two class types
 *
 * We require that all stable properties and methods on the original are
 * present on the new type, and that they match in turn.
 */
export function compareReferenceType<T extends reflect.ReferenceType>(original: T, updated: T, context: ComparisonContext) {
  if (original.isClassType() && updated.isClassType()) {
    if (updated.abstract && !original.abstract) {
      context.mismatches.report(original, 'has gone from non-abstract to abstract');
    }

    // JSII assembler has already taken care of inheritance here
    if (original.initializer && updated.initializer) {
      compareMethod(original, original.initializer, updated.initializer, context);
    }
  }

  if (original.docs.subclassable && !updated.docs.subclassable) {
    context.mismatches.report(original, 'has gone from @subclassable to non-@subclassable');
  }

  for (const [origMethod, updatedMethod] of memberPairs(original, original.allMethods, updated, context)) {
    compareMethod(original, origMethod, updatedMethod, context);
  }

  for (const [origProp, updatedProp] of memberPairs(original, original.allProperties, updated, context)) {
    compareProperty(original, origProp, updatedProp, context);
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
        context.mismatches.report(original, `adds requirement for subclasses to implement '${name}'.`);
      }
    }
}

function describeTypeMatchingFailure(origType: reflect.TypeReference, updatedType: reflect.TypeReference, analysis: FailedAnalysis) {
  if (origType.toString() !== updatedType.toString()) {
    return `${updatedType} (formerly ${origType}): ${analysis.reasons.join(', ')}`;
  } else {
    return `${updatedType}: ${analysis.reasons.join(', ')}`;
  }
}

function compareMethod<T extends (reflect.Method | reflect.Initializer)>(
                                  origClass: reflect.Type,
                                  original: T,
                                  updated: T,
                                  context: ComparisonContext) {
  // Type guards on original are duplicated on updated to help tsc... They are required to be the same type by the declaration.
  if (reflect.isMethod(original) && reflect.isMethod(updated)) {
    if (original.static !== updated.static) {
      // tslint:disable-next-line:max-line-length
      context.mismatches.report(origClass, `${original.kind} ${original.name} was ${original.static ? 'static' : 'not static'}, is now ${updated.static ? 'static' : 'not static'}.`);
    }
  }

  if (original.variadic && !updated.variadic) {
    // Once variadic, can never be made non-variadic anymore (because I could always have been passing N+1 arguments)
    context.mismatches.report(origClass, `${original.kind} ${original.name} used to be variadic, not variadic anymore.`);
  }

  if (reflect.isMethod(original) && reflect.isMethod(updated)) {
    const retAna = isCompatibleReturnType(original.returns, updated.returns);
    if (!retAna.success) {
      // tslint:disable-next-line:max-line-length
      context.mismatches.report(origClass, `${original.kind} ${original.name}, returns ${describeTypeMatchingFailure(original.returns, updated.returns, retAna)}`);
    }
  }

  // Check that every original parameter can still be mapped to a parameter in the updated method
  original.parameters.forEach((param, i) => {
    const updatedParam = findParam(updated.parameters, i);
    if (updatedParam === undefined) {
      context.mismatches.report(origClass, `${original.kind} ${original.name} argument ${param.name}, not accepted anymore.`);
      return;
    }

    const argAna = isCompatibleArgumentType(param.type, updatedParam.type);
    if (!argAna.success) {
      // tslint:disable-next-line:max-line-length
      context.mismatches.report(origClass, `${original.kind} ${original.name} argument ${param.name}, takes ${describeTypeMatchingFailure(param.type, updatedParam.type, argAna)}`);
      return;
    }
  });

  // Check that no new required parameters got added.
  updated.parameters.forEach((param, i) => {
    if (param.optional) { return; }

    const origParam = findParam(original.parameters, i);
    if (!origParam || origParam.optional) {
      context.mismatches.report(origClass, `${original.kind} ${original.name} argument ${param.name}, newly required argument.`);
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

function compareProperty(origClass: reflect.Type, original: reflect.Property, updated: reflect.Property, context: ComparisonContext) {
  if (original.static !== updated.static) {
    // tslint:disable-next-line:max-line-length
    context.mismatches.report(origClass, `property ${original.name}, used to be ${original.static ? 'static' : 'not static'}, is now ${updated.static ? 'static' : 'not static'}`);
  }

  const ana = isCompatibleReturnType(original.type, updated.type);
  if (!ana.success) {
    context.mismatches.report(origClass, `property ${original.name}, type ${describeTypeMatchingFailure(original.type, updated.type, ana)}`);
  }

  if (updated.immutable && !original.immutable) {
    context.mismatches.report(origClass, `property ${original.name}, used to be mutable, is now immutable`);
  }
}

// tslint:disable-next-line:max-line-length
function* memberPairs<T extends reflect.TypeMember, U extends reflect.ReferenceType>(origClass: U, xs: T[], updatedClass: U, context: ComparisonContext): IterableIterator<[T, T]> {
  for (const origMember of xs.filter(shouldInspect(context))) {
    LOG.trace(`${origClass.fqn}#${origMember.name}`);

    const updatedMember = updatedClass.allMembers.find(m => m.name === origMember.name);
    if (!updatedMember) {
      context.mismatches.report(origClass, `member ${origMember.name} has been removed`);
      continue;
    }

    if (origMember.kind !== updatedMember.kind) {
      context.mismatches.report(origClass, `member ${origMember.name} changed from ${origMember.kind} to ${updatedMember.kind}`);
    }

    if (!origMember.protected && updatedMember.protected) {
      context.mismatches.report(origClass, `member ${origMember.name} changed from 'public' to 'protected'`);
    }

    yield [origMember, updatedMember as T]; // Trust me I know what I'm doing
  }
}

/**
 * Whether we are strengthening the postcondition (output type of a method or property)
 *
 * Strengthening output values is allowed!
 */
function isCompatibleReturnType(original: reflect.TypeReference, updated: reflect.TypeReference): Analysis {
  if (original.void) { return { success: true }; }  // If we didn't use to return anything, returning something now is fine
  if (updated.void) { return { success: false, reasons: [`now returning 'void'`] }; } // If we used to return something, we can't stop doing that
  return isSuperType(original, updated, updated.system);
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
