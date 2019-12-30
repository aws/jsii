import { mkdtemp, remove, writeFile, readFile } from 'fs-extra';
import { tmpdir } from 'os';
import { join } from 'path';
import { DiagnosticCategory, formatDiagnostic, FormatDiagnosticsHost, sys } from 'typescript';
import { Compiler } from '../lib/compiler';
import { CompilerWatch } from '../lib/compiler-watch';
import { ProjectInfo } from '../lib/project-info';

describe(Compiler, () => {
  test('"watch" mode', async () => {
    jest.setTimeout(15_000);

    const sourceDir = await mkdtemp(join(tmpdir(), 'jsii-compiler-watch-mode-'));
    const formatDiagHost: FormatDiagnosticsHost = {
      getCanonicalFileName: (fileName) => fileName,
      getCurrentDirectory: () => sourceDir,
      getNewLine: () => sys.newLine,
    };

    try {
      await writeFile(join(sourceDir, 'index.ts'), 'export class MarkerA {}');

      const compiler = new Compiler({
        projectInfo: _makeProjectInfo(sourceDir, 'index.d.ts'),
        failOnWarnings: true,
        projectReferences: false,
      });

      const watch = await compiler.watch(
        // Ignore watch status change messages - we don't want to pollute our test output here!
        () => null,
        // No error should be emitted during this test, so we actually fail if one is!
        (diag) => {
          if (diag.category === DiagnosticCategory.Error) {
            throw new Error(`Unexpected diagnostic entry: ${formatDiagnostic(diag, formatDiagHost)}`);
          }
        },
      );

      const outputHasMarker = async (marker: string) => {
        const content = await readFile(join(sourceDir, '.jsii'), { encoding: 'utf-8' });
        return content.includes(`"${marker}"`);
      };
      const expectations = [
        async () => {
          // MarkerA must be present in the very first compilation result
          expect(await outputHasMarker('MarkerA')).toBeTruthy();
          await writeFile(join(sourceDir, 'index.ts'), 'export class MarkerB {}');
          return true;
        },
        async () => {
          // MarkerB must eventually be present, but it could take a few of cycles
          return outputHasMarker('MarkerB');
        }
      ];

      watch.on(CompilerWatch.EVENT_COMPILATION_COMPLETE, (result, compilerWatch) => {
        expect(result.emitSkipped).toBeFalsy();
        if (expectations.length === 0) {
          // There's nothing left to check, we're already closing off at this point!
          return;
        }
        expectations[0]().then(
          done => {
            if (done) {
              expectations.splice(0, 1);
              if (expectations.length === 0) {
                compilerWatch.close();
              }
            }
          },
          failed => expect(() => { throw failed; }).not.toThrowError()
        );
      });

      try {
        // Now wait until we're all done!
        await watch.block(10_000);
      } finally {
        // Ensure the watch is closed when we exit this!
        watch.close();
      }
    } finally {
      await remove(sourceDir);
    }
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
