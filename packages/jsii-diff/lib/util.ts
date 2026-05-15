import * as childProcess from 'child_process';
import * as fs from 'fs-extra';
import * as log4js from 'log4js';
import * as os from 'os';
import * as path from 'path';
import * as util from 'util';

const LOG = log4js.getLogger('jsii-diff');

const exec = util.promisify(childProcess.exec);

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

export type DownloadFailure = 'no_such_package';

export type NpmDownloadResult<T> =
  | { success: true; result: T }
  | { success: false; reason: DownloadFailure };

export function showDownloadFailure(f: DownloadFailure) {
  switch (f) {
    case 'no_such_package':
      return 'NPM package does not exist';
    default:
      return undefined;
  }
}

export async function downloadNpmPackage<T>(
  pkg: string,
  block: (dir: string) => Promise<T>,
): Promise<NpmDownloadResult<T>> {
  validateValidPackageSpecifier(pkg);

  return inTempDir(async () => {
    LOG.info(`Fetching NPM package ${pkg}`);

    try {
      // Need to install package and dependencies in order for jsii-reflect
      // to not bork when it can find the dependencies.
      //
      // This executes the shell, which is necessary: on Windows, npm is a .cmd file,
      // and only the shell and execute .bat/.cmd files. We have validated the package
      // name already to make sure it contains only safe characters.
      await exec(`npm install --silent --prefix . ${pkg}`);
    } catch (e: any) {
      // If this fails, might be because the package doesn't exist
      if (!isSubprocesFailedError(e)) {
        throw e;
      }
      if (await npmPackageExists(pkg)) {
        throw new Error(`NPM fetch failed: ${e}. Please try again.`);
      }
      LOG.warn(`NPM package ${pkg} does not exist.`);
      return {
        success: false,
        reason: 'no_such_package',
      } as NpmDownloadResult<T>;
    }

    const pkgDir = trimVersionString(pkg);
    return {
      success: true,
      result: await block(path.join(process.cwd(), 'node_modules', pkgDir)),
    } as NpmDownloadResult<T>;
  });
}

function isSubprocesFailedError(e: any) {
  return e.code !== undefined && e.cmd !== undefined;
}

async function npmPackageExists(pkg: string): Promise<boolean> {
  try {
    LOG.info(`Checking existence of ${pkg}`);
    // This executes the shell, which is necessary: on Windows, npm is a .cmd file,
    // and only the shell and execute .bat/.cmd files. We have validated the package
    // name already to make sure it contains only safe characters.
    await exec(`npm show --silent ${pkg}`);
    return true;
  } catch (e) {
    if (!isSubprocesFailedError(e)) {
      throw e;
    }
    return false;
  }
}

/**
 * Trim an optional version string from an NPM package name
 */
function trimVersionString(pkg: string) {
  // The arbitrary char before the @ prevents matching a @ at the start of the
  // string.
  return pkg.replace(/(.)@.*$/, '$1');
}

/**
 * Validate a package name against a list of allowed characters
 *
 * If we are too strict here, that's not a biggy: script writers are always
 * able to download their exotically-named NPM package themselves before running
 * jsii-diff on it.
 */
function validateValidPackageSpecifier(pkg: string) {
  if (pkg.match(/[^a-z0-9@\/._-]/i)) {
    throw new Error(`Invalid package name, only 'a-z0-9@/._-' are allowed: ${JSON.stringify(pkg)}`);
  }
}

export function flatMap<T, U>(xs: T[], fn: (x: T) => U[]): U[] {
  const ret = new Array<U>();
  for (const x of xs) {
    ret.push(...fn(x));
  }
  return ret;
}

/**
 * Don't recurse infinitely by guarding a block with `do()`.
 */
export class RecursionBreaker<A> {
  private readonly elements = new Set<A>();

  public do(key: A, block: () => void) {
    if (this.elements.has(key)) {
      return;
    }

    this.elements.add(key);
    try {
      block();
    } finally {
      this.elements.delete(key);
    }
  }
}
