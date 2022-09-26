import {
  loadAssemblyFromPath,
  SPEC_FILE_NAME,
  SPEC_FILE_NAME_COMPRESSED,
} from '@jsii/spec';
import {
  ensureDirSync,
  existsSync,
  mkdtempSync,
  removeSync,
  writeFileSync,
  readFileSync,
  readJsonSync,
} from 'fs-extra';
import { tmpdir } from 'os';
import { join } from 'path';

import { Compiler } from '../lib/compiler';
import { ProjectInfo } from '../lib/project-info';

describe(Compiler, () => {
  describe('generated tsconfig', () => {
    test('default is tsconfig.json', () => {
      const sourceDir = mkdtempSync(
        join(tmpdir(), 'jsii-compiler-watch-mode-'),
      );

      const compiler = new Compiler({
        projectInfo: _makeProjectInfo(sourceDir, 'index.d.ts'),
      });

      compiler.emit();

      expect(readJsonSync(join(sourceDir, 'tsconfig.json'), 'utf-8')).toEqual(
        expectedTypeScriptConfig(),
      );
    });

    test('file name can be customized', () => {
      const sourceDir = mkdtempSync(
        join(tmpdir(), 'jsii-compiler-watch-mode-'),
      );

      const compiler = new Compiler({
        projectInfo: _makeProjectInfo(sourceDir, 'index.d.ts'),
        generateTypeScriptConfig: 'tsconfig.jsii.json',
      });

      compiler.emit();

      expect(
        readJsonSync(join(sourceDir, 'tsconfig.jsii.json'), 'utf-8'),
      ).toEqual(expectedTypeScriptConfig());
    });
  });

  test('"watch" mode', async () => {
    // This can be a little slow, allowing 15 seconds maximum here (default is 5 seconds)
    jest.setTimeout(15_000);

    const sourceDir = mkdtempSync(join(tmpdir(), 'jsii-compiler-watch-mode-'));

    try {
      writeFileSync(join(sourceDir, 'index.ts'), 'export class MarkerA {}');
      // Intentionally using lower case name - it should be case-insensitive
      writeFileSync(join(sourceDir, 'readme.md'), '# Test Package');

      const compiler = new Compiler({
        projectInfo: _makeProjectInfo(sourceDir, 'index.d.ts'),
        failOnWarnings: true,
        projectReferences: false,
      });

      let firstCompilation = true;
      let onWatchClosed: () => void;
      let onWatchFailed: (err: unknown) => void;
      const watchClosed = new Promise<void>((ok, ko) => {
        onWatchClosed = ok;
        onWatchFailed = ko;
      });
      const watch = await compiler.watch({
        nonBlocking: true,
        // Ignore diagnostics reporting (not to pollute test console output)
        reportDiagnostics: () => null,
        // Ignore watch status reporting (not to pollute test console output)
        reportWatchStatus: () => null,
        // Verify everything goes according to plan
        compilationComplete: (emitResult) => {
          try {
            expect(emitResult.emitSkipped).toBeFalsy();
            const output = JSON.stringify(loadAssemblyFromPath(sourceDir));
            if (firstCompilation) {
              firstCompilation = false;
              expect(output).toContain('"MarkerA"');
              writeFileSync(
                join(sourceDir, 'index.ts'),
                'export class MarkerB {}',
              );
              return;
            }
            expect(output).toContain('"MarkerB"');
            watch.close();
            // Tell the test suite we're done here!
            onWatchClosed();
          } catch (e) {
            watch.close();
            onWatchFailed(e);
          }
        },
      });
      await watchClosed;
    } finally {
      removeSync(sourceDir);
    }
  });

  test('rootDir is added to assembly', () => {
    const outDir = 'jsii-outdir';
    const rootDir = 'jsii-rootdir';
    const sourceDir = mkdtempSync(join(tmpdir(), 'jsii-tmpdir'));
    ensureDirSync(join(sourceDir, rootDir));

    try {
      writeFileSync(
        join(sourceDir, rootDir, 'index.ts'),
        'export class MarkerA {}',
      );
      // Intentionally using lower case name - it should be case-insensitive
      writeFileSync(join(sourceDir, rootDir, 'readme.md'), '# Test Package');

      const compiler = new Compiler({
        projectInfo: {
          ..._makeProjectInfo(sourceDir, join(outDir, 'index.d.ts')),
          tsc: {
            outDir,
            rootDir,
          },
        },
        failOnWarnings: true,
        projectReferences: false,
      });

      compiler.emit();

      const assembly = loadAssemblyFromPath(sourceDir);
      expect(assembly.metadata).toEqual(
        expect.objectContaining({
          tscRootDir: rootDir,
        }),
      );
    } finally {
      removeSync(sourceDir);
    }
  });

  test('emits declaration map when feature is enabled', () => {
    const sourceDir = mkdtempSync(join(tmpdir(), 'jsii-tmpdir'));

    try {
      writeFileSync(join(sourceDir, 'index.ts'), 'export class MarkerA {}');

      const compiler = new Compiler({
        projectInfo: {
          ..._makeProjectInfo(sourceDir, 'index.d.ts'),
          tsc: {
            declarationMap: true,
          },
        },
        generateTypeScriptConfig: 'tsconfig.jsii.json',
      });

      compiler.emit();

      expect(() => {
        readFileSync(join(sourceDir, 'index.d.ts.map'), 'utf-8');
      }).not.toThrow();
    } finally {
      removeSync(sourceDir);
    }
  });

  describe('compressed assembly option', () => {
    test('creates a gzipped assembly file', () => {
      const sourceDir = mkdtempSync(join(tmpdir(), 'jsii-tmpdir'));

      try {
        writeFileSync(join(sourceDir, 'index.ts'), 'export class MarkerA {}');

        const compiler = new Compiler({
          projectInfo: _makeProjectInfo(sourceDir, 'index.d.ts'),
          compressAssembly: true,
        });

        compiler.emit();

        expect(
          existsSync(join(sourceDir, SPEC_FILE_NAME_COMPRESSED)),
        ).toBeTruthy();
      } finally {
        removeSync(sourceDir);
      }
    });

    test('creates file equivalent to uncompressed file', () => {
      const uncompressedSourceDir = mkdtempSync(join(tmpdir(), 'jsii-tmpdir'));
      const compressedSourceDir = mkdtempSync(join(tmpdir(), 'jsii-tmpdir-2'));

      try {
        const fileContents = 'export class MarkerA {}';
        writeFileSync(join(uncompressedSourceDir, 'index.ts'), fileContents);
        writeFileSync(join(compressedSourceDir, 'index.ts'), fileContents);

        const uncompressedJsiiCompiler = new Compiler({
          projectInfo: _makeProjectInfo(uncompressedSourceDir, 'index.d.ts'),
        });
        const compressedJsiiCompiler = new Compiler({
          projectInfo: _makeProjectInfo(compressedSourceDir, 'index.d.ts'),
          compressAssembly: true,
        });

        uncompressedJsiiCompiler.emit();
        compressedJsiiCompiler.emit();

        // The files we expect are there
        expect(
          existsSync(join(uncompressedSourceDir, SPEC_FILE_NAME)),
        ).toBeTruthy();
        expect(
          existsSync(join(compressedSourceDir, SPEC_FILE_NAME_COMPRESSED)),
        ).toBeTruthy();

        const uncompressedJsii = loadAssemblyFromPath(uncompressedSourceDir);
        const compressedJsii = loadAssemblyFromPath(compressedSourceDir);

        expect(compressedJsii).toEqual(uncompressedJsii);
      } finally {
        removeSync(uncompressedSourceDir);
        removeSync(compressedSourceDir);
      }
    });
  });
});

