import { Test } from 'nodeunit';
import { classifyDiagnostics, hasErrors } from '../lib/diagnostics';
import { compare } from './util';

export = {
  // ----------------------------------------------------------------------
  async 'experimental elements lead to warnings'(test: Test) {
    const mms = await compare(`
      /** @experimental */
      export class Foo1 { }
    `, `
      export class Foo2 { }
    `);

    const experimentalErrors = false;
    const diags = classifyDiagnostics(mms, experimentalErrors, new Set());

    test.equals(1, diags.length);
    test.equals(false, hasErrors(diags));

    test.done();
  },

  // ----------------------------------------------------------------------
  async 'imported stability violations are reported as warnings'(test: Test) {
    const mms = await compare(`
      /** @imported */
      export class Foo1 { }
    `, `
      export class Foo2 { }
    `);

    const experimentalErrors = false;
    const diags = classifyDiagnostics(mms, experimentalErrors, new Set());

    test.equals(1, diags.length);
    test.equals(false, hasErrors(diags));

    test.done();
  },

  // ----------------------------------------------------------------------
  async 'warnings can be turned into errors'(test: Test) {
    const mms = await compare(`
      /** @experimental */
      export class Foo1 { }
    `, `
      export class Foo2 { }
    `);

    const experimentalErrors = true;
    const diags = classifyDiagnostics(mms, experimentalErrors, new Set());

    test.equals(1, diags.length);
    test.equals(true, hasErrors(diags));

    test.done();
  },

  // ----------------------------------------------------------------------
  async 'imported stability violations are never turned into errors'(test: Test) {
    const mms = await compare(`
      /** @imported */
      export class Foo1 { }
    `, `
      export class Foo2 { }
    `);

    const experimentalErrors = true;
    const diags = classifyDiagnostics(mms, experimentalErrors, new Set());

    test.equals(1, diags.length);
    test.equals(false, hasErrors(diags));

    test.done();
  },

  // ----------------------------------------------------------------------
  async 'errors can be skipped'(test: Test) {
    const mms = await compare(`
      export class Foo1 { }
    `, `
      export class Foo2 { }
    `);

    const experimentalErrors = true;
    const diags = classifyDiagnostics(mms, experimentalErrors, new Set([mms.mismatches[0].violationKey]));

    test.equals(1, diags.length);
    test.equals(false, hasErrors(diags));

    test.done();
  },

  // ----------------------------------------------------------------------
  async 'changing stable to experimental is breaking'(test: Test) {
    const mms = await compare(`
      /** @stable */
      export class Foo1 { }
    `, `
      /** @experimental */
      export class Foo1 { }
    `);

    const experimentalErrors = false;
    const diags = classifyDiagnostics(mms, experimentalErrors, new Set());

    test.ok(diags.length > 0);
    test.ok(diags.some(d => d.message.match(/stability not allowed to go from 'stable' to 'experimental'/)));
    test.equals(true, hasErrors(diags));

    test.done();
  },

};
