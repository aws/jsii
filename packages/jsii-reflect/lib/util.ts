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
 */
export async function findDependencyDirectory(
  dependencyName: string,
  searchStart: string,
) {
  // Explicitly do not use 'require("dep/package.json")' because that will fail if the
  // package does not export that particular file.

  const packageMain = require.resolve(dependencyName, { paths: [searchStart] });

  // eslint-disable-next-line no-await-in-loop
  const depPkgJsonPath = await findUp(packageMain, 'package.json');
  if (!depPkgJsonPath) {
    throw new Error(
      `Could not find dependency '${dependencyName}' from '${searchStart}'`,
    );
  }
  return path.dirname(depPkgJsonPath);
}

/**
 * Find a file up the tree given a starting directory
 *
 * Will return `undefined` if a package.json could not be found.
 */
export async function findUp(
  directory: string,
  fileName: string,
): Promise<string | undefined> {
  // eslint-disable-next-line no-constant-condition
  while (true) {
    const candidatePath = path.join(directory, fileName);
    // eslint-disable-next-line no-await-in-loop
    if (await fs.pathExists(candidatePath)) {
      return candidatePath;
    }

    const parent = path.dirname(directory);
    if (parent === directory) {
      return undefined;
    }
    directory = parent;
  }
}
