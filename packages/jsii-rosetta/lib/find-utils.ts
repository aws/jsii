import * as fs from 'fs-extra';
import * as path from 'path';

/**
 * Find the directory that contains a given dependency, identified by its 'package.json', from a starting search directory
 *
 * (This code is duplicated among jsii/jsii-pacmak/jsii-reflect. Changes should be done in all
 * 3 locations, and we should unify these at some point: https://github.com/aws/jsii/issues/3236)
 */
export async function findDependencyDirectory(dependencyName: string, searchStart: string) {
  // Explicitly do not use 'require("dep/package.json")' because that will fail if the
  // package does not export that particular file.
  const entryPoint = require.resolve(dependencyName, {
    paths: [searchStart],
  });

  // Search up from the given directory, looking for a package.json that matches
  // the dependency name (so we don't accidentally find stray 'package.jsons').
  const depPkgJsonPath = await findPackageJsonUp(dependencyName, path.dirname(entryPoint));

  if (!depPkgJsonPath) {
    throw new Error(`Could not find dependency '${dependencyName}' from '${searchStart}'`);
  }

  return depPkgJsonPath;
}

/**
 * Find the package.json for a given package upwards from the given directory
 *
 * (This code is duplicated among jsii/jsii-pacmak/jsii-reflect. Changes should be done in all
 * 3 locations, and we should unify these at some point: https://github.com/aws/jsii/issues/3236)
 */
export async function findPackageJsonUp(packageName: string, directory: string) {
  return findUp(directory, async (dir) => {
    const pjFile = path.join(dir, 'package.json');
    return (await fs.pathExists(pjFile)) && (await fs.readJson(pjFile)).name === packageName;
  });
}

/**
 * Find a directory up the tree from a starting directory matching a condition
 *
 * Will return `undefined` if no directory matches
 *
 * (This code is duplicated among jsii/jsii-pacmak/jsii-reflect. Changes should be done in all
 * 3 locations, and we should unify these at some point: https://github.com/aws/jsii/issues/3236)
 */
export function findUp(directory: string, pred: (dir: string) => Promise<boolean>): Promise<string | undefined>;
export function findUp(directory: string, pred: (dir: string) => boolean): string | undefined;
// eslint-disable-next-line @typescript-eslint/promise-function-async
export function findUp(
  directory: string,
  pred: (dir: string) => boolean | Promise<boolean>,
): Promise<string | undefined> | string | undefined {
  const result = pred(directory);
  if (result instanceof Promise) {
    return result.then((thisDirectory) => (thisDirectory ? directory : recurse()));
  }

  return result ? directory : recurse();

  function recurse() {
    const parent = path.dirname(directory);
    if (parent === directory) {
      return undefined;
    }
    return findUp(parent, pred as any);
  }
}

/**
 * Whether the given dependency is a built-in
 *
 * Some dependencies that occur in `package.json` are also built-ins in modern Node
 * versions (most egregious example: 'punycode'). Detect those and filter them out.
 */
export function isBuiltinModule(depName: string) {
  // eslint-disable-next-line @typescript-eslint/no-require-imports,@typescript-eslint/no-var-requires
  const { builtinModules } = require('module');
  return (builtinModules ?? []).includes(depName);
}
