import { Test } from 'nodeunit';
import { expectError, expectNoError } from './util';

export = {
  // Note: an enum with one value behaves weirdly in TypeScript -- it does type analysis to the singleton element.

  // ----------------------------------------------------------------------

  async 'okay to add a member to an enum'(test: Test) {
    await expectNoError(test, `
      export enum Foo {
        BAR,
        BAZ,
      }
    `, `
      export enum Foo {
        BAR,
        BAZ,
        QUUX
      }
    `);
    test.done();
  },

  // ----------------------------------------------------------------------

  async 'not okay to remove a member from an enum'(test: Test) {
    await expectError(test,
      /member QUUX has been removed/,
      `
      export enum Foo {
        BAR,
        BAZ,
        QUUX
      }
    `, `
      export enum Foo {
        BAR,
        BAZ
      }
    `);
    test.done();
  },

  // ----------------------------------------------------------------------

  async 'does not crash when removing enum'(test: Test) {
    await expectError(test,
      /ENUM testpkg.Foo: has been removed/,
      `
      export enum Foo {
        BAR,
        BAZ,
        QUUX
      }
    `, `
    `);
    test.done();
  },
};
