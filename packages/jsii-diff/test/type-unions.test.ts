import { expectError, expectNoError } from './util';

// ----------------------------------------------------------------------

test('type unions in return structs can be the same', () =>
  expectNoError(`
    export interface Henk {
      readonly henk: string | number;
    }
    export class Actions {
      returnHenk(): Henk { return { henk: 'henk' }; }
    }
  `, `
    export interface Henk {
      readonly henk: string | number;
    }
    export class Actions {
      returnHenk(): Henk { return { henk: 'henk' }; }
    }
  `)
);
// ----------------------------------------------------------------------

test('type unions in return structs can be narrowed', () =>
  expectNoError(`
    export interface Henk {
      readonly henk: string | number;
    }
    export class Actions {
      returnHenk(): Henk { return { henk: 'henk' }; }
    }
  `, `
    export interface Henk {
      readonly henk: string;
    }
    export class Actions {
      returnHenk(): Henk { return { henk: 'henk' }; }
    }
  `)
);
// ----------------------------------------------------------------------

test('type unions in return structs can not be widened', () =>
  expectError(
    /some of string \| number \| boolean are not assignable to string \| number/,
    `
    export interface Henk {
      readonly henk: string | number;
    }
    export class Actions {
      returnHenk(): Henk { return { henk: 'henk' }; }
    }
  `, `
    export interface Henk {
      readonly henk: string | number | boolean;
    }
    export class Actions {
      returnHenk(): Henk { return { henk: 'henk' }; }
    }
  `)
);
// ----------------------------------------------------------------------

test('type unions in input structs can be the same', () =>
  expectNoError(`
    export interface Henk {
      readonly henk: string | number;
    }
    export class Actions {
      takeHenk(_henk: Henk): void { }
    }
  `, `
    export interface Henk {
      readonly henk: string | number;
    }
    export class Actions {
      takeHenk(_henk: Henk): void { }
    }
  `)
);
// ----------------------------------------------------------------------

test('type unions in input structs can be widened', () =>
  expectNoError(`
    export interface Henk {
      readonly henk: string | number;
    }
    export class Actions {
      takeHenk(_henk: Henk): void { }
    }
  `, `
    export interface Henk {
      readonly henk: string | number | boolean;
    }
    export class Actions {
      takeHenk(_henk: Henk): void { }
    }
  `)
);
// ----------------------------------------------------------------------

test('type unions in input structs can not be narrowed', () =>
  expectError(
    /string \| number is not assignable to string/,
    `
    export interface Henk {
      readonly henk: string | number;
    }
    export class Actions {
      takeHenk(_henk: Henk): void { }
    }
  `, `
    export interface Henk {
      readonly henk: string;
    }
    export class Actions {
      takeHenk(_henk: Henk): void { }
    }
  `)
);
