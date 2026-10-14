import { spawnSync } from 'child_process';
import {
  chmodSync,
  existsSync,
  lstatSync,
  mkdirSync,
  mkdtempSync,
  readFileSync,
  realpathSync,
  rmSync,
  symlinkSync,
  utimesSync,
  writeFileSync,
} from 'fs';
import { hostname, tmpdir } from 'os';
import { join } from 'path';

import { DiskCache } from './disk-cache';
import { acquireLock, LockTimeoutError } from './lock-file';
import {
  createPrivateDirectory,
  InsecureDirectoryError,
  verifyExistingDirectoryIsPrivate,
} from './private-directory';

const posixOnly = process.platform === 'win32' ? test.skip : test;
const PRIVATE = { verifyExistingIsPrivate: true } as const;

let scratch: string;
beforeEach(() => {
  scratch = realpathSync(mkdtempSync(join(tmpdir(), 'jsii-disk-cache-test-')));
});
afterEach(() => {
  rmSync(scratch, { force: true, recursive: true });
});

describe(createPrivateDirectory, () => {
  posixOnly('creates missing directories with mode 0700', () => {
    const path = join(scratch, 'a', 'b', 'c');
    const result = createPrivateDirectory(path);
    expect(result).toEqual({ path, created: true });
    for (const dir of ['a', 'a/b', 'a/b/c']) {
      expect(lstatSync(join(scratch, dir)).mode & 0o777).toBe(0o700);
    }
  });

  posixOnly('leaves an existing directory untouched', () => {
    const path = join(scratch, 'existing');
    mkdirSync(path);
    chmodSync(path, 0o755);
    expect(createPrivateDirectory(path)).toEqual({ path, created: false });
    expect(lstatSync(path).mode & 0o777).toBe(0o755);
  });

  posixOnly('returns the target of a symbolic link', () => {
    const target = join(scratch, 'target');
    mkdirSync(target);
    symlinkSync(target, join(scratch, 'link'));
    expect(createPrivateDirectory(join(scratch, 'link')).path).toBe(target);
  });
});

describe(verifyExistingDirectoryIsPrivate, () => {
  test('accepts an existing private directory', () => {
    const path = join(scratch, 'existing');
    mkdirSync(path, { mode: 0o700 });
    expect(() => verifyExistingDirectoryIsPrivate(path)).not.toThrow();
  });

  posixOnly('rejects a group- or world-writable directory', () => {
    const path = join(scratch, 'shared');
    mkdirSync(path);
    chmodSync(path, 0o777);
    expect(() => verifyExistingDirectoryIsPrivate(path)).toThrow(
      InsecureDirectoryError,
    );
    chmodSync(path, 0o770);
    expect(() => verifyExistingDirectoryIsPrivate(path)).toThrow(
      /writable by group/,
    );
  });

  posixOnly('rejects a directory under a non-sticky writable parent', () => {
    const parent = join(scratch, 'parent');
    mkdirSync(join(parent, 'child'), { recursive: true, mode: 0o700 });
    chmodSync(parent, 0o777);
    expect(() =>
      verifyExistingDirectoryIsPrivate(join(parent, 'child')),
    ).toThrow(/parent directory .*parent/);
  });

  posixOnly('accepts a directory under a sticky writable parent', () => {
    const parent = join(scratch, 'sticky');
    mkdirSync(parent);
    chmodSync(parent, 0o1777);
    const { path } = createPrivateDirectory(join(parent, 'child'));
    expect(() => verifyExistingDirectoryIsPrivate(path)).not.toThrow();
  });

  posixOnly('rejects a directory owned by another user', () => {
    // `/` is owned by root, so it is never owned by a (non-root) test user.
    if (process.getuid?.() === 0) {
      return;
    }
    expect(() => verifyExistingDirectoryIsPrivate('/')).toThrow(
      /is owned by uid 0/,
    );
  });

  posixOnly('checks the parents of a symbolic link target', () => {
    const shared = join(scratch, 'shared');
    mkdirSync(join(shared, 'target'), { recursive: true, mode: 0o700 });
    chmodSync(shared, 0o777);
    symlinkSync(join(shared, 'target'), join(scratch, 'link'));

    const { path } = createPrivateDirectory(join(scratch, 'link'));
    expect(() => verifyExistingDirectoryIsPrivate(path)).toThrow(
      /parent directory/,
    );
  });

  posixOnly('rejects a symbolic link', () => {
    mkdirSync(join(scratch, 'target'), { mode: 0o700 });
    symlinkSync(join(scratch, 'target'), join(scratch, 'link'));
    expect(() =>
      verifyExistingDirectoryIsPrivate(join(scratch, 'link')),
    ).toThrow(/is not a directory/);
  });

  posixOnly('rejects a file', () => {
    writeFileSync(join(scratch, 'file'), '');
    expect(() =>
      verifyExistingDirectoryIsPrivate(join(scratch, 'file')),
    ).toThrow(/is not a directory/);
  });
});

