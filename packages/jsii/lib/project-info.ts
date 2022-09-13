import * as spec from '@jsii/spec';
import { findAssemblyFile, loadAssemblyFromFile } from '@jsii/spec';
import * as fs from 'fs-extra';
import * as log4js from 'log4js';
import * as path from 'path';
import * as semver from 'semver';
import * as ts from 'typescript';

import { JsiiDiagnostic } from './jsii-diagnostic';
import { parsePerson, parseRepository, findDependencyDirectory } from './utils';

// eslint-disable-next-line @typescript-eslint/no-var-requires, @typescript-eslint/no-require-imports
const spdx: Set<string> = require('spdx-license-list/simple');

const LOG = log4js.getLogger('jsii/package-info');

export type TSCompilerOptions = Partial<
  Pick<
    ts.CompilerOptions,
    // Directory preferences
    | 'outDir'
    | 'rootDir'
    // TypeScript path mapping
    | 'baseUrl'
    | 'paths'
    // Style preferences
    | 'forceConsistentCasingInFileNames'
    // Source map preferences
    | 'declarationMap'
    | 'inlineSourceMap'
    | 'inlineSources'
    | 'sourceMap'
    // Types limitations
    | 'types'
  >
>;

export interface ProjectInfo {
  readonly projectRoot: string;
  readonly packageJson: any;

  readonly name: string;
  readonly version: string;
  readonly author: spec.Person;
  readonly deprecated?: string;
  readonly stability?: spec.Stability;
  readonly license: string;
  readonly repository: {
    readonly type: string;
    readonly url: string;
    readonly directory?: string;
  };
  readonly keywords?: string[];

  readonly main: string;
  readonly types: string;

  readonly dependencies: { readonly [name: string]: string };
  readonly peerDependencies: { readonly [name: string]: string };
  readonly dependencyClosure: readonly spec.Assembly[];
  readonly bundleDependencies?: { readonly [name: string]: string };
  readonly targets: spec.AssemblyTargets;
  readonly metadata?: { [key: string]: any };
  readonly jsiiVersionFormat: 'short' | 'full';
  readonly diagnostics?: { readonly [code: string]: ts.DiagnosticCategory };
  readonly description?: string;
  readonly homepage?: string;
  readonly contributors?: readonly spec.Person[];
  readonly excludeTypescript: string[];
  readonly projectReferences?: boolean;
  readonly tsc?: TSCompilerOptions;
  readonly bin?: { readonly [name: string]: string };
  readonly exports?: {
    readonly [name: string]: string | { readonly [name: string]: string };
  };
}

export interface ProjectInfoResult {
  readonly projectInfo: ProjectInfo;
  readonly diagnostics: readonly ts.Diagnostic[];
}

