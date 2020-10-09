import * as spec from '@jsii/spec';
import * as clone from 'clone';
import * as fs from 'fs-extra';
import * as os from 'os';
import * as path from 'path';

import { loadProjectInfo } from '../lib/project-info';
import { VERSION } from '../lib/version';

const BASE_PROJECT = {
  name: 'jsii-test',
  version: '1.0.0',
  description: 'A test project for jsii ProjectInfo loading',
  license: 'Apache-2.0',
  author: {
    name: 'Amazon Web Services',
    url: 'https://aws.amazon.com',
    organization: true,
  },
  repository: { url: 'git://github.com/aws/jsii.git' },
  main: 'index.js',
  types: 'index.d.ts',
  jsii: {
    targets: { foo: { bar: 'baz' } },
  },
  dependencies: { 'jsii-test-dep': '^1.2.3' } as { [name: string]: string },
  peerDependencies: { 'jsii-test-dep': '^1.2.3' } as { [name: string]: string },
};

describe('loadProjectInfo', () => {
  test('loads valid project', () =>
    _withTestProject(async (projectRoot) => {
      const info = await loadProjectInfo(projectRoot, {
        fixPeerDependencies: false,
      });
      expect(info.name).toBe(BASE_PROJECT.name);
      expect(info.version).toBe(BASE_PROJECT.version);
      expect(info.description).toBe(BASE_PROJECT.description);
      expect(info.license).toBe(BASE_PROJECT.license);
      expect(_stripUndefined(info.author)).toEqual({
        ...BASE_PROJECT.author,
        roles: ['author'],
      });
      expect(info.main).toBe(BASE_PROJECT.main);
      expect(info.types).toBe(BASE_PROJECT.types);
      expect(info.homepage).toBe(undefined);
      expect(info.repository?.type).toBe('git');
      expect(info.repository?.url).toBe(BASE_PROJECT.repository.url);
      expect(info.targets).toEqual({
        ...BASE_PROJECT.jsii.targets,
        js: { npm: BASE_PROJECT.name },
      });
      expect(info.dependencies).toEqual({
        [TEST_DEP_ASSEMBLY.name]:
          BASE_PROJECT.dependencies[TEST_DEP_ASSEMBLY.name],
      });
      expect(info.dependencyClosure).toEqual([
        TEST_DEP_ASSEMBLY,
        TEST_DEP_DEP_ASSEMBLY,
      ]);
    }));

  test('loads valid project (UNLICENSED)', () =>
    _withTestProject(
      async (projectRoot) => {
        const info = await loadProjectInfo(projectRoot, {
          fixPeerDependencies: false,
        });
        expect(info?.license).toBe('UNLICENSED');
      },
      (info) => {
        info.license = 'UNLICENSED';
      },
    ));

  test('loads valid project (using bundleDependencies)', () =>
    _withTestProject(
      async (projectRoot) => {
        const info = await loadProjectInfo(projectRoot, {
          fixPeerDependencies: false,
        });
        expect(info.bundleDependencies).toEqual({ bundled: '^1.2.3' });
      },
      (info) => {
        info.dependencies.bundled = '^1.2.3';
        info.bundleDependencies = ['bundled'];
      },
    ));

  test('loads valid project (using bundledDependencies)', () =>
    _withTestProject(
      async (projectRoot) => {
        const info = await loadProjectInfo(projectRoot, {
          fixPeerDependencies: false,
        });
        expect(info.bundleDependencies).toEqual({ bundled: '^1.2.3' });
      },
      (info) => {
        info.dependencies.bundled = '^1.2.3';
        info.bundledDependencies = ['bundled'];
      },
    ));

  test('loads valid project (with contributors)', () => {
    const contributors = [{ name: 'foo', email: 'nobody@amazon.com' }];
    return _withTestProject(
      async (projectRoot) => {
        const info = await loadProjectInfo(projectRoot, {
          fixPeerDependencies: false,
        });
        expect(info?.contributors?.map(_stripUndefined)).toEqual(
          contributors.map((c) => ({ ...c, roles: ['contributor'] })),
        );
      },
      (info) => (info.contributors = contributors),
    );
  });

  test('rejects un-declared dependency in bundleDependencies', () =>
    _withTestProject(
      (projectRoot) =>
        expect(
          loadProjectInfo(projectRoot, { fixPeerDependencies: false }),
        ).rejects.toThrow(/not declared in "dependencies"/i),
      (info) => {
        info.bundledDependencies = ['bundled'];
      },
    ));

  test('rejects invalid license', () =>
    _withTestProject(
      (projectRoot) =>
        expect(
          loadProjectInfo(projectRoot, { fixPeerDependencies: false }),
        ).rejects.toThrow(/invalid license identifier/i),
      (info) => {
        info.license = 'Not an SPDX licence ID';
      },
    ));

  test('rejects incompatible dependency version', () =>
    _withTestProject(
      (projectRoot) =>
        expect(
          loadProjectInfo(projectRoot, { fixPeerDependencies: false }),
        ).rejects.toThrow(
          /declared dependency on version .+ but version .+ was found/i,
        ),
      (info) => {
        info.dependencies[TEST_DEP_ASSEMBLY.name] = '^1.2.5';
        info.peerDependencies[TEST_DEP_ASSEMBLY.name] = '^1.2.5';
      },
    ));

  test('fails to load with missing peerDependency (refusing to auto-fix)', () =>
    _withTestProject(
      (projectRoot) =>
        expect(
          loadProjectInfo(projectRoot, { fixPeerDependencies: false }),
        ).rejects.toThrow(
          `The "package.json" file has "${TEST_DEP_ASSEMBLY.name}" in "dependencies", but not in "peerDependencies"`,
        ),
      (info) => {
        delete info.peerDependencies[TEST_DEP_ASSEMBLY.name];
      },
    ));

  test('loads with missing peerDependency (when auto-fixing)', () =>
    _withTestProject(
      async (projectRoot) => {
        await loadProjectInfo(projectRoot, { fixPeerDependencies: true });
        // eslint-disable-next-line @typescript-eslint/no-var-requires, @typescript-eslint/no-require-imports
        const info = require(path.join(projectRoot, 'package.json'));
        expect(info.peerDependencies[TEST_DEP_ASSEMBLY.name]).toBe('^1.2.3');
      },
      (info) => {
        delete info.peerDependencies[TEST_DEP_ASSEMBLY.name];
      },
    ));

  test('fails to load with inconsistent peerDependency (refusing to auto-fix)', () =>
    _withTestProject(
      (projectRoot) =>
        expect(
          loadProjectInfo(projectRoot, { fixPeerDependencies: false }),
        ).rejects.toThrow(
          `The "package.json" file has different version requirements for "${TEST_DEP_ASSEMBLY.name}" in "dependencies" (^1.2.3) versus "peerDependencies" (^42.1337.0)`,
        ),
      (info) => {
        info.peerDependencies[TEST_DEP_ASSEMBLY.name] = '^42.1337.0';
      },
    ));

  test('loads with inconsistent peerDependency (when auto-fixing)', () =>
    _withTestProject(
      async (projectRoot) => {
        await loadProjectInfo(projectRoot, { fixPeerDependencies: true });
        // eslint-disable-next-line @typescript-eslint/no-var-requires, @typescript-eslint/no-require-imports
        const info = require(path.join(projectRoot, 'package.json'));
        expect(info.peerDependencies[TEST_DEP_ASSEMBLY.name]).toBe('^1.2.3');
      },
      (info) => {
        info.peerDependencies[TEST_DEP_ASSEMBLY.name] = '^42.1337.0';
      },
    ));
});

