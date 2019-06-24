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

};
