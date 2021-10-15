import * as spec from '@jsii/spec';

import { loadAssemblies, replaceAssembly } from '../jsii/assemblies';
import { LanguageTablet } from '../tablets/tablets';

export interface CopyResult {
  exampleCountMap: Record<string, number>;
}

export async function copyExamples(assemblyLocations: string[], tabletFile: string): Promise<CopyResult> {
  const tab = new LanguageTablet();
  await tab.load(tabletFile);

  const exampleCountMap: Record<string, number> = {};

  const fqnsReferencedMap = mapFqns(tab);
  const assemblies = await loadAssemblies(assemblyLocations, true);
  for (const { assembly, directory } of assemblies) {
    let exampleCount = 0;
    const types = assembly.types;
    if (types) {
      const filteredTypes = filterForTypesWithoutExamples(types);
      for (const typeFqn in filteredTypes) {
        if (fqnsReferencedMap[typeFqn] !== undefined) {
          const typeKey = fqnsReferencedMap[typeFqn][0];
          const result = tab.tryGetSnippet(typeKey);
          if (result) {
            insertExample(result.originalSource.source, typeFqn, types);
            exampleCount = exampleCount + 1;
          }
        }
      }
    }
    exampleCountMap[directory] = exampleCount;
    void replaceAssembly(assembly, directory);
  }
  return {
    exampleCountMap,
  };
}

function filterForTypesWithoutExamples(types: any) {
  const filteredTypes: Record<string, any> = {};
  for (const typeFqn in types) {
    // Filter for acceptable kinds without an example in the docs
    const kinds = new Set(['class', 'interface', 'enum']);
    if (kinds.has(types[typeFqn].kind) && types[typeFqn].docs?.example === undefined) {
      filteredTypes[typeFqn] = types[typeFqn];
    }
  }
  return filteredTypes;
}

function insertExample(example: string, typeFqn: string, types: { [fqn: string]: spec.Type }) {
  if (types[typeFqn].docs) {
    types[typeFqn].docs!.example = example;
  } else {
    types[typeFqn].docs = { example: example };
  }
}

// TODO: modify to record only the largest snippet
function mapFqns(tab: LanguageTablet) {
  const fqnsReferencedMap: Record<string, string[]> = {};

  for (const key of tab.snippetKeys) {
    for (const fqn of tab.tryGetSnippet(key)!.fqnsReferenced) {
      if (fqnsReferencedMap[fqn]) {
        fqnsReferencedMap[fqn].push(key);
      } else {
        fqnsReferencedMap[fqn] = [key];
      }
    }
  }
  return fqnsReferencedMap;
}
