import * as spec from '@jsii/spec';
import { loadAssemblyFromFile, loadAssemblyFromPath, findAssemblyFile } from '@jsii/spec';
import { promises as fsPromises } from 'fs';
import * as fs from 'fs';
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
import { LanguageTablet, DEFAULT_TABLET_NAME, DEFAULT_TABLET_NAME_COMPRESSED } from '../tablets/tablets';
import { fmap, mkDict, sortBy } from '../util';

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
export function loadAssemblies(
  assemblyLocations: readonly string[],
  validateAssemblies: boolean,
): readonly LoadedAssembly[] {
  return assemblyLocations.map(loadAssembly);

  function loadAssembly(location: string): LoadedAssembly {
    const stat = fs.statSync(location);
    if (stat.isDirectory()) {
      return loadAssembly(findAssemblyFile(location));
    }

    const directory = path.dirname(location);
    const pjLocation = path.join(directory, 'package.json');

    const assembly = loadAssemblyFromFile(location, validateAssemblies);
    const packageJson = fs.existsSync(pjLocation) ? JSON.parse(fs.readFileSync(pjLocation, 'utf-8')) : undefined;

    return { assembly, directory, packageJson };
  }
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
        async (a) => [a.directory, await LanguageTablet.fromOptionalFile(guessTabletLocation(a.directory))] as const,
      ),
    ),
  );
}

/**
 * Returns the location of the tablet file, either .jsii.tabl.json or .jsii.tabl.json.gz.
 * Assumes that a tablet exists in the directory and if not, the ensuing behavior is
 * handled by the caller of this function.
 */
export function guessTabletLocation(directory: string) {
  return compressedTabletExists(directory)
    ? path.join(directory, DEFAULT_TABLET_NAME_COMPRESSED)
    : path.join(directory, DEFAULT_TABLET_NAME);
}

export function compressedTabletExists(directory: string) {
  return fs.existsSync(path.join(directory, DEFAULT_TABLET_NAME_COMPRESSED));
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
  try {
    const packageJson = JSON.parse(fs.readFileSync(path.join(directory, 'package.json'), 'utf-8'));
    const assembly: spec.Assembly = loadAssemblyFromPath(directory);
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
  } catch {
    return undefined;
  }
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
    resolvedDirectory: await fsPromises.realpath(asm.directory),
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
                  resolvedDirectory: await fsPromises.realpath(await findDependencyDirectory(name, asm.directory)),
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
