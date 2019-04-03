import { Test } from 'nodeunit';
import { expectError, expectNoError } from './util';

export = {
  // ----------------------------------------------------------------------

  async 'cannot add required fields to an input struct'(test: Test) {
    await expectError(test,
      /required property 'super' used to be missing/,
      `
      export interface Henk {
        readonly henk: string;
      }
      export class Foo {
        public foo(arg1: Henk): void {
          Array.isArray(arg1);
        }
      }
    `, `
      export interface Henk {
        readonly henk: string;
        readonly super: string;
      }
      export class Foo {
        public foo(arg1: Henk): void {
          Array.isArray(arg1);
        }
      }
    `);

    test.done();
  },

  // ----------------------------------------------------------------------

  async 'can add required fields to an output struct'(test: Test) {
    await expectNoError(test,
      `
      export interface Henk {
        readonly henk: string;
      }
      export class Foo {
        public foo(): Henk {
          return { henk: 'henk' };
        }
      }
    `, `
      export interface Henk {
        readonly henk: string;
        readonly super: string;
      }
      export class Foo {
        public foo(): Henk {
          return { henk: 'henk', super: 'super' };
        }
      }
    `);

    test.done();
  },

  // ----------------------------------------------------------------------

  async 'can change argument type to a supertype if it adds only optional fields'(test: Test) {
    await expectNoError(test,
      `
      export interface Henk {
        readonly henk: string;
      }
      export class Foo {
        public foo(arg1: Henk): void {
          Array.isArray(arg1);
        }
      }
    `, `
      export interface Super {
        readonly super?: string;
      }
      export interface Henk extends Super {
        readonly henk: string;
      }
      export class Foo {
        public foo(arg1: Super): void {
          Array.isArray(arg1);
        }
      }
    `);

    test.done();
  },

  // ----------------------------------------------------------------------

  async 'cannot take fields away from input struct'(test: Test) {
    // Legal in TypeScript, but illegal in Java/C#
    await expectError(test,
      /member piet has been removed/,
      `
      export interface Henk {
        readonly henk: string;
        readonly piet: string;
      }
      export class Foo {
        public foo(arg1: Henk): void {
          Array.isArray(arg1);
        }
      }
    `, `
      export interface Henk {
        readonly henk: string;
      }
      export class Foo {
        public foo(arg1: Henk): void {
          Array.isArray(arg1);
        }
      }
    `);

    test.done();
  },

  // ----------------------------------------------------------------------

  async 'cannot take fields away from output struct'(test: Test) {
    await expectError(test,
      /formerly required property 'piet' is missing/,
      `
      export interface Henk {
        readonly henk: string;
        readonly piet: string;
      }
      export class Foo {
        public foo(): Henk {
          return { henk: 'henk', piet: 'piet' };
        }
      }
    `, `
      export interface Henk {
        readonly henk: string;
      }
      export class Foo {
        public foo(): Henk {
          return { henk: 'henk' };
        }
      }
    `);

    test.done();
  },

  // ----------------------------------------------------------------------

  async 'cannot change argument type to a supertype it adds required fields'(test: Test) {
    await expectError(test,
      /required property 'super' used to be missing/,
      `
      export interface Henk {
        readonly henk: string;
      }
      export class Foo {
        public foo(arg1: Henk): void {
          Array.isArray(arg1);
        }
      }
    `, `
      export interface Super {
        readonly super: string;
      }
      export interface Henk extends Super {
        readonly henk: string;
      }
      export class Foo {
        public foo(arg1: Super): void {
          Array.isArray(arg1);
        }
      }
    `);

    test.done();
  },

  // ----------------------------------------------------------------------

  async 'can make an input struct property optional'(test: Test) {
    await expectNoError(test,
      `
      export interface Henk {
        readonly henk: string;
      }
      export class Actions {
        useHenk(henk: Henk) { Array.isArray(henk); }
      }
    `, `
      export interface Henk {
        readonly henk?: string;
      }
      export class Actions {
        useHenk(henk: Henk) { Array.isArray(henk); }
      }
    `);

    test.done();
  },

  // ----------------------------------------------------------------------

  async 'cannot make an input struct property required'(test: Test) {
    await expectError(test,
      /newly required property 'henk' used to be optional in testpkg.Henk/,
      `
      export interface Henk {
        readonly henk?: string;
      }
      export class Actions {
        useHenk(henk: Henk) { Array.isArray(henk); }
      }
    `, `
      export interface Henk {
        readonly henk: string;
      }
      export class Actions {
        useHenk(henk: Henk) { Array.isArray(henk); }
      }
    `);

    test.done();
  },

  // ----------------------------------------------------------------------

  async 'cannot make an output struct property optional'(test: Test) {
    await expectError(test,
      /formerly required property 'henk' is optional in testpkg.Henk/,
      `
      export interface Henk {
        readonly henk: string;
      }
      export class Actions {
        returnHenk(): Henk { return { henk: 'henk' }; }
      }
    `, `
      export interface Henk {
        readonly henk?: string;
      }
      export class Actions {
        returnHenk(): Henk { return {}; }
      }
    `);

    test.done();
  },
};
