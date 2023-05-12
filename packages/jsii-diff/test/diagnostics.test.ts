import { Stability } from '@jsii/spec';

import {
  classifyDiagnostics,
  treatAsError,
  hasErrors,
  onlyErrors,
  onlyWarnings,
  ErrorClass,
} from '../lib/diagnostics';
import { compare } from './util';

// ----------------------------------------------------------------------
test('experimental stability violations lead to warnings', () => {
  const mms = compare(
    `
    /** @experimental */
    export class Foo1 { }
  `,
    `
    export class FooNew { }
  `,
  );

  const diags = classifyDiagnostics(mms, treatAsError('prod'));

  expect(diags.length).toBe(1);
  expect(hasErrors(diags)).toBeFalsy();
});

// ----------------------------------------------------------------------
test('experimental stability violations can be turned into errors', () => {
  const mms = compare(
    `
    /** @experimental */
    export class Foo1 { }
  `,
    `
    export class FooNew { }
  `,
  );

  const diags = classifyDiagnostics(mms, treatAsError('all'));

  expect(onlyErrors(diags).length).toBe(1);
  expect(onlyWarnings(diags).length).toBe(0);
  expect(hasErrors(diags)).toBeTruthy();
});

// ----------------------------------------------------------------------
test('external stability violations are reported as warnings', () => {
  const mms = compare(
    `
    /** @stability external */
    export class Foo1 { }
    
  `,
    `
    export class FooNew { }
  `,
  );

  const diags = classifyDiagnostics(mms, treatAsError('prod'));

  expect(diags.length).toBe(1);
  expect(hasErrors(diags)).toBeFalsy();
});

// ----------------------------------------------------------------------
test('external stability violations can be turned into errors', () => {
  const mms = compare(
    `
    /** @stability external */
    export class Foo1 { }

    /** @stability experimental */
    export class Foo2 { }    
  `,
    `
    export class FooNew { }
  `,
  );

  const diags = classifyDiagnostics(mms, treatAsError('non-experimental'));

  expect(onlyErrors(diags).length).toBe(1);
  expect(onlyWarnings(diags).length).toBe(1);
  expect(hasErrors(diags)).toBeTruthy();
});

// ----------------------------------------------------------------------
test('deprecated stability violations are reported as errors', () => {
  const mms = compare(
    `
    /** @deprecated for some reason */
    export class Foo1 { }
    
  `,
    `
    export class FooNew { }
  `,
  );

  const diags = classifyDiagnostics(mms, treatAsError('prod'));

  expect(diags.length).toBe(1);
  expect(hasErrors(diags)).toBeTruthy();
});

// ----------------------------------------------------------------------
describe('treatAsError', () => {
  test.each<[ErrorClass, Stability[]]>([
    ['prod', [Stability.Deprecated, Stability.Stable]],
    [
      'all',
      [
        Stability.Deprecated,
        Stability.Experimental,
        Stability.External,
        Stability.Stable,
      ],
    ],
    [
      'non-experimental',
      [Stability.Deprecated, Stability.External, Stability.Stable],
    ],
  ])('%s', (errorClasses, expectedStabilities) => {
    const shouldError = treatAsError(errorClasses);
    expect(shouldError.size).toBe(expectedStabilities.length);
    expect([...expectedStabilities].every((s) => shouldError.has(s))).toBe(
      true,
    );
  });
});

// ----------------------------------------------------------------------
test('errors can be skipped by key', () => {
  const mms = compare(
    `
    export class Foo1 { }
  `,
    `
    export class Foo2 { }
  `,
  );

  const diags = classifyDiagnostics(
    mms,
    treatAsError('prod'),
    new Set([mms.mismatches[0].violationKey]),
  );

  expect(diags.length).toBe(1);
  expect(hasErrors(diags)).toBeFalsy();
});

// ----------------------------------------------------------------------
test('changing stable to experimental is breaking', () => {
  const mms = compare(
    `
    /** @stable */
    export class Foo1 { }
  `,
    `
    /** @experimental */
    export class Foo1 { }
  `,
  );

  const diags = classifyDiagnostics(mms, treatAsError('prod'));

  expect(diags.length).toBeGreaterThan(0);
  expect(
    diags.some((d) =>
      /stability not allowed to go from 'stable' to 'experimental'/.exec(
        d.message,
      ),
    ),
  ).toBeTruthy();
  expect(hasErrors(diags)).toBeTruthy();
});

// ----------------------------------------------------------------------
test('can make fields optional in output struct if it is marked @external', () => {
  const mms = compare(
    `
    /** @stability external */
    export interface TheStruct {
      readonly fieldOne: string;
    }

    export interface IConsumer {
      foo(): TheStruct;
    }
    `,
    `
    /** @stability external */
    export interface TheStruct {
      readonly fieldOne?: string;
    }

    export interface IConsumer {
      foo(): TheStruct;
    }
    `,
  );

  const diags = classifyDiagnostics(mms, treatAsError('prod'));

  expect(diags.length).toBe(1);
  expect(hasErrors(diags)).toBeFalsy();
});
