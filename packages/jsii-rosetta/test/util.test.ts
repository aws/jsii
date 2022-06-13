import * as ts from 'typescript';

import { annotateStrictDiagnostic, hasStrictBranding } from '../lib/util';

describe(annotateStrictDiagnostic, () => {
  let diagnostic: ts.Diagnostic;

  beforeEach(() => {
    diagnostic = {
      category: ts.DiagnosticCategory.Error,
      code: 999,
      messageText: 'messageText',
      file: undefined,
      start: undefined,
      length: undefined,
    };
  });

  test('adds strict property', () => {
    annotateStrictDiagnostic(diagnostic);

    expect(hasStrictBranding(diagnostic)).toEqual(true);
  });

  test('do not add strict property', () => {
    expect(hasStrictBranding(diagnostic)).toEqual(false);
  });
});
