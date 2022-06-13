import { loadAssemblies, allTypeScriptSnippets, loadAllDefaultTablets } from '../jsii/assemblies';
import * as logging from '../logging';
import { RosettaTranslator } from '../rosetta-translator';
import { formatLocation } from '../snippet';

export async function checkCoverage(assemblyLocations: readonly string[]): Promise<void> {
  logging.info(`Loading ${assemblyLocations.length} assemblies`);
  const assemblies = await loadAssemblies(assemblyLocations, false);

  const snippets = Array.from(await allTypeScriptSnippets(assemblies, true));

  const translator = new RosettaTranslator({
    assemblies: assemblies.map((a) => a.assembly),
    allowDirtyTranslations: true,
  });
  translator.addTabletsToCache(...Object.values(await loadAllDefaultTablets(assemblies)));

  process.stdout.write(`- ${snippets.length} total snippets.\n`);
  process.stdout.write(`- ${translator.cache.count} translations in cache.\n`);
  process.stdout.write('\n');

  const results = translator.readFromCache(snippets, true, true);
  process.stdout.write(`- ${results.translations.length - results.dirtyCount} successful cache hits.\n`);
  process.stdout.write(`     ${results.infusedCount} infused.\n`);
  process.stdout.write(`- ${results.dirtyCount} translations in cache but dirty (ok for pacmak, transliterate)\n`);
  process.stdout.write(`     ${results.dirtySourceCount} sources have changed.\n`);
  process.stdout.write(`     ${results.dirtyTranslatorCount} translator has changed.\n`);
  process.stdout.write(`     ${results.dirtyTypesCount} types have changed.\n`);
  process.stdout.write(`     ${results.dirtyDidntCompile} did not successfully compile.\n`);
  process.stdout.write(`- ${results.remaining.length} snippets untranslated.\n`);

  for (const remaining of results.remaining) {
    process.stdout.write(`     ${formatLocation(remaining.location)}\n`);
  }
}
