// import spec = require('jsii-spec');
import { Test } from 'nodeunit';
import { sourceToAssemblyHelper } from '../lib';

export = {

  // ----------------------------------------------------------------------
  async 'test parsing enum with two members and no values'(test: Test) {
    const assembly = await sourceToAssemblyHelper(`
      export enum Foo {
        Bar,
        Baz
      }
    `);

    test.deepEqual(assembly.types!['testpkg.Foo'] , {
      assembly: 'testpkg',
      fqn: 'testpkg.Foo',
      kind: 'enum',
      members: [{ name: 'Bar' }, { name: 'Baz' }],
      name: 'Foo'
    });

    test.done();
  },

  // ----------------------------------------------------------------------
  async 'test parsing enum with two members and assigned values'(test: Test) {
    const assembly = await sourceToAssemblyHelper(`
      export enum Foo {
        Bar = 'Bar',
        Baz = 'Baz'
      }
    `);

    test.deepEqual(assembly.types!['testpkg.Foo'] , {
      assembly: 'testpkg',
      fqn: 'testpkg.Foo',
      kind: 'enum',
      members: [{ name: 'Bar' }, { name: 'Baz' }],
      name: 'Foo'
    });

    test.done();
  },

};
