import reflect = require('jsii-reflect');
import log4js = require('log4js');
import { compareClass, compareInterface } from './classes-ifaces';
import { compareEnum } from './enums';
import { ComparisonContext, describeType, shouldInspect } from './types';

const LOG = log4js.getLogger('jsii-diff');

/**
 * Compare two assemblies
 *
 * We currently only check for compatibility (a full diff is
 * harder :). The only thing we have to do is check for every API
 * item whether it's still available and has the same shape (or
 * bigger) in the new API.
 */
export function compareAssemblies(original: reflect.Assembly, updated: reflect.Assembly, context: ComparisonContext) {
  compareClasses(original, updated, context);
  compareInterfaces(original, updated, context);
  compareEnums(original, updated, context);
}

export function compareClasses(original: reflect.Assembly, updated: reflect.Assembly, context: ComparisonContext) {
  for (const [origClass, updatedClass] of typePairs(original.classes, updated, context)) {
    compareClass(origClass, updatedClass, context);
  }
}

export function compareInterfaces(original: reflect.Assembly, updated: reflect.Assembly, context: ComparisonContext) {
  for (const [origIface, updatedIface] of typePairs(original.interfaces, updated, context)) {
    compareInterface(origIface, updatedIface, context);
  }
}

export function compareEnums(original: reflect.Assembly, updated: reflect.Assembly, context: ComparisonContext) {
  for (const [origEnum, updatedEnum] of typePairs(original.enums, updated, context)) {
    compareEnum(origEnum, updatedEnum, context);
  }
}

function* typePairs<T extends reflect.Type>(xs: T[], updatedAssembly: reflect.Assembly, context: ComparisonContext): IterableIterator<[T, T]> {
  for (const origType of xs.filter(shouldInspect(context))) {
    LOG.trace(origType.fqn);

    const updatedType = updatedAssembly.tryFindType(origType.fqn);
    if (!updatedType) {
      context.mismatches.report(origType, 'has been removed');
      continue;
    }

    if (describeType(origType) !== describeType(updatedType)) {
      context.mismatches.report(origType, `has been turned into a ${describeType(updatedType)}`);
      continue;
    }

    yield [origType, updatedType as T]; // Trust me I know what I'm doing
  }
}