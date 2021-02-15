import { mkdirp, mkdtemp, remove, writeJson } from 'fs-extra';
import { tmpdir } from 'os';
import { join } from 'path';

import { findJsiiModules } from '../lib/npm-modules';

describe(findJsiiModules, () => {
  let workDir = tmpdir();

  beforeEach(() =>
    mkdtemp(join(tmpdir(), 'jsii-pacmak.npm-modules.test.')).then((dir) => {
      workDir = dir;
    }),
  );

  afterEach(async () => {
    // Be extra cautious to avoid deleting this we shouldn't delete...
    if (workDir !== tmpdir()) {
      await remove(workDir);
    }
  });

  test('is sorted topologically', async () => {
    await mkdirp(join(workDir, 'packageA'));
    await writeJson(join(workDir, 'packageA', 'package.json'), {
      name: 'packageA',
      jsii: {
        outdir: 'dist',
        targets: {
          python: {},
        },
      },
      dependencies: {
        packageB: '*',
      },
    });
    await mkdirp(join(workDir, 'packageB'));
    await writeJson(join(workDir, 'packageB', 'package.json'), {
      name: 'packageB',
      jsii: {
        outdir: 'dist',
        targets: {
          python: {},
        },
      },
    });

    const mods = await findJsiiModules(
      [join(workDir, 'packageA'), join(workDir, 'packageB')],
      false,
    );
    expect(mods.map((m) => m.name)).toEqual(['packageB', 'packageA']);
  });

  test('without deps loads packages in given order', async () => {
    await mkdirp(join(workDir, 'packageA'));
    await writeJson(join(workDir, 'packageA', 'package.json'), {
      name: 'packageA',
      jsii: {
        outdir: 'dist',
        targets: {
          python: {},
        },
      },
    });
    await mkdirp(join(workDir, 'packageB'));
    await writeJson(join(workDir, 'packageB', 'package.json'), {
      name: 'packageB',
      jsii: {
        outdir: 'dist',
        targets: {
          python: {},
        },
      },
    });

    const mods = await findJsiiModules(
      [join(workDir, 'packageA'), join(workDir, 'packageB')],
      false,
    );
    expect(mods.map((m) => m.name)).toEqual(['packageA', 'packageB']);
  });
});