describe(acquireLock, () => {
  test('is exclusive until released', () => {
    const path = join(scratch, 'lock');
    const held = acquireLock(path, { timeoutMs: 0 });
    expect(() => acquireLock(path, { timeoutMs: 50 })).toThrow(
      LockTimeoutError,
    );
    held.release();
    expect(existsSync(path)).toBe(false);
    acquireLock(path, { timeoutMs: 0 }).release();
  });

  test('is not broken while its (slow) holder is alive', () => {
    const path = join(scratch, 'lock');
    acquireLock(path, { timeoutMs: 0 });
    // Pretend the lock is much older than the old 10s staleness
    const old = new Date(Date.now() - 60_000);
    utimesSync(path, old, old);
    expect(() => acquireLock(path, { timeoutMs: 50 })).toThrow(
      LockTimeoutError,
    );
  });

  test('is broken when its holder is dead', () => {
    const path = join(scratch, 'lock');
    writeFileSync(
      path,
      JSON.stringify({ pid: deadPid(), hostname: hostname(), token: 'x' }),
    );
    acquireLock(path, { timeoutMs: 0 }).release();
    expect(existsSync(path)).toBe(false);
  });

  test('is not broken while its holder on another host is fresh', () => {
    const path = join(scratch, 'lock');
    writeFileSync(
      path,
      JSON.stringify({ pid: deadPid(), hostname: 'elsewhere', token: 'x' }),
    );
    expect(() => acquireLock(path, { timeoutMs: 50 })).toThrow(
      LockTimeoutError,
    );
  });

  test('is broken after 10 seconds when its holder runs on another host', () => {
    const path = join(scratch, 'lock');
    writeFileSync(
      path,
      JSON.stringify({ pid: 1, hostname: 'elsewhere', token: 'x' }),
    );
    const old = new Date(Date.now() - 11_000);
    utimesSync(path, old, old);
    acquireLock(path, { timeoutMs: 0 }).release();
  });

  test('is broken after 2 minutes even if its holder seems alive', () => {
    // e.g: the holder's PID was re-used by another process
    const path = join(scratch, 'lock');
    acquireLock(path, { timeoutMs: 0 });
    const old = new Date(Date.now() - 121_000);
    utimesSync(path, old, old);
    acquireLock(path, { timeoutMs: 0 }).release();
  });

  describe('lock files without owner information (e.g: older jsii versions)', () => {
    // Older versions create an empty lock file with O_EXCL, and consider any
    // lock older than 10 seconds stale.
    test('respects a fresh lock', () => {
      const path = join(scratch, 'lock');
      writeFileSync(path, '', { flag: 'wx' });
      expect(() => acquireLock(path, { timeoutMs: 50 })).toThrow(
        LockTimeoutError,
      );
    });

    test('breaks a lock older than 10 seconds', () => {
      const path = join(scratch, 'lock');
      writeFileSync(path, '', { flag: 'wx' });
      const old = new Date(Date.now() - 11_000);
      utimesSync(path, old, old);
      acquireLock(path, { timeoutMs: 0 }).release();
      expect(existsSync(path)).toBe(false);
    });

    test('is exclusive against an O_EXCL create', () => {
      const path = join(scratch, 'lock');
      const held = acquireLock(path, { timeoutMs: 0 });
      expect(() => writeFileSync(path, '', { flag: 'wx' })).toThrow(/EEXIST/);
      held.release();
      writeFileSync(path, '', { flag: 'wx' });
    });
  });

  test('releasing does not remove a lock held by someone else', () => {
    const path = join(scratch, 'lock');
    const held = acquireLock(path, { timeoutMs: 0 });
    // Simulate the lock having been (wrongly) broken and re-acquired
    rmSync(path);
    const other = acquireLock(path, { timeoutMs: 0 });
    held.release();
    expect(existsSync(path)).toBe(true);
    other.release();
    expect(existsSync(path)).toBe(false);
  });

  posixOnly('does not follow a symbolic link in place of the lock', () => {
    const victim = join(scratch, 'victim');
    writeFileSync(victim, 'precious');
    const path = join(scratch, 'lock');
    symlinkSync(victim, path);

    expect(() => acquireLock(path, { timeoutMs: 50 })).toThrow(
      LockTimeoutError,
    );
    expect(readFileSync(victim, 'utf-8')).toBe('precious');
  });
});

