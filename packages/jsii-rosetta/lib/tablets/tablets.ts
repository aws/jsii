import * as fs from 'fs-extra';
import * as path from 'path';
import {
  TabletSchema,
  TranslatedSnippetSchema,
  TranslationSchema,
  ORIGINAL_SNIPPET_KEY,
} from './schema';
import { snippetKey } from './key';
import { TargetLanguage } from '../languages';
import { TypeScriptSnippet } from '../snippet';

// eslint-disable-next-line @typescript-eslint/no-require-imports,@typescript-eslint/no-var-requires
const TOOL_VERSION = require('../../package.json').version;

export const DEFAULT_TABLET_NAME = '.jsii.tabl.json';

/**
 * A tablet containing various snippets in multiple languages
 */
export class LanguageTablet {
  private readonly snippets: Record<string, TranslatedSnippet> = {};

  public addSnippet(snippet: TranslatedSnippet) {
    const existingSnippet = this.snippets[snippet.key];
    this.snippets[snippet.key] = existingSnippet
      ? existingSnippet.merge(snippet)
      : snippet;
  }

  public get snippetKeys() {
    return Object.keys(this.snippets);
  }

  public tryGetSnippet(key: string): TranslatedSnippet | undefined {
    return this.snippets[key];
  }

  public lookup(
    typeScriptSource: TypeScriptSnippet,
    language: TargetLanguage,
  ): Translation | undefined {
    const snippet = this.snippets[snippetKey(typeScriptSource)];
    return snippet?.get(language);
  }

  public async load(filename: string) {
    const obj = await fs.readJson(filename, { encoding: 'utf-8' });

    if (!obj.toolVersion || !obj.snippets) {
      throw new Error(`File '${filename}' does not seem to be a Tablet file`);
    }
    if (obj.toolVersion !== TOOL_VERSION) {
      throw new Error(
        `Tablet file '${filename}' has been created with version '${obj.toolVersion}', cannot read with current version '${TOOL_VERSION}'`,
      );
    }

    Object.assign(
      this.snippets,
      mapValues(obj.snippets, (schema: TranslatedSnippetSchema) =>
        TranslatedSnippet.fromSchema(schema),
      ),
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
      snippets: mapValues(this.snippets, (s) => s.toSchema()),
    };
  }
}

export class TranslatedSnippet {
  public static fromSchema(schema: TranslatedSnippetSchema) {
    const ret = new TranslatedSnippet();
    Object.assign(ret.translations, schema.translations);
    ret._didCompile = schema.didCompile;
    ret._where = schema.where;
    return ret;
  }

  public static fromSnippet(original: TypeScriptSnippet, didCompile?: boolean) {
    const ret = new TranslatedSnippet();
    Object.assign(ret.translations, {
      [ORIGINAL_SNIPPET_KEY]: { source: original.visibleSource },
    });
    ret._didCompile = didCompile;
    ret._where = original.where;
    return ret;
  }

  private readonly translations: Record<string, TranslationSchema> = {};
  private _key?: string;
  private _didCompile?: boolean;
  private _where = '';

  private constructor() {}

  public get didCompile() {
    return this._didCompile;
  }

  public get where() {
    return this._where;
  }

  public get key() {
    if (this._key === undefined) {
      this._key = snippetKey(this.asTypescriptSnippet());
    }
    return this._key;
  }

  public asTypescriptSnippet(): TypeScriptSnippet {
    return {
      visibleSource: this.translations[ORIGINAL_SNIPPET_KEY].source,
      where: this.where,
    };
  }

  public get originalSource(): Translation {
    return {
      source: this.translations[ORIGINAL_SNIPPET_KEY].source,
      language: 'typescript',
      didCompile: this.didCompile,
    };
  }

  public addTranslatedSource(
    language: TargetLanguage,
    translation: string,
  ): Translation {
    this.translations[language] = { source: translation };

    return {
      source: translation,
      language,
      didCompile: this.didCompile,
    };
  }

  public get languages(): TargetLanguage[] {
    return Object.keys(this.translations).filter(
      (x) => x !== ORIGINAL_SNIPPET_KEY,
    ) as TargetLanguage[];
  }

  public get(language: TargetLanguage): Translation | undefined {
    const t = this.translations[language];
    return t && { source: t.source, language, didCompile: this.didCompile };
  }

  public merge(other: TranslatedSnippet) {
    const ret = new TranslatedSnippet();
    Object.assign(ret.translations, this.translations, other.translations);
    ret._didCompile = this.didCompile;
    ret._where = this.where;
    return ret;
  }

  public toTypeScriptSnippet() {
    return {
      source: this.originalSource,
      where: this.where,
    };
  }

  public toSchema(): TranslatedSnippetSchema {
    return {
      translations: this.translations,
      didCompile: this.didCompile,
      where: this.where,
    };
  }
}

export interface Translation {
  source: string;
  language: string;
  didCompile?: boolean;
}

function mapValues<A, B>(
  xs: Record<string, A>,
  fn: (x: A) => B,
): Record<string, B> {
  const ret: Record<string, B> = {};
  for (const [key, value] of Object.entries(xs)) {
    ret[key] = fn(value);
  }
  return ret;
}
