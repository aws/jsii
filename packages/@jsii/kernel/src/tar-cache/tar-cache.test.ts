import {
  chmodSync,
  existsSync,
  lstatSync,
  mkdirSync,
  mkdtempSync,
  readdirSync,
  readFileSync,
  readlinkSync,
  realpathSync,
  rmSync,
  symlinkSync,
  writeFileSync,
} from 'fs';
import { tmpdir } from 'os';
import { join } from 'path';
import * as tar from 'tar';

import * as diskCache from '../disk-cache';
import { link } from '../link';

import {
  extract,
  getPackageCacheEnabled,
  PackageCacheError,
  setPackageCacheEnabled,
} from '.';

const mockDefaultCacheRoot = jest.fn<string, []>();
jest.mock('./default-cache-root', () => ({
  defaultCacheRoot: () => mockDefaultCacheRoot(),
}));

const posixOnly = process.platform === 'win32' ? test.skip : test;

let scratch: string;
let tarball: string;
let savedRoot: string | undefined;
let savedEnabled: boolean;

beforeEach(() => {
  scratch = realpathSync(mkdtempSync(join(tmpdir(), 'jsii-tar-cache-test-')));
  mockDefaultCacheRoot.mockReset();
  mockDefaultCacheRoot.mockReturnValue(join(scratch, 'default-root'));
  mkdirSync(join(scratch, 'src', 'package'), { recursive: true });
  writeFileSync(join(scratch, 'src', 'package', 'index.js'), 'hello');
  tarball = join(scratch, 'package.tgz');
  tar.create(
    { gzip: true, sync: true, file: tarball, cwd: join(scratch, 'src') },
    ['package'],
  );

  savedRoot = process.env.JSII_RUNTIME_PACKAGE_CACHE_ROOT;
  savedEnabled = getPackageCacheEnabled();
  setPackageCacheEnabled(true);
});

afterEach(() => {
  if (savedRoot == null) {
    delete process.env.JSII_RUNTIME_PACKAGE_CACHE_ROOT;
  } else {
    process.env.JSII_RUNTIME_PACKAGE_CACHE_ROOT = savedRoot;
  }
  setPackageCacheEnabled(savedEnabled);
  rmSync(scratch, { force: true, recursive: true });
});

test('extracts via a private cache root', () => {
  process.env.JSII_RUNTIME_PACKAGE_CACHE_ROOT = join(scratch, 'cache');
  const outDir = join(scratch, 'out');
  expect(extract(tarball, outDir, { strip: 1 }, 'pkg', '1.0.0')).toEqual({
    cache: 'miss',
  });
  expect(readFileSync(join(outDir, 'index.js'), 'utf-8')).toBe('hello');

  const outDir2 = join(scratch, 'out2');
  expect(extract(tarball, outDir2, { strip: 1 }, 'pkg', '1.0.0')).toEqual({
    cache: 'hit',
  });
});

posixOnly('fails if the default root is writable by others', () => {
  const root = join(scratch, 'shared-cache');
  mkdirSync(root);
  chmodSync(root, 0o777);
  delete process.env.JSII_RUNTIME_PACKAGE_CACHE_ROOT;
  mockDefaultCacheRoot.mockReturnValue(root);

  const outDir = join(scratch, 'out');
  expect(() => extract(tarball, outDir, { strip: 1 }, 'pkg', '1.0.0')).toThrow(
    PackageCacheError,
  );
  // Reported to the host as a kernel fault
  expect(() => extract(tarball, outDir, { strip: 1 }, 'pkg', '1.0.0')).toThrow(
    expect.objectContaining({ name: '@jsii/kernel.Fault' }),
  );
  expect(() => extract(tarball, outDir, { strip: 1 }, 'pkg', '1.0.0')).toThrow(
    /Cannot use the jsii package cache in .*shared-cache: other users may be able to modify it.*writable by group or others.*JSII_RUNTIME_PACKAGE_CACHE_ROOT.*JSII_RUNTIME_PACKAGE_CACHE=disabled/,
  );
  // Nothing was written into the insecure root, or the output directory
  expect(readdirSync(root)).toEqual([]);
  expect(existsSync(outDir)).toBe(false);
});

posixOnly('fails if the default root cannot be created', () => {
  const parent = join(scratch, 'read-only');
  mkdirSync(parent);
  chmodSync(parent, 0o500);
  delete process.env.JSII_RUNTIME_PACKAGE_CACHE_ROOT;
  mockDefaultCacheRoot.mockReturnValue(join(parent, 'cache'));

  try {
    let error: any;
    try {
      extract(tarball, join(scratch, 'out'), { strip: 1 }, 'pkg', '1.0.0');
    } catch (e) {
      error = e;
    }
    expect(error).toBeInstanceOf(PackageCacheError);
    expect(error.message).toMatch(/read-only[\\/]cache: EACCES/);
    expect(error.cause.code).toBe('EACCES');
  } finally {
    chmodSync(parent, 0o700);
  }
});

