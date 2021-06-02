import { Assembly, Docs, SPEC_FILE_NAME, Type, TypeKind } from '@jsii/spec';
import { readJson, writeJson } from 'fs-extra';
import { resolve } from 'path';

import { TargetLanguage } from '../languages';
import { Rosetta } from '../rosetta';
import { typeScriptSnippetFromSource } from '../snippet';
import { Translation } from '../tablets/tablets';

export interface TransliterateAssemblyOptions {
  readonly strict?: boolean;
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
  tabletLocation?: string,
  options: TransliterateAssemblyOptions = {},
): Promise<void> {
  const rosetta = new Rosetta({ liveConversion: true, targetLanguages });
  if (tabletLocation) {
    await rosetta.loadTabletFromFile(tabletLocation);
  }
  const assemblies = await Promise.all(
    assemblyLocations.map(async (assemblyLocation) => {
      const assembly = (await readJson(
        resolve(assemblyLocation, SPEC_FILE_NAME),
      )) as Assembly;
      await rosetta.addAssembly(assembly, assemblyLocation);
      return { assemblyLocation, assembly };
    }),
  ).then((items) =>
    items.reduce((acc, { assemblyLocation, assembly }) => {
      acc.set(assemblyLocation, assembly);
      return acc;
    }, new Map<string, Assembly>()),
  );

  for (const [location, assembly] of assemblies.entries()) {
    console.error(
      `Working on the assembly ${assembly.name}@${assembly.version} at ${location}`,
    );
    for (const language of targetLanguages) {
      const now = new Date().getTime();
      console.error(`- Transliterating to ${language}`);
      const result = mutableCopy(assembly);
      if (result.readme?.markdown) {
        result.readme.markdown = rosetta.translateSnippetsInMarkdown(
          result.readme.markdown,
          language,
          options.strict ?? false,
          (translation) => ({
            language: translation.language,
            source: prefixDisclaimer(translation),
          }),
        );
      }
      for (const type of Object.values(result.types ?? {})) {
        transliterateType(type, rosetta, language, options.strict ?? false);
      }
      // eslint-disable-next-line no-await-in-loop
      await writeJson(
        resolve(location, `${SPEC_FILE_NAME}.${language}`),
        result,
      );
      const then = new Date().getTime();
      console.error(`  => Done after ${then - now} milliseconds`);
    }
  }
}

type Mutable<T> = T extends ReadonlyArray<infer E>
  ? Array<Mutable<E>>
  : T extends Array<infer E>
  ? Array<Mutable<E>>
  : T extends string
  ? T
  : { -readonly [K in keyof T]: Mutable<T[K]> };
function mutableCopy<T>(val: T): Mutable<T> {
  if (val == null || typeof val !== 'object') {
    return val as any;
  }
  if (Array.isArray(val)) {
    return val.map(mutableCopy) as any;
  }
  const result = {} as Mutable<T>;
  for (const [key, value] of Object.entries(val)) {
    (result as any)[key] = mutableCopy(value);
  }
  return result;
}

function prefixDisclaimer(translation: Translation): string {
  const message = translation.didCompile
    ? 'Example automatically generated. See https://github.com/aws/jsii/issues/826'
    : 'Example automatically generated without compilation. See https://github.com/aws/jsii/issues/826';
  return `${commentToken()} ${message}\n${translation.source}`;

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
  rosetta: Rosetta,
  language: TargetLanguage,
  strict: boolean,
): void {
  transliterateDocs(type.docs);
  switch (type.kind) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore 7029
    case TypeKind.Class:
      transliterateDocs(type?.initializer?.docs);
    // fallthrough
    case TypeKind.Interface:
      for (const method of type.methods ?? []) {
        transliterateDocs(method.docs);
        for (const parameter of method.parameters ?? []) {
          transliterateDocs(parameter.docs);
        }
      }
      for (const property of type.properties ?? []) {
        transliterateDocs(property.docs);
      }
      break;
    case TypeKind.Enum:
      for (const member of type.members) {
        transliterateDocs(member.docs);
      }
      break;
    default:
      throw new Error(`Unsupported type kind: ${(type as any).kind}`);
  }

  function transliterateDocs(docs: Docs | undefined) {
    if (docs?.example) {
      const snippet = typeScriptSnippetFromSource(
        docs.example,
        'example',
        strict,
      );
      const translation = rosetta.translateSnippet(snippet, language);
      if (translation != null) {
        docs.example = prefixDisclaimer(translation);
      }
    }
  }
}
