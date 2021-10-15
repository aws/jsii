import { loadAssemblies } from '../jsii/assemblies';
import { LanguageTablet } from '../tablets/tablets';

export async function copyExamples(assemblyLocations: string[], tabletFile: string) {
  const tab = new LanguageTablet();
  await tab.load(tabletFile);

  const fqnsReferencedMap = mapFqns(tab);
  const assemblies = await loadAssemblies(assemblyLocations, true);
  for (const { assembly } of assemblies) {
    const types = assembly.types ?? {};
    const filteredTypes = filterForTypesWithoutExamples(types);
    console.log(Object.keys(filteredTypes).length);
    for (const typeFqn in filteredTypes) {
      console.log(typeFqn);
      if (fqnsReferencedMap[typeFqn] !== undefined) {
        const typeKey = fqnsReferencedMap[typeFqn][0];
        const result = tab.tryGetSnippet(typeKey);
        console.log(typeFqn, result?.originalSource);
      }
    }
  }
}

function filterForTypesWithoutExamples(types: any) {
  const filteredTypes: Record<string, any> = {};
  for (const type in types) {
    // Filter for acceptable kinds without an example in the docs
    const kinds = new Set(["class", "interface", "enum"]);
    if (kinds.has(types[type].kind) && types[type].docs?.example === undefined) {
      filteredTypes[type] = types[type];
    }
  }
  return filteredTypes;
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