export function loadProjectInfo(projectRoot: string): ProjectInfoResult {
  const packageJsonPath = path.join(projectRoot, 'package.json');
  // eslint-disable-next-line @typescript-eslint/no-var-requires,@typescript-eslint/no-require-imports
  const pkg = fs.readJsonSync(packageJsonPath);

  const diagnostics: ts.Diagnostic[] = [];

  let bundleDependencies: { [name: string]: string } | undefined;
  for (const name of pkg.bundleDependencies ?? pkg.bundledDependencies ?? []) {
    const version = pkg.dependencies?.[name];
    if (!version) {
      throw new Error(
        `The "package.json" file has "${name}" in "bundleDependencies", but it is not declared in "dependencies"`,
      );
    }

    if (pkg.peerDependencies && name in pkg.peerDependencies) {
      throw new Error(
        `The "package.json" file has "${name}" in "bundleDependencies", and also in "peerDependencies"`,
      );
    }

    bundleDependencies = bundleDependencies ?? {};
    bundleDependencies[name] = _resolveVersion(version, projectRoot).version;
  }

  // Check peerDependencies are also in devDependencies
  // You need this to write tests properly. There are probably cases where
  // it makes sense to have this different, so most of what this checking
  // produces is warnings, not errors.
  const devDependencies = pkg.devDependencies ?? {};
  for (const [name, rng] of Object.entries(pkg.peerDependencies ?? {})) {
    const range = new semver.Range(
      _resolveVersion(rng as string, projectRoot).version,
    );
    const minVersion = semver.minVersion(range)?.raw;

    if (
      !(name in devDependencies) ||
      devDependencies[name] !== `${minVersion}`
    ) {
      diagnostics.push(
        JsiiDiagnostic.JSII_0006_MISSING_DEV_DEPENDENCY.createDetached(
          name,
          `${rng as any}`,
          `${minVersion}`,
          `${devDependencies[name]}`,
        ),
      );
      continue;
    }
  }

  const bundled = new Set(Object.keys(bundleDependencies ?? {}));
  const dependencies: Record<string, string> = filterDictByKey(
    pkg.dependencies ?? {},
    (depName) => !bundled.has(depName),
  );
  const peerDependencies: Record<string, string> = pkg.peerDependencies ?? {};

  const resolver = new DependencyResolver();
  const resolved = resolver.discoverDependencyTree(projectRoot, {
    ...dependencies,
    ...peerDependencies,
  });
  const transitiveDependencies = resolver.assemblyClosure(resolved);

  const metadata = mergeMetadata(
    {
      jsii: {
        pacmak: {
          // When `true`, `jsii-pacmak` will use the `Jsii$Default` implementation in code generation even for dependencies.
          hasDefaultInterfaces: true,
        },
      },
    },
    pkg.jsii?.metadata,
  );

  const projectInfo = {
    projectRoot,
    packageJson: pkg,

    name: _required(
      pkg.name,
      'The "package.json" file must specify the "name" attribute',
    ),
    version: _required(
      pkg.version,
      'The "package.json" file must specify the "version" attribute',
    ),
    deprecated: pkg.deprecated,
    stability: _validateStability(pkg.stability, pkg.deprecated),
    author: _toPerson(
      _required(
        pkg.author,
        'The "package.json" file must specify the "author" attribute',
      ),
      'author',
    ),
    repository: _toRepository(
      _required(
        pkg.repository,
        'The "package.json" file must specify the "repository" attribute',
      ),
    ),
    license: _validateLicense(pkg.license),
    keywords: pkg.keywords,

    main: _required(
      pkg.main,
      'The "package.json" file must specify the "main" attribute',
    ),
    types: _required(
      pkg.types,
      'The "package.json" file must specify the "types" attribute',
    ),

    dependencies,
    peerDependencies,
    dependencyClosure: transitiveDependencies,
    bundleDependencies,
    targets: {
      ..._required(
        pkg.jsii,
        'The "package.json" file must specify the "jsii" attribute',
      ).targets,
      js: { npm: pkg.name },
    },
    metadata,
    jsiiVersionFormat: _validateVersionFormat(pkg.jsii.versionFormat ?? 'full'),

    description: pkg.description,
    homepage: pkg.homepage,
    contributors: (pkg.contributors as any[])?.map((contrib, index) =>
      _toPerson(contrib, `contributors[${index}]`, 'contributor'),
    ),

    excludeTypescript: pkg.jsii?.excludeTypescript ?? [],
    projectReferences: pkg.jsii?.projectReferences,
    tsc: {
      outDir: pkg.jsii?.tsc?.outDir,
      rootDir: pkg.jsii?.tsc?.rootDir,
      baseUrl: pkg.jsii?.tsc?.baseUrl,
      paths: pkg.jsii?.tsc?.paths,
      forceConsistentCasingInFileNames:
        pkg.jsii?.tsc?.forceConsistentCasingInFileNames,
      ..._sourceMapPreferences(pkg.jsii?.tsc),
      types: pkg.jsii?.tsc?.types,
    },
    bin: pkg.bin,
    exports: pkg.exports,
    diagnostics: _loadDiagnostics(pkg.jsii?.diagnostics),
  };
  return { projectInfo, diagnostics };
}

function _guessRepositoryType(url: string): string {
  if (url.endsWith('.git')) {
    return 'git';
  }
  const parts = /^([^:]+):\/\//.exec(url);
  if (parts?.[1] !== 'http' && parts?.[1] !== 'https') {
    return parts![1];
  }
  throw new Error(
    `The "package.json" file must specify the "repository.type" attribute (could not guess from ${url})`,
  );
}

function _sourceMapPreferences({
  declarationMap,
  inlineSourceMap,
  inlineSources,
  sourceMap,
}: TSCompilerOptions = {}) {
  // If none of the options are specified, use the default configuration from jsii <= 1.58.0, which
  // means inline source maps with embedded source information.
  if (
    declarationMap == null &&
    inlineSourceMap == null &&
    inlineSources == null &&
    sourceMap == null
  ) {
    declarationMap = false;
    inlineSourceMap = true;
    inlineSources = true;
    sourceMap = undefined;
  }

  return {
    declarationMap,
    inlineSourceMap,
    inlineSources,
    sourceMap,
  };
}

interface DependencyInfo {
  readonly assembly: spec.Assembly;
  readonly resolvedDependencies: Record<string, string>;
}

class DependencyResolver {
  private readonly cache = new Map<string, DependencyInfo>();

