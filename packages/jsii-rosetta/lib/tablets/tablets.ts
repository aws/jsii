import * as fs from 'fs-extra';
import * as path from 'path';

import { TargetLanguage } from '../languages';
import { TypeScriptSnippet } from '../snippet';
import { snippetKey } from './key';
import { TabletSchema, TranslatedSnippetSchema, ORIGINAL_SNIPPET_KEY } from './schema';

// eslint-disable-next-line @typescript-eslint/no-require-imports,@typescript-eslint/no-var-requires
const TOOL_VERSION = require('../../package.json').version;

export const DEFAULT_TABLET_NAME = '.jsii.tabl.json';

/**
 * A tablet containing various snippets in multiple languages
 */
export class LanguageTablet {
  public static async fromFile(filename: string) {
    const ret = new LanguageTablet();
    await ret.load(filename);
    return ret;
  }

  private readonly snippets: Record<string, TranslatedSnippet> = {};

  public addSnippet(snippet: TranslatedSnippet) {
    const existingSnippet = this.snippets[snippet.key];
    this.snippets[snippet.key] = existingSnippet ? existingSnippet.mergeTranslations(snippet) : snippet;
  }

  public get snippetKeys() {
    return Object.keys(this.snippets);
  }

  public tryGetSnippet(key: string): TranslatedSnippet | undefined {
    return this.snippets[key];
  }

  public lookup(typeScriptSource: TypeScriptSnippet, language: TargetLanguage): Translation | undefined {
    const snippet = this.snippets[snippetKey(typeScriptSource)];
    return snippet?.get(language);
  }

  public async load(filename: string) {
    const obj = await fs.readJson(filename, { encoding: 'utf-8' });

    if (!obj.toolVersion || !obj.snippets) {
      throw new Error(`File '${filename}' does not seem to be a Tablet file`);
    }
    if (obj.toolVersion !== TOOL_VERSION && TOOL_VERSION !== '0.0.0') {
      throw new Error(
        `Tablet file '${filename}' has been created with version '${obj.toolVersion}', cannot read with current version '${TOOL_VERSION}'`,
      );
    }

    Object.assign(
      this.snippets,
      mapValues(obj.snippets, (schema: TranslatedSnippetSchema) => TranslatedSnippet.fromSchema(schema)),
    );
  }

  public get count() {
    return Object.keys(this.snippets).length;
  }

  public async save(filename: string) {
    await fs.mkdirp(path.dirname(filename));
    await fs.writeJson(filename, this.toSchema(), {
      encoding: 'utf-8',
      spaces: 2,
    });
  }

  private toSchema(): TabletSchema {
    return {
      version: '1',
      toolVersion: TOOL_VERSION,
      snippets: mapValues(this.snippets, (s) => s.snippet),
    };
  }
}

/**
 * Mutable operations on an underlying TranslatedSnippetSchema
 */
export class TranslatedSnippet {
  public static fromSchema(schema: TranslatedSnippetSchema) {
    return new TranslatedSnippet(schema);
  }

  public static fromTypeScript(original: TypeScriptSnippet, didCompile?: boolean) {
    return new TranslatedSnippet({
      translations: {
        [ORIGINAL_SNIPPET_KEY]: { source: original.visibleSource },
      },
      didCompile: didCompile,
      where: original.where,
      fullSource: original.completeSource,
    });
  }

  public readonly snippet: TranslatedSnippetSchema;

  private readonly _snippet: Mutable<TranslatedSnippetSchema>;
  private _key?: string;

  private constructor(snippet: TranslatedSnippetSchema) {
    this._snippet = { ...snippet };
    this.snippet = this._snippet;
  }

  public get key() {
    if (this._key === undefined) {
      this._key = snippetKey(this.asTypescriptSnippet());
    }
    return this._key;
  }

  public get originalSource(): Translation {
    return {
      source: this.snippet.translations[ORIGINAL_SNIPPET_KEY].source,
      language: 'typescript',
      didCompile: this.snippet.didCompile,
    };
  }

  public addTranslation(language: TargetLanguage, translation: string): Translation {
    this.snippet.translations[language] = { source: translation };

    return {
      source: translation,
      language,
      didCompile: this.snippet.didCompile,
    };
  }

  public fqnsReferenced() {
    return this._snippet.fqnsReferenced ?? [];
  }

  public addSyntaxKindCounter(syntaxKindCounter: Record<string, number>) {
    if (!this._snippet.syntaxKindCounter) {
      this._snippet.syntaxKindCounter = {};
    }
    for (const [key, value] of Object.entries(syntaxKindCounter)) {
      const x = this._snippet.syntaxKindCounter[key] ?? 0;
      this._snippet.syntaxKindCounter[key] = value + x;
    }
  }

  public get languages(): TargetLanguage[] {
    return Object.keys(this.snippet.translations).filter((x) => x !== ORIGINAL_SNIPPET_KEY) as TargetLanguage[];
  }

  public get(language: TargetLanguage): Translation | undefined {
    const t = this.snippet.translations[language];
    return t && { source: t.source, language, didCompile: this.snippet.didCompile };
  }

  public mergeTranslations(other: TranslatedSnippet) {
    return new TranslatedSnippet({
      ...this.snippet,
      translations: { ...this.snippet.translations, ...other.snippet.translations },
    });
  }

  public withFingerprint(fp: string) {
    return new TranslatedSnippet({
      ...this.snippet,
      fqnsFingerprint: fp,
    });
  }

  private asTypescriptSnippet(): TypeScriptSnippet {
    return {
      visibleSource: this.snippet.translations[ORIGINAL_SNIPPET_KEY].source,
      where: this.snippet.where,
    };
  }
}

export interface Translation {
  source: string;
  language: string;
  didCompile?: boolean;
}

function mapValues<A, B>(xs: Record<string, A>, fn: (x: A) => B): Record<string, B> {
  const ret: Record<string, B> = {};
  for (const [key, value] of Object.entries(xs)) {
    ret[key] = fn(value);
  }
  return ret;
}

type Mutable<T> = { -readonly [P in keyof T]: Mutable<T[P]> };
