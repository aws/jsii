// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import * as mockfs from 'mock-fs';
import { findJsiiModules } from '../lib/npm-modules';

test('findJsiiModules is sorted topologically', async () => {
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

  try {
    const mods = await findJsiiModules(['/packageA', '/packageB'], false);
    expect(mods.map((m) => m.name)).toEqual(['packageB', 'packageA']);
  } finally {
    mockfs.restore();
  }
});

test('findJsiiModules without deps loads packages in given order', async () => {
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

  try {
    const mods = await findJsiiModules(['/packageA', '/packageB'], false);
    expect(mods.map((m) => m.name)).toEqual(['packageA', 'packageB']);
  } finally {
    mockfs.restore();
  }
});
