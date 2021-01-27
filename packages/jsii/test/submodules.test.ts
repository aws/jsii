import { sourceToAssemblyHelper } from '../lib';

test('submodules loaded from directories can have a README', async () => {
  const assembly = await sourceToAssemblyHelper({
    'index.ts': 'export * as submodule from "./subdir"',
    'subdir/index.ts': 'export class Foo { }',
    'subdir/README.md': 'This is the README',
  });

  expect(assembly.submodules!['testpkg.submodule']).toEqual(
    expect.objectContaining({
      readme: {
        markdown: 'This is the README',
      },
    }),
  );
});

test('submodules loaded from files can have a README', async () => {
  const assembly = await sourceToAssemblyHelper({
    'index.ts': 'export * as submodule from "./submod"',
    'submod.ts': 'export class Foo { }',
    'submod.README.md': 'This is the README',
  });

  expect(assembly.submodules!['testpkg.submodule']).toEqual(
    expect.objectContaining({
      readme: {
        markdown: 'This is the README',
      },
    }),
  );
});

test('submodules loaded from directories can have targets', async () => {
  const assembly = await sourceToAssemblyHelper({
    'index.ts': 'export * as submodule from "./subdir"',
    'subdir/index.ts': 'export class Foo { }',
    'subdir/.jsiirc.json': JSON.stringify({
      targets: {
        python: 'fun',
      },
    }),
  });

  expect(assembly.submodules!['testpkg.submodule']).toEqual(
    expect.objectContaining({
      targets: {
        python: 'fun',
      },
    }),
  );
});
