import * as fs from 'fs-extra';
import * as os from 'os';
import * as path from 'path';

import {
  PACMAK_MANIFEST_FILE,
  resolveRuntimeVersion,
  writePacmakManifest,
} from '../lib/runtime-version';

jest.setTimeout(60_000);

const OWN_VERSION = '1.140.0';

let mockVersion = OWN_VERSION;
jest.mock('../lib/version', () => ({
  get VERSION() {
    return mockVersion;
  },
}));

let workdir: string;
let root: string;
beforeEach(async () => {
  mockVersion = OWN_VERSION;
  workdir = await fs.realpath(
    await fs.mkdtemp(path.join(os.tmpdir(), 'jsii-pacmak-runtime-version-')),
  );
  root = await makePackage(workdir, 'root', {
    dependencies: { a: '^1.0.0' },
  });
});
afterEach(async () => {
  await fs.remove(workdir);
});

test('uses own version when no dependency recorded a runtime version', async () => {
  await makePackage(root, 'a');

  await expect(resolveRuntimeVersion(root)).resolves.toBe(OWN_VERSION);
});

test('uses the runtime version of a dependency that requires a newer runtime', async () => {
  await makePackage(root, 'a', {}, { runtimeVersion: '1.141.0' });

  await expect(resolveRuntimeVersion(root)).resolves.toBe('1.141.0');
});

test('uses own version when dependencies require an older runtime', async () => {
  await makePackage(root, 'a', {}, { runtimeVersion: '1.139.0' });

  await expect(resolveRuntimeVersion(root)).resolves.toBe(OWN_VERSION);
});

test('considers transitive dependencies through dependencies that did not record a runtime version', async () => {
  const a = await makePackage(root, 'a', { dependencies: { b: '^1.0.0' } });
  await makePackage(a, 'b', {}, { runtimeVersion: '1.142.0' });

  await expect(resolveRuntimeVersion(root)).resolves.toBe('1.142.0');
});

test('uses the highest runtime version across all dependencies', async () => {
  await fs.writeJson(path.join(root, 'package.json'), {
    name: 'root',
    version: '1.0.0',
    jsii: {},
    dependencies: { a: '^1.0.0', b: '^1.0.0' },
  });
  await makePackage(root, 'a', {}, { runtimeVersion: '1.142.0' });
  await makePackage(root, 'b', {}, { runtimeVersion: '1.141.0' });

  await expect(resolveRuntimeVersion(root)).resolves.toBe('1.142.0');
});

test('ignores packages that are not jsii packages, and their dependencies', async () => {
  const a = await makePackage(
    root,
    'a',
    { jsii: undefined, dependencies: { b: '^1.0.0' } },
    { runtimeVersion: '1.141.0' },
  );
  await makePackage(a, 'b', {}, { runtimeVersion: '1.142.0' });

  await expect(resolveRuntimeVersion(root)).resolves.toBe(OWN_VERSION);
});

test('uses own version for development builds of jsii-pacmak', async () => {
  await makePackage(root, 'a', {}, { runtimeVersion: '1.141.0' });

  mockVersion = '0.0.0';

  await expect(resolveRuntimeVersion(root)).resolves.toBe('0.0.0');
});

test('writePacmakManifest records the runtime version of this jsii-pacmak', async () => {
  await writePacmakManifest(root);

  await expect(
    fs.readJson(path.join(root, PACMAK_MANIFEST_FILE)),
  ).resolves.toEqual({ runtimeVersion: OWN_VERSION });
});

/**
 * Creates a package in `<parentDir>/node_modules/<name>` (or `<parentDir>/<name>` for the root).
 */
async function makePackage(
  parentDir: string,
  name: string,
  pkg: { [key: string]: unknown } = {},
  manifest?: object,
): Promise<string> {
  const dir =
    parentDir === workdir
      ? path.join(parentDir, name)
      : path.join(parentDir, 'node_modules', name);
  await fs.mkdirp(dir);
  await fs.writeJson(path.join(dir, 'package.json'), {
    name,
    version: '1.0.0',
    main: 'index.js',
    jsii: {},
    ...pkg,
  });
  await fs.writeFile(path.join(dir, 'index.js'), '');
  if (manifest !== undefined) {
    await fs.writeJson(path.join(dir, PACMAK_MANIFEST_FILE), manifest);
  }
  return dir;
}
