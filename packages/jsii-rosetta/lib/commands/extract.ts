import { loadAssemblies, allTypeScriptSnippets } from '../jsii/assemblies';
import logging = require('../logging');
import ts = require('typescript');
import { LanguageTablet } from '../tablets/tablets';
import { Translator } from '../translate';

export interface ExtractResult {
  diagnostics: ts.Diagnostic[];
}

/**
 * Extract all samples from the given assemblies into a tablet
 */
export async function extractSnippets(assemblyLocations: string[], outputFile: string, includeCompilerDiagnostics: boolean): Promise<ExtractResult> {
  logging.info(`Loading ${assemblyLocations.length} assemblies`);
  const assemblies = await loadAssemblies(assemblyLocations);

  const snippets = allTypeScriptSnippets(assemblies);

  const tablet = new LanguageTablet();

  logging.info(`Translating`);
  const startTime = Date.now();

  const translator = new Translator(includeCompilerDiagnostics);

  for (const block of snippets) {
    tablet.addSnippet(translator.translate(block));
  }

  const delta =  (Date.now() - startTime) / 1000;
  logging.info(`Converted ${tablet.count} snippets in ${delta} seconds (${(delta / tablet.count).toPrecision(3)}s/snippet)`);
  logging.info(`Saving language tablet to ${outputFile}`);
  await tablet.save(outputFile);

  return { diagnostics: translator.diagnostics };
}
