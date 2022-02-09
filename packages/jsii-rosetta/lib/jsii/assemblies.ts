import * as spec from '@jsii/spec';
import * as crypto from 'crypto';
import * as fs from 'fs-extra';
import * as path from 'path';

import { findDependencyDirectory, isBuiltinModule } from '../find-utils';
import { fixturize } from '../fixtures';
import { extractTypescriptSnippetsFromMarkdown } from '../markdown/extract-snippets';
import {
  TypeScriptSnippet,
  typeScriptSnippetFromSource,
  updateParameters,
  SnippetParameters,
  ApiLocation,
  parseMetadataLine,
  CompilationDependency,
  INITIALIZER_METHOD_NAME,
} from '../snippet';
import { enforcesStrictMode } from '../strict';
import { LanguageTablet, DEFAULT_TABLET_NAME } from '../tablets/tablets';
import { fmap, mkDict, sortBy } from '../util';

// eslint-disable-next-line @typescript-eslint/no-var-requires, @typescript-eslint/no-require-imports
const sortJson = require('sort-json');

/**
 * The JSDoc tag users can use to associate non-visible metadata with an example
 *
 * In a Markdown section, metadata goes after the code block fence, where it will
 * be attached to the example but invisible.
 *
 *    ```ts metadata=goes here
 *
 * But in doc comments, '@example' already delineates the example, and any metadata
 * in there added by the '///' tags becomes part of the visible code (there is no
 * place to put hidden information).
 *
 * We introduce the '@exampleMetadata' tag to put that additional information.
 */
export const EXAMPLE_METADATA_JSDOCTAG = 'exampleMetadata';

interface RosettaPackageJson extends spec.PackageJson {
  readonly jsiiRosetta?: {
    readonly strict?: boolean;
    readonly exampleDependencies?: Record<string, string>;
  };
}

export interface LoadedAssembly {
  readonly assembly: spec.Assembly;
  readonly directory: string;
  readonly packageJson?: RosettaPackageJson;
}

/**
 * Load assemblies by filename or directory
 */
export async function loadAssemblies(
  assemblyLocations: readonly string[],
  validateAssemblies: boolean,
): Promise<readonly LoadedAssembly[]> {
  return Promise.all(assemblyLocations.map(loadAssembly));

  async function loadAssembly(location: string): Promise<LoadedAssembly> {
    const stat = await fs.stat(location);
    if (stat.isDirectory()) {
      return loadAssembly(path.join(location, '.jsii'));
    }

    const directory = path.dirname(location);
    const pjLocation = path.join(directory, 'package.json');

    const [assembly, packageJson] = await Promise.all([
      loadAssemblyFromFile(location, validateAssemblies),
      (await fs.pathExists(pjLocation)) ? fs.readJSON(pjLocation, { encoding: 'utf-8' }) : Promise.resolve(undefined),
    ]);

    return { assembly, directory, packageJson };
  }
}

async function loadAssemblyFromFile(filename: string, validate: boolean): Promise<spec.Assembly> {
  const contents = await fs.readJSON(filename, { encoding: 'utf-8' });
  return validate ? spec.validateAssembly(contents) : (contents as spec.Assembly);
}

/**
 * Load the default tablets for every assembly, if available
 *
 * Returns a map of { directory -> tablet }.
 */
export async function loadAllDefaultTablets(asms: readonly LoadedAssembly[]): Promise<Record<string, LanguageTablet>> {
  return mkDict(
    await Promise.all(
      asms.map(
        async (a) =>
          [a.directory, await LanguageTablet.fromOptionalFile(path.join(a.directory, DEFAULT_TABLET_NAME))] as const,
      ),
    ),
  );
}

export type AssemblySnippetSource =
  | { type: 'markdown'; markdown: string; location: ApiLocation }
  | { type: 'example'; source: string; metadata?: { [key: string]: string }; location: ApiLocation };

/**
 * Return all markdown and example snippets from the given assembly
 */
