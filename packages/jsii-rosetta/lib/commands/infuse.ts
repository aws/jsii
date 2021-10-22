import * as spec from '@jsii/spec';
import * as fs from 'fs-extra';

import { loadAssemblies, replaceAssembly } from '../jsii/assemblies';
import { LanguageTablet, TranslatedSnippet } from '../tablets/tablets';

export interface InfusionResult {
  resultMap: Record<string, Infusion>;
}

export interface Infusion {
  filteredTypeFqns: string[];
  insertedExampleFqns: string[];
  hadExampleFqns: string[];
}

export type SnippetSelector = (snippets: TranslatedSnippet[]) => TranslatedSnippet;

const ADDITIONAL_SELECTORS: Record<string, SnippetSelector> = {first, shortest, longest};

class DefaultRecord<A> {
  public readonly index: Record<string, Array<A>> = {};

  public add(key: string, value: A) {
    if (!this.index[key]) {
      this.index[key] = [];
    }
    this.index[key].push(value);
  }
}

export async function infuse(assemblyLocations: string[], tabletFile: string): Promise<InfusionResult> {
  // Create stream for html file and insert some styling.
  const stream = fs.createWriteStream('kaizen.html', { flags: 'a' });
  startFile(stream);

  const tab = new LanguageTablet();
  await tab.load(tabletFile);

  const resultMap: Record<string, Infusion> = {};

  const snippetsFromFqn = mapFqns(tab);
  const assemblies = await loadAssemblies(assemblyLocations, true);
  for (const { assembly, directory } of assemblies) {
    const dir = directory.split('/');
    stream.write(`<h1>${dir[dir.length-2]}/${dir[dir.length - 1]}</h1>\n`);
    const infusion: Infusion = {
      filteredTypeFqns: [],
      insertedExampleFqns: [],
      hadExampleFqns: [],
    };
    const types = assembly.types;
    if (types) {
      const filteredTypes = filterForTypesWithoutExamples(types);
      infusion.filteredTypeFqns = Object.keys(filteredTypes);
      for (const typeFqn in filteredTypes) {
        if (snippetsFromFqn[typeFqn] !== undefined) {
          const meanResult = mean(snippetsFromFqn[typeFqn]);
          if (true) {
            const selected = Object.entries(ADDITIONAL_SELECTORS).map(([name, fn]) => [name, fn(snippetsFromFqn[typeFqn])] as const);
            const selectedFromSelector = {
              ...makeDict(selected),
              mean: meanResult,
            };
            logOutput(
              stream,
              typeFqn,
              createHtmlEntry(selectedFromSelector),
            );
          }
          insertExample(meanResult.originalSource.source, types[typeFqn]);
        }
      }
    }
    await replaceAssembly(assembly, directory);
    resultMap[directory] = infusion;
  }
  return {
    resultMap: resultMap,
  };
}

function startFile(stream: fs.WriteStream) {
  stream.write('<style>\n');
  stream.write('h2 { color: blue; clear: both; }\n\n');
  stream.write('h1 { color: red; clear: both; }\n\n');
  stream.write(
    'div { float: left; height: 31em; width: 22em; overflow: auto; margin: 1em; background-color: #ddd; }\n\n',
  );
  stream.write(
    'pre { float: left; height: 30em; width: 25em; overflow: auto; padding: 0.5em; background-color: #ddd; }\n',
  );
  stream.write('</style>\n');
}

function createHtmlEntry(results: Record<string, TranslatedSnippet>): Record<string, string[]> {
  const entry = new DefaultRecord<string>();
  Object.entries(results).map(([key, value]) => {
    entry.add(value.originalSource.source, key);
  });
  return entry.index;
}

function logOutput(stream: fs.WriteStream, typeFqn: string, algorithmMap: Record<string, string[]>) {
  stream.write(`<h2>${typeFqn}</h2>\n`);
  Object.entries(algorithmMap).map(([key, value]) => {
    stream.write(`<div class="snippet"><h3>${value.toString()}</h3>\n<pre>${key}</pre>\n</div>\n`);
  });
  for (let i = 0; i < 4 - Object.keys(algorithmMap).length; i++) {
    stream.write('<div class="padding"></div>\n');
  }
}