  /**
   * Discover the dependency tree starting at 'root', validating versions as we go along
   *
   * This primes the data structures in this class and should be called first.
   *
   * Return the resolved jsii dependency paths
   */
  public discoverDependencyTree(
    root: string,
    dependencies: Record<string, string>,
  ): Record<string, string> {
    const ret: Record<string, string> = {};
    for (const [name, declaration] of Object.entries(dependencies)) {
      // eslint-disable-next-line no-await-in-loop
      let resolved;
      try {
        resolved = this.resolveDependency(root, name, declaration);
      } catch (e) {
        LOG.error(
          `Unable to find a JSII dependency named "${name}" as "${declaration}". If you meant to include a non-JSII dependency, try adding it to bundledDependencies instead.`,
        );
        throw e;
      }

      const actualVersion = resolved.dependencyInfo.assembly.version;
      if (!semver.satisfies(actualVersion, declaration)) {
        // Allow URI declarations
        if (!declaration.match(/^[a-z][A-Z]:/)) {
          throw new Error(
            `Declared dependency on version ${declaration} of ${name}, but version ${actualVersion} was found`,
          );
        }
      }

      ret[name] = resolved.resolvedFile;
    }
    return ret;
  }

  /**
   * From a set of resolved paths, recursively return all assemblies
   */
  public assemblyClosure(resolved: Record<string, string>): spec.Assembly[] {
    const closure = new Map<string, spec.Assembly>();
    const queue = Array.from(Object.values(resolved));
    while (queue.length > 0) {
      const next = queue.shift()!;
      const resolved = this.cache.get(next);
      if (!resolved) {
        throw new Error(`Path ${next} not seen before`);
      }
      if (closure.has(next)) {
        continue;
      }

      closure.set(next, resolved.assembly);
      queue.push(...Object.values(resolved.resolvedDependencies));
    }
    return Array.from(closure.values());
  }

  private resolveDependency(root: string, name: string, declaration: string) {
    const { version: versionString, localPackage } = _resolveVersion(
      declaration,
      root,
    );
    const version = new semver.Range(versionString);
    if (!version) {
      throw new Error(
        `Invalid semver expression for ${name}: ${versionString}`,
      );
    }
    const jsiiFile = _tryResolveAssembly(name, localPackage, root);
    LOG.debug(`Resolved dependency ${name} to ${jsiiFile}`);
    return {
      resolvedVersion: versionString,
      resolvedFile: jsiiFile,
      dependencyInfo: this.loadAssemblyAndRecurse(jsiiFile),
    };
  }

  private loadAssemblyAndRecurse(jsiiFile: string) {
    // Only recurse if we haven't seen this assembly yet
    if (this.cache.has(jsiiFile)) {
      return this.cache.get(jsiiFile)!;
    }

    const assembly = loadAssemblyFromFile(jsiiFile);

    // Continue loading any dependencies declared in the asm
    const resolvedDependencies = assembly.dependencies
      ? this.discoverDependencyTree(
          path.dirname(jsiiFile),
          assembly.dependencies,
        )
      : {};

    const depInfo: DependencyInfo = {
      assembly,
      resolvedDependencies,
    };
    this.cache.set(jsiiFile, depInfo);
    return depInfo;
  }
}

function _required<T>(value: T, message: string): T {
  if (value == null) {
    throw new Error(message);
  }
  return value;
}

function _toPerson(
  value: any,
  field: string,
  defaultRole: string = field,
): spec.Person {
  if (typeof value === 'string') {
    value = parsePerson(value);
  }
  return {
    name: _required(
      value.name,
      `The "package.json" file must specify the "${field}.name" attribute`,
    ),
    roles: value.roles ? [...new Set(value.roles as string[])] : [defaultRole],
    email: value.email,
    url: value.url,
    organization: value.organization ? value.organization : undefined,
  };
}

function _toRepository(value: any): {
  type: string;
  url: string;
  directory?: string;
} {
  if (typeof value === 'string') {
    value = parseRepository(value);
  }
  return {
    url: _required(
      value.url,
      'The "package.json" file must specify the "repository.url" attribute',
    ),
    type: value.type || _guessRepositoryType(value.url),
    directory: value.directory,
  };
}

function _tryResolveAssembly(
  mod: string,
  localPackage: string | undefined,
  searchPath: string,
): string {
  if (localPackage) {
    const result = findAssemblyFile(localPackage);
    if (!fs.existsSync(result)) {
      throw new Error(`Assembly does not exist: ${result}`);
    }
    return result;
  }
  try {
    const dependencyDir = findDependencyDirectory(mod, searchPath);
    return findAssemblyFile(dependencyDir);
  } catch (e: any) {
    throw new Error(
      `Unable to locate jsii assembly for "${mod}". If this module is not jsii-enabled, it must also be declared under bundledDependencies: ${e}`,
    );
  }
}

