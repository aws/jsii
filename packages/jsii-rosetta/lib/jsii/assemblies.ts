import * as spec from '@jsii/spec';
import * as fs from 'fs-extra';
import * as path from 'path';

import { fixturize } from '../fixtures';
import { extractTypescriptSnippetsFromMarkdown } from '../markdown/extract-snippets';
import { TypeScriptSnippet, typeScriptSnippetFromSource, updateParameters, SnippetParameters } from '../snippet';
import { enforcesStrictMode } from '../strict';

export async function replaceAssembly(assembly: spec.Assembly, directory: string): Promise<void> {
  const fileName = path.join(directory, '.temp.jsii');
  await fs.writeJson(fileName, assembly, { spaces: '\t' });
}

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
  | { type: 'markdown'; markdown: string; where: string }
  | { type: 'literal'; source: string; where: string };

/**
 * Return all markdown and example snippets from the given assembly
 */
export function allSnippetSources(assembly: spec.Assembly): AssemblySnippetSource[] {
  const ret: AssemblySnippetSource[] = [];

  if (assembly.readme) {
    ret.push({
      type: 'markdown',
      markdown: assembly.readme.markdown,
      where: removeSlashes(`${assembly.name}-README`),
    });
  }

  for (const [submoduleFqn, submodule] of Object.entries(assembly.submodules ?? {})) {
    if (submodule.readme) {
      ret.push({
        type: 'markdown',
        markdown: submodule.readme.markdown,
        where: removeSlashes(`${submoduleFqn}-README`),
      });
    }
  }

  if (assembly.types) {
    Object.values(assembly.types).forEach((type) => {
      emitDocs(type.docs, `${assembly.name}.${type.name}`);

      if (spec.isEnumType(type)) {
        type.members.forEach((m) => emitDocs(m.docs, `${assembly.name}.${type.name}.${m.name}`));
      }
      if (spec.isClassOrInterfaceType(type)) {
        (type.methods ?? []).forEach((m) => emitDocs(m.docs, `${assembly.name}.${type.name}#${m.name}`));
        (type.properties ?? []).forEach((m) => emitDocs(m.docs, `${assembly.name}.${type.name}#${m.name}`));
      }
    });
  }

  return ret;

  function emitDocs(docs: spec.Docs | undefined, where: string) {
    if (!docs) {
      return;
    }

    if (docs.remarks) {
      ret.push({
        type: 'markdown',
        markdown: docs.remarks,
        where: removeSlashes(where),
      });
    }
    if (docs.example && exampleLooksLikeSource(docs.example)) {
      ret.push({
        type: 'literal',
        source: docs.example,
        where: removeSlashes(`${where}-example`),
      });
    }
  }
}

/**
 * Remove slashes from a "where" description, as the TS compiler will interpret it as a directory
 * and we can't have that for compiling literate files
 */
function removeSlashes(x: string) {
  return x.replace(/\//g, '.');
}

export function* allTypeScriptSnippets(
  assemblies: readonly LoadedAssembly[],
  loose = false,
): IterableIterator<TypeScriptSnippet> {
  for (const { assembly, directory } of assemblies) {
    const strict = enforcesStrictMode(assembly);
    for (const source of allSnippetSources(assembly)) {
      switch (source.type) {
        case 'literal':
          const snippet = updateParameters(typeScriptSnippetFromSource(source.source, source.where, strict), {
            [SnippetParameters.$PROJECT_DIRECTORY]: directory,
          });
          yield fixturize(snippet, loose);
          break;
        case 'markdown':
          for (const snippet of extractTypescriptSnippetsFromMarkdown(source.markdown, source.where, strict)) {
            const withDirectory = updateParameters(snippet, {
              [SnippetParameters.$PROJECT_DIRECTORY]: directory,
            });
            yield fixturize(withDirectory, loose);
          }
      }
    }
  }
}

/**
 * See if the given source text looks like a code sample
 *
 * Many @examples for properties are examples of values (ARNs, formatted strings)
 * not code samples, which should not be translated
 *
 * If the value contains whitespace (newline, space) then we'll assume it's a code
 * sample.
 */
function exampleLooksLikeSource(text: string) {
  return !!WHITESPACE.exec(text.trim());
}

const WHITESPACE = new RegExp('\\s');
