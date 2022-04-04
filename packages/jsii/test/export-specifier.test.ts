import { sourceToAssemblyHelper } from '../lib';

test('export { Foo } from "./foo"', () => {
  const assembly = sourceToAssemblyHelper({
    'index.ts': 'export { Foo } from "./foo";',
    'foo.ts': 'export class Foo { private constructor() {} }',
  });

  expect(assembly.types?.['testpkg.Foo']).toEqual({
    assembly: 'testpkg',
    fqn: 'testpkg.Foo',
    kind: 'class',
    locationInModule: { filename: 'foo.ts', line: 1 },
    name: 'Foo',
    symbolId: 'foo:Foo',
  });
});
