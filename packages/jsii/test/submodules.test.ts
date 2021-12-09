import * as spec from '@jsii/spec';

import {
  sourceToAssemblyHelper,
  TestWorkspace,
  compileJsiiForTest,
} from '../lib';

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

test('can reference classes in submodules via direct import', () =>
  TestWorkspace.withWorkspace(async (ws) => {
    // There are 2 import styles:
    //
    // import { submodule } from 'lib';
    // import * as submodule from 'lib/submodule';
    //
    // We need to support both import styles.

    // Dependency that exports a submodule
    await ws.addDependency(
      await compileJsiiForTest({
        'index.ts': 'export * as submodule from "./subdir"',
        'subdir/index.ts': 'export class Foo { }',
        'subdir/README.md': 'This is the README',
      }),
    );

    // Main library that imports the submodule class directly
    const result = await compileJsiiForTest(
      {
        'index.ts': `
        import { Foo } from 'testpkg/subdir';

        export class Bar {
          constructor(public readonly foo: Foo) { }
        }
      `,
      },
      {
        packageJson: {
          // Must be a different name from the dependency
          name: 'consumerpkg',
          peerDependencies: { testpkg: '*' },
        },
        compilationDirectory: ws.rootDirectory,
      },
    );

    expect(
      (result.assembly.types?.['consumerpkg.Bar'] as spec.ClassType)
        ?.initializer?.parameters,
    ).toEqual([
      {
        name: 'foo',
        type: {
          fqn: 'testpkg.submodule.Foo',
        },
      },
    ]);
  }));
