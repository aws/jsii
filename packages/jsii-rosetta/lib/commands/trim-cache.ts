import { loadAssemblies, allTypeScriptSnippets } from '../jsii/assemblies';
import * as logging from '../logging';
import { snippetKey } from '../tablets/key';
import { LanguageTablet } from '../tablets/tablets';
import { isDefined } from '../util';

export interface TrimCacheOptions {
  /**
   * Locations of assemblies to search for snippets
   */
  readonly assemblyLocations: string[];

  /**
   * Cache to trim
   */
  readonly cacheFile: string;
}

export async function trimCache(options: TrimCacheOptions): Promise<void> {
  logging.info(`Loading ${options.assemblyLocations.length} assemblies`);
  const assemblies = await loadAssemblies(options.assemblyLocations, false);

  const snippets = Array.from(await allTypeScriptSnippets(assemblies));

  const original = await LanguageTablet.fromFile(options.cacheFile);
  const updated = new LanguageTablet();
  updated.addSnippets(...snippets.map((snip) => original.tryGetSnippet(snippetKey(snip))).filter(isDefined));
  await updated.save(options.cacheFile);

  // eslint-disable-next-line prettier/prettier
  logging.info(`${options.cacheFile}: ${updated.count} snippets remaining (${original.count} - ${updated.count} trimmed)`);
}
