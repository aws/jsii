import { sourceToAssemblyHelper } from '../lib';

// ----------------------------------------------------------------------
test('test parsing enum with two members and no values', async () => {
  const assembly = await sourceToAssemblyHelper(`
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
test('test parsing enum with two members and assigned values', async () => {
  const assembly = await sourceToAssemblyHelper(`
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

test('enum with only one value', async () => {
  const assembly = await sourceToAssemblyHelper(`
    export enum Foo {
      DR = 'Evil',
    }
  `);

  expect(assembly.types!['testpkg.Foo']).toEqual({
    assembly: 'testpkg',
    fqn: 'testpkg.Foo',
    kind: 'enum',
    members: [{ name: 'DR' }],
    locationInModule: { filename: 'index.ts', line: 2 },
    name: 'Foo',
    symbolId: 'index:Foo',
  });
});

test('two enum members have the same value', async () => {
  const assembly = await sourceToAssemblyHelper(`
    export enum Foo {
      DR = 'Evil',
      VADER = 'Evil'
    }
  `);

  expect(assembly.types!['testpkg.Foo']).toEqual({
    assembly: 'testpkg',
    fqn: 'testpkg.Foo',
    kind: 'enum',
    members: [{ name: 'DR' }, { name: 'VADER' }],
    locationInModule: { filename: 'index.ts', line: 2 },
    name: 'Foo',
    symbolId: 'index:Foo',
  });
});
