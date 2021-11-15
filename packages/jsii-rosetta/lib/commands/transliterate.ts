import { Assembly, Docs, SPEC_FILE_NAME, Type, TypeKind } from '@jsii/spec';
import { readJson, writeJson } from 'fs-extra';
import { resolve } from 'path';

import { fixturize } from '../fixtures';
import { TargetLanguage } from '../languages';
import { debug } from '../logging';
import { RosettaTabletReader, UnknownSnippetMode } from '../rosetta-reader';
import { SnippetParameters, typeScriptSnippetFromSource, ApiLocation } from '../snippet';
import { Translation } from '../tablets/tablets';

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
  const rosetta = new RosettaTabletReader({
    includeCompilerDiagnostics: true,
    unknownSnippets: UnknownSnippetMode.TRANSLATE,
    loose: options.loose,
    targetLanguages,
  });
  if (options.tablet) {
    await rosetta.loadTabletFromFile(options.tablet);
  }
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
          (translation) => ({
            language: translation.language,
            source: prefixDisclaimer(translation),
          }),
          location,
        );
      }
      for (const type of Object.values(result.types ?? {})) {
        transliterateType(type, rosetta, language, location, options.loose);
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

type Mutable<T> = { -readonly [K in keyof T]: Mutable<T[K]> };
type AssemblyLoader = () => Promise<Mutable<Assembly>>;

function prefixDisclaimer(translation: Translation): string {
  const comment = commentToken();
  const disclaimer = translation.didCompile
    ? 'This example was automatically transliterated.'
    : 'This example was automatically transliterated with incomplete type information. It may not work as-is.';

  return [
    `${comment} ${disclaimer}`,
    `${comment} See https://github.com/aws/jsii/issues/826 for more information.`,
    '',
    translation.source,
  ].join('\n');

  function commentToken() {
    // This is future-proofed a bit, but don't read too much in this...
    switch (translation.language) {
      case 'python':
      case 'ruby':
        return '#';
      case 'csharp':
      case 'java':
      case 'go':
      default:
        return '//';
    }
  }
}

function transliterateType(
  type: Type,
  rosetta: RosettaTabletReader,
  language: TargetLanguage,
  workingDirectory: string,
  loose = false,
): void {
  transliterateDocs({ api: 'type', fqn: type.fqn }, type.docs, workingDirectory);
  switch (type.kind) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore 7029
    case TypeKind.Class:
      if (type.initializer) {
        transliterateDocs({ api: 'initializer', fqn: type.fqn }, type.initializer.docs, workingDirectory);
      }

    // fallthrough
    case TypeKind.Interface:
      for (const method of type.methods ?? []) {
        transliterateDocs({ api: 'member', fqn: type.fqn, memberName: method.name }, method.docs, workingDirectory);
        for (const parameter of method.parameters ?? []) {
          transliterateDocs(
            { api: 'parameter', fqn: type.fqn, methodName: method.name, parameterName: parameter.name },
            parameter.docs,
            workingDirectory,
          );
        }
      }
      for (const property of type.properties ?? []) {
        transliterateDocs({ api: 'member', fqn: type.fqn, memberName: property.name }, property.docs, workingDirectory);
      }
      break;

    case TypeKind.Enum:
      for (const member of type.members) {
        transliterateDocs({ api: 'member', fqn: type.fqn, memberName: member.name }, member.docs, workingDirectory);
      }
      break;

    default:
      throw new Error(`Unsupported type kind: ${(type as any).kind}`);
  }

  function transliterateDocs(api: ApiLocation, docs: Docs | undefined, workingDirectory: string) {
    if (docs?.remarks) {
      docs.remarks = rosetta.translateSnippetsInMarkdown(
        api,
        docs.remarks,
        language,
        true /* strict */,
        (translation) => ({
          language: translation.language,
          source: prefixDisclaimer(translation),
        }),
        workingDirectory,
      );
    }

    if (docs?.example) {
      const location = { api, field: { field: 'example' } } as const;
      const snippet = fixturize(
        typeScriptSnippetFromSource(docs.example, location, true /* strict */, {
          [SnippetParameters.$PROJECT_DIRECTORY]: workingDirectory,
        }),
        loose,
      );
      const translation = rosetta.translateSnippet(snippet, language);
      if (translation != null) {
        docs.example = prefixDisclaimer(translation);
      }
    }
  }
}