export function allSnippetSources(assembly: spec.Assembly): AssemblySnippetSource[] {
  const ret: AssemblySnippetSource[] = [];

  if (assembly.readme) {
    ret.push({
      type: 'markdown',
      markdown: assembly.readme.markdown,
      location: { api: 'moduleReadme', moduleFqn: assembly.name },
    });
  }

  for (const [submoduleFqn, submodule] of Object.entries(assembly.submodules ?? {})) {
    if (submodule.readme) {
      ret.push({
        type: 'markdown',
        markdown: submodule.readme.markdown,
        location: { api: 'moduleReadme', moduleFqn: submoduleFqn },
      });
    }
  }

  if (assembly.types) {
    Object.values(assembly.types).forEach((type) => {
      emitDocs(type.docs, { api: 'type', fqn: type.fqn });

      if (spec.isEnumType(type)) {
        type.members.forEach((m) => emitDocs(m.docs, { api: 'member', fqn: type.fqn, memberName: m.name }));
      }
      if (spec.isClassType(type)) {
        emitDocsForCallable(type.initializer, type.fqn);
      }
      if (spec.isClassOrInterfaceType(type)) {
        (type.methods ?? []).forEach((m) => emitDocsForCallable(m, type.fqn, m.name));
        (type.properties ?? []).forEach((m) => emitDocs(m.docs, { api: 'member', fqn: type.fqn, memberName: m.name }));
      }
    });
  }

  return ret;

  function emitDocsForCallable(callable: spec.Callable | undefined, fqn: string, memberName?: string) {
    if (!callable) {
      return;
    }
    emitDocs(callable.docs, memberName ? { api: 'member', fqn, memberName } : { api: 'initializer', fqn });

    for (const parameter of callable.parameters ?? []) {
      emitDocs(parameter.docs, {
        api: 'parameter',
        fqn: fqn,
        methodName: memberName ?? INITIALIZER_METHOD_NAME,
        parameterName: parameter.name,
      });
    }
  }

  function emitDocs(docs: spec.Docs | undefined, location: ApiLocation) {
    if (!docs) {
      return;
    }

    if (docs.remarks) {
      ret.push({
        type: 'markdown',
        markdown: docs.remarks,
        location,
      });
    }
    if (docs.example) {
      ret.push({
        type: 'example',
        source: docs.example,
        metadata: fmap(docs.custom?.[EXAMPLE_METADATA_JSDOCTAG], parseMetadataLine),
        location,
      });
    }
  }
}

export async function allTypeScriptSnippets(
  assemblies: readonly LoadedAssembly[],
  loose = false,
): Promise<TypeScriptSnippet[]> {
  return Promise.all(
    assemblies
      .flatMap((loaded) => allSnippetSources(loaded.assembly).map((source) => ({ source, loaded })))
      .flatMap(({ source, loaded }) => {
        switch (source.type) {
          case 'example':
            return [
              {
                snippet: updateParameters(
                  typeScriptSnippetFromSource(
                    source.source,
                    { api: source.location, field: { field: 'example' } },
                    isStrict(loaded),
                  ),
                  source.metadata ?? {},
                ),
                loaded,
              },
            ];
          case 'markdown':
            return extractTypescriptSnippetsFromMarkdown(source.markdown, source.location, isStrict(loaded)).map(
              (snippet) => ({ snippet, loaded }),
            );
        }
      })
      .map(async ({ snippet, loaded }) => {
        const isInfused = snippet.parameters?.infused != null;

        // Ignore fixturization errors if requested on this command, or if the snippet was infused
        const ignoreFixtureErrors = loose || isInfused;

        // Also if the snippet was infused: switch off 'strict' mode if it was set
        if (isInfused) {
          snippet = { ...snippet, strict: false };
        }

        snippet = await withDependencies(loaded, withProjectDirectory(loaded.directory, snippet));
        return fixturize(snippet, ignoreFixtureErrors);
      }),
  );
}

/**
 * Replaces the file where the original assembly file *should* be found with a new assembly file.
 * Recalculates the fingerprint of the assembly to avoid tampering detection.
 */
export async function replaceAssembly(assembly: spec.Assembly, directory: string): Promise<void> {
  const fileName = path.join(directory, '.jsii');
  await fs.writeJson(fileName, _fingerprint(assembly), {
    encoding: 'utf8',
    spaces: 2,
  });
}

/**
 * This function is copied from `packages/jsii/lib/assembler.ts`.
 * We should make sure not to change one without changing the other as well.
 */
function _fingerprint(assembly: spec.Assembly): spec.Assembly {
  delete (assembly as any).fingerprint;
  assembly = sortJson(assembly);
  const fingerprint = crypto.createHash('sha256').update(JSON.stringify(assembly)).digest('base64');
  return { ...assembly, fingerprint };
}

export interface TypeLookupAssembly {
  readonly packageJson: any;
  readonly assembly: spec.Assembly;
  readonly directory: string;
  readonly symbolIdMap: Record<string, string>;
}

const MAX_ASM_CACHE = 3;
const ASM_CACHE: TypeLookupAssembly[] = [];

/**
 * Recursively searches for a .jsii file in the directory.
 * When file is found, checks cache to see if we already
 * stored the assembly in memory. If not, we synchronously
 * load the assembly into memory.
 */
