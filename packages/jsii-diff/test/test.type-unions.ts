import { Test } from 'nodeunit';
import { expectError, expectNoError } from './util';

export = {

  // ----------------------------------------------------------------------

  async 'type unions in return structs can be the same'(test: Test) {
    await expectNoError(test,
      `
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
    `);

    test.done();
  },

  // ----------------------------------------------------------------------

  async 'type unions in return structs can be narrowed'(test: Test) {
    await expectNoError(test,
      `
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
    `);

    test.done();
  },

  // ----------------------------------------------------------------------

  async 'type unions in return structs can not be widened'(test: Test) {
    await expectError(test,
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
    `);

    test.done();
  },

  // ----------------------------------------------------------------------

  async 'type unions in input structs can be the same'(test: Test) {
    await expectNoError(test,
      `
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
    `);

    test.done();
  },

  // ----------------------------------------------------------------------

  async 'type unions in input structs can be widened'(test: Test) {
    await expectNoError(test,
      `
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
    `);

    test.done();
  },

  // ----------------------------------------------------------------------

  async 'type unions in input structs can not be narrowed'(test: Test) {
    await expectError(test,
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
    `);

    test.done();
  },
};