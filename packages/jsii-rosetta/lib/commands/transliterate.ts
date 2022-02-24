import { Assembly, Docs, SPEC_FILE_NAME, Type, TypeKind } from '@jsii/spec';
import { readJson, writeJson } from 'fs-extra';
import { resolve } from 'path';

import { TargetLanguage } from '../languages';
import { debug } from '../logging';
import { RosettaTabletReader, UnknownSnippetMode } from '../rosetta-reader';
import { typeScriptSnippetFromVisibleSource, ApiLocation } from '../snippet';
import { Mutable } from '../util';
import { extractSnippets } from './extract';

export interface TransliterateAssemblyOptions {
  /**
   * Whether to ignore any missing fixture files or literate markdown documents
   * referenced by the assembly, instead of failing.
   *
   * @default false
   */
  readonly loose?: boolean;

  /**
   * Whether transliteration should fail upon failing to compile an example that
   * required live transliteration.
   *
   * @default false
   */
  readonly strict?: boolean;

  /**
   * A pre-build translation tablet (as produced by `jsii-rosetta extract`).
   *
   * @default - Only the default tablet (`.jsii.tabl.json`) files will be used.
   */
  readonly tablet?: string;
}

/**
 * Prepares transliterated versions of the designated assemblies into the
 * selected taregt languages.
 *
 * @param assemblyLocations the directories which contain assemblies to
 *                          transliterate.
 * @param targetLanguages   the languages into which to transliterate.
 * @param tabletLocation    an optional Rosetta tablet file to source
 *                          pre-transliterated snippets from.
 *
 * @experimental
 */
export async function transliterateAssembly(
  assemblyLocations: readonly string[],
  targetLanguages: readonly TargetLanguage[],
  options: TransliterateAssemblyOptions = {},
): Promise<void> {
  // Start by doing an 'extract' for all these assemblies
  //
  // This will locate all examples that haven't been translated yet and translate
  // them. Importantly: it will translate them in parallel, which is going to improve
  // performance a lot. We ignore diagnostics.
  const { tablet } = await extractSnippets(assemblyLocations, {
    includeCompilerDiagnostics: true,
    loose: options.loose,
    cacheFromFile: options.tablet,
    writeToImplicitTablets: false,
    allowDirtyTranslations: true,
  });

  // Now do a regular "tablet reader" cycle, expecting everything to be translated already,
  // and therefore it doesn't matter that we do this all in a single-threaded loop.
  const rosetta = new RosettaTabletReader({
    unknownSnippets: UnknownSnippetMode.FAIL,
    targetLanguages,
    prefixDisclaimer: true,
  });
  // Put in the same caching tablet here
  if (options.tablet) {
    await rosetta.loadTabletFromFile(options.tablet);
  }
  // Any fresh translations we just came up with
  rosetta.addTablet(tablet);

  const assemblies = await loadAssemblies(assemblyLocations, rosetta);

  for (const [location, loadAssembly] of assemblies.entries()) {
    for (const language of targetLanguages) {
      const now = new Date().getTime();
      // eslint-disable-next-line no-await-in-loop
      const result = await loadAssembly();
      if (result.readme?.markdown) {
        result.readme.markdown = rosetta.translateSnippetsInMarkdown(
          { api: 'moduleReadme', moduleFqn: result.name },
          result.readme.markdown,
          language,
          true /* strict */,
        );
      }
      for (const type of Object.values(result.types ?? {})) {
        transliterateType(type, rosetta, language);
      }
      // eslint-disable-next-line no-await-in-loop
      await writeJson(resolve(location, `${SPEC_FILE_NAME}.${language}`), result, { spaces: 2 });
      const then = new Date().getTime();
      debug(`Done transliterating ${result.name}@${result.version} to ${language} after ${then - now} milliseconds`);
    }
  }

  rosetta.printDiagnostics(process.stderr);
  if (rosetta.hasErrors && options.strict) {
    throw new Error('Strict mode is enabled and some examples failed compilation!');
  }
}

/**
 * Given a set of directories containing `.jsii` assemblies, load all the
 * assemblies into the provided `Rosetta` instance and return a map of
 * directories to assembly-loading functions (the function re-loads the original
 * assembly from disk on each invocation).
 *
 * @param directories the assembly-containing directories to traverse.
 * @param rosetta     the `Rosetta` instance in which to load assemblies.
 *
 * @returns a map of directories to a function that loads the `.jsii` assembly
 *          contained therein from disk.
 */
async function loadAssemblies(
  directories: readonly string[],
  rosetta: RosettaTabletReader,
): Promise<ReadonlyMap<string, AssemblyLoader>> {
  const result = new Map<string, AssemblyLoader>();

  for (const directory of directories) {
    const loader = () => readJson(resolve(directory, SPEC_FILE_NAME));
    // eslint-disable-next-line no-await-in-loop
    await rosetta.addAssembly(await loader(), directory);
    result.set(directory, loader);
  }

  return result;
}

type AssemblyLoader = () => Promise<Mutable<Assembly>>;

function transliterateType(type: Type, rosetta: RosettaTabletReader, language: TargetLanguage): void {
  transliterateDocs({ api: 'type', fqn: type.fqn }, type.docs);
  switch (type.kind) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore 7029
    case TypeKind.Class:
      if (type.initializer) {
        transliterateDocs({ api: 'initializer', fqn: type.fqn }, type.initializer.docs);
      }

    // fallthrough
    case TypeKind.Interface:
      for (const method of type.methods ?? []) {
        transliterateDocs({ api: 'member', fqn: type.fqn, memberName: method.name }, method.docs);
        for (const parameter of method.parameters ?? []) {
          transliterateDocs(
            { api: 'parameter', fqn: type.fqn, methodName: method.name, parameterName: parameter.name },
            parameter.docs,
          );
        }
      }
      for (const property of type.properties ?? []) {
        transliterateDocs({ api: 'member', fqn: type.fqn, memberName: property.name }, property.docs);
      }
      break;

    case TypeKind.Enum:
      for (const member of type.members) {
        transliterateDocs({ api: 'member', fqn: type.fqn, memberName: member.name }, member.docs);
      }
      break;

    default:
      throw new Error(`Unsupported type kind: ${(type as any).kind}`);
  }

  function transliterateDocs(api: ApiLocation, docs: Docs | undefined) {
    if (docs?.remarks) {
      docs.remarks = rosetta.translateSnippetsInMarkdown(api, docs.remarks, language, true /* strict */);
    }

    if (docs?.example) {
      const location = { api, field: { field: 'example' } } as const;
      const snippet = typeScriptSnippetFromVisibleSource(docs.example, location, true /* strict */);
      const translation = rosetta.translateSnippet(snippet, language);
      if (translation != null) {
        docs.example = translation.source;
      }
    }
  }
}