export function findTypeLookupAssembly(startingDirectory: string): TypeLookupAssembly | undefined {
  const pjLocation = findPackageJsonLocation(path.resolve(startingDirectory));
  if (!pjLocation) {
    return undefined;
  }
  const directory = path.dirname(pjLocation);

  const fromCache = ASM_CACHE.find((c) => c.directory === directory);
  if (fromCache) {
    return fromCache;
  }

  const loaded = loadLookupAssembly(directory);
  if (!loaded) {
    return undefined;
  }

  while (ASM_CACHE.length >= MAX_ASM_CACHE) {
    ASM_CACHE.pop();
  }
  ASM_CACHE.unshift(loaded);
  return loaded;
}

function loadLookupAssembly(directory: string): TypeLookupAssembly | undefined {
  const assemblyFile = path.join(directory, '.jsii');
  if (!fs.pathExistsSync(assemblyFile)) {
    return undefined;
  }

  const packageJson = fs.readJSONSync(path.join(directory, 'package.json'), { encoding: 'utf-8' });
  const assembly: spec.Assembly = fs.readJSONSync(assemblyFile, { encoding: 'utf-8' });
  const symbolIdMap = mkDict([
    ...Object.values(assembly.types ?? {}).map((type) => [type.symbolId ?? '', type.fqn] as const),
    ...Object.entries(assembly.submodules ?? {}).map(([fqn, mod]) => [mod.symbolId ?? '', fqn] as const),
  ]);

  return {
    packageJson,
    assembly,
    directory,
    symbolIdMap,
  };
}

function findPackageJsonLocation(currentPath: string): string | undefined {
  // eslint-disable-next-line no-constant-condition
  while (true) {
    const candidate = path.join(currentPath, 'package.json');
    if (fs.existsSync(candidate)) {
      return candidate;
    }

    const parentPath = path.resolve(currentPath, '..');
    if (parentPath === currentPath) {
      return undefined;
    }
    currentPath = parentPath;
  }
}

/**
 * Find the jsii [sub]module that contains the given FQN
 *
 * @returns `undefined` if the type is a member of the assembly root.
 */
export function findContainingSubmodule(assembly: spec.Assembly, fqn: string): string | undefined {
  const submoduleNames = Object.keys(assembly.submodules ?? {});
  sortBy(submoduleNames, (s) => [-s.length]); // Longest first
  for (const s of submoduleNames) {
    if (fqn.startsWith(`${s}.`)) {
      return s;
    }
  }
  return undefined;
}

function withProjectDirectory(dir: string, snippet: TypeScriptSnippet) {
  return updateParameters(snippet, {
    [SnippetParameters.$PROJECT_DIRECTORY]: dir,
  });
}

/**
 * Return a TypeScript snippet with dependencies added
 *
 * The dependencies will be taken from the package.json, and will consist of:
 *
 * - The package itself
 * - The package's dependencies and peerDependencies
 * - Any additional dependencies declared in `jsiiRosetta.exampleDependencies`.
 */
async function withDependencies(asm: LoadedAssembly, snippet: TypeScriptSnippet): Promise<TypeScriptSnippet> {
  const compilationDependencies: Record<string, CompilationDependency> = {};

  compilationDependencies[asm.assembly.name] = {
    type: 'concrete',
    resolvedDirectory: await fs.realpath(asm.directory),
  };

  Object.assign(
    compilationDependencies,
    mkDict(
      await Promise.all(
        Object.keys({ ...asm.packageJson?.dependencies, ...asm.packageJson?.peerDependencies })
          .filter((name) => !isBuiltinModule(name))
          .filter(
            (name) =>
              !asm.packageJson?.bundledDependencies?.includes(name) &&
              !asm.packageJson?.bundleDependencies?.includes(name),
          )
          .map(
            async (name) =>
              [
                name,
                {
                  type: 'concrete',
                  resolvedDirectory: await fs.realpath(await findDependencyDirectory(name, asm.directory)),
                },
              ] as const,
          ),
      ),
    ),
  );

  Object.assign(
    compilationDependencies,
    mkDict(
      Object.entries(asm.packageJson?.jsiiRosetta?.exampleDependencies ?? {}).map(
        ([name, versionRange]) => [name, { type: 'symbolic', versionRange }] as const,
      ),
    ),
  );

  return {
    ...snippet,
    compilationDependencies,
  };
}

/**
 * Whether samples in the assembly should be treated as strict
 *
 * True if the strict flag is found in the package.json (modern) or the assembly itself (legacy).
 */
function isStrict(loaded: LoadedAssembly) {
  return loaded.packageJson?.jsiiRosetta?.strict ?? enforcesStrictMode(loaded.assembly);
}
