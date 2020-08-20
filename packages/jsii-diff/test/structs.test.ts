import { expectError, expectNoError } from './util';

// ----------------------------------------------------------------------

test('cannot add required fields to an input struct', () =>
  expectError(
    /required property 'super' used to be missing/,
    `
    export interface Henk {
      readonly henk: string;
    }
    export class Foo {
      public bar(arg1: Henk): void {
        Array.isArray(arg1);
      }
    }
  `,
    `
    export interface Henk {
      readonly henk: string;
      readonly super: string;
    }
    export class Foo {
      public bar(arg1: Henk): void {
        Array.isArray(arg1);
      }
    }
  `,
  ));

// ----------------------------------------------------------------------

test('can add required fields to an output struct', () =>
  expectNoError(
    `
    export interface Henk {
      readonly henk: string;
    }
    export class Foo {
      public bar(): Henk {
        return { henk: 'henk' };
      }
    }
  `,
    `
    export interface Henk {
      readonly henk: string;
      readonly super: string;
    }
    export class Foo {
      public bar(): Henk {
        return { henk: 'henk', super: 'super' };
      }
    }
  `,
  ));

// ----------------------------------------------------------------------

test('can change argument type to a supertype if it adds only optional fields', () =>
  expectNoError(
    `
    export interface Henk {
      readonly henk: string;
    }
    export class Foo {
      public bar(arg1: Henk): void {
        Array.isArray(arg1);
      }
    }
  `,
    `
    export interface Super {
      readonly super?: string;
    }
    export interface Henk extends Super {
      readonly henk: string;
    }
    export class Foo {
      public bar(arg1: Super): void {
        Array.isArray(arg1);
      }
    }
  `,
  ));

// ----------------------------------------------------------------------

test('cannot take fields away from input struct', () =>
  // Legal in TypeScript, but illegal in Java/C#
  expectError(
    /has been removed/,
    `
    export interface Henk {
      readonly henk: string;
      readonly piet: string;
    }
    export class Foo {
      public bar(arg1: Henk): void {
        Array.isArray(arg1);
      }
    }
  `,
    `
    export interface Henk {
      readonly henk: string;
    }
    export class Foo {
      public bar(arg1: Henk): void {
        Array.isArray(arg1);
      }
    }
  `,
  ));

// ----------------------------------------------------------------------

test('cannot take fields away from output struct', () =>
  expectError(
    /formerly required property 'piet' is missing/,
    `
    export interface Henk {
      readonly henk: string;
      readonly piet: string;
    }
    export class Foo {
      public bar(): Henk {
        return { henk: 'henk', piet: 'piet' };
      }
    }
  `,
    `
    export interface Henk {
      readonly henk: string;
    }
    export class Foo {
      public bar(): Henk {
        return { henk: 'henk' };
      }
    }
  `,
  ));

// ----------------------------------------------------------------------

test('cannot change argument type to a supertype it adds required fields', () =>
  expectError(
    /required property 'super' used to be missing/,
    `
    export interface Henk {
      readonly henk: string;
    }
    export class Foo {
      public bar(arg1: Henk): void {
        Array.isArray(arg1);
      }
    }
  `,
    `
    export interface Super {
      readonly super: string;
    }
    export interface Henk extends Super {
      readonly henk: string;
    }
    export class Foo {
      public bar(arg1: Super): void {
        Array.isArray(arg1);
      }
    }
  `,
  ));

// ----------------------------------------------------------------------

test('can make an input struct property optional', () =>
  expectNoError(
    `
    export interface Henk {
      readonly henk: string;
    }
    export class Actions {
      useHenk(henk: Henk) { Array.isArray(henk); }
    }
  `,
    `
    export interface Henk {
      readonly henk?: string;
    }
    export class Actions {
      useHenk(henk: Henk) { Array.isArray(henk); }
    }
  `,
  ));

// ----------------------------------------------------------------------

test('cannot make an input struct property required', () =>
  expectError(
    /newly required property 'henk' used to be optional in testpkg.Henk/,
    `
    export interface Henk {
      readonly henk?: string;
    }
    export class Actions {
      useHenk(henk: Henk) { Array.isArray(henk); }
    }
  `,
    `
    export interface Henk {
      readonly henk: string;
    }
    export class Actions {
      useHenk(henk: Henk) { Array.isArray(henk); }
    }
  `,
  ));

// ----------------------------------------------------------------------

test('cannot make an output struct property optional', () =>
  expectError(
    /formerly required property 'henk' is optional in testpkg.Henk/,
    `
    export interface Henk {
      readonly henk: string;
    }
    export class Actions {
      returnHenk(): Henk { return { henk: 'henk' }; }
    }
  `,
    `
    export interface Henk {
      readonly henk?: string;
    }
    export class Actions {
      returnHenk(): Henk { return {}; }
    }
  `,
  ));

// ----------------------------------------------------------------------

test('can handle recursive type references', () =>
  expectNoError(
    `
    export interface LinkedList {
      readonly name: string;
      readonly next?: LinkedList;
    }

    export class UseIt {
      public main(list: LinkedList) {
        Array.isArray(list);
      }
    }
  `,
    `
    export interface LinkedList {
      readonly name: string;
      readonly next?: LinkedList;
    }

    export class UseIt {
      public main(list: LinkedList) {
        Array.isArray(list);
      }
    }
  `,
  ));

// ----------------------------------------------------------------------

test('can handle mutually recursive type references', () =>
  expectNoError(
    `
    export interface A {
      readonly name: string;
      readonly next?: B;
    }

    export interface B {
      readonly name: string;
      readonly next?: A;
    }

    export class UseIt {
      public main(list: A) {
        Array.isArray(list);
      }
    }
  `,
    `
    export interface A {
      readonly name: string;
      readonly next?: B;
    }

    export interface B {
      readonly name: string;
      readonly next?: A;
    }

    export class UseIt {
      public main(list: A) {
        Array.isArray(list);
      }
    }
  `,
  ));
