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
export function compareClass(original: reflect.ClassType, updated: reflect.ClassType, context: ComparisonContext) {
  if (updated.abstract && !original.abstract) {
    context.mismatches.report(original, 'has gone from non-abstract to abstract');
  }

  for (const [origMethod, updatedMethod] of memberPairs(original, original.methods, updated, context)) {
    compareMethod(original, origMethod, updatedMethod, context);
  }

  for (const [origProp, updatedProp] of memberPairs(original, original.properties, updated, context)) {
    compareProperty(original, origProp, updatedProp, context);
  }

  // You cannot have added abstract members to the class, as they are
  // an added burden on potential subclass implementors.
  // Only for types that are explicitly marked as intended to be subclasses by customers.
  if (subclassableType(original)) {
    checkNoNewMembers(original, updated, context);
  }
}

export function compareInterface(original: reflect.InterfaceType, updated: reflect.InterfaceType, context: ComparisonContext) {
  for (const [origMethod, updatedMethod] of memberPairs(original, original.methods, updated, context)) {
    compareMethod(original, origMethod, updatedMethod, context);
  }

  // We don't compare structs for properties here, because the position-independent analysis we do hear amounts to
  // analyzing for compatibility in the 'output' position. Instead, type analysis while checking methods will do
  // required assignability analysis for structs.
  // UNLESS we have to assume the user is reading the structs as well, in which case we *do* do the analysis here.
  const matchProps = !original.datatype || subclassableType(original) || context.assumeStructReaders;

  if (matchProps) {
    for (const [origProp, updatedProp] of memberPairs(original, original.properties, updated, context)) {
      compareProperty(original, origProp, updatedProp, context);
    }
  } else {
    // If we don't do FULL property matching, we still have to check that all
    // members that used to be present are still present (and of assignable
    // type).
    //
    // Our input/output analysis checks structural assignment, but in all clients for
    // non-TypeScript languages it's illegal to specify values that aren't required,
    // so if we took away a field completely your code becomes illegal. Check that
    // all previously assignable fields still exist. Do that by calling memberPairs.
    Array.from(memberPairs(original, original.properties, updated, context));
  }

  if (original.datatype !== updated.datatype) {
    context.mismatches.report(original, `used to be a ${interfaceType(original.datatype)}, is now a ${interfaceType(updated.datatype)}.`);
  }

  if (subclassableType(original)) {
    // Similar as with classes, implementors should not bear the burden of having
    // to add new mandatory fields. Only do this on types that have been explicitly
    // marked for subclassing.
    checkNoNewMembers(original, updated, context);
  }
}

function checkNoNewMembers<T extends reflect.ClassType | reflect.InterfaceType>(original: T, updated: T, context: ComparisonContext) {
    const absMemberNames = new Set(updated.members.filter(m => m.abstract).map(m => m.name));
    const originalMemberNames = new Set(original.members.map(m => m.name));
    for (const name of absMemberNames) {
      if (!originalMemberNames.has(name)) {
        context.mismatches.report(original, `adds requirement for subclasses to implement '${name}'.`);
      }
    }
}

function interfaceType(dataType: boolean) {
  return dataType ? 'data interface' : 'behavior interface';
}

function describeTypeMatchingFailure(origType: reflect.TypeReference, updatedType: reflect.TypeReference, analysis: FailedAnalysis) {
  if (origType.toString() !== updatedType.toString()) {
    return `${updatedType} (formerly ${origType}): ${analysis.reasons.join(', ')}`;
  } else {
    return `${updatedType}: ${analysis.reasons.join(', ')}`;
  }
}

function compareMethod(origClass: reflect.Type, original: reflect.Method, updated: reflect.Method, context: ComparisonContext) {
  if (original.static !== updated.static) {
    // tslint:disable-next-line:max-line-length
    context.mismatches.report(origClass, `method ${original.name} was ${original.static ? 'static' : 'not static'}, is now ${updated.static ? 'static' : 'not static'}.`);
  }

  const ana = isStrengtheningPostCondition(original.returns, updated.returns);
  if (!ana.success) {
    // tslint:disable-next-line:max-line-length
    context.mismatches.report(origClass, `method ${original.name}, returns ${describeTypeMatchingFailure(original.returns, updated.returns, ana)}`);
  }

  const updatedParams = updated.parameters;
  original.parameters.forEach((param, i) => {
    // Find the matching parameter
    const updatedParam = findParam(updatedParams, i);
    if (updatedParam === undefined) {
      context.mismatches.report(origClass, `method ${original.name} argument ${param.name}, not accepted anymore.`);
      return;
    }

    const mana = isWeakeningPreCondition(param.type, updatedParam.type);
    if (!mana.success) {
      // tslint:disable-next-line:max-line-length
      context.mismatches.report(origClass, `method ${original.name} argument ${param.name}, takes ${describeTypeMatchingFailure(param.type, updatedParam.type, mana)}`);
      return;
    }
  });
}

/**
 * Check if a class/interface has been marked as @subclassable
 */
function subclassableType(x: reflect.Documentable) {
  return x.docs.customTag('subclassable') !== undefined;
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

  const ana = isStrengtheningPostCondition(original.type, updated.type);
  if (!ana.success) {
    context.mismatches.report(origClass, `property ${original.name}, type ${describeTypeMatchingFailure(original.type, updated.type, ana)}`);
  }

  if (updated.immutable && !original.immutable) {
    context.mismatches.report(origClass, `property ${original.name}, used to be mutable, is now immutable`);
  }
}

// tslint:disable-next-line:max-line-length
function* memberPairs<T extends reflect.TypeMember>(origClass: reflect.ClassType | reflect.InterfaceType, xs: T[], updatedClass: reflect.ClassType | reflect.InterfaceType, context: ComparisonContext): IterableIterator<[T, T]> {
  for (const origMember of xs.filter(shouldInspect(context))) {
    LOG.trace(`${origClass.fqn}#${origMember.name}`);

    const updatedMember = updatedClass.members.find(m => m.name === origMember.name);
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
 * Strengthening postconditions is allowed!
 */
function isStrengtheningPostCondition(original: reflect.TypeReference, updated: reflect.TypeReference): Analysis {
  if (original.void) { return { success: true }; }  // If we didn't use to return anything, returning something now is fine
  if (updated.void) { return { success: false, reasons: [`now returning 'void'`] }; } // If we used to return something, we can't stop doing that
  return isSuperType(original, updated, updated.system);
}

/**
 * Whether we are weakening the pre (input type of a method)
 *
 * Weakening preconditions is allowed!
 */
function isWeakeningPreCondition(original: reflect.TypeReference, updated: reflect.TypeReference): Analysis {
  // Input can never be void, so no need to check
  return isSuperType(updated, original, updated.system);
}