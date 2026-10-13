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

import { extract, getPackageCacheEnabled, setPackageCacheEnabled } from '.';

const mockDefaultCacheRoot = jest.fn<string | undefined, []>();
const mockFallbackCacheRoot = jest.fn<string, []>();
jest.mock('./default-cache-root', () => ({
  defaultCacheRoot: () => mockDefaultCacheRoot(),
  fallbackCacheRoot: () => mockFallbackCacheRoot(),
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
  mockFallbackCacheRoot.mockReset();
  mockFallbackCacheRoot.mockReturnValue(join(scratch, 'fallback-root'));
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

posixOnly(
  'uses the fallback root if the default root is writable by others',
  () => {
    const root = join(scratch, 'shared-cache');
    mkdirSync(root);
    chmodSync(root, 0o777);
    delete process.env.JSII_RUNTIME_PACKAGE_CACHE_ROOT;
    mockDefaultCacheRoot.mockReturnValue(root);

    const consoleError = jest
      .spyOn(console, 'error')
      .mockImplementation(() => undefined);
    try {
      const outDir = join(scratch, 'out');
      expect(extract(tarball, outDir, { strip: 1 }, 'pkg', '1.0.0')).toEqual({
        cache: 'miss',
      });
      expect(readFileSync(join(outDir, 'index.js'), 'utf-8')).toBe('hello');
      expect(consoleError).toHaveBeenCalledWith(
        expect.stringMatching(
          /not using the package cache in .*shared-cache.*writable by group or others.*Using .*fallback-root instead/,
        ),
      );
      // Nothing was written into the insecure root
      expect(readdirSync(root)).toEqual([]);
      expect(existsSync(join(scratch, 'fallback-root', 'pkg'))).toBe(true);
      expect(lstatSync(join(scratch, 'fallback-root')).mode & 0o777).toBe(
        0o700,
      );
    } finally {
      consoleError.mockRestore();
    }
  },
);

posixOnly('extracts without cache if no root is private', () => {
  for (const name of ['shared-default', 'shared-fallback']) {
    mkdirSync(join(scratch, name));
    chmodSync(join(scratch, name), 0o777);
  }
  delete process.env.JSII_RUNTIME_PACKAGE_CACHE_ROOT;
  mockDefaultCacheRoot.mockReturnValue(join(scratch, 'shared-default'));
  mockFallbackCacheRoot.mockReturnValue(join(scratch, 'shared-fallback'));

  const consoleError = jest
    .spyOn(console, 'error')
    .mockImplementation(() => undefined);
  try {
    const outDir = join(scratch, 'out');
    expect(extract(tarball, outDir, { strip: 1 }, 'pkg', '1.0.0')).toEqual({});
    expect(readFileSync(join(outDir, 'index.js'), 'utf-8')).toBe('hello');
    expect(lstatSync(outDir).isSymbolicLink()).toBe(false);
    expect(consoleError).toHaveBeenLastCalledWith(
      expect.stringMatching(/extracted without caching/),
    );
    expect(readdirSync(join(scratch, 'shared-default'))).toEqual([]);
    expect(readdirSync(join(scratch, 'shared-fallback'))).toEqual([]);
  } finally {
    consoleError.mockRestore();
  }
});

test('uses the fallback root when there is no default cache root', () => {
  delete process.env.JSII_RUNTIME_PACKAGE_CACHE_ROOT;
  mockDefaultCacheRoot.mockReturnValue(undefined);
  const outDir = join(scratch, 'out');
  expect(extract(tarball, outDir, { strip: 1 }, 'pkg', '1.0.0')).toEqual({
    cache: 'miss',
  });
  expect(readFileSync(join(outDir, 'index.js'), 'utf-8')).toBe('hello');
  expect(existsSync(join(scratch, 'fallback-root', 'pkg'))).toBe(true);
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
