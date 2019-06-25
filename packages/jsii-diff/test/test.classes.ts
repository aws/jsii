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

  async 'not okay to add a required argument to a method'(test: Test) {
    await expectError(test,
      /newly required argument/,
      `
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

  async 'okay to turn required arguments into varargs'(test: Test) {
    await expectNoError(test,
      `
      export class Foo {
        public foo(arg1: string, arg2: number, arg3: number): void {
          Array.isArray(arg1);
          Array.isArray(arg2);
          Array.isArray(arg3);
        }
      }
    `, `
      export class Foo {
        public foo(arg1: string, ...args: number[]): void {
          Array.isArray(arg1);
          Array.isArray(args);
        }
      }
    `);

    test.done();
  },

  // ----------------------------------------------------------------------

  async 'not allowed to change argument type to a different scalar'(test: Test) {
    await expectError(test,
      /method.*foo.*argument arg1, takes number \(formerly string\): string is not assignable to number/i,
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
      /prop.*henk.*type Optional<string> \(formerly string\): output type is now optional/i,
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

  async 'consider inherited constructor'(test: Test) {
    await expectError(test,
      /number is not assignable to string/,
      `
      export class Super {
        constructor(param: number) {
          Array.isArray(param);
        }
      }
      export class Sub extends Super {
      }
    `, `
      export class Super {
        constructor(param: number) {
          Array.isArray(param);
        }
      }
      export class Sub extends Super {
        constructor(param: string) {
          super(5);
          Array.isArray(param);
        }
      }
    `);

    test.done();
  },

  // ----------------------------------------------------------------------

  async 'consider inherited constructor, the other way'(test: Test) {
    await expectError(test,
      /newly required argument/,
      `
      export class Super {
        constructor(param: number) {
          Array.isArray(param);
        }
      }
      export class Sub extends Super {
        constructor() {
          super(5);
        }
      }
    `, `
      export class Super {
        constructor(param: number) {
          Array.isArray(param);
        }
      }
      export class Sub extends Super {
      }
    `);

    test.done();
  },

  // ----------------------------------------------------------------------

  async 'method can be moved to supertype'(test: Test) {
    await expectNoError(test,
      `
      export class Super {
      }
      export class Sub extends Super {
        public foo(param: number) {
          Array.isArray(param);
        }
      }
    `, `
      export class Super {
        public foo(param: number) {
          Array.isArray(param);
        }
      }
      export class Sub extends Super {
      }
    `);

    test.done();
  },

  // ----------------------------------------------------------------------

  async 'property can be moved to supertype'(test: Test) {
    await expectNoError(test,
      `
      export class Super {
      }
      export class Sub extends Super {
        public foo: string = 'foo';
      }
    `, `
      export class Super {
        public foo: string = 'foo';
      }
      export class Sub extends Super {
      }
    `);

    test.done();
  },

  // ----------------------------------------------------------------------

  async 'subclassable is forever'(test: Test) {
    await expectError(test,
      /has gone from @subclassable to non-@subclassable/,
      `
      /**
       * @subclassable
       */
      export class Super {
      }
    `, `
      export class Super {
      }
    `);

    test.done();
  },

  // ----------------------------------------------------------------------

  async 'change from method to property'(test: Test) {
    await expectError(test,
      /changed from method to property/,
      `
      export class Boom {
        foo() { return 12; }
      }
      `,
      `
      export class Boom {
        get foo() { return 12; }
      }
      `
    );

    test.done();
  },

  async 'change from method with arguments to property'(test: Test) {
    await expectError(test,
      /changed from method to property/,
      `
      export class Boom {
        foo(arg: number) { return 12 * arg; }
      }
      `,
      `
      export class Boom {
        get foo() { return 12; }
      }
      `
    );

    test.done();
  },

  async 'change from property to method'(test: Test) {
    await expectError(test,
      /changed from property to method/,
      `
      export class Boom {
        get foo() { return 12; }
      }
      `,
      `
      export class Boom {
        foo() { return 12; }
      }
      `
    );

    test.done();
  }
};
