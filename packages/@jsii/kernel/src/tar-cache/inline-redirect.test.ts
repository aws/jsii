import { SPEC_FILE_NAME, isAssemblyRedirect } from '@jsii/spec';
import {
  mkdirSync,
  mkdtempSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from 'fs';
import { tmpdir } from 'os';
import { join } from 'path';
import * as tar from 'tar';
import { gzipSync } from 'zlib';

import {
  extract,
  getPackageCacheEnabled,
  setPackageCacheEnabled,
} from './index';

describe('extract resolves assembly redirects while populating the cache', () => {
  let workdir: string;
  let previousCacheRoot: string | undefined;
  let previousCacheEnabled: boolean;

  beforeEach(() => {
    workdir = mkdtempSync(join(tmpdir(), 'jsii-tar-cache-test-'));
    previousCacheRoot = process.env.JSII_RUNTIME_PACKAGE_CACHE_ROOT;
    process.env.JSII_RUNTIME_PACKAGE_CACHE_ROOT = join(workdir, 'cache');
    previousCacheEnabled = getPackageCacheEnabled();
    setPackageCacheEnabled(true);
  });

  afterEach(() => {
    setPackageCacheEnabled(previousCacheEnabled);
    if (previousCacheRoot == null) {
      delete process.env.JSII_RUNTIME_PACKAGE_CACHE_ROOT;
    } else {
      process.env.JSII_RUNTIME_PACKAGE_CACHE_ROOT = previousCacheRoot;
    }
    rmSync(workdir, { recursive: true, force: true });
  });

  test('a gzip assembly redirect is decompressed in place so loads read it directly', () => {
    const assembly = {
      schema: 'jsii/0.10.0',
      name: 'test-pkg',
      version: '1.0.0',
      types: {},
      marker: 'decompressed-content',
    };

    // Build a package whose `.jsii` is a gzip redirect to a `.jsii.gz` file,
    // mirroring how large assemblies (e.g. aws-cdk-lib) are published.
    const sourceRoot = join(workdir, 'src');
    const packageDir = join(sourceRoot, 'package');
    mkdirSync(packageDir, { recursive: true });
    writeFileSync(
      join(packageDir, `${SPEC_FILE_NAME}.gz`),
      gzipSync(Buffer.from(JSON.stringify(assembly))),
    );
    writeFileSync(
      join(packageDir, SPEC_FILE_NAME),
      JSON.stringify({
        schema: 'jsii/file-redirect',
        compression: 'gzip',
        filename: `${SPEC_FILE_NAME}.gz`,
      }),
    );

    const tarball = join(workdir, 'pkg.tgz');
    tar.create({ file: tarball, cwd: sourceRoot, sync: true, gzip: true }, [
      'package',
    ]);

    const outDir = join(workdir, 'out');
    extract(tarball, outDir, { strict: true, strip: 1 }, 'test-pkg', '1.0.0');

    // The assembly file in the (cached) extraction must now be the resolved
    // assembly itself, not a redirect -- so loading never has to decompress it.
    const contents = JSON.parse(
      readFileSync(join(outDir, SPEC_FILE_NAME), 'utf-8'),
    );
    expect(isAssemblyRedirect(contents)).toBe(false);
    expect(contents).toEqual(assembly);
  });
});
