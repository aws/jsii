import { Test } from 'nodeunit';
import { expectError, expectNoError } from './util';

export = {
  // ----------------------------------------------------------------------

  async 'okay to add a new class'(test: Test) {
    await expectNoError(test, `
      export class Foo1 { }
    `, `
      export class Foo1 { }
      export class Foo2 { }
    `);
    test.done();
  },

  // ----------------------------------------------------------------------

  async 'okay to add a new function to a class'(test: Test) {
    await expectNoError(test, `
      export class Foo { }
    `, `
      export class Foo {
        public foo(): void { }
      }
    `);

    test.done();
  },

  // ----------------------------------------------------------------------

  async 'okay to add an argument to a method'(test: Test) {
    await expectNoError(test, `
      export class Foo {
        public foo(arg1: string): void {
          Array.isArray(arg1);
        }
      }
    `, `
      export class Foo {
        public foo(arg1: string, arg2: string): void {
          Array.isArray(arg1);
          Array.isArray(arg2);
        }
      }
    `);

    test.done();
  },

  // ----------------------------------------------------------------------

  async 'okay to make a required argument optional'(test: Test) {
    await expectNoError(test, `
      export class Foo {
        public foo(arg1: string, arg2: string): void {
          Array.isArray(arg1);
          Array.isArray(arg2);
        }
      }
    `, `
      export class Foo {
        public foo(arg1: string, arg2?: string): void {
          Array.isArray(arg1);
          Array.isArray(arg2);
        }
      }
    `);

    test.done();
  },

  // ----------------------------------------------------------------------

  async 'not allowed to change argument type to a different scalar'(test: Test) {
    await expectError(test,
      /method foo argument arg1, takes number \(formerly string\): string is not assignable to number/,
      `
      export class Foo {
        public foo(arg1: string): void {
          Array.isArray(arg1);
        }
      }
    `, `
      export class Foo {
        public foo(arg1: number): void {
          Array.isArray(arg1);
        }
      }
    `);

    test.done();
  },

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

  async 'cannot add any abstract members to a subclassable class'(test: Test) {
    await expectError(test,
      /adds requirement for subclasses to implement 'piet'./,
      `
      /**
       * @subclassable
       */
      export abstract class Henk {
        abstract readonly henk: string;
      }
    `, `
      /**
       * @subclassable
       */
      export abstract class Henk {
        abstract readonly henk: string;
        abstract readonly piet: string;
      }
    `);

    test.done();
  },

  // ----------------------------------------------------------------------

  async 'cannot add any members to a subclassable interface, not even optional ones'(test: Test) {
    await expectError(test,
      /adds requirement for subclasses to implement 'piet'./,
      `
      /**
       * @subclassable
       */
      export interface IHenk {
        henk: string;
      }
    `, `
      /**
       * @subclassable
       */
      export interface IHenk {
        henk: string;
        piet?: string;
      }
    `);

    test.done();
  },

  // ----------------------------------------------------------------------

  async 'cannot make a member less visible'(test: Test) {
    await expectError(test,
      /changed from 'public' to 'protected'/,
      `
      export class Henk {
        public henk: string = 'henk';
      }
    `, `
      export class Henk {
        protected henk: string = 'henk';
      }
    `);

    test.done();
  },

  // ----------------------------------------------------------------------

  async 'cannot make a class property optional'(test: Test) {
    await expectError(test,
      /property henk, type string\? \(formerly string\): string\? is optional, string is not/,
      `
      export class Henk {
        public henk: string = 'henk';
      }
    `, `
      export class Henk {
        public henk?: string = 'henk';
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
