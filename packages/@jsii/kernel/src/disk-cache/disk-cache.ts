import {
  existsSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  realpathSync,
  rmdirSync,
  rmSync,
  statSync,
  utimesSync,
  writeFileSync,
} from 'fs';
import { lockSync, unlockSync } from 'lockfile';
import { dirname, join } from 'path';

import { digestFile } from './digest-file';

const MARKER_FILE_NAME = '.jsii-runtime-package-cache';

const ONE_DAY_IN_MS = 86_400_000;
const PRUNE_AFTER_MILLISECONDS = process.env.JSII_RUNTIME_PACKAGE_CACHE_TTL
  ? parseInt(process.env.JSII_RUNTIME_PACKAGE_CACHE_TTL, 10) * ONE_DAY_IN_MS
  : 30 * ONE_DAY_IN_MS;

export class DiskCache {
  static readonly #CACHE = new Map<string, DiskCache>();

  public static inDirectory(path: string): DiskCache {
    const didCreate = mkdirSync(path, { recursive: true }) != null;
    if (didCreate && process.platform === 'darwin') {
      // Mark the directories for no iCloud sync, no Spotlight indexing, no TimeMachine backup
      // @see https://michaelbach.de/2019/03/19/MacOS-nosync-noindex-nobackup.html
      writeFileSync(join(path, '.nobackup'), '');
      writeFileSync(join(path, '.noindex'), '');
      writeFileSync(join(path, '.nosync'), '');
    }

    path = realpathSync(path);
    if (!this.#CACHE.has(path)) {
      this.#CACHE.set(path, new DiskCache(path));
    }
    return this.#CACHE.get(path)!;
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

  public entryFor(path: string, ...comments: readonly string[]): Entry {
    const rawDigest = digestFile(path, ...comments);
    return this.entry(...comments, rawDigest.toString('hex'));
  }

  public pruneExpiredEntries() {
    const cutOff = new Date(Date.now() - PRUNE_AFTER_MILLISECONDS);
    for (const entry of this.#entries()) {
      if (entry.atime < cutOff) {
        entry.lock((lockedEntry) => {
          // Check again in case it's been accessed which we waited for the lock...
          if (entry.atime > cutOff) {
            return;
          }
          lockedEntry.delete();
        });
      }
    }

    for (const dir of directoriesUnder(this.#root, true)) {
      if (process.platform === 'darwin') {
        try {
          rmSync(join(dir, '.DS_Store'), { force: true });
        } catch {
          // Ignore errors...
        }
      }
      if (readdirSync(dir).length === 0) {
        try {
          rmdirSync(dir);
        } catch {
          // Ignore errors, directory may no longer be empty...
        }
      }
    }
  }

  *#entries(): Generator<Entry, void, void> {
    yield* inDirectory(this.#root);

    function* inDirectory(dir: string): Generator<Entry, void, void> {
      if (existsSync(join(dir, MARKER_FILE_NAME))) {
        return yield new Entry(dir);
      }
      for (const file of directoriesUnder(dir)) {
        yield* inDirectory(file);
      }
    }
  }
}

export class Entry {
  public constructor(public readonly path: string) {}

  public get atime(): Date {
    try {
      const stat = statSync(this.#markerFile);
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

  public lock<T>(cb: (entry: LockedEntry) => T): T {
    mkdirSync(dirname(this.path), { recursive: true });
    lockSync(this.#lockFile, { retries: 12, stale: 5_000 });
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
        touch: () => {
          if (disposed) {
            throw new Error(
              `Cannot touch ${this.path} once the lock block was returned!`,
            );
          }
          if (this.pathExists) {
            if (existsSync(this.#markerFile)) {
              const now = new Date();
              utimesSync(this.#markerFile, now, now);
            } else {
              writeFileSync(this.#markerFile, '');
            }
          }
        },
      });
    } finally {
      disposed = true;
      unlockSync(this.#lockFile);
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

  touch(): void;
}

function* directoriesUnder(
  root: string,
  recursive = false,
  ignoreErrors = true,
): Generator<string, void, void> {
  for (const file of readdirSync(root)) {
    const path = join(root, file);
    try {
      const stat = statSync(path);
      if (stat.isDirectory()) {
        if (recursive) {
          yield* directoriesUnder(path, recursive, ignoreErrors);
        }
        yield path;
      }
    } catch (error) {
      if (!ignoreErrors) {
        throw error;
      }
    }
  }
}
