import child_process = require('child_process');
import fs = require('fs-extra');
import log4js = require('log4js');
import os = require('os');
import path = require('path');
import tar = require('tar-fs');
import util = require('util');

const LOG = log4js.getLogger('jsii-diff');

const exec = util.promisify(child_process.exec);

export async function inTempDir<T>(block: () => Promise<T>): Promise<T> {
  const origDir = process.cwd();
  const tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), 'jsii'));
  process.chdir(tmpDir);
  const ret = await block();
  process.chdir(origDir);
  await fs.remove(tmpDir);
  return ret;
}

export async function downloadNpmPackage<T>(pkg: string, block: (dir: string) => Promise<T>): Promise<T> {
  return await inTempDir(async () => {
    LOG.info(`Fetching NPM package ${pkg}`);

    // Need to install package and dependencies in order for jsii-reflect
    // to not bork when it can find the dependencies.
    await exec(`npm install --silent --prefix . ${pkg}`);

    // NPM packages always extract to a subdirectory 'package'
    const pkgDir = trimVersionString(pkg);
    return await block(path.join(process.cwd(), 'node_modules', pkgDir));
 });
}

/**
 * Trim an optional version string from an NPM package name
 */
function trimVersionString(pkg: string) {
  // The arbitrary char before the @ prevents matching a @ at the start of the
  // string.
  return pkg.replace(/(.)@.*$/, '$1');
}

export async function downloadTarballOnly(pkg: string) {
    const proc = await exec(`npm pack --silent ${pkg}`);
    const fileName = proc.stdout.trim();
    const stream: NodeJS.WritableStream = fs.createReadStream(fileName)
        .pipe(require('gunzip-maybe')())
        .pipe(tar.extract(process.cwd()));
    await waitForStream(stream);

    // NPM packages always extract to a subdirectory 'package'
    return path.join(process.cwd(), 'package');
}

function waitForStream(stream: NodeJS.WritableStream): Promise<void> {
  return new Promise(async (resolve, reject) => {
    stream.on('error', reject);
    stream.on('finish', resolve);
  });
}

export function flatMap<T, U>(xs: T[], fn: (x: T) => U[]): U[] {
  const ret = new Array<U>();
  for (const x of xs) { ret.push(...fn(x)); }
  return ret;
}