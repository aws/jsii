import * as spec from '@jsii/spec';
import * as fs from 'fs-extra';
import * as os from 'os';
import * as path from 'path';

import {
  loadAssemblyFromPath,
  getAssemblyFile,
  writeAssembly,
  SPEC_FILE_NAME,
  SPEC_FILE_NAME_COMPRESSED,
} from './assembly';

const TEST_ASSEMBLY: spec.Assembly = {
  schema: spec.SchemaVersion.LATEST,
  name: 'jsii-test-dep',
  version: '1.2.4',
  license: 'Apache-2.0',
  description: 'A test assembly',
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
  jsiiVersion: '1.0.0',
};

describe('writeAssembly', () => {
  test('can write compressed assembly', () => {
    const tmpdir = makeTempDir();
    writeAssembly(tmpdir, TEST_ASSEMBLY, true);

    expect(
      fs.existsSync(path.join(tmpdir, SPEC_FILE_NAME_COMPRESSED)),
    ).toBeTruthy();
  });

  test('can write uncompressed assembly', () => {
    const tmpdir = makeTempDir();
    writeAssembly(tmpdir, TEST_ASSEMBLY, false);

    expect(fs.existsSync(path.join(tmpdir, SPEC_FILE_NAME))).toBeTruthy();
  });
});

describe('getAssemblyFile', () => {
  test('finds compressed assembly file', () => {
    const tmpdir = makeTempDir();
    writeAssembly(tmpdir, TEST_ASSEMBLY, true);

    expect(getAssemblyFile(tmpdir)).toEqual(
      path.join(tmpdir, SPEC_FILE_NAME_COMPRESSED),
    );
  });

  test('finds uncompressed assembly file', () => {
    const tmpdir = makeTempDir();
    writeAssembly(tmpdir, TEST_ASSEMBLY, false);

    expect(getAssemblyFile(tmpdir)).toEqual(path.join(tmpdir, SPEC_FILE_NAME));
  });

  test('prefers compressed file over uncompressed file', () => {
    const tmpdir = makeTempDir();
    writeAssembly(tmpdir, TEST_ASSEMBLY, true);
    writeAssembly(tmpdir, TEST_ASSEMBLY, false);

    expect(getAssemblyFile(tmpdir)).toEqual(
      path.join(tmpdir, SPEC_FILE_NAME_COMPRESSED),
    );
  });
});

describe('loadAssemblyFromPath', () => {
  test('loads compressed assembly', () => {
    const tmpdir = makeTempDir();
    writeAssembly(tmpdir, TEST_ASSEMBLY, true);

    expect(loadAssemblyFromPath(tmpdir)).toEqual(TEST_ASSEMBLY);
  });

  test('loads uncompressed assembly', () => {
    const tmpdir = makeTempDir();
    writeAssembly(tmpdir, TEST_ASSEMBLY, false);

    expect(loadAssemblyFromPath(tmpdir)).toEqual(TEST_ASSEMBLY);
  });

  test('compressed and uncompressed assemblies are loaded identically', () => {
    const compressedTmpDir = makeTempDir();
    const uncompressedTmpDir = makeTempDir();

    writeAssembly(compressedTmpDir, TEST_ASSEMBLY, true);
    writeAssembly(uncompressedTmpDir, TEST_ASSEMBLY, false);

    expect(loadAssemblyFromPath(compressedTmpDir)).toEqual(
      loadAssemblyFromPath(uncompressedTmpDir),
    );
  });
});

function makeTempDir() {
  return fs.mkdtempSync(path.join(os.tmpdir(), path.basename(__filename)));
}