describe(DiskCache, () => {
  posixOnly('refuses an insecure cache root', () => {
    const root = join(scratch, 'insecure-root');
    mkdirSync(root);
    chmodSync(root, 0o777);
    expect(() => DiskCache.inDirectory(root, PRIVATE)).toThrow(
      InsecureDirectoryError,
    );
  });

  posixOnly('uses an insecure root when verification is off', () => {
    const root = join(scratch, 'insecure-root');
    mkdirSync(root);
    chmodSync(root, 0o777);
    expect(() =>
      DiskCache.inDirectory(root, { verifyExistingIsPrivate: false }),
    ).not.toThrow();
  });

  posixOnly('creates a private root when verification is off', () => {
    const root = join(scratch, 'new', 'root');
    DiskCache.inDirectory(root, { verifyExistingIsPrivate: false });
    expect(lstatSync(join(scratch, 'new')).mode & 0o777).toBe(0o700);
    expect(lstatSync(root).mode & 0o777).toBe(0o700);
  });

  test('removes leftovers of an incomplete entry before retrieving', () => {
    const cache = DiskCache.inDirectory(join(scratch, 'root'), PRIVATE);
    const entry = cache.entry('pkg', '1.0.0', 'abc');
    mkdirSync(entry.path, { recursive: true });
    writeFileSync(join(entry.path, 'leftover'), '');

    const result = entry.retrieve((path) =>
      writeFileSync(join(path, 'file'), ''),
    );
    expect(result.cache).toBe('miss');
    expect(existsSync(join(entry.path, 'leftover'))).toBe(false);
    expect(existsSync(join(entry.path, 'file'))).toBe(true);
    expect(entry.retrieve(() => fail('not called')).cache).toBe('hit');
  });

  test('does not mark an entry complete when production fails', () => {
    const cache = DiskCache.inDirectory(join(scratch, 'root'), PRIVATE);
    const entry = cache.entry('pkg', '1.0.0', 'abc');
    expect(() =>
      entry.retrieve(() => {
        throw new Error('boom');
      }),
    ).toThrow('boom');
    expect(entry.isComplete).toBe(false);
    expect(entry.pathExists).toBe(false);
  });

  posixOnly('ignores a symbolic link shipped as the marker file', () => {
    const victim = join(scratch, 'victim');
    const cache = DiskCache.inDirectory(join(scratch, 'root'), PRIVATE);
    const entry = cache.entry('pkg', '1.0.0', 'abc');

    entry.retrieve((path) =>
      symlinkSync(victim, join(path, '.jsii-runtime-package-cache')),
    );
    expect(existsSync(victim)).toBe(false);
    expect(
      lstatSync(join(entry.path, '.jsii-runtime-package-cache')).isFile(),
    ).toBe(true);
  });

  posixOnly('prune does not follow symbolic links', () => {
    const outside = join(scratch, 'outside');
    mkdirSync(join(outside, 'empty'), { recursive: true });

    const cache = DiskCache.inDirectory(join(scratch, 'root'), PRIVATE);
    const entry = cache.entry('pkg', '1.0.0', 'abc');
    entry.retrieve((path) => {
      mkdirSync(join(path, 'empty-in-package'));
      symlinkSync(outside, join(path, 'link-in-package'));
    });
    symlinkSync(outside, join(scratch, 'root', 'link-in-root'));
    mkdirSync(join(scratch, 'root', 'stale', 'empty'), { recursive: true });

    cache.pruneExpiredEntries();

    expect(existsSync(join(outside, 'empty'))).toBe(true);
    // Content of cache entries is left untouched
    expect(existsSync(join(entry.path, 'empty-in-package'))).toBe(true);
    // Empty directories that are not cache entries are removed
    expect(existsSync(join(scratch, 'root', 'stale'))).toBe(false);
  });
});

/** Returns the PID of a process that has exited. */
function deadPid(): number {
  const { pid } = spawnSync(process.execPath, ['-e', '0']);
  return pid;
}
