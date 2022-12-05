import { existsSync, promises as fs } from 'fs';
import * as path from 'path';
import * as zlib from 'zlib';

import { TargetLanguage } from '../languages';
import * as logging from '../logging';
import { TypeScriptSnippet, SnippetLocation, completeSource } from '../snippet';
import { mapValues, Mutable } from '../util';
import { snippetKey } from './key';
import { TabletSchema, TranslatedSnippetSchema, ORIGINAL_SNIPPET_KEY, TranslationSchema } from './schema';

// eslint-disable-next-line @typescript-eslint/no-require-imports,@typescript-eslint/no-var-requires
const TOOL_VERSION = require('../../package.json').version;

/**
 * The default name of the tablet file
 */
export const DEFAULT_TABLET_NAME = '.jsii.tabl.json';

/**
 * The default name of the compressed tablet file
 */
export const DEFAULT_TABLET_NAME_COMPRESSED = '.jsii.tabl.json.gz';

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
    if (existsSync(filename)) {
      try {
        await ret.load(filename);
      } catch (e: any) {
        logging.warn(`${filename}: ${e}`);
      }
    }
    return ret;
  }

  /**
   * Whether or not the LanguageTablet was loaded with a compressed source.
   * This gets used to determine if it should be compressed when saved.
   */
  public compressedSource = false;

  private readonly snippets = new Map<string, TranslatedSnippet>();

  /**
   * Add one or more snippets to this tablet
   */
  public addSnippets(...snippets: TranslatedSnippet[]) {
    for (const snippet of snippets) {
      const existingSnippet = this.snippets.get(snippet.key);
      this.snippets.set(snippet.key, existingSnippet ? existingSnippet.mergeTranslations(snippet) : snippet);
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
    return Array.from(this.snippets.keys());
  }

  /**
   * Add all snippets from the given tablets into this one
   */
  public addTablets(...tablets: LanguageTablet[]) {
    for (const tablet of tablets) {
      this.addSnippets(...tablet.snippets.values());
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
    return this.snippets.get(key);
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
    const snippet = this.snippets.get(snippetKey(typeScriptSource));
    return snippet?.get(language);
  }

  /**
   * Lookup the translated verion of a TypeScript snippet
   */
  public lookupBySource(typeScriptSource: TypeScriptSnippet): TranslatedSnippet | undefined {
    return this.snippets.get(snippetKey(typeScriptSource));
  }

  /**
   * Load the tablet from a file. Will automatically detect if the file is
   * compressed and decompress accordingly.
   */
  public async load(filename: string) {
    let data = await fs.readFile(filename);
    // Gzip objects start with 1f 8b 08
    if (data[0] === 0x1f && data[1] === 0x8b && data[2] === 0x08) {
      // This is a gz object, so we decompress it now...
      data = zlib.gunzipSync(data);
      this.compressedSource = true;
    }

    const obj: TabletSchema = JSON.parse(data.toString('utf-8'));

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

    for (const [key, schema] of Object.entries(obj.snippets)) {
      const snippet = TranslatedSnippet.fromSchema(schema, filename);
      this.snippets.set(key, snippet);
    }
  }

  public get count() {
    return this.snippets.size;
  }

  public get translatedSnippets() {
    return Array.from(this.snippets.values());
  }

  /**
   * Saves the tablet schema to a file. If the compress option is passed, then
   * the schema will be gzipped before writing to the file.
   */
  public async save(filename: string, compress = false) {
    await fs.mkdir(path.dirname(filename), { recursive: true });

    let schema = Buffer.from(JSON.stringify(this.toSchema(), null, 2));
    if (compress) {
      schema = zlib.gzipSync(schema);
    }

    await fs.writeFile(filename, schema);
  }

  private toSchema(): TabletSchema {
    return {
      version: CURRENT_SCHEMA_VERSION,
      toolVersion: TOOL_VERSION,
      snippets: mapValues(Object.fromEntries(this.snippets), (s) => s.snippet),
    };
  }
}

/**
 * Mutable operations on an underlying TranslatedSnippetSchema
 */
export class TranslatedSnippet {
  public static fromSchema(schema: TranslatedSnippetSchema, loadedFrom?: string) {
    if (!schema.translations[ORIGINAL_SNIPPET_KEY]) {
      throw new Error(`Input schema must have '${ORIGINAL_SNIPPET_KEY}' key set in translations`);
    }
    return new TranslatedSnippet(schema, loadedFrom);
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

  private readonly _schema: Mutable<Omit<TranslatedSnippetSchema, 'translations'>>;
  private readonly _translations: Map<string, TranslationSchema & { readonly loadedFrom?: string }>;
  private _key?: string;

  private constructor(snippet: TranslatedSnippetSchema, loadedFrom?: string) {
    this._schema = { ...snippet };
    // Just avoid duplicated storage of the translations data.
    delete (this._schema as any).translations;

    this._translations = new Map(
      Object.entries(snippet.translations).map(([key, value]) => [key, { ...value, loadedFrom }]),
    );
  }

  public get snippet(): TranslatedSnippetSchema {
    return {
      ...this._schema,
      translations: Object.fromEntries(
        Array.from(this._translations.entries()).map(([key, value]): [string, TranslationSchema] => [
          key,
          { source: value.source, version: value.version },
        ]),
      ),
    };
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
      loadedFrom: undefined,
    };
  }

  public addTranslation(language: TargetLanguage, translation: string, version: string): Translation {
    this._translations.set(language, { source: translation, version });

    return {
      source: translation,
      language,
      didCompile: this.snippet.didCompile,
      loadedFrom: undefined,
    };
  }

  public fqnsReferenced() {
    return this._schema.fqnsReferenced ?? [];
  }

  public addSyntaxKindCounter(syntaxKindCounter: Record<string, number>) {
    if (!this._schema.syntaxKindCounter) {
      this._schema.syntaxKindCounter = {};
    }
    for (const [key, value] of Object.entries(syntaxKindCounter)) {
      const x = this._schema.syntaxKindCounter[key] ?? 0;
      this._schema.syntaxKindCounter[key] = value + x;
    }
  }

  public get languages(): TargetLanguage[] {
    return Object.keys(this.snippet.translations).filter((x) => x !== ORIGINAL_SNIPPET_KEY) as TargetLanguage[];
  }

  public get(language: TargetLanguage): Translation | undefined {
    const t = this._translations.get(language);
    return t && { source: t.source, language, didCompile: this.snippet.didCompile, loadedFrom: t.loadedFrom };
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

  public toJSON(): TranslatedSnippetSchema {
    return this.snippet;
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
  loadedFrom: string | undefined;
}