posixOnly('fails if the configured root cannot be created', () => {
  writeFileSync(join(scratch, 'file'), '');
  process.env.JSII_RUNTIME_PACKAGE_CACHE_ROOT = join(scratch, 'file', 'cache');
  expect(() =>
    extract(tarball, join(scratch, 'out'), { strip: 1 }, 'pkg', '1.0.0'),
  ).toThrow(/Cannot use the jsii package cache in .*file[\\/]cache: ENOTDIR/);
});

test('does not wrap errors caused by the tarball', () => {
  process.env.JSII_RUNTIME_PACKAGE_CACHE_ROOT = join(scratch, 'cache');
  const corrupt = join(scratch, 'corrupt.tgz');
  writeFileSync(corrupt, 'this is not a tarball');
  let error: unknown;
  try {
    extract(corrupt, join(scratch, 'out'), { strict: true }, 'pkg', '1.0.0');
  } catch (e) {
    error = e;
  }
  expect(error).toBeDefined();
  expect(error).not.toBeInstanceOf(PackageCacheError);
});

test('creates the default root in private mode', () => {
  delete process.env.JSII_RUNTIME_PACKAGE_CACHE_ROOT;
  const outDir = join(scratch, 'out');
  expect(extract(tarball, outDir, { strip: 1 }, 'pkg', '1.0.0')).toEqual({
    cache: 'miss',
  });
  expect(readFileSync(join(outDir, 'index.js'), 'utf-8')).toBe('hello');
  expect(existsSync(join(scratch, 'default-root', 'pkg'))).toBe(true);
  if (process.platform !== 'win32') {
    expect(lstatSync(join(scratch, 'default-root')).mode & 0o777).toBe(0o700);
  }
});

posixOnly('uses an explicitly configured cache root as-is', () => {
  const root = join(scratch, 'shared-cache');
  mkdirSync(root);
  chmodSync(root, 0o777);
  process.env.JSII_RUNTIME_PACKAGE_CACHE_ROOT = root;

  const outDir = join(scratch, 'out');
  expect(extract(tarball, outDir, { strip: 1 }, 'pkg', '1.0.0')).toEqual({
    cache: 'miss',
  });
  expect(readFileSync(join(outDir, 'index.js'), 'utf-8')).toBe('hello');
});

test('treats an empty JSII_RUNTIME_PACKAGE_CACHE_ROOT as unset', () => {
  process.env.JSII_RUNTIME_PACKAGE_CACHE_ROOT = '';
  const cwd = process.cwd();
  const work = join(scratch, 'cwd');
  mkdirSync(work);
  process.chdir(work);
  try {
    // Uses the default root, never the working directory.
    extract(tarball, join(scratch, 'out'), { strip: 1 }, 'pkg', '1.0.0');
    expect(existsSync(join(work, 'pkg'))).toBe(false);
    expect(existsSync(join(scratch, 'default-root', 'pkg'))).toBe(true);
  } finally {
    process.chdir(cwd);
  }
});

test('rejects content that does not match the cache key', () => {
  process.env.JSII_RUNTIME_PACKAGE_CACHE_ROOT = join(scratch, 'cache');
  // Simulate the tarball being swapped between hashing and extraction.
  const digest = jest
    .spyOn(diskCache, 'digestFile')
    .mockReturnValue(Buffer.alloc(32, 0));
  try {
    expect(() =>
      extract(tarball, join(scratch, 'out'), { strip: 1 }, 'pkg', '1.0.0'),
    ).toThrow(/was modified while it was being extracted/);
    // Nothing was left in the cache
    expect(
      existsSync(join(scratch, 'cache', 'pkg', '1.0.0', '00'.repeat(32))),
    ).toBe(false);
  } finally {
    digest.mockRestore();
  }
});

describe(link, () => {
  posixOnly('recreates symbolic links instead of following them', () => {
    // `link` only copies when node is not started with --preserve-symlinks
    if (process.execArgv.includes('--preserve-symlinks')) {
      return;
    }
    const outside = join(scratch, 'outside');
    writeFileSync(outside, 'secret');
    const existing = join(scratch, 'existing');
    mkdirSync(existing);
    writeFileSync(join(existing, 'file'), 'content');
    symlinkSync(outside, join(existing, 'link'));

    const destination = join(scratch, 'destination');
    link(existing, destination);

    expect(readFileSync(join(destination, 'file'), 'utf-8')).toBe('content');
    expect(lstatSync(join(destination, 'link')).isSymbolicLink()).toBe(true);
    expect(readlinkSync(join(destination, 'link'))).toBe(outside);
  });
});
