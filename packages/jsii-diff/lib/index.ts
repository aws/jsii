import * as reflect from 'jsii-reflect';

import { AssemblyComparison } from './type-comparison';
import { ComparisonOptions, Mismatches } from './types';

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
  const comparison = new AssemblyComparison(options);
  comparison.load(original, updated);
  comparison.compare();

  return comparison.mismatches;
}
