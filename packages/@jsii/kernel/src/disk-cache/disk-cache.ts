import {
  existsSync,
  lstatSync,
  lutimesSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  rmdirSync,
  rmSync,
  writeFileSync,
} from 'fs';
import { dirname, join } from 'path';

import { acquireLock } from './lock-file';
import {
  createPrivateDirectory,
  verifyExistingDirectoryIsPrivate,
} from './private-directory';

const MARKER_FILE_NAME = '.jsii-runtime-package-cache';

const ONE_DAY_IN_MS = 86_400_000;
const PRUNE_AFTER_MILLISECONDS = process.env.JSII_RUNTIME_PACKAGE_CACHE_TTL
  ? parseInt(process.env.JSII_RUNTIME_PACKAGE_CACHE_TTL, 10) * ONE_DAY_IN_MS
  : 30 * ONE_DAY_IN_MS;

/**
 * How long to wait for another process to finish populating a cache entry.
 * Locks are only broken when their holder is no longer running, so this only
 * bounds how long we wait for a live (but slow) holder.
 */
const RETRIEVE_LOCK_TIMEOUT_MS = 120_000;

export class DiskCache {
  static readonly #CACHE = new Map<string, DiskCache>();

  /**
   * Opens the cache in `path`, creating it with mode `0700` if missing.
   *
   * @param options.verifyExistingIsPrivate verify that other users cannot
   *        modify the directory. Otherwise, an existing directory is used as-is.
   *
   * @throws InsecureDirectoryError if verification fails.
   */
  public static inDirectory(
    path: string,
    { verifyExistingIsPrivate }: { readonly verifyExistingIsPrivate: boolean },
  ): DiskCache {
    const { path: realPath, created } = createPrivateDirectory(path);
    if (verifyExistingIsPrivate) {
      verifyExistingDirectoryIsPrivate(realPath);
    }

    if (created && process.platform === 'darwin') {
      // Mark the directories for no iCloud sync, no Spotlight indexing, no TimeMachine backup
      // @see https://michaelbach.de/2019/03/19/MacOS-nosync-noindex-nobackup.html
      writeFileSync(join(realPath, '.nobackup'), '');
      writeFileSync(join(realPath, '.noindex'), '');
      writeFileSync(join(realPath, '.nosync'), '');
    }

    if (!this.#CACHE.has(realPath)) {
      this.#CACHE.set(realPath, new DiskCache(realPath));
    }
    return this.#CACHE.get(realPath)!;
  }

  readonly #root: string;

  private constructor(root: string) {
    this.#root = root;
    process.once('beforeExit', () => this.pruneExpiredEntries());
  }

  public entry(...key: readonly string[]): Entry {
    if (key.length === 0) {
      throw new Error(`Cache entry key must contain at least 1 element!`);
    }

    return new Entry(
      join(
        this.#root,
        ...key.flatMap((s) =>
          s
            .replace(/[^@a-z0-9_.\\/-]+/g, '_')
            .split(/[\\/]+/)
            .map((ss) => {
              if (ss === '..') {
                throw new Error(
                  `A cache entry key cannot contain a '..' path segment! (${s})`,
                );
              }
              return ss;
            }),
        ),
      ),
    );
  }

  public pruneExpiredEntries() {
    const cutOff = new Date(Date.now() - PRUNE_AFTER_MILLISECONDS);
    for (const entry of this.#entries()) {
      if (entry.atime < cutOff) {
        // Do not wait if the entry is in use, it'll be pruned another time.
        entry.tryLock((lockedEntry) => {
          // Check again in case it's been accessed while we waited for the lock...
          if (entry.atime > cutOff) {
            return;
          }
          lockedEntry.delete();
        });
      }
    }

    // Remove directories left empty, without descending into cache entries.
    removeEmptyDirectories(this.#root);
  }

  *#entries(): Generator<Entry, void, void> {
    yield* inDirectory(this.#root);

    function* inDirectory(dir: string): Generator<Entry, void, void> {
      if (isEntryDirectory(dir)) {
        return yield new Entry(dir);
      }
      for (const subdir of directoriesUnder(dir)) {
        yield* inDirectory(subdir);
      }
    }
  }
}

export class Entry {
  public constructor(public readonly path: string) {}

  public get atime(): Date {
    try {
      const stat = lstatSync(this.#markerFile);
      return stat.atime;
    } catch (err: any) {
      if (err.code !== 'ENOENT') {
        throw err;
      }
      return new Date(0);
    }
  }

  public get pathExists() {
    return existsSync(this.path);
  }

  get #lockFile(): string {
    return `${this.path}.lock`;
  }

  get #markerFile(): string {
    return join(this.path, MARKER_FILE_NAME);
  }

  /**
   * Whether the directory has been completely written
   *
   * The presence of the marker file is a signal that we can skip trying to lock the directory.
   */
  public get isComplete(): boolean {
    return isEntryDirectory(this.path);
  }

