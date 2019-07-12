import reflect = require('jsii-reflect');
import spec = require('jsii-spec');
import { ApiElement, ComparisonContext } from './types';

export function compareStabilities(original: reflect.Documentable & ApiElement, updated: reflect.Documentable, context: ComparisonContext) {
  // Nothing to do in these cases
  if (original.docs.stability === undefined || original.docs.stability === updated.docs.stability) { return; }

  // Not allowed to disavow stability
  if (updated.docs.stability === undefined) {
    context.mismatches.report({
      ruleKey: 'removed-stability',
      message: `stability was '${original.docs.stability}', has been removed`,
      violator: original,
    });
    return;
  }

  const allowed = allowedTransitions(original.docs.stability);
  if (!allowed.includes(updated.docs.stability)) {
    context.mismatches.report({
      ruleKey: 'changed-stability',
      message: `stability not allowed to go from '${original.docs.stability}' to '${updated.docs.stability}'`,
      violator: original,
    });
  }
}

function allowedTransitions(start: spec.Stability): spec.Stability[] {
  switch (start) {
    // Experimental can go to stable or be deprecated
    case spec.Stability.Experimental:
      return [spec.Stability.Stable, spec.Stability.Deprecated];

    // Stable can be deprecated
    case spec.Stability.Stable:
      return [spec.Stability.Deprecated];

    // Deprecated can be reinstated
    case spec.Stability.Deprecated:
      return [spec.Stability.Stable];
  }

  throw new Error(`Unrecognized stability: ${start}`);
}