function _validateLicense(id: string): string {
  if (id === 'UNLICENSED') {
    return id;
  }
  if (!spdx.has(id)) {
    throw new Error(
      `Invalid license identifier "${id}", see valid license identifiers at https://spdx.org/licenses/`,
    );
  }
  return id;
}

function _validateVersionFormat(format: string): 'short' | 'full' {
  if (format !== 'short' && format !== 'full') {
    throw new Error(
      `Invalid jsii.versionFormat "${format}", it must be either "short" or "full" (the default)`,
    );
  }
  return format;
}

function _validateStability(
  stability: string | undefined,
  deprecated: string | undefined,
): spec.Stability | undefined {
  if (!stability && deprecated) {
    stability = spec.Stability.Deprecated;
  } else if (deprecated && stability !== spec.Stability.Deprecated) {
    throw new Error(
      `Package is deprecated (${deprecated}), but it's stability is ${stability} and not ${spec.Stability.Deprecated}`,
    );
  }
  if (!stability) {
    return undefined;
  }
  if (!Object.values(spec.Stability).includes(stability as any)) {
    throw new Error(
      `Invalid stability "${stability}", it must be one of ${Object.values(
        spec.Stability,
      ).join(', ')}`,
    );
  }
  return stability as spec.Stability;
}

/**
 * Resolves an NPM package specifier to a version range
 *
 * If it was already a version range, return it. If it the
 * package references a local file, return the version that
 * package is at.
 */
function _resolveVersion(
  dep: string,
  searchPath: string,
): { version: string; localPackage?: string } {
  const matches = /^file:(.+)$/.exec(dep);
  if (!matches) {
    return { version: dep };
  }
  const localPackage = path.resolve(searchPath, matches[1]);
  return {
    // Rendering as a caret version to maintain uniformity against the "standard".
    // eslint-disable-next-line @typescript-eslint/no-require-imports,@typescript-eslint/no-var-requires
    version: `^${
      fs.readJsonSync(path.join(localPackage, 'package.json')).version
    }`,
    localPackage,
  };
}

/**
 * Merges two metadata blocks together.
 *
 * @param base the base values
 * @param user the user-supplied values, which can override the `base` values
 *
 * @returns the merged metadata block
 */
function mergeMetadata(
  base: NonNullable<ProjectInfo['metadata']>,
  user: ProjectInfo['metadata'],
): ProjectInfo['metadata'] {
  if (user == null) {
    return base;
  }
  return mergeObjects(base, user);

  function mergeObjects(
    base: Record<string, any>,
    override: Record<string, any>,
  ): Record<string, any> {
    const result: Record<string, any> = {};
    const allKeys = Array.from(
      new Set([...Object.keys(base), ...Object.keys(override)]),
    ).sort();
    for (const key of allKeys) {
      const baseValue = base[key];
      const overrideValue = override[key];

      if (typeof baseValue === 'object' && typeof overrideValue === 'object') {
        if (overrideValue != null) {
          result[key] = mergeObjects(baseValue, overrideValue);
        }
      } else {
        result[key] = overrideValue ?? baseValue;
      }
    }
    return result;
  }
}

function _loadDiagnostics(entries?: { [key: string]: string }):
  | {
      [key: string]: ts.DiagnosticCategory;
    }
  | undefined {
  if (entries === undefined || Object.keys(entries).length === 0) {
    return undefined;
  }
  const result: { [key: string]: ts.DiagnosticCategory } = {};
  for (const code of Object.keys(entries)) {
    let category: ts.DiagnosticCategory;
    switch (entries[code].trim().toLowerCase()) {
      case 'error':
        category = ts.DiagnosticCategory.Error;
        break;
      case 'warning':
        category = ts.DiagnosticCategory.Warning;
        break;
      case 'suggestion':
        category = ts.DiagnosticCategory.Suggestion;
        break;
      case 'message':
        category = ts.DiagnosticCategory.Message;
        break;
      default:
        throw new Error(
          `Invalid category '${entries[code]}' for code '${code}'`,
        );
    }
    result[code] = category;
  }
  return result;
}

function filterDictByKey<A>(
  xs: Record<string, A>,
  predicate: (key: string) => boolean,
): Record<string, A> {
  const ret: Record<string, A> = {};
  for (const [key, value] of Object.entries(xs)) {
    if (predicate(key)) {
      ret[key] = value;
    }
  }
  return ret;
}
