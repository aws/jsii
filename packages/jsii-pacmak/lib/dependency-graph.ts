import * as fs from 'fs-extra';
import { join } from 'path';

import * as util from './util';

/**
 * Traverses the dependency graph and invokes the provided callback method for
 * each individual dependency root directory (including the current package).
 * The dependency roots are de-duplicated based on their absolute path on the
 * file system.
 *
 * @param packageDir the current package's root directory (i.e: where the
 *                   `package.json` file is located)
 * @param callback   the function to invoke with each package's informations
 * @param host       the dependency graph traversal host to use (this parameter
 *                   should typically not be provided unless this module is
 *                   being unit tested)
 */
export async function traverseDependencyGraph(
  packageDir: string,
  callback: Callback,
  host: TraverseDependencyGraphHost = {
    readJson: fs.readJson,
    resolveDependencyDirectory: util.resolveDependencyDirectory,
  },
): Promise<void> {
  return real$traverseDependencyGraph(packageDir, callback, host, new Set());
}

/**
 * A callback invoked for each node in a NPM module's dependency graph.
 *
 * @param packageDir the directory where the current package is located.
 * @param meta       the contents of the `package.json` file for this package.
 * @param root       whether this package is the root that was provided to the
 *                   `traverseDependencyGraph` call.
 *
 * @returns `true` if this package's own dependencies should be processed,
 *          `false` otherwise.
 */
export type Callback = (
  packageDir: string,
  meta: PackageJson,
  root: boolean,
) => boolean | Promise<boolean>;

/**
 * Host methods for traversing dependency graphs.
 */
export interface TraverseDependencyGraphHost {
  readonly readJson: typeof fs.readJson;
  readonly resolveDependencyDirectory: typeof util.resolveDependencyDirectory;
}

/**
 * Contents of the `package.json` file.
 */
export interface PackageJson {
  readonly dependencies?: { readonly [name: string]: string };
  readonly peerDependencies?: { readonly [name: string]: string };

  readonly [key: string]: unknown;
}

async function real$traverseDependencyGraph(
  packageDir: string,
  callback: Callback,
  host: TraverseDependencyGraphHost,
  visited: Set<string>,
): Promise<void> {
  // We're at the root if we have not visited anything yet. How convenient!
  const isRoot = visited.size === 0;
  if (visited.has(packageDir)) {
    return void 0;
  }
  visited.add(packageDir);

  const meta: PackageJson = await host.readJson(
    join(packageDir, 'package.json'),
  );
  if (!(await callback(packageDir, meta, isRoot))) {
    return void 0;
  }

  const deps = new Set([
    ...Object.keys(meta.dependencies ?? {}),
    ...Object.keys(meta.peerDependencies ?? {}),
  ]);
  return Promise.all(
    Array.from(deps).map((dep) => {
      const dependencyDir = host.resolveDependencyDirectory(packageDir, dep);
      return real$traverseDependencyGraph(
        dependencyDir,
        callback,
        host,
        visited,
      );
    }),
    // The following ".then" literally just turns a `Promise<T>` into a `Promise<void>`. Convenient!
  ).then();
}
