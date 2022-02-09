import * as spec from '@jsii/spec';
import * as fs from 'fs-extra';
import * as path from 'path';

import {
  loadAssemblies,
  replaceAssembly,
  loadAllDefaultTablets,
  LoadedAssembly,
  allTypeScriptSnippets,
} from '../jsii/assemblies';
import { renderMetadataline, TypeScriptSnippet } from '../snippet';
import { SnippetSelector, mean, meanLength, shortest, longest } from '../snippet-selectors';
import { snippetKey } from '../tablets/key';
import { LanguageTablet, TranslatedSnippet, DEFAULT_TABLET_NAME } from '../tablets/tablets';
import { isDefined, mkDict, indexBy } from '../util';

export interface InfuseResult {
  readonly coverageResults: Record<string, InfuseTypes>;
}

export interface InfuseTypes {
  readonly types: number;
  readonly typesWithInsertedExamples: number;
}

export interface InfuseOptions {
  readonly logFile?: string;

  /**
   * Where to read additional translations
   */
  readonly cacheFromFile?: string;

  /**
   * In addition to the implicit tablets, also write all added examples to this additional output tablet
   */
  readonly cacheToFile?: string;
}

export const DEFAULT_INFUSION_RESULTS_NAME = 'infusion-results.html';

const ADDITIONAL_SELECTORS: Record<string, SnippetSelector> = { meanLength, shortest, longest };

class DefaultRecord<A> {
  public readonly index: Record<string, A[]> = {};

  public add(key: string, value: A) {
    if (!this.index[key]) {
      this.index[key] = [];
    }
    this.index[key].push(value);
  }
}

/**
 * Infuse will analyze the snippets in a set of tablets, and update the assembly to add
 * examples to types that don't have any yet, based on snippets that use the given type.
 */
export async function infuse(assemblyLocations: string[], options?: InfuseOptions): Promise<InfuseResult> {
  let stream: fs.WriteStream | undefined = undefined;
  if (options?.logFile) {
    // Create stream for html file and insert some styling
    stream = fs.createWriteStream(options.logFile, { encoding: 'utf-8' });
    startFile(stream);
  }

  // Load tablet file and assemblies
  const assemblies = await loadAssemblies(assemblyLocations, false);
  const defaultTablets = await loadAllDefaultTablets(assemblies);

  const availableTranslations = new LanguageTablet();
  if (options?.cacheFromFile) {
    availableTranslations.addTablet(await LanguageTablet.fromOptionalFile(options.cacheFromFile));
  }
  availableTranslations.addTablets(...Object.values(defaultTablets));

  const { translationsByFqn, originalsByKey } = await availableSnippetsPerFqn(assemblies, availableTranslations);

  const additionalOutputTablet = options?.cacheToFile
    ? await LanguageTablet.fromOptionalFile(options?.cacheToFile)
    : new LanguageTablet();

  const coverageResults = mkDict(
    await Promise.all(
      assemblies.map(async ({ assembly, directory }) => {
        stream?.write(`<h1>${assembly.name}</h1>\n`);

        const implicitTablet = defaultTablets[directory];
        if (!implicitTablet) {
          throw new Error(`No tablet found for ${directory}`);
        }

        let insertedExamples = 0;
        const filteredTypes = filterForTypesWithoutExamples(assembly.types ?? {});
        for (const [typeFqn, type] of Object.entries(filteredTypes)) {
          const available = translationsByFqn[typeFqn];
          if (!available) {
            continue;
          }

          const example = pickBestExample(typeFqn, available, stream);
          const original = originalsByKey[example.key];
          insertExample(example, original, type, [implicitTablet, additionalOutputTablet]);
          insertedExamples++;
        }

        if (insertedExamples > 0) {
          // Save the updated assembly and implicit tablets
          // eslint-disable-next-line no-await-in-loop
          await Promise.all([
            replaceAssembly(assembly, directory),
            implicitTablet.save(path.join(directory, DEFAULT_TABLET_NAME)),
          ]);
        }

        return [
          directory,
          {
            types: Object.keys(filteredTypes).length,
            typesWithInsertedExamples: insertedExamples,
          } as InfuseTypes,
        ] as const;
      }),
    ),
  );

  stream?.close();

  // If we copied examples onto different types, we'll also have inserted new snippets
  // with different keys into the tablet. We must now write the updated tablet somewhere.
  if (options?.cacheToFile) {
    await additionalOutputTablet.save(options.cacheToFile);
  }

  return {
    coverageResults: coverageResults,
  };
}

