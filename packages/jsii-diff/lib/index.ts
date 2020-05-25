import * as reflect from 'jsii-reflect';
import { Stability } from '@jsii/spec';
import * as log4js from 'log4js';
import { compareReferenceType, compareStruct } from './classes-ifaces';
import { compareEnum } from './enums';
import {
  ComparisonContext,
  ComparisonOptions,
  describeType,
  Mismatches,
} from './types';

const LOG = log4js.getLogger('jsii-diff');

/**
 * Compare two assemblies
 *
 * We currently only check for compatibility (a full diff is
 * harder :). The only thing we have to do is check for every API
 * item whether it's still available and has the same shape (or
 * bigger) in the new API.
 */
export function compareAssemblies(
  original: reflect.Assembly,
  updated: reflect.Assembly,
  options: ComparisonOptions = {},
): Mismatches {
  const mismatches = new Mismatches({
    defaultStability: options.defaultExperimental
      ? Stability.Experimental
      : Stability.Stable,
  });

  const context = { ...options, mismatches };

  compareClasses(original, updated, context);
  compareInterfaces(original, updated, context);
  compareEnums(original, updated, context);

  return context.mismatches;
}

export function compareClasses(
  original: reflect.Assembly,
  updated: reflect.Assembly,
  context: ComparisonContext,
) {
  for (const [origClass, updatedClass] of typePairs(
    original.classes,
    updated,
    context,
  )) {
    compareReferenceType(origClass, updatedClass, context);
  }
}

export function compareInterfaces(
  original: reflect.Assembly,
  updated: reflect.Assembly,
  context: ComparisonContext,
) {
  for (const [origIface, updatedIface] of typePairs(
    original.interfaces,
    updated,
    context,
  )) {
    if (origIface.datatype !== updatedIface.datatype) {
      context.mismatches.report({
        ruleKey: 'iface-type',
        violator: origIface,
        message: `used to be a ${interfaceType(
          origIface.datatype,
        )}, is now a ${interfaceType(updatedIface.datatype)}.`,
      });
      continue;
    }
    if (origIface.datatype) {
      compareStruct(origIface, updatedIface, context);
    } else {
      compareReferenceType(origIface, updatedIface, context);
    }
  }
}

export function compareEnums(
  original: reflect.Assembly,
  updated: reflect.Assembly,
  context: ComparisonContext,
) {
  for (const [origEnum, updatedEnum] of typePairs(
    original.enums,
    updated,
    context,
  )) {
    compareEnum(origEnum, updatedEnum, context);
  }
}

function* typePairs<T extends reflect.Type>(
  xs: readonly T[],
  updatedAssembly: reflect.Assembly,
  context: ComparisonContext,
): IterableIterator<[T, T]> {
  for (const origType of xs) {
    LOG.trace(origType.fqn);

    const updatedType = updatedAssembly.tryFindType(origType.fqn);
    if (!updatedType) {
      context.mismatches.report({
        ruleKey: 'removed',
        violator: origType,
        message: 'has been removed',
      });
      continue;
    }

    if (describeType(origType) !== describeType(updatedType)) {
      context.mismatches.report({
        ruleKey: 'struct-change',
        violator: origType,
        message: `has been turned into a ${describeType(updatedType)}`,
      });
      continue;
    }

    yield [origType, updatedType as T]; // Trust me I know what I'm doing
  }
}

function interfaceType(dataType: boolean) {
  return dataType ? 'struct' : 'regular interface';
}
