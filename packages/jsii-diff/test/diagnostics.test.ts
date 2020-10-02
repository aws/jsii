import { classifyDiagnostics, hasErrors } from '../lib/diagnostics';
import { compare } from './util';

// ----------------------------------------------------------------------
test('experimental elements lead to warnings', async () => {
  const mms = await compare(
    `
    /** @experimental */
    export class Foo1 { }
  `,
    `
    export class Foo2 { }
  `,
  );

  const experimentalErrors = false;
  const diags = classifyDiagnostics(mms, experimentalErrors, new Set());

  expect(diags.length).toBe(1);
  expect(hasErrors(diags)).toBeFalsy();
});

// ----------------------------------------------------------------------
test('external stability violations are reported as warnings', async () => {
  const mms = await compare(
    `
    /** @stability external */
    export class Foo1 { }
  `,
    `
    export class Foo2 { }
  `,
  );

  const experimentalErrors = false;
  const diags = classifyDiagnostics(mms, experimentalErrors, new Set());

  expect(diags.length).toBe(1);
  expect(hasErrors(diags)).toBeFalsy();
});

// ----------------------------------------------------------------------
test('warnings can be turned into errors', async () => {
  const mms = await compare(
    `
    /** @experimental */
    export class Foo1 { }
  `,
    `
    export class Foo2 { }
  `,
  );

  const experimentalErrors = true;
  const diags = classifyDiagnostics(mms, experimentalErrors, new Set());

  expect(diags.length).toBe(1);
  expect(hasErrors(diags)).toBeTruthy();
});

// ----------------------------------------------------------------------
test('external stability violations are never turned into errors', async () => {
  const mms = await compare(
    `
    /** @stability external */
    export class Foo1 { }
  `,
    `
    export class Foo2 { }
  `,
  );

  const experimentalErrors = true;
  const diags = classifyDiagnostics(mms, experimentalErrors, new Set());

  expect(diags.length).toBe(1);
  expect(hasErrors(diags)).toBeFalsy();
});

// ----------------------------------------------------------------------
test('errors can be skipped', async () => {
  const mms = await compare(
    `
    export class Foo1 { }
  `,
    `
    export class Foo2 { }
  `,
  );

  const experimentalErrors = true;
  const diags = classifyDiagnostics(
    mms,
    experimentalErrors,
    new Set([mms.mismatches[0].violationKey]),
  );

  expect(diags.length).toBe(1);
  expect(hasErrors(diags)).toBeFalsy();
});

// ----------------------------------------------------------------------
test('changing stable to experimental is breaking', async () => {
  const mms = await compare(
    `
    /** @stable */
    export class Foo1 { }
  `,
    `
    /** @experimental */
    export class Foo1 { }
  `,
  );

  const experimentalErrors = false;
  const diags = classifyDiagnostics(mms, experimentalErrors, new Set());

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

test('can make fields optional in output struct if it is marked @external', async () => {
  const mms = await compare(
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

  const experimentalErrors = true;
  const diags = classifyDiagnostics(mms, experimentalErrors, new Set());

  expect(diags.length).toBe(1);
  expect(hasErrors(diags)).toBeFalsy();
});