const TEST_DEP_ASSEMBLY: spec.Assembly = {
  schema: spec.SchemaVersion.LATEST,
  name: 'jsii-test-dep',
  version: '1.2.4',
  license: 'Apache-2.0',
  description: 'A jsii dependency of jsii-test',
  homepage: 'https://github.com/aws/jsii',
  repository: { type: 'git', url: 'git://github.com/aws/jsii.git' },
  author: {
    name: 'Amazon Web Services',
    url: 'https://aws.amazon.com',
    organization: true,
    roles: ['author'],
  },
  fingerprint: 'F1NG3RPR1N7',
  dependencies: {
    'jsii-test-dep-dep': '3.2.1',
  },
  jsiiVersion: VERSION,
};

const TEST_DEP_DEP_ASSEMBLY: spec.Assembly = {
  schema: spec.SchemaVersion.LATEST,
  name: 'jsii-test-dep-dep',
  version: '3.2.1',
  license: 'Apache-2.0',
  description: 'A jsii dependency of jsii-test-dep',
  homepage: 'https://github.com/aws/jsii',
  repository: { type: 'git', url: 'git://github.com/aws/jsii.git' },
  author: {
    name: 'Amazon Web Services',
    url: 'https://aws.amazon.com',
    organization: true,
    roles: ['author'],
  },
  jsiiVersion: VERSION,
  fingerprint: 'F1NG3RPR1N7',
};

/**
 * Creates a throw-away directory with a ``package.json`` file. Cleans up after itself.
 *
 * @param cb      a callback that will be invoked with the temporary directory's path
 * @param gremlin a function that can modify the content of ``package.json`` before it is written
 *
 * @return the result of executing ``cb``.
 */
async function _withTestProject<T>(
  cb: (projectRoot: string) => T | Promise<T>,
  gremlin?: (packageInfo: any) => void,
): Promise<T> {
  const tmpdir = await fs.mkdtemp(
    path.join(os.tmpdir(), path.basename(__filename)),
  );
  try {
    const packageInfo = clone(BASE_PROJECT);
    if (gremlin) {
      gremlin(packageInfo);
    }
    await fs.writeJson(path.join(tmpdir, 'package.json'), packageInfo, {
      spaces: 2,
    });
    await fs.writeFile(
      path.join(tmpdir, 'index.js'),
      '// There ought to be some javascript',
    );
    await fs.writeFile(
      path.join(tmpdir, 'index.ts'),
      '// There ought to be some typescript',
    );
    await fs.writeFile(
      path.join(tmpdir, 'index.d.ts'),
      '// There ought to be some typescript definitions',
    );

    const jsiiTestDep = path.join(tmpdir, 'node_modules', 'jsii-test-dep');
    await fs.mkdirs(jsiiTestDep);
    await fs.writeJson(path.join(jsiiTestDep, '.jsii'), TEST_DEP_ASSEMBLY);
    const jsiiTestDepDep = path.join(
      jsiiTestDep,
      'node_modules',
      'jsii-test-dep-dep',
    );
    await fs.mkdirs(jsiiTestDepDep);
    await fs.writeJson(
      path.join(jsiiTestDepDep, '.jsii'),
      TEST_DEP_DEP_ASSEMBLY,
    );

    return await cb(tmpdir);
  } finally {
    await fs.remove(tmpdir);
  }
}

/**
 * Removes keys from an object if the associated value is ``undefined``.
 *
 * @param obj the object to be stripped.
 *
 * @return ``obj`` after it has been stripped.
 */
function _stripUndefined(
  obj: { [key: string]: any } | undefined,
): { [key: string]: any } | undefined {
  if (!obj) {
    return obj;
  }
  for (const key of Object.keys(obj)) {
    if (obj[key] === undefined) {
      delete obj[key];
    }
  }
  return obj;
}
