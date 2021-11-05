import * as spec from '@jsii/spec';
import * as fs from 'fs-extra';

import { loadAssemblies, replaceAssembly } from '../jsii/assemblies';
import { SnippetSelector, mean, meanLength, shortest, longest } from '../snippet-selectors';
import { LanguageTablet, TranslatedSnippet } from '../tablets/tablets';

export interface InfuseResult {
  readonly coverageResults: Record<string, InfuseTypes>;
}

export interface InfuseTypes {
  readonly types: number;
  readonly typesWithInsertedExamples: number;
}

export interface InfuseOptions {
  readonly outputFile: string;
  readonly log: boolean;

  /**
   * Where to write the updated tablet back
   */
  readonly tabletOutputFile?: string;
}

export const DEFAULT_INFUSION_RESULTS_NAME = 'infusion-results.html';

const ADDITIONAL_SELECTORS: Record<string, SnippetSelector> = { meanLength, shortest, longest };

class DefaultRecord<A> {
  public readonly index: Record<string, A[]> = {};

  public add(key: string, value: A) {
    if (!this.index[key]) {
      this.index[key] = [];
    }
    this.index[key].push(value);
  }
}

export async function infuse(
  assemblyLocations: string[],
  tabletFile: string,
  options?: InfuseOptions,
): Promise<InfuseResult> {
  let stream: fs.WriteStream | undefined = undefined;
  if (options?.log) {
    // Create stream for html file and insert some styling
    stream = fs.createWriteStream(options.outputFile, {
      encoding: 'utf-8',
    });
    startFile(stream);
  }

  // Load tablet file and assemblies
  const tab = new LanguageTablet();
  await tab.load(tabletFile);
  const assemblies = await loadAssemblies(assemblyLocations, true);

  const snippetsFromFqn = mapFqns(tab);
  const coverageResults: Record<string, InfuseTypes> = {};
  for (const { assembly, directory } of assemblies) {
    stream?.write(`<h1>@aws-cdk/${directory.split('/').pop()}</h1>\n`);

    let typesWithInsertedExamples = 0;
    const filteredTypes = filterForTypesWithoutExamples(assembly.types ?? {});
    for (const [typeFqn, type] of Object.entries(filteredTypes)) {
      if (snippetsFromFqn[typeFqn] !== undefined) {
        const meanResult = mean(snippetsFromFqn[typeFqn]);
        if (options?.log) {
          const selected = Object.entries(ADDITIONAL_SELECTORS).map(
            ([name, fn]) => [name, fn(snippetsFromFqn[typeFqn])] as const,
          );
          const selectedFromSelector = {
            ...makeDict(selected),
            mean: meanResult,
          };
          logOutput(stream, typeFqn, createHtmlEntry(selectedFromSelector));
        }
        insertExample(meanResult, type, tab);
        typesWithInsertedExamples++;
      }
    }

    // eslint-disable-next-line no-await-in-loop
    await replaceAssembly(assembly, directory);
    coverageResults[directory] = {
      types: Object.keys(filteredTypes).length,
      typesWithInsertedExamples,
    };
  }

  stream?.close();

  // If we copied examples onto different types, we'll also have inserted new snippets
  // with different keys into the tablet. We must now write the updated tablet somewhere.
  if (options?.tabletOutputFile) {
    await tab.save(options.tabletOutputFile);
  }

  return {
    coverageResults: coverageResults,
  };
}

function startFile(stream: fs.WriteStream) {
  stream.write('<style>\n');
  stream.write('h2 { color: blue; clear: both; }\n');
  stream.write('h1 { color: red; clear: both; }\n');
  stream.write(
    'div { float: left; height: 31em; width: 22em; overflow: auto; margin: 1em; background-color: #ddd; }\n',
  );
  stream.write(
    'pre { float: left; height: 30em; width: 25em; overflow: auto; padding: 0.5em; background-color: #ddd; }\n',
  );
  stream.write('</style>\n');
}

function createHtmlEntry(results: Record<string, TranslatedSnippet>): Record<string, string[]> {
  const entry = new DefaultRecord<string>();
  for (const [key, value] of Object.entries(results)) {
    entry.add(value.originalSource.source, key);
  }
  return entry.index;
}

function logOutput(stream: fs.WriteStream | undefined, typeFqn: string, algorithmMap: Record<string, string[]>) {
  stream?.write(`<h2>${typeFqn}</h2>\n`);
  for (const [key, value] of Object.entries(algorithmMap)) {
    stream?.write(`<div class="snippet"><h3>${value.toString()}</h3>\n<pre>${key}</pre>\n</div>\n`);
  }
  for (let i = 0; i < 4 - Object.keys(algorithmMap).length; i++) {
    stream?.write('<div class="padding"></div>\n');
  }
}

function filterForTypesWithoutExamples(types: { [fqn: string]: spec.Type }): Record<string, spec.Type> {
  const filteredTypes: Record<string, spec.Type> = {};
  for (const [typeFqn, type] of Object.entries(types)) {
    // Ignore Interfaces that contain only properties
    if (type.kind === spec.TypeKind.Interface && !type.datatype) {
      continue;
    }
    // Already has example
    if (type.docs?.example !== undefined) {
      continue;
    }
    filteredTypes[typeFqn] = type;
  }
  return filteredTypes;
}

/**
 * Insert an example into the docs of a type, and insert it back into the tablet under a new key
 */
function insertExample(example: TranslatedSnippet, type: spec.Type, tablet: LanguageTablet): void {
  if (type.docs) {
    type.docs.example = example.originalSource.source;
  } else {
    type.docs = { example: example.originalSource.source };
  }

  tablet.addSnippet(
    example.withLocation({
      api: { api: 'type', fqn: type.fqn },
      field: { field: 'example' },
    }),
  );
}

/**
 * Returns a map of fqns to a list of keys that represent snippets that include the fqn.
 */
function mapFqns(tab: LanguageTablet): Record<string, TranslatedSnippet[]> {
  const fqnsReferencedMap = new DefaultRecord<TranslatedSnippet>();

  for (const key of tab.snippetKeys) {
    const snippet = tab.tryGetSnippet(key)!;
    for (const fqn of snippet.snippet.fqnsReferenced ?? []) {
      fqnsReferencedMap.add(fqn, snippet);
    }
  }
  return fqnsReferencedMap.index;
}

function makeDict<A>(xs: Array<readonly [string, A]>): Record<string, A> {
  const ret: Record<string, A> = {};
  for (const [str, a] of xs) {
    ret[str] = a;
  }
  return ret;
}
