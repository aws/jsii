import { randomBytes } from 'crypto';
import {
  closeSync,
  linkSync,
  lstatSync,
  mkdirSync,
  openSync,
  readFileSync,
  unlinkSync,
  writeSync,
} from 'fs';
import { hostname } from 'os';
import { dirname } from 'path';

/**
 * When the holder of a lock can be checked (it runs on this host), its lock is
 * stale once the holder is no longer running, or once it has been held this
 * long. The latter guards against the holder's PID having been re-used; no
 * cache operation holds a lock anywhere near this long.
 */
const MAX_HOLD_MS = 120_000;

/**
 * When the holder of a lock cannot be checked (it runs on another host, or the
 * lock file has no owner information, e.g: it was created by an older version
 * of jsii), its lock is stale once it has been held this long.
 */
const UNCHECKED_STALE_AFTER_MS = 10_000;

/**
 * Thrown when a lock could not be acquired before the timeout expired.
 */
export class LockTimeoutError extends Error {
  public constructor(public readonly path: string) {
    super(`Timed out waiting for lock ${path}`);
    this.name = LockTimeoutError.name;
  }
}

/**
 * The content of a lock file, identifying its holder.
 */
interface LockOwner {
  readonly pid: number;
  readonly hostname: string;
  /** A random value that uniquely identifies one acquisition of the lock. */
  readonly token: string;
}

/**
 * A lock that is currently held by this process.
 */
export interface HeldLock {
  /**
   * Releases the lock. The lock file is only removed if it still belongs to
   * this holder.
   */
  release(): void;
}

export interface AcquireOptions {
  /**
   * How long to wait for the lock to become available. Use `0` to try only
   * once.
   */
  readonly timeoutMs: number;
}

/**
 * Acquires an exclusive lock, represented by a file at `path`.
 *
 * A lock is held until it is released by its holder, or until it is stale:
 * - if the holder runs on this host, once it is no longer running (or after
 *   {@link MAX_HOLD_MS}, in case its PID was re-used). A slow holder does not
 *   lose its lock.
 * - otherwise (another host, or no owner information, e.g: a lock created by
 *   an older jsii version), after {@link UNCHECKED_STALE_AFTER_MS}.
 *
 * @throws LockTimeoutError if the lock could not be acquired in time.
 */
export function acquireLock(path: string, options: AcquireOptions): HeldLock {
  const deadline = Date.now() + options.timeoutMs;
  let sleep = 10;

  // eslint-disable-next-line no-constant-condition
  while (true) {
    const lock = tryAcquireLock(path);
    if (lock != null) {
      return lock;
    }

    const remaining = deadline - Date.now();
    if (remaining <= 0) {
      throw new LockTimeoutError(path);
    }
    // Randomize to avoid a thundering herd, and back off up to 1 second.
    sleepSync(Math.min(remaining, Math.ceil(Math.random() * sleep)));
    sleep = Math.min(sleep * 1.5, 1_000);
  }
}

function tryAcquireLock(path: string): HeldLock | undefined {
  const owner = createOwner();
  try {
    if (tryCreateLockFile(path, owner)) {
      return { release: () => releaseLockFile(path, owner) };
    }
  } catch (error: any) {
    if (error.code !== 'ENOENT') {
      throw error;
    }
    // The parent directory does not exist (anymore), for example because it
    // was pruned as an empty directory. Re-create it and try again.
    mkdirSync(dirname(path), { recursive: true, mode: 0o700 });
    return undefined;
  }

  const current = readLockFile(path);
  if (current == null) {
    // The lock was just released, or is being written. Try again next round.
    return undefined;
  }
  if (!isStale(current)) {
    return undefined;
  }

  breakStaleLock(path, current.owner);
  if (tryCreateLockFile(path, owner)) {
    return { release: () => releaseLockFile(path, owner) };
  }
  return undefined;
}

/**
 * Removes a stale lock, provided it is still the same lock that was found to
 * be stale.
 *
 * Several processes may find the same stale lock at the same time. Without
 * coordination, one of them could remove the stale lock and acquire a new one,
 * which a second process then removes, believing it to be the stale one. To
 * prevent this, stale locks are only removed while holding a secondary "break"
 * lock, and only after confirming (by its token) that the lock file is still
 * the stale one.
 */
