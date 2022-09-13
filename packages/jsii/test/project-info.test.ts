import * as spec from '@jsii/spec';
import { writeAssembly } from '@jsii/spec';
import * as clone from 'clone';
import * as fs from 'fs-extra';
import * as os from 'os';
import * as path from 'path';
import * as ts from 'typescript';

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
    _withTestProject((projectRoot) => {
      const { projectInfo: info } = loadProjectInfo(projectRoot);
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

  test('loads valid project (with zipped assembly)', () =>
    _withTestProject(
      (projectRoot) => {
        const { projectInfo: info } = loadProjectInfo(projectRoot);
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
      },
      undefined,
      true /* compress assembly */,
    ));

  test('loads valid project (UNLICENSED)', () =>
    _withTestProject(
      (projectRoot) => {
        const { projectInfo: info } = loadProjectInfo(projectRoot);
        expect(info?.license).toBe('UNLICENSED');
      },
      (info) => {
        info.license = 'UNLICENSED';
      },
    ));

  test('loads valid project (using bundleDependencies)', () =>
    _withTestProject(
      (projectRoot) => {
        const { projectInfo: info } = loadProjectInfo(projectRoot);
        expect(info.bundleDependencies).toEqual({ bundled: '^1.2.3' });
      },
      (info) => {
        info.dependencies.bundled = '^1.2.3';
        info.bundleDependencies = ['bundled'];
      },
    ));

  test('loads valid project (using bundledDependencies)', () =>
    _withTestProject(
      (projectRoot) => {
        const { projectInfo: info } = loadProjectInfo(projectRoot);
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
      (projectRoot) => {
        const { projectInfo: info } = loadProjectInfo(projectRoot);
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
        expect(() => loadProjectInfo(projectRoot)).toThrow(
          /not declared in "dependencies"/i,
        ),
      (info) => {
        info.bundledDependencies = ['bundled'];
      },
    ));

  test('rejects invalid license', () =>
    _withTestProject(
      (projectRoot) =>
        expect(() => loadProjectInfo(projectRoot)).toThrow(
          /invalid license identifier/i,
        ),
      (info) => {
        info.license = 'Not an SPDX licence ID';
      },
    ));

  test('rejects incompatible dependency version', () =>
    _withTestProject(
      (projectRoot) =>
        expect(() => loadProjectInfo(projectRoot)).toThrow(
          /declared dependency on version .+ but version .+ was found/i,
        ),
      (info) => {
        info.dependencies[TEST_DEP_ASSEMBLY.name] = '^1.2.5';
        info.peerDependencies[TEST_DEP_ASSEMBLY.name] = '^1.2.5';
      },
    ));

  test('accepts URI dependency version', () =>
    _withTestProject(
      (projectRoot) => {
        loadProjectInfo(projectRoot);
      },
      (info) => {
        info.dependencies[TEST_DEP_ASSEMBLY.name] = 'file:example/';
        info.peerDependencies[TEST_DEP_ASSEMBLY.name] = 'FILE:example/';
      },
    ));

  test('missing peerDependencies are allowed', () =>
    _withTestProject(
      (projectRoot) =>
        expect(loadProjectInfo(projectRoot)).toEqual(
          expect.objectContaining({
            diagnostics: [],
          }),
        ),
      (info) => {
        delete info.peerDependencies[TEST_DEP_ASSEMBLY.name];
      },
    ));

  test('warns if peerDependency misses a matching devDependency', () =>
    _withTestProject(
      (projectRoot) =>
        expect(loadProjectInfo(projectRoot)).toEqual(
          expect.objectContaining({
            diagnostics: [expect.objectContaining({ jsiiCode: 6 })],
          }),
        ),
      () => {
        // By default there is no devDependency in BASE_PROJECT
      },
    ));

  test('warns if peerDependency has a devDependency on the wrong version', () =>
    _withTestProject(
      (projectRoot) =>
        expect(loadProjectInfo(projectRoot)).toEqual(
          expect.objectContaining({
            diagnostics: [expect.objectContaining({ jsiiCode: 6 })],
          }),
        ),
      (info) => {
        // By default there is no devDependency in BASE_PROJECT
        info.devDependencies = { 'jsii-test-dep': '4.5.6' };
      },
    ));

  test('no warnings if devDependency point version matches peerDependency range', () =>
    _withTestProject(
      (projectRoot) =>
        expect(loadProjectInfo(projectRoot)).toEqual(
          expect.objectContaining({
            diagnostics: [],
          }),
        ),
      (info) => {
        // By default there is no devDependency in BASE_PROJECT
        info.devDependencies = { 'jsii-test-dep': '1.2.3' };
      },
    ));

  describe('_loadDiagnostics', () => {
    test('diagnostic categories are correctly detected', () => {
      return _withTestProject(
        (projectRoot) => {
          const { projectInfo: info } = loadProjectInfo(projectRoot);
          expect(info.diagnostics).toBeDefined();
          const diagnostics = info.diagnostics!;
          expect(Object.keys(diagnostics).sort()).toEqual([
            'diagCode1',
            'diagCode2',
            'diagCode3',
            'diagCode4',
          ]);
          expect(diagnostics.diagCode1).toEqual(ts.DiagnosticCategory.Error);
          expect(diagnostics.diagCode2).toEqual(ts.DiagnosticCategory.Warning);
          expect(diagnostics.diagCode3).toEqual(
            ts.DiagnosticCategory.Suggestion,
          );
          expect(diagnostics.diagCode4).toEqual(ts.DiagnosticCategory.Message);
        },
        (info) => {
          const diagnostics = {
            diagCode1: 'error',
            diagCode2: 'warning',
            diagCode3: 'suggestion',
            diagCode4: 'message',
          };
          info.jsii.diagnostics = diagnostics;
        },
      );
    });

    test('invalid category is rejected', () => {
      return _withTestProject(
        (projectRoot) =>
          expect(() => loadProjectInfo(projectRoot)).toThrow(
            /Invalid category/,
          ),
        (info) => {
          const diagnostics = {
            diagCode1: 'invalid-category',
          };
          info.jsii.diagnostics = diagnostics;
        },
      );
    });
  });
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
function _withTestProject<T>(
  cb: (projectRoot: string) => T,
  gremlin?: (packageInfo: any) => void,
  compressAssembly = false,
): T {
  const tmpdir = fs.mkdtempSync(
    path.join(os.tmpdir(), path.basename(__filename)),
  );
  try {
    const packageInfo = clone(BASE_PROJECT);
    if (gremlin) {
      gremlin(packageInfo);
    }
    fs.writeJsonSync(path.join(tmpdir, 'package.json'), packageInfo, {
      spaces: 2,
    });
    fs.writeFileSync(
      path.join(tmpdir, 'index.js'),
      '// There ought to be some javascript',
    );
    fs.writeFileSync(
      path.join(tmpdir, 'index.ts'),
      '// There ought to be some typescript',
    );
    fs.writeFileSync(
      path.join(tmpdir, 'index.d.ts'),
      '// There ought to be some typescript definitions',
    );

    const jsiiTestDep = path.join(tmpdir, 'node_modules', 'jsii-test-dep');
    writeNpmPackageSkeleton(jsiiTestDep);

    writeAssembly(jsiiTestDep, TEST_DEP_ASSEMBLY, {
      compress: compressAssembly,
    });
    const jsiiTestDepDep = path.join(
      jsiiTestDep,
      'node_modules',
      'jsii-test-dep-dep',
    );

    writeNpmPackageSkeleton(jsiiTestDepDep);
    writeAssembly(jsiiTestDepDep, TEST_DEP_DEP_ASSEMBLY, {
      compress: compressAssembly,
    });

    return cb(tmpdir);
  } finally {
    fs.removeSync(tmpdir);
  }
}

/**
 * Write a package.json and an index.js so the package is mostly well-formed
 */
function writeNpmPackageSkeleton(directory: string) {
  fs.mkdirsSync(directory);
  fs.writeJsonSync(path.join(directory, 'package.json'), {
    name: path.basename(directory),
  });
  fs.writeFileSync(
    path.join(directory, 'index.js'),
    '// There should be some JS',
  );
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
