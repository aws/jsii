import * as spec from '@jsii/spec';
import * as fs from 'fs-extra';
import * as path from 'path';

import { fixturize } from '../fixtures';
import { extractTypescriptSnippetsFromMarkdown } from '../markdown/extract-snippets';
import {
  TypeScriptSnippet,
  typeScriptSnippetFromSource,
  updateParameters,
  SnippetParameters,
  ApiLocation,
  parseMetadataLine,
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

export interface LoadedAssembly {
  readonly assembly: spec.Assembly;
  readonly directory: string;
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

    return {
      assembly: await loadAssemblyFromFile(location, validateAssemblies),
      directory: path.dirname(location),
    };
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

export function allTypeScriptSnippets(assemblies: readonly LoadedAssembly[], loose = false): TypeScriptSnippet[] {
  const ret = new Array<TypeScriptSnippet>();

  for (const { assembly, directory } of assemblies) {
    const strict = enforcesStrictMode(assembly);
    for (const source of allSnippetSources(assembly)) {
      switch (source.type) {
        case 'example':
          // If an example is an infused example, we do not care about compiler errors.
          // We are relying on the tablet cache to have this example stored already.
          const [strictForExample, looseForExample] =
            source.metadata?.infused !== undefined ? [false, true] : [strict, loose];
          const location = { api: source.location, field: { field: 'example' } } as const;
          const snippet = updateParameters(typeScriptSnippetFromSource(source.source, location, strictForExample), {
            [SnippetParameters.$PROJECT_DIRECTORY]: directory,
            ...source.metadata,
          });
          ret.push(fixturize(snippet, looseForExample));
          break;
        case 'markdown':
          for (const snippet of extractTypescriptSnippetsFromMarkdown(source.markdown, source.location, strict)) {
            const withDirectory = updateParameters(snippet, {
              [SnippetParameters.$PROJECT_DIRECTORY]: directory,
            });
            ret.push(fixturize(withDirectory, loose));
          }
      }
    }
  }
  return ret;
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
 * Replaces the old fingerprint with '***********'.
 *
 * @rmuller says fingerprinting is useless, as we do not actually check
 * if an assembly is changed. Instead of keeping the old (wrong) fingerprint
 * or spending extra time calculating a new fingerprint, we replace with '**********'
 * that demonstrates the fingerprint has changed.
 */
function _fingerprint(assembly: spec.Assembly): spec.Assembly {
  assembly.fingerprint = '*'.repeat(10);
  return assembly;
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
