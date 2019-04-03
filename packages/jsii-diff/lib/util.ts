import child_process = require('child_process');
import fs = require('fs-extra');
import log4js = require('log4js');
import os = require('os');
import path = require('path');
import util = require('util');

const LOG = log4js.getLogger('jsii-diff');

const exec = util.promisify(child_process.exec);

export async function inTempDir<T>(block: () => T | Promise<T>): Promise<T> {
  const origDir = process.cwd();
  const tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), 'jsii'));
  process.chdir(tmpDir);
  try {
    return await block();
  } finally {
    process.chdir(origDir);
    await fs.remove(tmpDir);
  }
}

export async function downloadNpmPackage<T>(pkg: string, block: (dir: string) => Promise<T>): Promise<T> {
  return await inTempDir(async () => {
    LOG.info(`Fetching NPM package ${pkg}`);

    // Need to install package and dependencies in order for jsii-reflect
    // to not bork when it can find the dependencies.
    await exec(`npm install --silent --prefix . ${pkg}`);

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

export function flatMap<T, U>(xs: T[], fn: (x: T) => U[]): U[] {
  const ret = new Array<U>();
  for (const x of xs) { ret.push(...fn(x)); }
  return ret;
}