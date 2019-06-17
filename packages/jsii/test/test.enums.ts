// import spec = require('jsii-spec');
import { Test } from 'nodeunit';
import { sourceToAssemblyHelper } from '../lib';

export = {

  // ----------------------------------------------------------------------
  async 'test parsing enum with two members and no values'(test: Test) {
    const assembly = await sourceToAssemblyHelper(`
      export enum FOO {
        Bar,
        Baz
      }
    `);

    test.deepEqual(assembly.types!['testpkg.FOO'] , {
      assembly: 'testpkg',
      fqn: 'testpkg.FOO',
      kind: 'enum',
      members: [{ name: 'Bar' }, { name: 'Baz' }],
      locationInModule: { filename: 'index.ts', line: 2 },
      name: 'FOO'
    });

    test.done();
  },

  // ----------------------------------------------------------------------
  async 'test parsing enum with two members and assigned values'(test: Test) {
    const assembly = await sourceToAssemblyHelper(`
      export enum FOO {
        Bar = 'Bar',
        Baz = 'Baz'
      }
    `);

    test.deepEqual(assembly.types!['testpkg.FOO'] , {
      assembly: 'testpkg',
      fqn: 'testpkg.FOO',
      kind: 'enum',
      members: [{ name: 'Bar' }, { name: 'Baz' }],
      locationInModule: { filename: 'index.ts', line: 2 },
      name: 'FOO'
    });

    test.done();
  },

};
