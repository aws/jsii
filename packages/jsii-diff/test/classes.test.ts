import { expectError, expectNoError } from './util';

// ----------------------------------------------------------------------

test('okay to add a new class', () =>
  expectNoError(
    `
    export class Foo1 { }
  `,
    `
    export class Foo1 { }
    export class Foo2 { }
  `,
  ));

// ----------------------------------------------------------------------

test('okay to add a new function to a class', () =>
  expectNoError(
    `
    export class Foo { }
  `,
    `
    export class Foo {
      public foo(): void { }
    }
  `,
  ));

// ----------------------------------------------------------------------

test('not okay to add a required argument to a method', () =>
  expectError(
    /newly required argument/,
    `
    export class Foo {
      public foo(arg1: string): void {
        Array.isArray(arg1);
      }
    }
  `,
    `
    export class Foo {
      public foo(arg1: string, arg2: string): void {
        Array.isArray(arg1);
        Array.isArray(arg2);
      }
    }
  `,
  ));

// ----------------------------------------------------------------------

test('okay to make a required argument optional', () =>
  expectNoError(
    `
    export class Foo {
      public foo(arg1: string, arg2: string): void {
        Array.isArray(arg1);
        Array.isArray(arg2);
      }
    }
  `,
    `
    export class Foo {
      public foo(arg1: string, arg2?: string): void {
        Array.isArray(arg1);
        Array.isArray(arg2);
      }
    }
  `,
  ));

// ----------------------------------------------------------------------

test('okay to turn required arguments into varargs', () =>
  expectNoError(
    `
    export class Foo {
      public foo(arg1: string, arg2: number, arg3: number): void {
        Array.isArray(arg1);
        Array.isArray(arg2);
        Array.isArray(arg3);
      }
    }
  `,
    `
    export class Foo {
      public foo(arg1: string, ...args: number[]): void {
        Array.isArray(arg1);
        Array.isArray(args);
      }
    }
  `,
  ));

// ----------------------------------------------------------------------

test('not allowed to change argument type to a different scalar', () =>
  expectError(
    /method.*foo.*argument arg1, takes number \(formerly string\): string is not assignable to number/i,
    `
    export class Foo {
      public foo(arg1: string): void {
        Array.isArray(arg1);
      }
    }
  `,
    `
    export class Foo {
      public foo(arg1: number): void {
        Array.isArray(arg1);
      }
    }
  `,
  ));

// ----------------------------------------------------------------------

test('cannot add any abstract members to a subclassable class', () =>
  expectError(
    /adds requirement for subclasses to implement 'piet'./,
    `
    /**
     * @subclassable
     */
    export abstract class Henk {
      abstract readonly henk: string;
    }
  `,
    `
    /**
     * @subclassable
     */
    export abstract class Henk {
      abstract readonly henk: string;
      abstract readonly piet: string;
    }
  `,
  ));

// ----------------------------------------------------------------------

test('cannot add any members to a subclassable interface, not even optional ones', () =>
  expectError(
    /adds requirement for subclasses to implement 'piet'./,
    `
    /**
     * @subclassable
     */
    export interface IHenk {
      henk: string;
    }
  `,
    `
    /**
     * @subclassable
     */
    export interface IHenk {
      henk: string;
      piet?: string;
    }
  `,
  ));

// ----------------------------------------------------------------------

test('cannot make a member less visible', () =>
  expectError(
    /changed from 'public' to 'protected'/,
    `
    export class Henk {
      public henk: string = 'henk';
    }
  `,
    `
    export class Henk {
      protected henk: string = 'henk';
    }
  `,
  ));

// ----------------------------------------------------------------------

