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

export function onlyErrors(diags: Diagnostic[]) {
  return diags.filter((diag) => diag.level === DiagLevel.Error);
}

export function onlyWarnings(diags: Diagnostic[]) {
  return diags.filter((diag) => diag.level === DiagLevel.Warning);
}

export const ERROR_CLASSES = ['prod', 'non-experimental', 'all'] as const;

export type ErrorClass = (typeof ERROR_CLASSES)[number];

export const ERROR_CLASSES_TO_STABILITIES: Record<ErrorClass, Stability[]> = {
  prod: [Stability.Stable, Stability.Deprecated],
  'non-experimental': [
    Stability.Stable,
    Stability.Deprecated,
    Stability.External,
  ],
  all: [
    Stability.Stable,
    Stability.Experimental,
    Stability.External,
    Stability.Deprecated,
  ],
};

export function treatAsError(
  errorClass: ErrorClass,
  deprecatedExperimentalErrors = false,
): Set<Stability> {
  const shouldError = new Set<Stability>();

  for (const stability of ERROR_CLASSES_TO_STABILITIES[errorClass]) {
    shouldError.add(stability);
  }

  if (deprecatedExperimentalErrors) {
    shouldError.add(Stability.Experimental);
  }

  return shouldError;
}

/**
 * Classify API mismatches into a set of warnings and errors
 */
export function classifyDiagnostics(
  mismatches: Mismatches,
  shouldError: Set<Stability>,
  skipFilter: Set<string> = new Set(),
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

    return shouldError.has(mis.stability) ? DiagLevel.Error : DiagLevel.Warning;
  }
}
