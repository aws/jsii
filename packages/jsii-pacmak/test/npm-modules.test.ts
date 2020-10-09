import * as mockfs from 'mock-fs';

import { findJsiiModules } from '../lib/npm-modules';

describe(findJsiiModules, () => {
  afterEach((done) => {
    mockfs.restore();
    done();
  });

  // Increase the timeout - those are crazy slow on CI/CI for some reason.
  jest.setTimeout(30_000);

  test('is sorted topologically', async () => {
    mockfs({
      '/packageA/package.json': JSON.stringify({
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
      }),
      '/packageB/package.json': JSON.stringify({
        name: 'packageB',
        jsii: {
          outdir: 'dist',
          targets: {
            python: {},
          },
        },
      }),
    });

    const mods = await findJsiiModules(['/packageA', '/packageB'], false);
    expect(mods.map((m) => m.name)).toEqual(['packageB', 'packageA']);
  });

  test('without deps loads packages in given order', async () => {
    mockfs({
      '/packageA/package.json': JSON.stringify({
        name: 'packageA',
        jsii: {
          outdir: 'dist',
          targets: {
            python: {},
          },
        },
      }),
      '/packageB/package.json': JSON.stringify({
        name: 'packageB',
        jsii: {
          outdir: 'dist',
          targets: {
            python: {},
          },
        },
      }),
    });

    const mods = await findJsiiModules(['/packageA', '/packageB'], false);
    expect(mods.map((m) => m.name)).toEqual(['packageA', 'packageB']);
  });
});
