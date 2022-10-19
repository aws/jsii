import * as fs from 'fs-extra';
import * as os from 'os';
import * as path from 'path';
import * as zlib from 'zlib';

import {
  SPEC_FILE_NAME,
  SPEC_FILE_NAME_COMPRESSED,
  Assembly,
  SchemaVersion,
} from './assembly';
import {
  loadAssemblyFromPath,
  findAssemblyFile,
  writeAssembly,
  loadAssemblyFromBuffer,
} from './assembly-utils';
import { AssemblyRedirect } from './redirect';

const TEST_ASSEMBLY: Assembly = {
  schema: SchemaVersion.LATEST,
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

let tmpdir: string;
beforeEach(() => {
  tmpdir = makeTempDir();
});

afterEach(() => {
  fs.removeSync(tmpdir);
});

describe(writeAssembly, () => {
  test('can write compressed assembly', () => {
    writeAssembly(tmpdir, TEST_ASSEMBLY, { compress: true });

    expect(
      fs.existsSync(path.join(tmpdir, SPEC_FILE_NAME_COMPRESSED)),
    ).toBeTruthy();

    // includes .jsii files with instructions for finding compressed file
    const instructions = fs.readJsonSync(path.join(tmpdir, SPEC_FILE_NAME), {
      encoding: 'utf-8',
    });
    expect(instructions).toEqual({
      schema: 'jsii/file-redirect',
      compression: 'gzip',
      filename: SPEC_FILE_NAME_COMPRESSED,
    });
  });

  test('can write uncompressed assembly', () => {
    writeAssembly(tmpdir, TEST_ASSEMBLY, { compress: false });

    expect(fs.existsSync(path.join(tmpdir, SPEC_FILE_NAME))).toBeTruthy();
  });
});

describe(findAssemblyFile, () => {
  test('finds SPEC_FILE_NAME file when there is no compression', () => {
    writeAssembly(tmpdir, TEST_ASSEMBLY, { compress: false });

    expect(findAssemblyFile(tmpdir)).toEqual(path.join(tmpdir, SPEC_FILE_NAME));
  });

  test('finds SPEC_FILE_NAME file even when there is compression', () => {
    writeAssembly(tmpdir, TEST_ASSEMBLY, { compress: true });

    expect(findAssemblyFile(tmpdir)).toEqual(path.join(tmpdir, SPEC_FILE_NAME));
  });

  test('throws if SPEC_FILE_NAME file does not exist', () => {
    expect(() => findAssemblyFile(tmpdir)).toThrow(
      `Expected to find ${SPEC_FILE_NAME} file in ${tmpdir}, but no such file found`,
    );
  });
});

describe(loadAssemblyFromPath, () => {
  test('loads compressed assembly', () => {
    writeAssembly(tmpdir, TEST_ASSEMBLY, { compress: true });

    expect(loadAssemblyFromPath(tmpdir)).toEqual(TEST_ASSEMBLY);
  });

  test('loads uncompressed assembly', () => {
    writeAssembly(tmpdir, TEST_ASSEMBLY, { compress: false });

    expect(loadAssemblyFromPath(tmpdir)).toEqual(TEST_ASSEMBLY);
  });

  test('compressed and uncompressed assemblies are loaded identically', () => {
    const compressedTmpDir = makeTempDir();
    const uncompressedTmpDir = makeTempDir();

    writeAssembly(compressedTmpDir, TEST_ASSEMBLY, { compress: true });
    writeAssembly(uncompressedTmpDir, TEST_ASSEMBLY, { compress: false });

    expect(loadAssemblyFromPath(compressedTmpDir)).toEqual(
      loadAssemblyFromPath(uncompressedTmpDir),
    );

    fs.removeSync(compressedTmpDir);
    fs.removeSync(uncompressedTmpDir);
  });

  test('throws if redirect object has unsupported compression', () => {
    fs.writeJsonSync(path.join(tmpdir, SPEC_FILE_NAME), {
      schema: 'jsii/file-redirect',
      compression: '7zip',
      filename: '.jsii.7z',
    });

    expect(() => loadAssemblyFromPath(tmpdir)).toThrowError(
      /Error: Invalid assembly redirect:\n \* redirect\/compression must be equal to one of the allowed values/m,
    );
  });

  test('throws if redirect object is missing filename', () => {
    fs.writeJsonSync(path.join(tmpdir, SPEC_FILE_NAME), {
      schema: 'jsii/file-redirect',
    });

    expect(() => loadAssemblyFromPath(tmpdir)).toThrowError(
      /Error: Invalid assembly redirect:\n \* redirect must have required property 'filename'/m,
    );
  });

  test('throws if assembly is invalid', () => {
    fs.writeJsonSync(
      path.join(tmpdir, SPEC_FILE_NAME),
      {
        assembly: 'not a valid assembly',
      },
      {
        encoding: 'utf8',
        spaces: 2,
      },
    );

    expect(() => loadAssemblyFromPath(tmpdir)).toThrow(/Invalid assembly/);
  });
});

describe(loadAssemblyFromBuffer, () => {
  test('loads uncompressed assembly buffer', () => {
    writeAssembly(tmpdir, TEST_ASSEMBLY, { compress: false });
    const assemblyFile = path.join(tmpdir, SPEC_FILE_NAME);
    const buf = fs.readFileSync(assemblyFile);
    expect(loadAssemblyFromBuffer(buf)).toEqual(TEST_ASSEMBLY);
  });

  test('loads compressed assembly buffer', () => {
    writeAssembly(tmpdir, TEST_ASSEMBLY, { compress: true });
    const assemblyBuf = fs.readFileSync(path.join(tmpdir, SPEC_FILE_NAME));
    const compressedFile = path.join(tmpdir, SPEC_FILE_NAME_COMPRESSED);
    const compAssemblyBuf = fs.readFileSync(compressedFile);

    expect(
      loadAssemblyFromBuffer(assemblyBuf, (filename: string) => {
        if (filename !== SPEC_FILE_NAME_COMPRESSED) {
          throw new Error(
            `Assembly file redirects to nonexistant ${filename}.`,
          );
        }
        return compAssemblyBuf;
      }),
    ).toEqual(TEST_ASSEMBLY);
  });

  test('throws when redirect filename mismatches', () => {
    writeAssembly(tmpdir, TEST_ASSEMBLY, { compress: true });
    const assemblyBuf = fs.readFileSync(path.join(tmpdir, SPEC_FILE_NAME));
    const compressedFile = path.join(tmpdir, SPEC_FILE_NAME_COMPRESSED);
    const compAssemblyBuf = fs.readFileSync(compressedFile);

    expect(() => {
      loadAssemblyFromBuffer(assemblyBuf, (filename: string) => {
        if (filename !== 'blah.gz') {
          throw new Error(
            `Assembly file redirects to nonexistent file: ${filename}.`,
          );
        }
        return compAssemblyBuf;
      });
    }).toThrow(/Assembly file redirects to nonexistent file:/);
  });

  test('follows multiple redirects', () => {
    const firstRedirect: AssemblyRedirect = {
      schema: 'jsii/file-redirect',
      filename: 'second.json.gz',
      compression: 'gzip',
    };
    const secondRedirect: AssemblyRedirect = {
      schema: 'jsii/file-redirect',
      filename: 'assembly.json',
    };

    expect(
      loadAssemblyFromBuffer(
        Buffer.from(JSON.stringify(firstRedirect)),
        (filename) => {
          if (filename === firstRedirect.filename) {
            return zlib.gzipSync(JSON.stringify(secondRedirect), { level: 9 });
          } else if (filename === secondRedirect.filename) {
            return Buffer.from(JSON.stringify(TEST_ASSEMBLY));
          }
          throw new Error(`Reference to unexpected file: ${filename}`);
        },
        false,
      ),
    ).toEqual(TEST_ASSEMBLY);
  });
});

export function makeTempDir() {
  return fs.mkdtempSync(path.join(os.tmpdir(), path.basename(__filename)));
}
