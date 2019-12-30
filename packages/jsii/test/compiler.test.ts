import { mkdtemp, remove, writeFile, readFile } from 'fs-extra';
import { tmpdir } from 'os';
import { join } from 'path';
import { Compiler, Watch } from '../lib/compiler';
import { EmitResult } from '../lib/emitter';
import { ProjectInfo } from '../lib/project-info';

describe(Compiler, () => {
  test('"watch" mode', async () => {
    jest.setTimeout(30_000);

    const sourceDir = await mkdtemp(join(tmpdir(), 'jsii-compiler-watch-mode-'));
    await writeFile(join(sourceDir, 'index.ts'), 'export class MarkerA {}');

    try {
      const completedWatch = await new Promise<Watch>((ok, ko) => {
        try {
          const compiler = new Compiler({
            projectInfo: _makeProjectInfo(sourceDir, 'index.d.ts'),
            failOnWarnings: true,
            projectReferences: false,
          });
          compiler.once('result', async (result) => {
            expect(result.emitSkipped).toBeFalsy();
            const content = await readFile(join(sourceDir, '.jsii'), { encoding: 'utf-8' });
            expect(content).toContain('"jsii.MarkerA"');

            const checkForMarkerB = async (newResult: EmitResult) => {
              expect(newResult.emitSkipped).toBeFalsy();
              const content = await readFile(join(sourceDir, '.jsii'), { encoding: 'utf-8' });
              if (content.includes('"jsii.MarkerB"')) {
                ok(await watch);
              } else {
                compiler.once('result', checkForMarkerB);
              }
            };
            compiler.once('result', checkForMarkerB);

            await writeFile(join(sourceDir, 'index.ts'), 'export class MarkerB {}');
          });
          const watch = compiler.watch();
        } catch (e) {
          ko(e);
        }
      });
      completedWatch.close();
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
