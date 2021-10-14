import { loadAssemblies } from '../jsii/assemblies';
import { LanguageTablet } from '../tablets/tablets';
import * as spec from '@jsii/spec';

export async function copyExamples(assemblyLocations: string[], tabletFile: string) {
  const tab = new LanguageTablet();
  await tab.load(tabletFile);

  const fqnsReferencedMap = mapFqns(tab);
  //console.log(fqnsReferencedMap);

  //console.log(assemblyLocations);
  const assemblies = await loadAssemblies(assemblyLocations, true);
  for (const a of assemblies) {
    const assembly: spec.Assembly = a.assembly;
    const types = assembly.types!;
    const classes = filterForClassesWithoutExamples(types);
    console.log(Object.keys(classes).length);
    for (const classFqn in classes) {
      console.log(classFqn);
      if (fqnsReferencedMap[classFqn] !== undefined) {
        const classKey = fqnsReferencedMap[classFqn][0];
        const result = tab.tryGetSnippet(classKey);
        console.log(classFqn, result?.originalSource);
      }
    }
  }
}

function filterForClassesWithoutExamples(types: any) {
  const classes: Record<string, any> = {};
  for (const type in types) {
    // TODO: expand on other kinds and clean up the if statement
    if (types[type].kind === "class" && types[type].docs!.example === undefined) {
      classes[type] = types[type];
    }
  }
  return classes;
}

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