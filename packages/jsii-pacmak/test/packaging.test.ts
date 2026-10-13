import * as fs from 'fs-extra';
import * as os from 'os';
import * as path from 'path';

import { JsiiModule } from '../lib/packaging';

jest.setTimeout(60_000);

let workdir: string;
beforeEach(async () => {
  workdir = await fs.mkdtemp(path.join(os.tmpdir(), 'jsii-pacmak-packaging-'));
});
afterEach(async () => {
  await fs.remove(workdir);
});

// Directory names containing `$`, backticks and quotes are not valid on Windows.
(process.platform === 'win32' ? test.skip : test)(
  'npmPack passes the module directory to npm verbatim',
  async () => {
    const marker = path.join(workdir, 'marker');
    const moduleDirectory = path.join(
      workdir,
      `module $(touch ${marker}) \`touch ${marker}\` "quoted" 'single'`,
    );
    await fs.mkdirp(moduleDirectory);
    await fs.writeJson(path.join(moduleDirectory, 'package.json'), {
      name: 'packaging-test',
      version: '1.2.3',
    });

    const mod = new JsiiModule({
      name: 'packaging-test',
      moduleDirectory,
      defaultOutputDirectory: workdir,
    });
    await mod.npmPack();

    expect(path.basename(mod.tarball)).toBe('packaging-test-1.2.3.tgz');
    expect(await fs.pathExists(mod.tarball)).toBe(true);
    expect(await fs.pathExists(marker)).toBe(false);
  },
);
