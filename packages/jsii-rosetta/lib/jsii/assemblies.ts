import * as spec from '@jsii/spec';
import * as crypto from 'crypto';
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

// eslint-disable-next-line @typescript-eslint/no-var-requires, @typescript-eslint/no-require-imports
const sortJson = require('sort-json');

export interface LoadedAssembly {
  assembly: spec.Assembly;
  directory: string;
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
 * This function is copied from `packages/jsii/lib/assembler.ts`.
 * We should make sure not to change one without changing the other as well.
 */
function _fingerprint(assembly: spec.Assembly): spec.Assembly {
  delete (assembly as any).fingerprint;
  assembly = sortJson(assembly);
  const fingerprint = crypto.createHash('sha256').update(JSON.stringify(assembly)).digest('base64');
  return { ...assembly, fingerprint };
}