function filterForTypesWithoutExamples(types: {[fqn: string]: spec.Type}): Record<string, spec.Type> {
  const filteredTypes: Record<string, spec.Type> = {};
  for (const [typeFqn, type] of Object.entries(types)) {
    // Ignore Cfn types if possible
    const splitFqn = typeFqn.split('.');
    if (splitFqn.length >= 2 && splitFqn[1].length >= 3 && splitFqn[1].substring(0, 3) === 'Cfn') {
      continue;
    }
    // Ignore IXxx Interfaces
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
 * Insert an example into the docs if it does not already have an example.
 * Returns true if an example is inserted, false otherwise.
 */
function insertExample(example: string, type: spec.Type): boolean {
  if (type.docs?.example) {
    return false;
  }
  if (type.docs) {
    type.docs.example = example;
  } else {
    type.docs = { example: example };
  }
  return true;
}

/**
 * Returns a map of fqns to a list of keys that represent snippets that include the fqn.
 */
function mapFqns(tab: LanguageTablet): Record<string, TranslatedSnippet[]> {
  const fqnsReferencedMap = new DefaultRecord<TranslatedSnippet>();

  for (const key of tab.snippetKeys) {
    const snippet = tab.tryGetSnippet(key)!;
    for (const fqn of snippet.fqnsReferenced) {
      fqnsReferencedMap.add(fqn, snippet);
    }
  }
  return fqnsReferencedMap.index;
}

function makeDict<A>(xs: Array<readonly [string, A]>): Record<string, A> {
  const ret: Record<string, A> = {};
  for(const [str, a] of xs) {
    ret[str] = a;
  }
  return ret;
}

function longest(snippets: TranslatedSnippet[]): TranslatedSnippet {
  if (snippets.length < 1) {
    throw new Error('uh oh, this should not happen');
  }
  return snippets.reduce((x, y) => {
    return x.originalSource.source.length >= y.originalSource.source.length ? x : y;
  });
}

function shortest(snippets: TranslatedSnippet[]): TranslatedSnippet {
  if (snippets.length < 1) {
    throw new Error('uh oh, this should not happen');
  }
  return snippets.reduce((x, y) => {
    return x.originalSource.source.length <= y.originalSource.source.length ? x : y;
  });
}

function first(snippets: TranslatedSnippet[]): TranslatedSnippet {
  if (snippets.length < 1) {
    throw new Error('first: array cannot be empty');
  }
  return snippets[0];
}

/**
 * Finds the mean sparse vector of available snippets for each type.
 */
function mean(snippets: TranslatedSnippet[]): TranslatedSnippet {
  if (snippets.length === 0) {
    throw new Error('mean: array cannot be empty');
  }
  
  // Return example if there is only 1
  if (snippets.length === 1) {
    return snippets[0];
  }

  // Find mean counter.
  const counters: Array<Record<string, number>> = [];
  const associatedSnippets: TranslatedSnippet[] = [];
  for (const snippet of snippets) {
    counters.push(snippet.syntaxKindCounter);
    associatedSnippets.push(snippet);
  }
  const center = findCenter(counters);

  // Find counter with closest euclidian distance.
  let minDistance = Number.MAX_VALUE;
  let closestSnippet = snippets[0];

  for (let i = 0; i < counters.length; i++) {
    const counter = counters[i];
    const distance = euclideanDistance(center, counter);
    if (distance < minDistance) {
      minDistance = distance;
      closestSnippet = associatedSnippets[i];
    }
  }
  return closestSnippet;
}

/**
 * Given a list of Records, outputs a Record that averages all the items in each Record.
 */
function findCenter(counters: Array<Record<string, number>>): Record<string, number> {
  const centerCounter: Record<string, number> = {};
  for (const counter of counters) {
    Object.entries(counter).map(([key, value]) => {
      centerCounter[key] = value + (centerCounter[key] ?? 0);
    });
  }
  const total = counters.length;
  Object.entries(centerCounter).map(([key, value]) => {
    centerCounter[key] = value / total;
  });
  return centerCounter;
}

/**
 * Finds the euclidean distance between two sparce vectors.
 * !!! This function assumes that the center parameter is a superset of the counter parameter. !!!
 */
function euclideanDistance(center: Record<string, number>, counter: Record<string, number>): number {
  const individualDistances: number[] = [];
  Object.entries(center).map(([key, value]) => {
    individualDistances.push(value - (counter[key] ?? 0));
  });
  return individualDistances.reduce((acc, curr) => acc + Math.sqrt(Math.pow(curr, 2)));
}
