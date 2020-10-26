import * as spec from '@jsii/spec';
import * as reflect from 'jsii-reflect';

import { ApiElement, IReport } from './types';

export function validateStabilities(
  original: reflect.Documentable & ApiElement,
  updated: reflect.Documentable,
  mismatches: IReport,
) {
  // Nothing to do in these cases
  if (
    original.docs.stability === undefined ||
    original.docs.stability === updated.docs.stability
  ) {
    return;
  }

  // Not allowed to disavow stability
  if (updated.docs.stability === undefined) {
    mismatches.report({
      ruleKey: 'removed-stability',
      message: `stability was '${original.docs.stability}', has been removed`,
      violator: original,
    });
    return;
  }

  const allowed = allowedTransitions(original.docs.stability);
  if (!allowed.includes(updated.docs.stability)) {
    mismatches.report({
      ruleKey: 'changed-stability',
      message: `stability not allowed to go from '${original.docs.stability}' to '${updated.docs.stability}'`,
      violator: original,
    });
  }
}

function allowedTransitions(start: spec.Stability): spec.Stability[] {
  switch (start) {
    // Experimental can go to stable, external, or be deprecated
    case spec.Stability.Experimental:
      return [
        spec.Stability.Stable,
        spec.Stability.Deprecated,
        spec.Stability.External,
      ];

    // Stable can be deprecated, or switched to external
    case spec.Stability.Stable:
      return [spec.Stability.Deprecated, spec.Stability.External];

    // Deprecated can be reinstated
    case spec.Stability.Deprecated:
      return [spec.Stability.Stable, spec.Stability.External];

    // external can be stableified, or deprecated
    case spec.Stability.External:
      return [spec.Stability.Stable, spec.Stability.Deprecated];

    default:
      throw new Error(`Unrecognized stability: ${start as any}`);
  }
}
