import * as fs from 'fs-extra';
import * as path from 'path';

import { TargetLanguage } from '../languages';
import * as logging from '../logging';
import { TypeScriptSnippet, SnippetLocation, completeSource } from '../snippet';
import { mapValues, Mutable } from '../util';
import { snippetKey } from './key';
import { TabletSchema, TranslatedSnippetSchema, ORIGINAL_SNIPPET_KEY } from './schema';

// eslint-disable-next-line @typescript-eslint/no-require-imports,@typescript-eslint/no-var-requires
const TOOL_VERSION = require('../../package.json').version;

export const DEFAULT_TABLET_NAME = '.jsii.tabl.json';

export const CURRENT_SCHEMA_VERSION = '2';

/**
 * A tablet containing various snippets in multiple languages
 */
export class LanguageTablet {
  /**
   * Load a tablet from a file
   */
  public static async fromFile(filename: string) {
    const ret = new LanguageTablet();
    await ret.load(filename);
    return ret;
  }

  /**
   * Load a tablet from a file that may not exist
   *
   * Will return an empty tablet if the file does not exist
   */
  public static async fromOptionalFile(filename: string) {
    const ret = new LanguageTablet();
    if (fs.existsSync(filename)) {
      try {
        await ret.load(filename);
      } catch (e) {
        logging.warn(`${filename}: ${e}`);
      }
    }
    return ret;
  }

  private readonly snippets: Record<string, TranslatedSnippet> = {};

  /**
   * Add one or more snippets to this tablet
   */
  public addSnippets(...snippets: TranslatedSnippet[]) {
    for (const snippet of snippets) {
      const existingSnippet = this.snippets[snippet.key];
      this.snippets[snippet.key] = existingSnippet ? existingSnippet.mergeTranslations(snippet) : snippet;
    }
  }

  /**
   * Add one snippet to this tablet
   *
   * @deprecated use addSnippets instead
   */
  public addSnippet(snippet: TranslatedSnippet) {
    this.addSnippets(snippet);
  }

  public get snippetKeys() {
    return Object.keys(this.snippets);
  }

  /**
   * Add all snippets from the given tablets into this one
   */
  public addTablets(...tablets: LanguageTablet[]) {
    for (const tablet of tablets) {
      for (const snippet of Object.values(tablet.snippets)) {
        this.addSnippet(snippet);
      }
    }
  }

  /**
   * Add all snippets from the given tablet into this one
   *
   * @deprecated Use `addTablets()` instead.
   */
  public addTablet(tablet: LanguageTablet) {
    this.addTablets(tablet);
  }

  public tryGetSnippet(key: string): TranslatedSnippet | undefined {
    return this.snippets[key];
  }

  /**
   * Look up a single translation of a source snippet
   *
   * @deprecated Use `lookupTranslationBySource` instead.
   */
  public lookup(typeScriptSource: TypeScriptSnippet, language: TargetLanguage): Translation | undefined {
    return this.lookupTranslationBySource(typeScriptSource, language);
  }

  /**
   * Look up a single translation of a source snippet
   */
  public lookupTranslationBySource(
    typeScriptSource: TypeScriptSnippet,
    language: TargetLanguage,
  ): Translation | undefined {
    const snippet = this.snippets[snippetKey(typeScriptSource)];
    return snippet?.get(language);
  }

  /**
   * Lookup the translated verion of a TypeScript snippet
   */
  public lookupBySource(typeScriptSource: TypeScriptSnippet): TranslatedSnippet | undefined {
    return this.snippets[snippetKey(typeScriptSource)];
  }

  public async load(filename: string) {
    const obj = (await fs.readJson(filename, { encoding: 'utf-8' })) as TabletSchema;

    if (!obj.toolVersion || !obj.snippets) {
      throw new Error(`File '${filename}' does not seem to be a Tablet file`);
    }

    if (obj.version !== CURRENT_SCHEMA_VERSION) {
      // If we're ever changing the schema version in a backwards incompatible way,
      // do upconversion here.
      throw new Error(
        `Tablet file '${filename}' has schema version '${obj.version}', this program expects '${CURRENT_SCHEMA_VERSION}'`,
      );
    }

    Object.assign(this.snippets, mapValues(obj.snippets, TranslatedSnippet.fromSchema));
  }

  public get count() {
    return Object.keys(this.snippets).length;
  }

  public get translatedSnippets() {
    return Object.values(this.snippets);
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
      version: CURRENT_SCHEMA_VERSION,
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
    if (!schema.translations[ORIGINAL_SNIPPET_KEY]) {
      throw new Error(`Input schema must have '${ORIGINAL_SNIPPET_KEY}' key set in translations`);
    }
    return new TranslatedSnippet(schema);
  }

  public static fromTypeScript(original: TypeScriptSnippet, didCompile?: boolean) {
    return new TranslatedSnippet({
      translations: {
        [ORIGINAL_SNIPPET_KEY]: { source: original.visibleSource, version: '0' },
      },
      didCompile: didCompile,
      location: original.location,
      fullSource: completeSource(original),
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

  public addTranslation(language: TargetLanguage, translation: string, version: string): Translation {
    this.snippet.translations[language] = { source: translation, version };

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

  public withLocation(location: SnippetLocation) {
    return new TranslatedSnippet({
      ...this.snippet,
      location,
    });
  }

  public toJSON() {
    return this._snippet;
  }

  private asTypescriptSnippet(): TypeScriptSnippet {
    return {
      visibleSource: this.snippet.translations[ORIGINAL_SNIPPET_KEY].source,
      location: this.snippet.location,
    };
  }
}

export interface Translation {
  source: string;
  language: string;
  didCompile?: boolean;
}
