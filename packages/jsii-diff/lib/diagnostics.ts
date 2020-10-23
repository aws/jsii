import { Stability } from '@jsii/spec';

import { ApiMismatch, Mismatches } from './types';

export enum DiagLevel {
  Error = 0,
  Warning = 1,
  Skipped = 2,
}

const LEVEL_PREFIX = {
  [DiagLevel.Error]: 'err ',
  [DiagLevel.Warning]: 'warn',
  [DiagLevel.Skipped]: 'skip',
};

export interface Diagnostic {
  level: DiagLevel;
  message: string;
  suppressionKey: string;
}

export function formatDiagnostic(
  diag: Diagnostic,
  includeSuppressionKey = false,
) {
  return [
    LEVEL_PREFIX[diag.level],
    '-',
    diag.message,
    ...(includeSuppressionKey ? [`[${diag.suppressionKey}]`] : []),
  ].join(' ');
}

export function hasErrors(diags: Diagnostic[]) {
  return diags.some((diag) => diag.level === DiagLevel.Error);
}

/**
 * Classify API mismatches into a set of warnings and errors
 */
export function classifyDiagnostics(
  mismatches: Mismatches,
  experimentalErrors: boolean,
  skipFilter: Set<string>,
): Diagnostic[] {
  const ret = mismatches.mismatches.map((mis) => ({
    level: level(mis),
    message: mis.message,
    suppressionKey: mis.violationKey,
  }));
  ret.sort((a, b) => a.level - b.level);
  return ret;

  function level(mis: ApiMismatch) {
    if (skipFilter.has(mis.violationKey)) {
      return DiagLevel.Skipped;
    }
    if (
      mis.stability === Stability.Stable ||
      (mis.stability === Stability.Experimental && experimentalErrors)
    ) {
      return DiagLevel.Error;
    }
    return DiagLevel.Warning;
  }
}