function pickBestExample(typeFqn: string, choices: TranslatedSnippet[], logStream?: fs.WriteStream) {
  const meanResult = mean(choices);
  if (logStream) {
    const selected = Object.entries(ADDITIONAL_SELECTORS).map(([name, fn]) => [name, fn(choices)] as const);
    const selectedFromSelector = {
      ...makeDict(selected),
      mean: meanResult,
    };
    logOutput(logStream, typeFqn, createHtmlEntry(selectedFromSelector));
  }
  return meanResult;
}

function startFile(stream: fs.WriteStream) {
  stream.write('<style>\n');
  stream.write('h2 { color: blue; clear: both; }\n');
  stream.write('h1 { color: red; clear: both; }\n');
  stream.write(
    'div { float: left; height: 31em; width: 22em; overflow: auto; margin: 1em; background-color: #ddd; }\n',
  );
  stream.write(
    'pre { float: left; height: 30em; width: 25em; overflow: auto; padding: 0.5em; background-color: #ddd; }\n',
  );
  stream.write('</style>\n');
}

function createHtmlEntry(results: Record<string, TranslatedSnippet>): Record<string, string[]> {
  const entry = new DefaultRecord<string>();
  for (const [key, value] of Object.entries(results)) {
    entry.add(value.originalSource.source, key);
  }
  return entry.index;
}

function logOutput(stream: fs.WriteStream | undefined, typeFqn: string, algorithmMap: Record<string, string[]>) {
  stream?.write(`<h2>${typeFqn}</h2>\n`);
  for (const [key, value] of Object.entries(algorithmMap)) {
    stream?.write(`<div class="snippet"><h3>${value.toString()}</h3>\n<pre>${key}</pre>\n</div>\n`);
  }
  for (let i = 0; i < 4 - Object.keys(algorithmMap).length; i++) {
    stream?.write('<div class="padding"></div>\n');
  }
}

function filterForTypesWithoutExamples(types: { [fqn: string]: spec.Type }): Record<string, spec.Type> {
  const filteredTypes: Record<string, spec.Type> = {};
  for (const [typeFqn, type] of Object.entries(types)) {
    // Ignore Interfaces that contain only properties
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
 * Insert an example into the docs of a type, and insert it back into the tablet under a new key
 */
function insertExample(
  example: TranslatedSnippet,
  original: TypeScriptSnippet | undefined,
  type: spec.Type,
  tablets: LanguageTablet[],
): void {
  const parameters = {
    ...original?.parameters,
    infused: '',
  };
  // exampleMetadata should always be nonempty since we always have a parameter.
  const exampleMetadata = renderMetadataline(parameters) ?? '';

  if (type.docs) {
    type.docs.example = example.originalSource.source;
    type.docs.custom = { ...type.docs.custom, exampleMetadata };
  } else {
    type.docs = {
      example: example.originalSource.source,
      custom: { exampleMetadata },
    };
  }

  for (const tablet of tablets) {
    tablet.addSnippet(
      example.withLocation({
        api: { api: 'type', fqn: type.fqn },
        field: { field: 'example' },
      }),
    );
  }
}

/**
 * Return a map of FQN -> snippet keys that exercise that FQN.
 *
 * For a snippet to qualify, it must both:
 *
 * a) be current (i.e.: exist in the input assemblies)
 * b) have been analyzed (i.e.: exist in one of the translated tablets)
 *
 * Returns a map of fqns to a list of keys that represent snippets that include the fqn.
 */
async function availableSnippetsPerFqn(asms: readonly LoadedAssembly[], translationsTablet: LanguageTablet) {
  const ret = new DefaultRecord<TranslatedSnippet>();

  const originalsByKey = indexBy(await allTypeScriptSnippets(asms), snippetKey);

  const translations = Object.keys(originalsByKey)
    .map((key) => translationsTablet.tryGetSnippet(key))
    .filter(isDefined);

  for (const trans of translations) {
    for (const fqn of trans.snippet.fqnsReferenced ?? []) {
      ret.add(fqn, trans);
    }
  }

  return { originalsByKey, translationsByFqn: ret.index };
}

function makeDict<A>(xs: Array<readonly [string, A]>): Record<string, A> {
  const ret: Record<string, A> = {};
  for (const [str, a] of xs) {
    ret[str] = a;
  }
  return ret;
}
