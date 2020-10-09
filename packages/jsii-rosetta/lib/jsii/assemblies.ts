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
} from '../snippet';

export interface LoadedAssembly {
  assembly: spec.Assembly;
  directory: string;
}

/**
 * Load assemblies by filename or directory
 */
export async function loadAssemblies(assemblyLocations: string[]) {
  const ret: LoadedAssembly[] = [];
  for (const loc of assemblyLocations) {
    const stat = await fs.stat(loc); // eslint-disable-line no-await-in-loop
    if (stat.isDirectory()) {
      ret.push({
        assembly: await loadAssemblyFromFile(path.join(loc, '.jsii')), // eslint-disable-line no-await-in-loop
        directory: loc,
      });
    } else {
      ret.push({
        assembly: await loadAssemblyFromFile(loc), // eslint-disable-line no-await-in-loop
        directory: path.dirname(loc),
      });
    }
  }
  return ret;
}

async function loadAssemblyFromFile(filename: string) {
  const contents = await fs.readJSON(filename, { encoding: 'utf-8' });
  return spec.validateAssembly(contents);
}

export type AssemblySnippetSource =
  | { type: 'markdown'; markdown: string; where: string }
  | { type: 'literal'; source: string; where: string };

/**
 * Return all markdown and example snippets from the given assembly
 */
export function allSnippetSources(
  assembly: spec.Assembly,
): AssemblySnippetSource[] {
  const ret: AssemblySnippetSource[] = [];

  if (assembly.readme) {
    ret.push({
      type: 'markdown',
      markdown: assembly.readme.markdown,
      where: removeSlashes(`${assembly.name}-README`),
    });
  }

  if (assembly.types) {
    Object.values(assembly.types).forEach((type) => {
      emitDocs(type.docs, `${assembly.name}.${type.name}`);

      if (spec.isEnumType(type)) {
        type.members.forEach((m) =>
          emitDocs(m.docs, `${assembly.name}.${type.name}.${m.name}`),
        );
      }
      if (spec.isClassOrInterfaceType(type)) {
        (type.methods ?? []).forEach((m) =>
          emitDocs(m.docs, `${assembly.name}.${type.name}#${m.name}`),
        );
        (type.properties ?? []).forEach((m) =>
          emitDocs(m.docs, `${assembly.name}.${type.name}#${m.name}`),
        );
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
  assemblies: Array<{ assembly: spec.Assembly; directory: string }>,
): IterableIterator<TypeScriptSnippet> {
  for (const assembly of assemblies) {
    for (const source of allSnippetSources(assembly.assembly)) {
      switch (source.type) {
        case 'literal':
          const snippet = updateParameters(
            typeScriptSnippetFromSource(source.source, source.where),
            {
              [SnippetParameters.$PROJECT_DIRECTORY]: assembly.directory,
            },
          );
          yield fixturize(snippet);
          break;
        case 'markdown':
          for (const snippet of extractTypescriptSnippetsFromMarkdown(
            source.markdown,
            source.where,
          )) {
            const withDirectory = updateParameters(snippet, {
              [SnippetParameters.$PROJECT_DIRECTORY]: assembly.directory,
            });
            yield fixturize(withDirectory);
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