function breakStaleLock(path: string, stale: LockOwner): void {
  const breakPath = `${path}.break`;
  const breaker = createOwner();

  if (!tryCreateLockFile(breakPath, breaker)) {
    const current = readLockFile(breakPath);
    if (current == null || !isStale(current)) {
      // Someone else is breaking the lock right now.
      return;
    }
    removeIfOwnedBy(breakPath, current.owner);
    if (!tryCreateLockFile(breakPath, breaker)) {
      return;
    }
  }

  try {
    removeIfOwnedBy(path, stale);
  } finally {
    releaseLockFile(breakPath, breaker);
  }
}

function createOwner(): LockOwner {
  return {
    pid: process.pid,
    hostname: hostname(),
    token: randomBytes(16).toString('hex'),
  };
}

/**
 * Atomically creates a lock file with the provided owner information.
 *
 * The content is written to a temporary file first, then hard-linked into
 * place. Linking fails if the lock file already exists, and makes the lock
 * file appear with its full content, so readers never observe a partially
 * written lock file.
 *
 * @returns `true` if the lock file was created, `false` if it already existed.
 */
function tryCreateLockFile(path: string, owner: LockOwner): boolean {
  const content = JSON.stringify(owner);
  const tmpPath = `${path}.${owner.token}.tmp`;

  writeExclusive(tmpPath, content);
  try {
    linkSync(tmpPath, path);
    return true;
  } catch (error: any) {
    if (error.code === 'EEXIST') {
      return false;
    }
    if (!['EPERM', 'ENOTSUP', 'ENOSYS', 'EXDEV'].includes(error.code)) {
      throw error;
    }
  } finally {
    unlinkSync(tmpPath);
  }

  // The file system does not support hard links. Fall back to an exclusive
  // create, where a reader may briefly observe an empty lock file.
  try {
    writeExclusive(path, content);
    return true;
  } catch (error: any) {
    if (error.code === 'EEXIST') {
      return false;
    }
    throw error;
  }
}

function writeExclusive(path: string, content: string): void {
  const fd = openSync(path, 'wx', 0o600);
  try {
    writeSync(fd, content);
  } finally {
    closeSync(fd);
  }
}

function readLockFile(
  path: string,
): { readonly owner: LockOwner; readonly ageMs: number } | undefined {
  let content: string;
  let mtimeMs: number;
  try {
    // Never follow symbolic links: a lock file is always a regular file, and
    // anything else is treated as a lock with an unknown owner.
    const stat = lstatSync(path);
    mtimeMs = stat.mtimeMs;
    content = stat.isFile() ? readFileSync(path, 'utf-8') : '';
  } catch (error: any) {
    if (error.code === 'ENOENT') {
      return undefined;
    }
    throw error;
  }

  let owner: LockOwner;
  try {
    const parsed = JSON.parse(content);
    owner = {
      pid: typeof parsed?.pid === 'number' ? parsed.pid : NaN,
      hostname: typeof parsed?.hostname === 'string' ? parsed.hostname : '',
      token: typeof parsed?.token === 'string' ? parsed.token : '',
    };
  } catch {
    // Empty (still being written, see `tryCreateLockFile`) or not written by
    // this implementation. Its owner is unknown.
    owner = { pid: NaN, hostname: '', token: '' };
  }

  return { owner, ageMs: Date.now() - mtimeMs };
}

function isStale(lock: {
  readonly owner: LockOwner;
  readonly ageMs: number;
}): boolean {
  const { owner, ageMs } = lock;
  const checkable =
    owner.token !== '' &&
    owner.hostname === hostname() &&
    Number.isInteger(owner.pid);
  if (!checkable) {
    return ageMs > UNCHECKED_STALE_AFTER_MS;
  }
  return ageMs > MAX_HOLD_MS || !isProcessAlive(owner.pid);
}

function isProcessAlive(pid: number): boolean {
  try {
    // Signal 0 only checks whether the process exists.
    process.kill(pid, 0);
    return true;
  } catch (error: any) {
    // EPERM means the process exists, but belongs to someone else.
    return error.code !== 'ESRCH';
  }
}

function releaseLockFile(path: string, owner: LockOwner): void {
  removeIfOwnedBy(path, owner);
}

/**
 * Removes the lock file at `path`, but only if it belongs to `owner`.
 */
function removeIfOwnedBy(path: string, owner: LockOwner): void {
  const current = readLockFile(path);
  if (current == null || current.owner.token !== owner.token) {
    return;
  }
  try {
    unlinkSync(path);
  } catch (error: any) {
    if (error.code !== 'ENOENT') {
      throw error;
    }
  }
}

/**
 * Abuse Atomics.wait() to come up with a sync sleep
 *
 * We must use a sync sleep because all of jsii is sync.
 */
function sleepSync(ms: number) {
  Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, ms);
}
