import * as cp from 'child_process';
import * as fastGlob from 'fast-glob';
import * as fs from 'fs-extra';
import * as os from 'os';
import * as path from 'path';
import * as semver from 'semver';
import { intersect } from 'semver-intersect';

import { findDependencyDirectory, findUp } from './find-utils';
import * as logging from './logging';
import { TypeScriptSnippet, CompilationDependency } from './snippet';
import { mkDict, formatList } from './util';

/**
 * Collect the dependencies of a bunch of snippets together in one declaration
 *
 * We assume here the dependencies will not conflict.
 */
export function collectDependencies(snippets: TypeScriptSnippet[]) {
  const ret: Record<string, CompilationDependency> = {};
  for (const snippet of snippets) {
    for (const [name, source] of Object.entries(snippet.compilationDependencies ?? {})) {
      ret[name] = resolveConflict(name, source, ret[name]);
    }
  }
  return ret;
}

function resolveConflict(
  name: string,
  a: CompilationDependency,
  b: CompilationDependency | undefined,
): CompilationDependency {
  if (!b) {
    return a;
  }

  if (a.type === 'concrete' && b.type === 'concrete') {
    if (b.resolvedDirectory !== a.resolvedDirectory) {
      throw new Error(`Dependency conflict: ${name} can be either ${a.resolvedDirectory} or ${b.resolvedDirectory}`);
    }
    return a;
  }

  if (a.type === 'symbolic' && b.type === 'symbolic') {
    // Intersect the ranges
    return {
      type: 'symbolic',
      versionRange: intersect(a.versionRange, b.versionRange),
    };
  }

  if (a.type === 'concrete' && b.type === 'symbolic') {
    const concreteVersion: string = fs.readJsonSync(path.join(a.resolvedDirectory, 'package.json')).version;

    if (!semver.satisfies(concreteVersion, b.versionRange)) {
      throw new Error(
        `Dependency conflict: ${name} expected to match ${b.versionRange} but found ${concreteVersion} at ${a.resolvedDirectory}`,
      );
    }

    return a;
  }

  if (a.type === 'symbolic' && b.type === 'concrete') {
    // Reverse roles so we fall into the previous case
    return resolveConflict(name, b, a);
  }

  throw new Error('Cases should have been exhaustive');
}

/**
 * Check that the directory we were given has all the necessary dependencies in it
 *
 * It's a warning if this is not true, not an error.
 */
export async function validateAvailableDependencies(directory: string, deps: Record<string, CompilationDependency>) {
  const failures = await Promise.all(
    Object.entries(deps).flatMap(async ([name, _dep]) => {
      try {
        await findDependencyDirectory(name, directory);
        return [];
      } catch {
        return [name];
      }
    }),
  );

  if (failures.length > 0) {
    logging.warn(
      `${directory}: packages necessary to compile examples missing from supplied directory: ${failures.join(', ')}`,
    );
  }
}

/**
 * Prepare a temporary directory with symlinks to all the dependencies we need.
 *
 * - Symlinks the concrete dependencies
 * - Tries to first find the symbolic dependencies in a potential monorepo that might be present
 *   (try both `lerna` and `yarn` monorepos).
 * - Installs the remaining symbolic dependencies using 'npm'.
 */
