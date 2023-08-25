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
      public bar(): void { }
    }
  `,
  ));

// ----------------------------------------------------------------------

test('not okay to add a required argument to a method', () =>
  expectError(
    /newly required argument/,
    `
    export class Foo {
      public bar(arg1: string): void {
        Array.isArray(arg1);
      }
    }
  `,
    `
    export class Foo {
      public bar(arg1: string, arg2: string): void {
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
      public bar(arg1: string, arg2: string): void {
        Array.isArray(arg1);
        Array.isArray(arg2);
      }
    }
  `,
    `
    export class Foo {
      public bar(arg1: string, arg2?: string): void {
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
      public bar(arg1: string, arg2: number, arg3: number): void {
        Array.isArray(arg1);
        Array.isArray(arg2);
        Array.isArray(arg3);
      }
    }
  `,
    `
    export class Foo {
      public bar(arg1: string, ...args: number[]): void {
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
      public bar(arg1: string): void {
        Array.isArray(arg1);
      }
    }
  `,
    `
    export class Foo {
      public bar(arg1: number): void {
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
      abstract readonly name: string;
    }
  `,
    `
    /**
     * @subclassable
     */
    export abstract class Henk {
      abstract readonly name: string;
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
      name: string;
    }
  `,
    `
    /**
     * @subclassable
     */
    export interface IHenk {
      name: string;
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
      public name: string = 'henk';
    }
  `,
    `
    export class Henk {
      protected name: string = 'henk';
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

test.each([
  {
    oldDecl: 'name: string',
    newDecl: 'name?: string',
    error:
      /type Optional<string> \(formerly string\): output type is now optional/,
  },
  {
    oldDecl: 'name?: string',
    newDecl: 'name: string',
    error: undefined, // Strengthening is okay
  },
  {
    oldDecl: 'name: string',
    newDecl: 'name: string | number',
    error: /number \| string is not assignable to string/,
  },
  {
    oldDecl: 'name: string | number',
    newDecl: 'name: string',
    error: undefined, // Strengthening is okay
  },
])('change class property ', ({ oldDecl, newDecl, error }) =>
  expectError(
    error,
    `
    export class Henk {
      public readonly ${oldDecl} = 'henk';
    }
  `,
    `
    export class Henk {
      public readonly ${newDecl} = 'henk';
    }
  `,
  ),
);

// ----------------------------------------------------------------------

test.each([
  {
    oldDecl: 'name: string',
    newDecl: 'name?: string',
    error: /changed to Optional<string> \(formerly string\)/,
  },
  {
    oldDecl: 'name?: string',
    newDecl: 'name: string',
    error: /changed to string \(formerly Optional<string>\)/,
  },
  {
    oldDecl: 'name: string',
    newDecl: 'name: string | number',
    error: /changed to number \| string \(formerly string\)/,
  },
  {
    oldDecl: 'name: string | number',
    newDecl: 'name: string',
    error: /changed to string \(formerly number \| string\)/,
  },
])(
  'cannot change a mutable class property type: %p to %p',
  ({ oldDecl, newDecl, error }) =>
    expectError(
      error,
      `
      export class Henk {
        public ${oldDecl} = 'henk';
      }
    `,
      `
      export class Henk {
        public ${newDecl} = 'henk';
      }
    `,
    ),
);

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
      public foo() { return 12; }
    }
    `,
    `
    export class Boom {
      public get foo() { return 12; }
    }
    `,
  ));

// ----------------------------------------------------------------------

test('change from method with arguments to property', () =>
  expectError(
    /changed from method to property/,
    `
    export class Boom {
      public foo(arg: number) { return 12 * arg; }
    }
    `,
    `
    export class Boom {
      public get foo() { return 12; }
    }
    `,
  ));

// ----------------------------------------------------------------------

test('change from property to method', () =>
  expectError(
    /changed from property to method/,
    `
    export class Boom {
      public get foo() { return 12; }
    }
    `,
    `
    export class Boom {
      public foo() { return 12; }
    }
    `,
  ));

// ----------------------------------------------------------------------

test.each([
  {
    oldDecl: 'foo(arg: string) { Array.isArray(arg); }',
    newDecl: 'foo(arg: string | number) { Array.isArray(arg); }',
  },
  {
    oldDecl: 'foo(): string { return "x"; }',
    newDecl: 'foo(): string | number { return "x"; }',
  },
  {
    oldDecl: 'readonly foo: string = "x";',
    newDecl: 'readonly foo: string | number = "x";',
  },
])(
  'cannot change any type in @subclassable class: %p to %p',
  ({ oldDecl, newDecl }) =>
    expectError(
      /type is @subclassable/,
      `
      /** @subclassable */
      export class Boom {
        public ${oldDecl}
      }
      `,
      `
      /** @subclassable */
      export class Boom {
        public ${newDecl}
      }
      `,
    ),
);

// ----------------------------------------------------------------------

test.each([
  {
    oldDecl: 'foo(arg: string): void;',
    newDecl: 'foo(arg: string | number): void;',
  },
  { oldDecl: 'foo(): string;', newDecl: 'foo(): string | number;' },
  {
    oldDecl: 'readonly foo: string;',
    newDecl: 'readonly foo: string | number;',
  },
])(
  'cannot change any type in @subclassable interface: %p to %p',
  ({ oldDecl, newDecl }) =>
    expectError(
      /type is @subclassable/,
      `
      /** @subclassable */
      export interface IBoom {
        ${oldDecl}
      }
      `,
      `
      /** @subclassable */
      export interface IBoom {
        ${newDecl}
      }
      `,
    ),
);

// ----------------------------------------------------------------------

test.each([
  // No usage => can add field
  ['', true],
  // Return type => can add field
  ['foo(): TheStruct;', true],
  ['readonly foo: TheStruct;', true],
  // Input type => can NOT add field
  ['foo: TheStruct;', false],
  ['foo(arg: TheStruct): void', false],
])(
  'add required field to structs: refencing via %p -> allowed %p',
  (usageDecl, allowed) =>
    expectError(
      allowed ? undefined : /newly required property 'fieldTwo' added/,
      `
      export interface TheStruct {
        readonly fieldOne: string;
      }

      export interface IConsumer {
        ${usageDecl}
      }
      `,
      `
      export interface TheStruct {
        readonly fieldOne: string;
        readonly fieldTwo: string;
      }

      export interface IConsumer {
        ${usageDecl}
      }
      `,
    ),
);

// ----------------------------------------------------------------------

test.each([
  // No usage => can add field
  ['', true],
  // Return type => can NOT remove information
  ['foo(): TheStruct;', false],
  ['readonly foo: TheStruct;', false],
  ['foo: TheStruct;', false],
  // Input type => can make optional
  ['foo(arg: TheStruct): void', true],
])(
  'make required field optional: refencing via %p -> allowed %p',
  (usageDecl, allowed) =>
    expectError(
      allowed ? undefined : /formerly required property 'fieldOne' is optional/,
      `
      export interface TheStruct {
        readonly fieldOne: string;
      }

      export interface IConsumer {
        ${usageDecl}
      }
      `,
      `
      export interface TheStruct {
        readonly fieldOne?: string;
      }

      export interface IConsumer {
        ${usageDecl}
      }
      `,
    ),
);

// ----------------------------------------------------------------------

test('will find mismatches in submodules', () =>
  expectError(
    /number is not assignable to string/,
    {
      'index.ts': 'export * as submodule from "./subdir"',
      'subdir/index.ts':
        'export class Foo { public static readonly PROP = "abc"; }',
    },
    {
      'index.ts': 'export * as submodule from "./subdir"',
      'subdir/index.ts':
        'export class Foo { public static readonly PROP = 42; }',
    },
  ));
