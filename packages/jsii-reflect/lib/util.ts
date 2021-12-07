import * as fs from 'fs-extra';
import * as path from 'path';

export function indexBy<T>(xs: T[], f: (x: T) => string): { [key: string]: T } {
  const ret: { [key: string]: T } = {};
  for (const x of xs) {
    ret[f(x)] = x;
  }
  return ret;
}

/**
 * Find the directory that contains a given dependency, identified by its 'package.json', from a starting search directory
 *
 * (This code is duplicated among jsii/jsii-pacmak/jsii-reflect. Changes should be done in all
 * 3 locations, and we should unify these at some point: https://github.com/aws/jsii/issues/3236)
 */
export async function findDependencyDirectory(
  dependencyName: string,
  searchStart: string,
) {
  // Explicitly do not use 'require("dep/package.json")' because that will fail if the
  // package does not export that particular file.
  const entryPoint = require.resolve(dependencyName, {
    paths: [searchStart],
  });

  // Search up from the given directory, looking for a package.json that matches
  // the dependency name (so we don't accidentally find stray 'package.jsons').
  const depPkgJsonPath = await findPackageJsonUp(
    dependencyName,
    path.dirname(entryPoint),
  );

  if (!depPkgJsonPath) {
    throw new Error(
      `Could not find dependency '${dependencyName}' from '${searchStart}'`,
    );
  }

  return depPkgJsonPath;
}

/**
 * Find the package.json for a given package upwards from the given directory
 *
 * (This code is duplicated among jsii/jsii-pacmak/jsii-reflect. Changes should be done in all
 * 3 locations, and we should unify these at some point: https://github.com/aws/jsii/issues/3236)
 */
export async function findPackageJsonUp(
  packageName: string,
  directory: string,
) {
  return findUp(directory, async (dir) => {
    const pjFile = path.join(dir, 'package.json');
    return (
      (await fs.pathExists(pjFile)) &&
      (await fs.readJson(pjFile)).name === packageName
    );
  });
}

/**
 * Find a directory up the tree from a starting directory matching a condition
 *
 * Will return `undefined` if a no directory matches
 *
 * (This code is duplicated among jsii/jsii-pacmak/jsii-reflect. Changes should be done in all
 * 3 locations, and we should unify these at some point: https://github.com/aws/jsii/issues/3236)
 */
export async function findUp(
  directory: string,
  pred: (dir: string) => Promise<boolean>,
): Promise<string | undefined> {
  // eslint-disable-next-line no-constant-condition
  while (true) {
    // eslint-disable-next-line no-await-in-loop
    if (await pred(directory)) {
      return directory;
    }

    const parent = path.dirname(directory);
    if (parent === directory) {
      return undefined;
    }
    directory = parent;
  }
}
