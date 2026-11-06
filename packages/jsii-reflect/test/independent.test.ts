import * as reflect from '../lib';
import { assemblyFromSource } from './util';

test('get full github source location for a class or method', () => {
  // WHEN
  const assembly = assemblyFromSource(
    `
    export class Foo {
      public bar() {
        // Nothing to do
      }
    }
  `.trim(),
    (obj) => {
      if (typeof obj.repository === 'object') {
        obj.repository.directory = 'some/sub/dir';
      }
    },
  );

  // THEN
  const klass = assembly.findType('testpkg.Foo');
  expect(klass.isClassType).toBeTruthy();

  expect(reflect.repositoryUrl(klass, 'main')).toBe(
    'https://github.com/aws/jsii/blob/main/some/sub/dir/index.ts#L1',
  );

  expect(reflect.repositoryUrl(klass)).toBe(
    'https://github.com/aws/jsii/blob/master/some/sub/dir/index.ts#L1',
  );
});

test('getInterfaces(true) on a class lists each interface once', () => {
  // GIVEN
  const assembly = assemblyFromSource(`
    export interface IBase { readonly base: string; }
    export interface IOne extends IBase { readonly one: string; }
    export interface ITwo extends IBase { readonly two: string; }
    export class Foo implements IOne, ITwo {
      public readonly base = 'base';
      public readonly one = 'one';
      public readonly two = 'two';
    }
    export class Bar extends Foo implements ITwo {}
  `);

  // WHEN
  const foo = assembly.system.findClass('testpkg.Foo');
  const bar = assembly.system.findClass('testpkg.Bar');

  // THEN
  expect(foo.getInterfaces(true).map((i) => i.name)).toEqual([
    'IOne',
    'IBase',
    'ITwo',
  ]);
  expect(bar.getInterfaces(true).map((i) => i.name)).toEqual([
    'IOne',
    'IBase',
    'ITwo',
  ]);
});
