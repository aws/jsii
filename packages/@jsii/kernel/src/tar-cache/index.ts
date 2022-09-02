import { mkdirSync, mkdtempSync, renameSync, rmSync } from 'fs';
import { tmpdir } from 'os';
import { join } from 'path';
import * as tar from 'tar';

import { DiskCache } from '../disk-cache';
import { defaultCacheRoot } from './default-cache-root';

export type ExtractOptions = Omit<
  tar.ExtractOptions & tar.FileOptions,
  'file' | 'cwd'
>;

export interface ExtractResult {
  /**
   * The path in which the extracted files are located
   */
  readonly path: string;

  /**
   * When `'hit'`, the data was already present in cache and was returned from
   * cache.
   *
   * When `'miss'`, the data was extracted into the caache and returned from
   * cache.
   *
   * When `undefined`, the cache is not enabled.
   */
  readonly cache?: 'hit' | 'miss';
}

let packageCacheEnabled =
  process.env.JSII_RUNTIME_PACKAGE_CACHE?.toLocaleUpperCase() === 'enabled';

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
  options: ExtractOptions,
  ...comments: readonly string[]
): ExtractResult {
  return (packageCacheEnabled ? extractToCache : extractToTemporary)(
    file,
    options,
    ...comments,
  );
}

function extractToCache(
  file: string,
  options: ExtractOptions = {},
  ...comments: readonly string[]
): { path: string; cache: 'hit' | 'miss' } {
  const cacheRoot =
    process.env.JSII_RUNTIME_PACKAGE_CACHE_ROOT ?? defaultCacheRoot();
  const cache = DiskCache.inDirectory(cacheRoot);

  const entry = cache.entryFor(file, ...comments);
  return entry.lock((lock) => {
    let cache: 'hit' | 'miss' = 'hit';
    if (!entry.pathExists) {
      const tmpPath = `${entry.path}.tmp`;
      mkdirSync(tmpPath, { recursive: true });
      try {
        untarInto({
          ...options,
          cwd: tmpPath,
          file,
        });
        renameSync(tmpPath, entry.path);
      } catch (error) {
        rmSync(entry.path, { force: true, recursive: true });
        throw error;
      }
      cache = 'miss';
    }
    lock.touch();
    return { path: entry.path, cache };
  });
}

function extractToTemporary(
  file: string,
  options: ExtractOptions = {},
): { path: string } {
  const path = mkdtempSync(join(tmpdir(), 'jsii-runtime-untar-'));

  untarInto({ ...options, cwd: path, file });

  return { path };
}

function untarInto(
  options: tar.ExtractOptions & tar.FileOptions & { cwd: string },
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
