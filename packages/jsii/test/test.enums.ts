// import spec = require('jsii-spec');
import { Test } from 'nodeunit';
import { sourceToAssemblyHelper } from '../lib';

export = {

  // ----------------------------------------------------------------------
  async 'test parsing enum with two members and no values'(test: Test) {
    const assembly = await sourceToAssemblyHelper(`
      export enum Foo {
        BAR,
        BAZ
      }
    `);

    test.deepEqual(assembly.types!['testpkg.Foo'] , {
      assembly: 'testpkg',
      fqn: 'testpkg.Foo',
      kind: 'enum',
      members: [{ name: 'BAR' }, { name: 'BAZ' }],
      locationInModule: { filename: 'index.ts', line: 2 },
      name: 'Foo'
    });

    test.done();
  },

  // ----------------------------------------------------------------------
  async 'test parsing enum with two members and assigned values'(test: Test) {
    const assembly = await sourceToAssemblyHelper(`
      export enum Foo {
        BAR = 'Bar',
        BAZ = 'Baz'
      }
    `);

    test.deepEqual(assembly.types!['testpkg.Foo'] , {
      assembly: 'testpkg',
      fqn: 'testpkg.Foo',
      kind: 'enum',
      members: [{ name: 'BAR' }, { name: 'BAZ' }],
      locationInModule: { filename: 'index.ts', line: 2 },
      name: 'Foo'
    });

    test.done();
  },

};
