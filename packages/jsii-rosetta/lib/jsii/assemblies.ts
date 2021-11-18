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
} from '../snippet';
import { enforcesStrictMode } from '../strict';
import { mkDict } from '../util';

export interface LoadedAssembly {
  assembly: spec.Assembly;
  directory: string;
}

export function loadAssembliesSync(
  assemblyLocations: readonly string[],
  validateAssemblies: boolean,
): readonly LoadedAssembly[] {
  return assemblyLocations.map(loadAssemblySync);

  function loadAssemblySync(location: string): LoadedAssembly {
    const stat = fs.statSync(location);
    if (stat.isDirectory()) {
      return loadAssemblySync(path.join(location, '.jsii'));
    }
    return {
      assembly: loadAssemblyFromFileSync(location, validateAssemblies),
      directory: path.dirname(location),
    };
  }
}

function loadAssemblyFromFileSync(filename: string, validate: boolean): spec.Assembly {
  const contents = fs.readJSONSync(filename, { encoding: 'utf-8' });
  return validate ? spec.validateAssembly(contents) : (contents as spec.Assembly);
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

export type AssemblySnippetSource =
  | { type: 'markdown'; markdown: string; location: ApiLocation }
  | { type: 'example'; source: string; location: ApiLocation };

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
      if (spec.isClassOrInterfaceType(type)) {
        (type.methods ?? []).forEach((m) => emitDocs(m.docs, { api: 'member', fqn: type.fqn, memberName: m.name }));
        (type.properties ?? []).forEach((m) => emitDocs(m.docs, { api: 'member', fqn: type.fqn, memberName: m.name }));
      }
    });
  }

  return ret;

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
          const location = { api: source.location, field: { field: 'example' } } as const;

          const snippet = updateParameters(typeScriptSnippetFromSource(source.source, location, strict), {
            [SnippetParameters.$PROJECT_DIRECTORY]: directory,
          });
          ret.push(fixturize(snippet, loose));
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
  readonly assembly: spec.Assembly;
  readonly assemblyFile: string;
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
export function findTypeLookupAssembly(directory: string): TypeLookupAssembly | undefined {
  const pjLocation = findPackageJsonLocation(path.resolve(directory));
  if (!pjLocation) {
    return undefined;
  }

  const assemblyFile = path.join(path.dirname(pjLocation), '.jsii');

  const fromCache = ASM_CACHE.find((c) => c.assemblyFile === assemblyFile);
  if (fromCache) {
    return fromCache;
  }

  if (!fs.existsSync(assemblyFile)) {
    return undefined;
  }

  const loaded = loadLookupAssembly(assemblyFile);
  while (ASM_CACHE.length >= MAX_ASM_CACHE) {
    ASM_CACHE.pop();
  }
  ASM_CACHE.unshift(loaded);
  return loaded;
}

function loadLookupAssembly(assemblyFile: string): TypeLookupAssembly {
  const assembly: spec.Assembly = fs.readJSONSync(assemblyFile, { encoding: 'utf-8' });
  const symbolIdMap = mkDict(
    Object.values(assembly.types ?? {}).map((type) => [type.symbolId ?? '', type.fqn] as const),
  );

  return {
    assembly,
    assemblyFile,
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
