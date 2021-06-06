import * as ts from 'typescript';

import {
  StrictBrand,
  annotateStrictDiagnostic,
  isErrorDiagnostic,
} from '../lib/util';

describe(annotateStrictDiagnostic, () => {
  const diagnostic = {
    category: ts.DiagnosticCategory.Error,
    code: 999,
    messageText: 'messageText',
    file: undefined,
    start: undefined,
    length: undefined,
  };

  test('adds strict property', () => {
    annotateStrictDiagnostic(diagnostic);

    expect(diagnostic).toHaveProperty([StrictBrand]);
  });
});

describe(isErrorDiagnostic, () => {
  const warningDiagnostic = makeDiagnostic(ts.DiagnosticCategory.Warning);
  const errorDiagnostic = makeDiagnostic(ts.DiagnosticCategory.Error);
  const strictErrorDiagnostic = {
    ...makeDiagnostic(ts.DiagnosticCategory.Error),
    [StrictBrand]: true,
  };
  const diagnostics = [
    warningDiagnostic,
    errorDiagnostic,
    strictErrorDiagnostic,
  ];

  test('returns all error diagnostics if onlyStrict is false', () => {
    const onlyStrict = false;

    expect(
      diagnostics.filter((diag) => isErrorDiagnostic(diag, { onlyStrict })),
    ).toStrictEqual([errorDiagnostic, strictErrorDiagnostic]);
  });

  test('returns only strict error diagnostics if onlyStrict is true', () => {
    const onlyStrict = true;

    expect(
      diagnostics.filter((diag) => isErrorDiagnostic(diag, { onlyStrict })),
    ).toStrictEqual([strictErrorDiagnostic]);
  });
});

function makeDiagnostic(category: ts.DiagnosticCategory): ts.Diagnostic {
  return {
    category: category,
    code: 999,
    messageText: 'messageText',
    file: undefined,
    start: undefined,
    length: undefined,
  };
}
