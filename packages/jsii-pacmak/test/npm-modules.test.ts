import { mkdirp, mkdtemp, remove, writeJson } from 'fs-extra';
import { TypeSystem } from 'jsii-reflect';
import { tmpdir } from 'os';
import { join } from 'path';

import { findJsiiModules } from '../lib/npm-modules';
import { flatten } from '../lib/util';

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
    // devDependency
    await mkdirp(join(workDir, 'packageC'));
    await writeJson(join(workDir, 'packageC', 'package.json'), {
      name: 'packageC',
      jsii: {
        outdir: 'dist',
        targets: {
          python: {},
        },
      },
      devDependencies: {
        packageB: '*',
      },
    });
    // peerDependency
    await mkdirp(join(workDir, 'packageD'));
    await writeJson(join(workDir, 'packageD', 'package.json'), {
      name: 'packageD',
      jsii: {
        outdir: 'dist',
        targets: {
          python: {},
        },
      },
      devDependencies: {
        packageA: '*',
      },
    });

    const mods = await findJsiiModules(
      [
        join(workDir, 'packageD'),
        join(workDir, 'packageA'),
        join(workDir, 'packageB'),
        join(workDir, 'packageC'),
      ],
      false,
    );
    expect(flatten(mods).map((m) => m.name)).toEqual([
      'packageB',
      'packageA',
      'packageC',
      'packageD',
    ]);
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
    expect(flatten(mods).map((m) => m.name)).toEqual(['packageA', 'packageB']);
  });

  test('JsiiModule gets its dependencies from .jsii, not package.json', async () => {
    // GIVEN
    await mkdirp(join(workDir, 'packageA'));
    await writeJson(join(workDir, 'packageA', 'package.json'), {
      name: 'packageA',
      jsii: {
        outdir: 'dist',

        // Targets in package.json that are not in .jsii
        targets: {
          python: {},
        },
      },
    });
    await writeJson(join(workDir, 'packageA', '.jsii'), {
      // No targets in .jsii file
      targets: {},
    });

    const mods = await findJsiiModules([join(workDir, 'packageA')], false);
    const modA = flatten(mods)[0];

    // WHEN
    const ts = new TypeSystem();
    await modA.load(ts, false);

    // THEN
    expect(modA.availableTargets).toEqual(['js']);
  });
});
