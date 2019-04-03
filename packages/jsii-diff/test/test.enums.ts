import { Test } from 'nodeunit';
import { expectError, expectNoError } from './util';

export = {
  // Note: an enum with one value behaves weirdly in TypeScript -- it does type analysis to the singleton element.

  // ----------------------------------------------------------------------

  async 'okay to add a member to an enum'(test: Test) {
    await expectNoError(test, `
      export enum Foo {
        Bar,
        Baz,
      }
    `, `
      export enum Foo {
        Bar,
        Baz,
        Quux
      }
    `);
    test.done();
  },

  // ----------------------------------------------------------------------

  async 'not okay to remove a member from an enum'(test: Test) {
    await expectError(test,
      /member Quux has been removed/,
      `
      export enum Foo {
        Bar,
        Baz,
        Quux
      }
    `, `
      export enum Foo {
        Bar,
        Baz
      }
    `);
    test.done();
  },
};