export async function prepareDependencyDirectory(deps: Record<string, CompilationDependency>): Promise<string> {
  const concreteDirs = Object.values(deps)
    .filter(isConcrete)
    .map((x) => x.resolvedDirectory);
  const monorepoPackages = await scanMonoRepos(concreteDirs);

  const tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), 'rosetta'));
  logging.info(`Preparing dependency closure at ${tmpDir}`);

  // Resolved symbolic packages against monorepo
  const resolvedDeps = mkDict(
    Object.entries(deps).map(([name, dep]) => [
      name,
      dep.type === 'concrete'
        ? dep
        : ((monorepoPackages[name]
            ? { type: 'concrete', resolvedDirectory: monorepoPackages[name] }
            : dep) as CompilationDependency),
    ]),
  );

  // Use 'npm install' only for the symbolic packages. For the concrete packages,
  // npm is going to try and find transitive dependencies as well and it won't know
  // about monorepos.
  const symbolicInstalls = Object.entries(resolvedDeps).flatMap(([name, dep]) =>
    isSymbolic(dep) ? [`${name}@${dep.versionRange}`] : [],
  );
  const linkedInstalls = mkDict(
    Object.entries(resolvedDeps).flatMap(([name, dep]) =>
      isConcrete(dep) ? [[name, dep.resolvedDirectory] as const] : [],
    ),
  );

  // Run 'npm install' on it
  if (symbolicInstalls.length > 0) {
    logging.debug(`Installing example dependencies: ${symbolicInstalls.join(' ')}`);
    cp.execSync(`npm install ${symbolicInstalls.join(' ')}`, { cwd: tmpDir, encoding: 'utf-8' });
  }

  // Symlink the rest
  if (Object.keys(linkedInstalls).length > 0) {
    logging.debug(`Symlinking example dependencies: ${Object.values(linkedInstalls).join(' ')}`);
    const modDir = path.join(tmpDir, 'node_modules');
    await Promise.all(
      Object.entries(linkedInstalls).map(async ([name, source]) => {
        const target = path.join(modDir, name);
        if (!(await fs.pathExists(target))) {
          // Package could be namespaced, so ensure the namespace dir exists
          await fs.mkdirp(path.dirname(target));
          await fs.symlink(source, target, 'dir');
        }
      }),
    );
  }

  return tmpDir;
}

/**
 * Map package name to directory
 */
async function scanMonoRepos(startingDirs: readonly string[]): Promise<Record<string, string>> {
  const globs = new Set<string>();
  for (const dir of startingDirs) {
    // eslint-disable-next-line no-await-in-loop
    setExtend(globs, await findMonoRepoGlobs(dir));
  }

  if (globs.size === 0) {
    return {};
  }

  logging.debug(`Monorepo package sources: ${Array.from(globs).join(', ')}`);

  const packageDirectories = await fastGlob(Array.from(globs).map(windowsToUnix), { onlyDirectories: true });
  const results = mkDict(
    (
      await Promise.all(
        packageDirectories.map(async (directory) => {
          const pjLocation = path.join(directory, 'package.json');
          return (await fs.pathExists(pjLocation))
            ? [[(await fs.readJson(pjLocation)).name as string, directory] as const]
            : [];
        }),
      )
    ).flat(),
  );

  logging.debug(`Found ${Object.keys(results).length} packages in monorepo: ${formatList(Object.keys(results))}`);
  return results;
}

async function findMonoRepoGlobs(startingDir: string): Promise<Set<string>> {
  const ret = new Set<string>();

  // Lerna monorepo
  const lernaJsonDir = await findUp(startingDir, async (dir) => fs.pathExists(path.join(dir, 'lerna.json')));
  if (lernaJsonDir) {
    const lernaJson = await fs.readJson(path.join(lernaJsonDir, 'lerna.json'));
    for (const glob of lernaJson?.packages ?? []) {
      ret.add(path.join(lernaJsonDir, glob));
    }
  }

  // Yarn monorepo
  const yarnWsDir = await findUp(
    startingDir,
    async (dir) =>
      (await fs.pathExists(path.join(dir, 'package.json'))) &&
      (await fs.readJson(path.join(dir, 'package.json')))?.workspaces !== undefined,
  );
  if (yarnWsDir) {
    const yarnWs = await fs.readJson(path.join(yarnWsDir, 'package.json'));
    for (const glob of yarnWs.workspaces?.packages ?? []) {
      ret.add(path.join(yarnWsDir, glob));
    }
  }

  return ret;
}

function isSymbolic(x: CompilationDependency): x is Extract<CompilationDependency, { type: 'symbolic' }> {
  return x.type === 'symbolic';
}

function isConcrete(x: CompilationDependency): x is Extract<CompilationDependency, { type: 'concrete' }> {
  return x.type === 'concrete';
}

function setExtend<A>(xs: Set<A>, ys: Set<A>) {
  for (const y of ys) {
    xs.add(y);
  }
  return xs;
}

/**
 * Necessary for fastGlob
 */
function windowsToUnix(x: string) {
  return x.replace(/\\/g, '/');
}
