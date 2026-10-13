import { mkdirSync, rmSync } from 'fs';
import * as tar from 'tar';

import {
  digestFile,
  DiskCache,
  InsecureDirectoryError,
  LockTimeoutError,
  readFileChunks,
} from '../disk-cache';
import { link } from '../link';
import { defaultCacheRoot, fallbackCacheRoot } from './default-cache-root';

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

/**
 * Cache roots that were found to be unusable, so the warning is only emitted
 * once per root.
 */
const unusableCacheRoots = new Set<string>();

/**
 * Opens the package cache, or returns `undefined` if it cannot be used.
 *
 * A root that is explicitly configured with `JSII_RUNTIME_PACKAGE_CACHE_ROOT`
 * is never rejected: the environment is trusted, and the user may intend to
 * share the cache. It is still created with private permissions if it does
 * not exist.
 *
 * Otherwise, the default cache root is used, or the fallback cache root if the
 * user has no home directory. Either must be private to the current user. If
 * the default root is not, the fallback root is used instead. If neither is,
 * packages are extracted without caching.
 */
function openCache(): DiskCache | undefined {
  // An empty value is treated as unset (it would otherwise resolve to the
  // current working directory).
  const configuredRoot = process.env.JSII_RUNTIME_PACKAGE_CACHE_ROOT;
  if (configuredRoot != null && configuredRoot !== '') {
    return DiskCache.inDirectory(configuredRoot, { verifyPrivate: false });
  }

  const candidates = [defaultCacheRoot(), fallbackCacheRoot()].filter(
    (root): root is string => root != null && !unusableCacheRoots.has(root),
  );
  for (const [index, cacheRoot] of candidates.entries()) {
    try {
      return DiskCache.inDirectory(cacheRoot, { verifyPrivate: true });
    } catch (error: any) {
      if (!(error instanceof InsecureDirectoryError)) {
        throw error;
      }
      unusableCacheRoots.add(cacheRoot);
      const next = candidates[index + 1];
      console.error(
        `[@jsii/kernel] WARNING: not using the package cache in ${cacheRoot}, because ${error.message}. ` +
          `Other users could modify the cached packages. ${
            next != null
              ? `Using ${next} instead. `
              : 'Packages are extracted without caching instead, which is slower. '
          }Make sure the directory and all of its parents are owned by you (or root) and are not ` +
          `writable by group or others, or set JSII_RUNTIME_PACKAGE_CACHE_ROOT to another directory.`,
      );
    }
  }
  return undefined;
}

/**
 * Extract the tarball into a cached directory, symlink that directory into the target location
 */
function extractViaCache(
  file: string,
  outDir: string,
  options: ExtractOptions = {},
  ...comments: readonly string[]
): { cache?: 'hit' | 'miss' } {
  const dirCache = openCache();
  if (dirCache == null) {
    return extractToOutDir(file, outDir, options);
  }

  const expectedDigest = digestFile(file, ...comments);
  const entry = dirCache.entry(...comments, expectedDigest.toString('hex'));
  let retrieved: { path: string; cache: 'hit' | 'miss' };
  try {
    retrieved = entry.retrieve((path) => {
      const actualDigest = untarVerified(
        { ...options, cwd: path, file },
        comments,
      );
      if (!actualDigest.equals(expectedDigest)) {
        throw new Error(
          `${file} was modified while it was being extracted into the package cache`,
        );
      }
    });
  } catch (error) {
    if (!(error instanceof LockTimeoutError)) {
      throw error;
    }
    // Another process has been populating this entry for a long time. Don't
    // fail the load because of the cache, extract without it instead.
    return extractToOutDir(file, outDir, options);
  }

  link(retrieved.path, outDir);

  return { cache: retrieved.cache };
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
