import * as spec from '@jsii/spec';

import { loadAssemblies, replaceAssembly } from '../jsii/assemblies';
import { LanguageTablet } from '../tablets/tablets';

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
          const result = tab.tryGetSnippet(mean(tab, fqnsReferencedMap[typeFqn]));
          if (result) {
            const insertSuccess = insertExample(result.originalSource.source, types[typeFqn]);
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
    for (const [key, value] of Object.entries(counter)) {
      centerCounter[key] = value + (centerCounter[key] ?? 0);
    }
  }
  const total = counters.length;
  for (const [key, value] of Object.entries(centerCounter)) {
    centerCounter[key] = value / total;
  }
  return centerCounter;
}

// TODO: Document asymmetricality
function euclideanDistance(center: Record<string, number>, counter: Record<string, number>): number {
  const individualDistances = [];
  for (const [key, value] of Object.entries(center)) {
    individualDistances.push(value - (counter[key] ?? 0));
  }
  return individualDistances.reduce((acc, curr) => acc + Math.sqrt(Math.pow(curr, 2)));
}
