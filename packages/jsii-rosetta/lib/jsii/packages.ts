import * as fs from 'fs';
import * as path from 'path';

/**
 * Resolve a package name in an example to a JSII assembly
 *
 * We assume we've changed directory to the directory where we need to resolve from.
 */
export function resolvePackage(packageName: string) {
  try {
    const resolved = require.resolve(`${packageName}/package.json`, {
      paths: [process.cwd()],
    });
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    return require(resolved);
  } catch {
    return undefined;
  }
}

/**
 * Find an enclosing package.json file given a filename
 *
 * Will return `undefined` if a package.json could not be found.
 */
export function findPackageJson(fileName: string) {
  // eslint-disable-next-line no-constant-condition
  while (true) {
    const candidatePath = path.join(fileName, 'package.json');
    if (fs.existsSync(candidatePath)) {
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      return require(path.resolve(candidatePath));
    }

    const parent = path.dirname(fileName);
    if (parent === fileName) {
      return undefined;
    }
    fileName = parent;
  }
}

export function jsiiTargetParam(packageName: string, field: string) {
  const pkgJson = resolvePackage(packageName);

  const path = ['jsii', 'targets', ...field.split('.')];
  let r = pkgJson;
  while (path.length > 0 && typeof r === 'object' && r !== null) {
    r = r[path.splice(0, 1)[0]];
  }
  return r;
}
