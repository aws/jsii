import { EnumType } from '@jsii/spec';

import { sourceToAssemblyHelper } from '../lib';

// ----------------------------------------------------------------------
test('test parsing enum with two members and no values', () => {
  const assembly = sourceToAssemblyHelper(`
    export enum Foo {
      BAR,
      BAZ
    }
  `);

  expect(assembly.types!['testpkg.Foo']).toEqual({
    assembly: 'testpkg',
    fqn: 'testpkg.Foo',
    kind: 'enum',
    members: [{ name: 'BAR' }, { name: 'BAZ' }],
    locationInModule: { filename: 'index.ts', line: 2 },
    name: 'Foo',
    symbolId: 'index:Foo',
  });
});

// ----------------------------------------------------------------------
test('test parsing enum with two members and assigned values', () => {
  const assembly = sourceToAssemblyHelper(`
    export enum Foo {
      BAR = 'Bar',
      BAZ = 'Baz'
    }
  `);

  expect(assembly.types!['testpkg.Foo']).toEqual({
    assembly: 'testpkg',
    fqn: 'testpkg.Foo',
    kind: 'enum',
    members: [{ name: 'BAR' }, { name: 'BAZ' }],
    locationInModule: { filename: 'index.ts', line: 2 },
    name: 'Foo',
    symbolId: 'index:Foo',
  });
});

// ----------------------------------------------------------------------

test('enums can have a mix of letters and number', () => {
  const assembly = sourceToAssemblyHelper(`
    export enum Foo {
      Q5X,
      IB3M,
    }
  `);

  expect((assembly.types!['testpkg.Foo'] as EnumType).members).toEqual([
    { name: 'Q5X' },
    { name: 'IB3M' },
  ]);
});

test('enums with the same assigned value should fail', () => {
  expect(() =>
    sourceToAssemblyHelper(`
    export enum Foo {
      BAR = 'Bar',
      BAR_DUPE = 'Bar',
      BAZ = 'Baz',
      BAZ_DUPE = 'Baz',
    }
  `),
  ).toThrow(/There were compiler errors/);
});
