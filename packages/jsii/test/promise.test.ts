import { sourceToAssemblyHelper } from '../lib';

// ----------------------------------------------------------------------
test('Promise<void> is a valid return type', () => {
  const assembly = sourceToAssemblyHelper(`
    export class PromiseMaker {
      public static staticPromise(): Promise<void> {
        return Promise.resolve();
      }

      public instancePromise(): Promise<void> {
        return Promise.resolve();
      }

      private constructor() {}
    }
  `);

  expect(assembly.types!['testpkg.PromiseMaker']).toEqual({
    assembly: 'testpkg',
    fqn: 'testpkg.PromiseMaker',
    kind: 'class',
    methods: [
      {
        async: true,
        locationInModule: { filename: 'index.ts', line: 3 },
        name: 'staticPromise',
        static: true,
      },
      {
        async: true,
        locationInModule: { filename: 'index.ts', line: 7 },
        name: 'instancePromise',
      },
    ],
    locationInModule: { filename: 'index.ts', line: 2 },
    name: 'PromiseMaker',
    symbolId: 'index:PromiseMaker',
  });
});
