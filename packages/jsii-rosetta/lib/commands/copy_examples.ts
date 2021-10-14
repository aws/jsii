import { loadAssemblies } from '../jsii/assemblies';
import { LanguageTablet } from '../tablets/tablets';

export async function copyExamples(assemblyLocations: string[], tabletFile: string) {
  const tab = new LanguageTablet();
  await tab.load(tabletFile);

  const fqnsReferencedMap = mapFqns(tab);
  console.log(fqnsReferencedMap);

  console.log(assemblyLocations);
  await loadAssemblies(assemblyLocations, true);

}

function mapFqns(tab: LanguageTablet,) {
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