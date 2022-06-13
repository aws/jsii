import { sourceToAssemblyHelper } from '../lib';

// ----------------------------------------------------------------------
test('trailing semicolon after method is correctly ignored', () => {
  const assembly = sourceToAssemblyHelper(`
    export class Foo {
      private readonly initialized: boolean;

      public constructor() {
        this.initialized = true;
      };

      public method() { return this.initialized; };
    }
  `);

  expect(assembly.types!['testpkg.Foo']).toEqual({
    assembly: 'testpkg',
    fqn: 'testpkg.Foo',
    kind: 'class',
    methods: [
      {
        locationInModule: { filename: 'index.ts', line: 9 },
        name: 'method',
        returns: { type: { primitive: 'boolean' } },
      },
    ],
    initializer: { locationInModule: { filename: 'index.ts', line: 5 } },
    locationInModule: { filename: 'index.ts', line: 2 },
    name: 'Foo',
    symbolId: 'index:Foo',
  });
});