  /**
   * Retrieve an entry from the cache
   *
   * If the entry doesn't exist yet, use 'cb' to produce the file contents.
   * If 'cb' throws, the entry is removed and is not marked complete.
   *
   * @throws LockTimeoutError if another process holds the entry's lock for too
   *         long.
   */
  public retrieve(cb: (path: string) => void): {
    path: string;
    cache: 'hit' | 'miss';
  } {
    // If the marker file already exists, update its timestamp and immediately return.
    // We don't even try to lock.
    if (this.isComplete) {
      this.#touchMarkerFile();
      return { path: this.path, cache: 'hit' };
    }

    let cache: 'hit' | 'miss' = 'miss';
    this.lock((lock) => {
      // While we all fought to acquire the lock, someone else might have completed already.
      if (this.isComplete) {
        cache = 'hit';
        return;
      }

      // Remove any leftovers from an extraction that did not complete (e.g:
      // the process was killed).
      rmSync(this.path, { force: true, recursive: true });

      // !!!IMPORTANT!!!
      // Extract directly into the final target directory, as certain antivirus
      // software configurations on Windows will make a `renameSync` operation
      // fail with EPERM until the files have been fully analyzed.
      mkdirSync(this.path, { recursive: true });
      try {
        cb(this.path);
        // The extracted content may itself contain an entry named like the
        // marker file (possibly a symbolic link). Replace it with our own.
        rmSync(this.#markerFile, { force: true, recursive: true });
      } catch (error) {
        rmSync(this.path, { force: true, recursive: true });
        throw error;
      }
      lock.markComplete();
    });
    return { path: this.path, cache };
  }

  /**
   * Runs `cb` while holding this entry's lock, waiting for it if needed.
   *
   * @throws LockTimeoutError if the lock could not be acquired in time.
   */
  public lock<T>(cb: (entry: LockedEntry) => T): T {
    return this.#withLock(RETRIEVE_LOCK_TIMEOUT_MS, cb);
  }

  /**
   * Runs `cb` while holding this entry's lock, if the lock is available right
   * away.
   *
   * @returns `true` if `cb` was run, `false` if the lock is held by someone else.
   */
  public tryLock(cb: (entry: LockedEntry) => void): boolean {
    try {
      this.#withLock(0, cb);
      return true;
    } catch (error: any) {
      if (error.name === 'LockTimeoutError') {
        return false;
      }
      throw error;
    }
  }

  #withLock<T>(timeoutMs: number, cb: (entry: LockedEntry) => T): T {
    mkdirSync(dirname(this.path), { recursive: true });
    const held = acquireLock(this.#lockFile, { timeoutMs });
    let disposed = false;
    try {
      return cb({
        delete: () => {
          if (disposed) {
            throw new Error(
              `Cannot delete ${this.path} once the lock block was returned!`,
            );
          }
          rmSync(this.path, { force: true, recursive: true });
        },
        write: (name, content) => {
          if (disposed) {
            throw new Error(
              `Cannot write ${join(
                this.path,
                name,
              )} once the lock block was returned!`,
            );
          }

          mkdirSync(dirname(join(this.path, name)), { recursive: true });
          writeFileSync(join(this.path, name), content);
        },
        markComplete: () => {
          if (disposed) {
            throw new Error(
              `Cannot touch ${this.path} once the lock block was returned!`,
            );
          }
          this.#touchMarkerFile();
        },
      });
    } finally {
      disposed = true;
      held.release();
    }
  }

  /**
   * Update the timestamp on the marker file
   */
  #touchMarkerFile() {
    if (this.pathExists) {
      try {
        // Never follow a symbolic link here (lutimes, and an exclusive create).
        const now = new Date();
        lutimesSync(this.#markerFile, now, now);
      } catch (e: any) {
        if (e.code !== 'ENOENT') {
          throw e;
        }
        try {
          writeFileSync(this.#markerFile, '', { flag: 'wx' });
        } catch (e2: any) {
          // Someone else created it concurrently
          if (e2.code !== 'EEXIST') {
            throw e2;
          }
        }
      }
    }
  }

  public read(file: string): Buffer | undefined {
    try {
      return readFileSync(join(this.path, file));
    } catch (error: any) {
      if (error.code === 'ENOENT') {
        return undefined;
      }
      throw error;
    }
  }
}

export interface LockedEntry {
  delete(): void;
  write(name: string, data: Buffer): void;

  /**
   * Mark the entry has having been completed
   *
   * The modification time of this file is used for cleanup.
   */
  markComplete(): void;
}

/**
 * Whether `dir` is a complete cache entry. The marker must be a regular file;
 * a symbolic link (or anything else) with the same name does not count.
 */
function isEntryDirectory(dir: string): boolean {
  try {
    return lstatSync(join(dir, MARKER_FILE_NAME)).isFile();
  } catch {
    return false;
  }
}

/**
 * Lists the directories directly under `root`. Symbolic links are never
 * followed, and errors are ignored.
 */
function* directoriesUnder(root: string): Generator<string, void, void> {
  let files: string[];
  try {
    files = readdirSync(root);
  } catch {
    return;
  }
  for (const file of files) {
    const path = join(root, file);
    try {
      if (lstatSync(path).isDirectory()) {
        yield path;
      }
    } catch {
      // Ignore errors, the file may have been removed concurrently...
    }
  }
}

/**
 * Removes empty directories under `root` (but not `root` itself), depth-first.
 * Symbolic links are never followed, and cache entries (and anything inside of
 * them) are never removed.
 */
function removeEmptyDirectories(root: string): void {
  for (const dir of directoriesUnder(root)) {
    if (isEntryDirectory(dir)) {
      continue;
    }
    removeEmptyDirectories(dir);

    if (process.platform === 'darwin') {
      try {
        rmSync(join(dir, '.DS_Store'), { force: true });
      } catch {
        // Ignore errors...
      }
    }
    try {
      if (readdirSync(dir).length === 0) {
        rmdirSync(dir);
      }
    } catch {
      // Ignore errors, directory may no longer be empty...
    }
  }
}
