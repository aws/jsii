import { mkdirSync, rmSync } from 'fs';
import * as tar from 'tar';

import {
  digestFile,
  DiskCache,
  InsecureDirectoryError,
  LockTimeoutError,
  readFileChunks,
} from '../disk-cache';
import { JsiiFault } from '../errors';
import { link } from '../link';
import { defaultCacheRoot } from './default-cache-root';

export type ExtractOptions = Omit<
  tar.TarOptionsWithAliasesAsyncNoFile,
  'file' | 'cwd'
>;

export interface ExtractResult {
  /**
   * When `'hit'`, the data was already present in cache and was returned from
   * cache.
   *
   * When `'miss'`, the data was extracted into the cache and returned from
   * cache.
   *
   * When `undefined`, the cache is not enabled.
   */
  readonly cache?: 'hit' | 'miss';
}

let packageCacheEnabled =
  (process.env.JSII_RUNTIME_PACKAGE_CACHE?.toLocaleLowerCase() ?? 'enabled') ===
  'enabled';

/**
 * Extracts the content of a tarball, possibly caching it on disk.
 *
 * @param file     is the path to the tarball to be extracted.
 * @param options  are options to pass to `tar.extract`
 * @param comments are included in the cache key, when caching is enabled.
 *
 * @returns the result of the extraction.
 */
export function extract(
  file: string,
  outDir: string,
  options: ExtractOptions,
  ...comments: readonly string[]
): ExtractResult {
  try {
    return (packageCacheEnabled ? extractViaCache : extractToOutDir)(
      file,
      outDir,
      options,
      ...comments,
    );
  } catch (err) {
    rmSync(outDir, { force: true, recursive: true });
    throw err;
  }
}

/** The package cache cannot be used, because of its directory or state. */
export class PackageCacheError extends JsiiFault {
  public readonly cause: unknown;

  public constructor(
    public readonly cacheRoot: string,
    reason: string,
    cause?: unknown,
  ) {
    super(
      `Cannot use the jsii package cache in ${cacheRoot}: ${reason}. ` +
        'Fix the directory, set JSII_RUNTIME_PACKAGE_CACHE_ROOT to a different directory, ' +
        'or disable the package cache with JSII_RUNTIME_PACKAGE_CACHE=disabled.',
    );
    this.cause = cause;
  }
}

/** Wraps errors caused by the tarball, to re-throw them unchanged. */
class ExtractionError extends Error {
  public constructor(public readonly error: unknown) {
    super(describe(error));
    this.name = ExtractionError.name;
  }
}

/**
 * Opens the package cache. A configured `JSII_RUNTIME_PACKAGE_CACHE_ROOT` is
 * used as-is; the default root must be private. Missing directories are
 * created with mode `0700`.
 */
function openCache(): { readonly cache: DiskCache; readonly root: string } {
  // An empty value is treated as unset (it would otherwise resolve to the
  // current working directory).
  const configuredRoot = process.env.JSII_RUNTIME_PACKAGE_CACHE_ROOT;
  const isConfigured = configuredRoot != null && configuredRoot !== '';
  const root = isConfigured ? configuredRoot : defaultCacheRoot();

  try {
    const cache = DiskCache.inDirectory(root, {
      verifyExistingIsPrivate: !isConfigured,
    });
    return { cache, root };
  } catch (error) {
    if (error instanceof InsecureDirectoryError) {
      throw new PackageCacheError(
        root,
        `other users may be able to modify it, because ${error.message}. ` +
          'Make sure the directory and all of its parents are owned by you (or root), ' +
          'and are not writable by group or others',
        error,
      );
    }
    throw new PackageCacheError(root, describe(error), error);
  }
}

/**
 * Extract the tarball into a cached directory, symlink that directory into the target location
 *
 * @throws PackageCacheError if the cache cannot be used.
 */
function extractViaCache(
  file: string,
  outDir: string,
  options: ExtractOptions = {},
  ...comments: readonly string[]
): { cache: 'hit' | 'miss' } {
  const { cache: dirCache, root } = openCache();

  const expectedDigest = digestFile(file, ...comments);
  const entry = dirCache.entry(...comments, expectedDigest.toString('hex'));

  let retrieved: { path: string; cache: 'hit' | 'miss' };
  try {
    retrieved = entry.retrieve((path) => {
      try {
        const actualDigest = untarVerified(
          { ...options, cwd: path, file },
          comments,
        );
        if (!actualDigest.equals(expectedDigest)) {
          throw new Error(
            `${file} was modified while it was being extracted into the package cache`,
          );
        }
      } catch (error) {
        throw new ExtractionError(error);
      }
    });
  } catch (error) {
    if (error instanceof ExtractionError) {
      throw error.error;
    }
    if (error instanceof LockTimeoutError) {
      throw new PackageCacheError(
        root,
        `timed out waiting for another process to release ${error.path}`,
        error,
      );
    }
    throw new PackageCacheError(root, describe(error), error);
  }

  link(retrieved.path, outDir);

  return { cache: retrieved.cache };
}

function describe(error: unknown): string {
  // Not `instanceof Error`: errors may come from another realm (e.g: in tests).
  const message = (error as { message?: unknown } | undefined)?.message;
  return typeof message === 'string' ? message : String(error);
}

/**
 * Extracts the tarball, reading it only once, and returns the digest of the
 * bytes that were actually extracted.
 */
function untarVerified(
  options: tar.TarOptionsWithAliasesAsync & { cwd: string; file: string },
  comments: readonly string[],
): Buffer {
  const { file, ...unpackOptions } = options;
  try {
    let unpackError: Error | undefined;
    const unpack = new tar.UnpackSync(unpackOptions);
    unpack.on('error', (error: Error) => (unpackError ??= error));

    const digest = readFileChunks(
      file,
      (chunk) => {
        unpack.write(chunk);
        if (unpackError != null) {
          throw unpackError;
        }
      },
      ...comments,
    );
    unpack.end();
    if (unpackError != null) {
      throw unpackError;
    }
    return digest;
  } catch (error) {
    rmSync(options.cwd, { force: true, recursive: true });
    throw error;
  }
}

/**
 * Extract directory into the target location
 */
function extractToOutDir(
  file: string,
  cwd: string,
  options: ExtractOptions = {},
): { cache?: undefined } {
  // The output directory must already exist...
  mkdirSync(cwd, { recursive: true });

  // !!!IMPORTANT!!!
  // Extract directly into the final target directory, as certain antivirus
  // software configurations on Windows will make a `renameSync` operation
  // fail with EPERM until the files have been fully analyzed.
  untarInto({ ...options, cwd, file });
  return {};
}

function untarInto(
  options: tar.TarOptionsWithAliasesAsync & { cwd: string; file: string },
) {
  try {
    tar.extract({ ...options, sync: true });
  } catch (error) {
    rmSync(options.cwd, { force: true, recursive: true });
    throw error;
  }
}

/** @internal */
export function getPackageCacheEnabled(): boolean {
  return packageCacheEnabled;
}

/** @internal */
export function setPackageCacheEnabled(value: boolean) {
  packageCacheEnabled = value;
}