function _makeProjectInfo(sourceDir: string, types: string): ProjectInfo {
  return {
    projectRoot: sourceDir,
    packageJson: undefined,
    types,
    main: types.replace(/(?:\.d)?\.ts(x?)/, '.js$1'),
    name: 'jsii', // That's what package.json would tell if we look up...
    version: '0.0.1',
    jsiiVersionFormat: 'short',
    license: 'Apache-2.0',
    author: { name: 'John Doe', roles: ['author'] },
    repository: { type: 'git', url: 'https://github.com/aws/jsii.git' },
    dependencies: {},
    peerDependencies: {},
    dependencyClosure: [],
    bundleDependencies: {},
    targets: {},
    excludeTypescript: [],
    tsc: {
      // NOTE: these are the default values jsii uses when none are provided in package.json.
      inlineSourceMap: true,
      inlineSources: true,
    },
  };
}

function expectedTypeScriptConfig() {
  return {
    _generated_by_jsii_:
      'Generated by jsii - safe to delete, and ideally should be in .gitignore',
    compilerOptions: {
      alwaysStrict: true,
      charset: 'utf8',
      composite: false,
      declaration: true,
      experimentalDecorators: true,
      incremental: true,
      inlineSourceMap: true,
      inlineSources: true,
      lib: ['es2020'],
      module: 'CommonJS',
      newLine: 'lf',
      noEmitOnError: true,
      noFallthroughCasesInSwitch: true,
      noImplicitAny: true,
      noImplicitReturns: true,
      noImplicitThis: true,
      noUnusedLocals: true,
      noUnusedParameters: true,
      resolveJsonModule: true,
      skipLibCheck: true,
      strict: true,
      strictNullChecks: true,
      strictPropertyInitialization: true,
      stripInternal: false,
      target: 'ES2020',
      tsBuildInfoFile: 'tsconfig.tsbuildinfo',
    },
    exclude: ['node_modules'],
    include: [join('**', '*.ts')],
  };
}
