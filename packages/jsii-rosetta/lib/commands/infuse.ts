import * as spec from '@jsii/spec';
import * as fs from 'fs-extra';
import * as path from 'path';

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

export async function infuse(assemblyLocations: string[], tabletFile: string): Promise<InfusionResult> {
  const tab = new LanguageTablet();
  await tab.load(tabletFile);

  const resultMap: Record<string, Infusion> = {};

  const fqnsReferencedMap = mapFqns(tab);
  const assemblies = await loadAssemblies(assemblyLocations, true);
  for (const { assembly, directory } of assemblies) {
    const stream = fs.createWriteStream(path.join(directory, 'kaizen.html'), { flags: 'a' });
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
        if (fqnsReferencedMap[typeFqn] !== undefined) {
          const meanResult = tab.tryGetSnippet(mean(tab, fqnsReferencedMap[typeFqn]));
          const firstResult = tab.tryGetSnippet(first(tab, fqnsReferencedMap[typeFqn]));
          const shortestResult = tab.tryGetSnippet(shortest(tab, fqnsReferencedMap[typeFqn]));
          const longestResult = tab.tryGetSnippet(longest(tab, fqnsReferencedMap[typeFqn]));
          if (meanResult !== firstResult || meanResult !== shortestResult || meanResult !== longestResult) {
            void logDiscrepancies(stream, typeFqn, [meanResult, firstResult, shortestResult, longestResult]);
          }
          if (meanResult) {
            const insertSuccess = insertExample(meanResult.originalSource.source, types[typeFqn]);
            if (insertSuccess) {
              infusion.insertedExampleFqns.push(typeFqn);
            } else {
              infusion.hadExampleFqns.push(typeFqn);
            }
          }
        }
      }
    }
    void replaceAssembly(assembly, directory);
    resultMap[directory] = infusion;
  }
  return {
    resultMap: resultMap,
  };
}

function filterForTypesWithoutExamples(types: any): Record<string, any> {
  const filteredTypes: Record<string, any> = {};
  for (const typeFqn in types) {
    // Ignore Cfn types if possible
    const splitFqn = typeFqn.split('.');
    if (splitFqn.length >= 2 && splitFqn[1].length >= 3 && splitFqn[1].substring(0, 3) === 'Cfn') {
      continue;
    }
    // Filter for acceptable kinds without an example in the docs
    const kinds = new Set(['class', 'interface', 'enum']);
    if (kinds.has(types[typeFqn].kind) && types[typeFqn].docs?.example === undefined) {
      filteredTypes[typeFqn] = types[typeFqn];
    }
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
function mapFqns(tab: LanguageTablet): Record<string, string[]> {
  const fqnsReferencedMap: Record<string, string[]> = {};

  for (const key of tab.snippetKeys) {
    const snippet = tab.tryGetSnippet(key)!;
    for (const fqn of snippet.fqnsReferenced) {
      if (fqnsReferencedMap[fqn]) {
        fqnsReferencedMap[fqn].push(key);
      } else {
        fqnsReferencedMap[fqn] = [key];
      }
    }
  }
  return fqnsReferencedMap;
}

function logDiscrepancies(stream: fs.WriteStream, fqn: string, snippets: Array<TranslatedSnippet | undefined>) {
  stream.write(`<h2>fqn: ${fqn}</h2>\n`);
  stream.write(`\t<h2>snippets:</h2>\n`);
  const snippetNames = ['mean', 'first', 'shortest', 'longest'];
  for (let i = 0; i < snippets.length; i++) {
    stream.write(`\t\t<p><b>${snippetNames[i]}</b>: ${snippets[i]?.originalSource.source}</p>\n`);
  }
  stream.write('\n----------------\n');
}

function longest(tab: LanguageTablet, keys: string[]): string {
  if (keys.length < 1) {
    throw new Error('uh oh, this should not happen');
  }
  let keyOfLongestExample = keys[0];
  let length = tab.tryGetSnippet(keys[0])?.originalSource.source.length ?? 0;
  for (const key of keys) {
    const snippet = tab.tryGetSnippet(key);
    if (snippet && snippet.originalSource.source.length > length) {
      length = snippet.originalSource.source.length;
      keyOfLongestExample = key;
    }
  }
  return keyOfLongestExample;
}

function shortest(tab: LanguageTablet, keys: string[]): string {
  if (keys.length < 1) {
    throw new Error('uh oh, this should not happen');
  }
  let keyOfShortestExample = keys[0];
  let length = tab.tryGetSnippet(keys[0])?.originalSource.source.length ?? 0;
  for (const key of keys) {
    const snippet = tab.tryGetSnippet(key);
    if (snippet && snippet.originalSource.source.length < length) {
      length = snippet.originalSource.source.length;
      keyOfShortestExample = key;
    }
  }
  return keyOfShortestExample;
}

function first(_tab: LanguageTablet, keys: string[]): string {
  if (keys.length < 1) {
    throw new Error('uh oh, this should not happen');
  }
  return keys[0];
}

/**
 * Finds the mean sparse vector of available snippets for each type.
 */
function mean(tab: LanguageTablet, keys: string[]): string {
  // Return example if there is only 1
  if (keys.length === 1) {
    return keys[0];
  }

  // Find mean counter.
  const counters: Array<Record<string, number>> = [];
  const associatedKeys: string[] = [];
  for (const key of keys) {
    const snippet = tab.tryGetSnippet(key);
    if (snippet) {
      counters.push(snippet.syntaxKindCounter);
      associatedKeys.push(key);
    }
  }
  const center = findCenter(counters);

  // Find counter with closest euclidian distance.
  let minDistance = Number.MAX_VALUE;
  let keyOfClosestCounter = keys[0];

  for (let i = 0; i < counters.length; i++) {
    const counter = counters[i];
    const distance = euclideanDistance(center, counter);
    if (distance < minDistance) {
      minDistance = distance;
      keyOfClosestCounter = associatedKeys[i];
    }
  }
  return keyOfClosestCounter;
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
