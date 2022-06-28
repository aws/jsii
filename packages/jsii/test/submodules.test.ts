import * as spec from '@jsii/spec';
import { writeAssembly, loadAssemblyFromPath } from '@jsii/spec';

import {
  sourceToAssemblyHelper,
  TestWorkspace,
  compileJsiiForTest,
} from '../lib';

test('submodules loaded from directories can have a README', () => {
  const assembly = sourceToAssemblyHelper({
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

test('submodules loaded from files can have a README', () => {
  const assembly = sourceToAssemblyHelper({
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

test('submodules loaded from directories can have targets', () => {
  const assembly = sourceToAssemblyHelper({
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

test('submodule READMEs can have literate source references', () => {
  const assembly = sourceToAssemblyHelper({
    'index.ts': 'export * as submodule from "./subdir"',
    'subdir/index.ts': 'export class Foo { }',
    'subdir/README.md':
      'This is the README\n\n[includable](./test/includeme.lit.ts)',
    'subdir/test/includeme.lit.ts': '// Include me',
  });

  expect(assembly.submodules!['testpkg.submodule']).toEqual(
    expect.objectContaining({
      readme: {
        markdown: [
          'This is the README',
          '',
          '```ts lit=subdir/test/includeme.lit.ts',
          '// Include me',
          '```',
        ].join('\n'),
      },
    }),
  );
});

type ImportStyle = 'directly' | 'as namespace' | 'with alias';

test.each(['directly', 'as namespace', 'with alias'] as ImportStyle[])(
  'can reference submodule types, importing %s',
  (importStyle) =>
    TestWorkspace.withWorkspace((ws) => {
      // There are 2 import styles:
      //
      // import { submodule } from 'lib';
      // import * as submodule from 'lib/submodule';
      //
      // We need to support both import styles.

      // Dependency that exports a submodule
      ws.addDependency(makeDependencyWithSubmodule());

      let importStatement;
      let prefix;
      switch (importStyle) {
        case 'directly':
          importStatement =
            "import { Foo, FooInterface, IProtocol } from 'testpkg/subdir'";
          prefix = '';
          break;
        case 'as namespace':
          importStatement = "import { submodule } from 'testpkg'";
          prefix = 'submodule.';
          break;
        case 'with alias':
          importStatement = "import { submodule as sub } from 'testpkg'";
          prefix = 'sub.';
          break;
      }

      // Main library that imports the submodule class directly
      // Use the type in all possible positions
      const result = compileJsiiForTest(
        {
          'index.ts': `
        ${importStatement};

        export interface BarProps {
          readonly foo?: ${prefix}Foo;
        }

        export class Bar {
          constructor(public readonly foo: ${prefix}Foo, props: BarProps = {}) {
            Array.isArray(props);
          }

          public returnValue(): ${prefix}Foo {
            return new ${prefix}Foo();
          }
        }

        export class SubFoo extends ${prefix}Foo {}
        export interface SubInterface extends ${prefix}FooInterface {}
        export class Implementor implements ${prefix}IProtocol {}
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
          type: { fqn: 'testpkg.submodule.Foo' },
        },
        {
          name: 'props',
          optional: true,
          type: { fqn: 'consumerpkg.BarProps' },
        },
      ]);
    }),
);

test.each(['directly', 'as namespace', 'with alias'] as ImportStyle[])(
  'can reference nested types in submodules, importing %s',
  (importStyle) =>
    TestWorkspace.withWorkspace((ws) => {
      // There are 2 import styles:
      //
      // import { submodule } from 'lib';
      // import * as submodule from 'lib/submodule';
      //
      // We need to support both import styles.

      // Dependency that exports a submodule
      ws.addDependency(makeDependencyWithSubmoduleAndNamespace());

      let importStatement;
      let prefix;
      switch (importStyle) {
        case 'directly':
          importStatement = "import { Namespace } from 'testpkg/subdir'";
          prefix = 'Namespace.';
          break;
        case 'as namespace':
          importStatement = "import { submodule } from 'testpkg'";
          prefix = 'submodule.Namespace.';
          break;
        case 'with alias':
          importStatement = "import { submodule as sub } from 'testpkg'";
          prefix = 'sub.Namespace.';
          break;
      }

      // Main library that imports the submodule class directly
      // Use the type in all possible positions
      const result = compileJsiiForTest(
        {
          'index.ts': `
        ${importStatement};

        export interface BarProps {
          readonly foo?: ${prefix}Foo;
        }

        export class Bar {
          constructor(public readonly foo: ${prefix}Foo, props: BarProps = {}) {
            Array.isArray(props);
          }

          public returnValue(): ${prefix}Foo {
            return new ${prefix}Foo();
          }
        }

        export class SubFoo extends ${prefix}Foo {}
        export interface SubInterface extends ${prefix}FooInterface {}
        export class Implementor implements ${prefix}IProtocol {}
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
          type: { fqn: 'testpkg.submodule.Namespace.Foo' },
        },
        {
          name: 'props',
          optional: true,
          type: { fqn: 'consumerpkg.BarProps' },
        },
      ]);
    }),
);

// Backwards compatibility test, for versions of libraries compiled before jsii 1.39.0
// which introduced the symbol identifier table
test('will detect types from submodules even if the symbol identifier table is missing', () =>
  TestWorkspace.withWorkspace((ws) => {
    ws.addDependency(makeDependencyWithSubmodule());

    // Strip the symbolidentifiers from the assembly
    const asmDir = ws.dependencyDir('testpkg');
    const asm: spec.Assembly = loadAssemblyFromPath(asmDir, false);
    for (const mod of Object.values(asm.submodules ?? {})) {
      delete mod.symbolId;
    }
    for (const type of Object.values(asm.types ?? {})) {
      delete type.symbolId;
    }
    writeAssembly(asmDir, asm);

    // We can still use those types if we have a full-library import
    compileJsiiForTest(
      {
        'index.ts': `
          import { submodule } from 'testpkg';
          export class Bar {
            constructor(public readonly foo: submodule.Foo) {}
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
  }));

function makeDependencyWithSubmodule() {
  return compileJsiiForTest({
    'index.ts': 'export * as submodule from "./subdir"',
    'subdir/index.ts': [
      'export class Foo { };',
      'export interface FooInterface { readonly value?: string }',
      'export interface IProtocol { readonly value?: string; }',
    ].join('\n'),
    'subdir/README.md': 'This is the README',
  });
}

function makeDependencyWithSubmoduleAndNamespace() {
  return compileJsiiForTest({
    'index.ts': 'export * as submodule from "./subdir"',
    'subdir/index.ts': [
      'export class Namespace {};',
      'export namespace Namespace {',
      '  export class Foo { };',
      '  export interface FooInterface { readonly value?: string }',
      '  export interface IProtocol { readonly value?: string; }',
      '}',
    ].join('\n'),
    'subdir/README.md': 'This is the README',
  });
}
