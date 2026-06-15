import { SPEC_FILE_NAME, isAssemblyRedirect } from '@jsii/spec';
import { mkdirSync, readFileSync, rmSync, writeFileSync } from 'fs';
import { join } from 'path';
import * as tar from 'tar';
import { gunzipSync } from 'zlib';

import { DiskCache } from '../disk-cache';
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

/**
 * Extract the tarball into a cached directory, symlink that directory into the target location
 */
function extractViaCache(
  file: string,
  outDir: string,
  options: ExtractOptions = {},
  ...comments: readonly string[]
): { cache: 'hit' | 'miss' } {
  const cacheRoot =
    process.env.JSII_RUNTIME_PACKAGE_CACHE_ROOT ?? defaultCacheRoot();
  const dirCache = DiskCache.inDirectory(cacheRoot);

  const entry = dirCache.entryFor(file, ...comments);
  const { path, cache } = entry.retrieve((path) => {
    untarInto({
      ...options,
      cwd: path,
      file,
    });
    // Resolve a (gzipped) assembly redirect once, at cache-population time, so
    // that every subsequent load of this cached package reads the assembly
    // directly instead of paying decompression on each load.
    inlineAssemblyRedirect(path);
  });

  link(path, outDir);

  return { cache };
}

/**
 * If the freshly-extracted package's assembly file ({@link SPEC_FILE_NAME}) is
 * a redirect to a (possibly compressed) file, resolve it in place: replace the
 * redirect with the decompressed assembly contents. This is done once, while
 * populating the cache, so that loading a cached package never has to gunzip
 * the assembly again.
 *
 * Any failure here is non-fatal: the redirect is left untouched and the
 * assembly loader resolves it as usual.
 */
function inlineAssemblyRedirect(dir: string): void {
  const specPath = join(dir, SPEC_FILE_NAME);

  let contents: unknown;
  try {
    contents = JSON.parse(readFileSync(specPath, 'utf-8'));
  } catch {
    return;
  }

  if (!isAssemblyRedirect(contents)) {
    return;
  }

  try {
    const raw = readFileSync(join(dir, contents.filename));
    const resolved = contents.compression === 'gzip' ? gunzipSync(raw) : raw;
    writeFileSync(specPath, resolved);
  } catch {
    // Leave the redirect in place; the loader will handle it.
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
