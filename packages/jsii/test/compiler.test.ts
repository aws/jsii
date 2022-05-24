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
import { loadAssemblyFromPath } from '../lib/utils';

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
      let onWatchFailed: (err: Error) => void;
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

      const assembly = readJsonSync(join(sourceDir, '.jsii'), 'utf-8');
      expect(assembly.metadata).toEqual(
        expect.objectContaining({
          tscRootDir: rootDir,
        }),
      );
    } finally {
      removeSync(sourceDir);
    }
  });

  test('emits declaration map', () => {
    const sourceDir = mkdtempSync(join(tmpdir(), 'jsii-tmpdir'));

    try {
      writeFileSync(join(sourceDir, 'index.ts'), 'export class MarkerA {}');

      const compiler = new Compiler({
        projectInfo: {
          ..._makeProjectInfo(sourceDir, 'index.d.ts'),
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

  describe('compressed .jsii file', () => {
    test('can be set with a metadata option', () => {
      const sourceDir = mkdtempSync(join(tmpdir(), 'jsii-tmpdir'));

      try {
        writeFileSync(join(sourceDir, 'index.ts'), 'export class MarkerA {}');

        const compiler = new Compiler({
          projectInfo: {
            ..._makeProjectInfo(sourceDir, 'index.d.ts'),
            metadata: {
              jsii: {
                compress: true,
              },
            },
          },
          generateTypeScriptConfig: 'tsconfig.jsii.json',
        });

        compiler.emit();

        expect(existsSync(join(sourceDir, '.jsii'))).toBeFalsy();
        expect(existsSync(join(sourceDir, '.jsii.gz'))).toBeTruthy();
      } finally {
        removeSync(sourceDir);
      }
    });

    test('is equivalent to uncompressed file', () => {
      const uncompressedSourceDir = mkdtempSync(join(tmpdir(), 'jsii-tmpdir'));
      const compressedSourceDir = mkdtempSync(join(tmpdir(), 'jsii-tmpdir-2'));

      try {
        const fileContents = 'export class MarkerA {}';
        writeFileSync(join(uncompressedSourceDir, 'index.ts'), fileContents);
        writeFileSync(join(compressedSourceDir, 'index.ts'), fileContents);

        const uncompressedJsiiCompiler = new Compiler({
          projectInfo: {
            ..._makeProjectInfo(uncompressedSourceDir, 'index.d.ts'),
          },
          generateTypeScriptConfig: 'tsconfig.jsii.json',
        });
        const compressedJsiiCompiler = new Compiler({
          projectInfo: {
            ..._makeProjectInfo(compressedSourceDir, 'index.d.ts'),
            metadata: {
              jsii: {
                compress: true,
              },
            },
          },
          generateTypeScriptConfig: 'tsconfig.jsii.json',
        });

        uncompressedJsiiCompiler.emit();
        compressedJsiiCompiler.emit();

        // The files we expect are there
        expect(existsSync(join(uncompressedSourceDir, '.jsii'))).toBeTruthy();
        expect(existsSync(join(compressedSourceDir, '.jsii.gz'))).toBeTruthy();

        const uncompressedJsii = loadAssemblyFromPath(uncompressedSourceDir);
        const compressedJsii = loadAssemblyFromPath(compressedSourceDir);

        // uncompressedJsii should equal compressedJsii except for metadata and fingerprint
        for (const key of Object.keys(uncompressedJsii)) {
          if (key !== 'fingerprint' && key !== 'metadata') {
            expect(uncompressedJsii.key).toEqual(compressedJsii.key);
          }
        }
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
      declarationMap: true,
      experimentalDecorators: true,
      incremental: true,
      inlineSourceMap: true,
      inlineSources: true,
      lib: ['es2019'],
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
      strict: true,
      strictNullChecks: true,
      strictPropertyInitialization: true,
      stripInternal: false,
      target: 'ES2019',
      tsBuildInfoFile: 'tsconfig.tsbuildinfo',
    },
    exclude: ['node_modules'],
    include: [join('**', '*.ts')],
  };
}