describe('implement base types need to be present in updated type system', () => {
  test('for interfaces', () =>
    expectError(
      /not assignable to all base types anymore/,
      `
      export interface IPapa {
        readonly pipe: string;
      }

      export interface IBebe extends IPapa {
        readonly pacifier: string;
      }
    `,
      `
      export interface IPapa {
        readonly pipe: string;
      }

      export interface IBebe {
        readonly pacifier: string;
      }
    `,
    ));

  test('for structs', () =>
    expectError(
      /not assignable to all base types anymore/,
      `
      export interface Papa {
        readonly pipe: string;
      }

      export interface Bebe extends Papa {
        readonly pacifier: string;
      }
    `,
      `
      export interface Papa {
        readonly pipe: string;
      }

      export interface Bebe {
        readonly pacifier: string;
      }
    `,
    ));

  test('for classes', () =>
    expectError(
      /not assignable to all base types anymore/,
      `
      export interface IPapa {
        readonly pipe: string;
      }

      export class Bebe implements IPapa {
        readonly pipe: string = 'pff';
        readonly pacifier: string = 'mmm';
      }
    `,
      `
      export interface IPapa {
        readonly pipe: string;
      }

      export class Bebe {
        readonly pipe: string = 'pff';
        readonly pacifier: string = 'mmm';
      }
    `,
    ));

  test('for base classes', () =>
    expectError(
      /not assignable to all base types anymore/,
      `
      export class Papa {
        readonly pipe: string = 'pff';
      }

      export class Bebe extends Papa {
        readonly pacifier: string = 'mmm';
      }
    `,
      `
      export class Papa {
        readonly pipe: string = 'pff';
      }

      export class Bebe {
        readonly pacifier: string = 'mmm';
      }
    `,
    ));

  test('new levels of inheritance are allowed', () =>
    expectNoError(
      `
      export class Papa {
        readonly pipe: string = 'pff';
      }

      export class Bebe extends Papa {
        readonly pacifier: string = 'mmm';
      }
    `,
      `
      export class Papa {
        readonly pipe: string = 'pff';
      }

      export class Inbetween extends Papa {
      }

      export class Bebe extends Inbetween {
        readonly pacifier: string = 'mmm';
      }
    `,
    ));

  test('change direct implementation to inherited implementation via interface', () =>
    expectNoError(
      `
      export interface IPapa {
        readonly pipe: string;
      }

      export class Bebe implements IPapa {
        readonly pipe: string = 'pff';
        readonly pacifier: string = 'mmm';
      }
    `,
      `
      export interface IPapa {
        readonly pipe: string;
      }

      export interface IInbetween extends IPapa {
      }

      export class Bebe implements IInbetween {
        readonly pipe: string = 'pff';
        readonly pacifier: string = 'mmm';
      }
    `,
    ));

  test('change direct implementation to inherited implementation via base class', () =>
    expectNoError(
      `
      export interface IPapa {
        readonly pipe: string;
      }

      export class Bebe implements IPapa {
        readonly pipe: string = 'pff';
        readonly pacifier: string = 'mmm';
      }
    `,
      `
      export interface IPapa {
        readonly pipe: string;
      }

      export class Inbetween implements IPapa {
        readonly pipe: string = 'pff';
      }

      export class Bebe extends Inbetween {
        readonly pacifier: string = 'mmm';
      }
    `,
    ));
});

// ----------------------------------------------------------------------

test('cannot make a class property optional', () =>
  expectError(
    /prop.*henk.*type Optional<string> \(formerly string\): output type is now optional/i,
    `
    export class Henk {
      public henk: string = 'henk';
    }
  `,
    `
    export class Henk {
      public henk?: string = 'henk';
    }
  `,
  ));

// ----------------------------------------------------------------------

test('consider inherited constructor', () =>
  expectError(
    /number is not assignable to string/,
    `
    export class Super {
      constructor(param: number) {
        Array.isArray(param);
      }
    }
    export class Sub extends Super {
    }
  `,
    `
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
  `,
  ));

// ----------------------------------------------------------------------

test('consider inherited constructor, the other way', () =>
  expectError(
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
  `,
    `
    export class Super {
      constructor(param: number) {
        Array.isArray(param);
      }
    }
    export class Sub extends Super {
    }
  `,
  ));

// ----------------------------------------------------------------------

test('method can be moved to supertype', () =>
  expectNoError(
    `
    export class Super {
    }
    export class Sub extends Super {
      public foo(param: number) {
        Array.isArray(param);
      }
    }
  `,
    `
    export class Super {
      public foo(param: number) {
        Array.isArray(param);
      }
    }
    export class Sub extends Super {
    }
  `,
  ));

// ----------------------------------------------------------------------

test('property can be moved to supertype', () =>
  expectNoError(
    `
    export class Super {
    }
    export class Sub extends Super {
      public foo: string = 'foo';
    }
  `,
    `
    export class Super {
      public foo: string = 'foo';
    }
    export class Sub extends Super {
    }
  `,
  ));

// ----------------------------------------------------------------------

test('subclassable is forever', () =>
  expectError(
    /has gone from @subclassable to non-@subclassable/,
    `
    /**
     * @subclassable
     */
    export class Super {
    }
  `,
    `
    export class Super {
    }
  `,
  ));

// ----------------------------------------------------------------------

test('change from method to property', () =>
  expectError(
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
    `,
  ));

test('change from method with arguments to property', () =>
  expectError(
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
    `,
  ));

test('change from property to method', () =>
  expectError(
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
    `,
  ));
