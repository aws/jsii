import logging = require('./logging');
import ts = require('typescript');
import { AstRenderer, AstHandler, AstRendererOptions } from './renderer';
import { renderTree, Span } from './o-tree';
import { TypeScriptCompiler, CompilationResult } from './typescript/ts-compiler';
import { TranslatedSnippet } from './tablets/tablets';
import { TARGET_LANGUAGES, TargetLanguage } from './languages';
import { calculateVisibleSpans } from './typescript/ast-utils';
import { File } from './util';
import { TypeScriptSnippet, completeSource } from './snippet';
import { snippetKey } from './tablets/key';

export function translateTypeScript(source: File, visitor: AstHandler<any>, options: SnippetTranslatorOptions = {}): TranslateResult {
  const translator = new SnippetTranslator({ visibleSource: source.contents, where: source.fileName }, options);
  const translated = translator.renderUsing(visitor);

  return {
    translation: translated,
    diagnostics: translator.diagnostics,
  };
}


/**
 * Translate one or more TypeScript snippets into other languages
 *
 * Can be configured to fully typecheck the samples, or perform only syntactical
 * translation.
 */
export class Translator {
  private readonly compiler = new TypeScriptCompiler();
  private readonly translators: Record<string, SnippetTranslator> = {};

  constructor(private readonly includeCompilerDiagnostics: boolean) {
  }

  public translate(snip: TypeScriptSnippet, languages = Object.keys(TARGET_LANGUAGES) as TargetLanguage[]) {
    logging.debug(`Translating ${snippetKey(snip)}`);
    const translator = this.translatorFor(snip);
    const snippet = TranslatedSnippet.fromSnippet(snip, this.includeCompilerDiagnostics ? translator.compileDiagnostics.length === 0 : undefined);

    for (const lang of languages) {
      const languageConverterFactory = TARGET_LANGUAGES[lang];
      const translated = translator.renderUsing(languageConverterFactory());
      snippet.addTranslatedSource(lang, translated);
    }

    return snippet;
  }

  public get diagnostics(): ts.Diagnostic[] {
    const ret = [];
    for (const t of Object.values(this.translators)) {
      ret.push(...t.diagnostics);
    }
    return ret;
  }

  /**
   * Return the snippet translator for the given snippet
   */
  public translatorFor(snippet: TypeScriptSnippet) {
    const key = snippet.visibleSource + '-' + snippet.where;
    if (!(key in this.translators)) {
      const translator = new SnippetTranslator(snippet, {
        compiler: this.compiler,
        includeCompilerDiagnostics: this.includeCompilerDiagnostics,
      });

      this.diagnostics.push(...translator.compileDiagnostics);

      this.translators[key] = translator;
    }

    return this.translators[key];
  }
}

export interface SnippetTranslatorOptions extends AstRendererOptions {
  /**
   * Re-use the given compiler if given
   */
  readonly compiler?: TypeScriptCompiler;

  /**
   * Include compiler errors in return diagnostics
   *
   * If false, only translation diagnostics will be returned.
   *
   * @default false
   */
  readonly includeCompilerDiagnostics?: boolean;
}

export interface TranslateResult {
  translation: string;
  diagnostics: ts.Diagnostic[];
}

/**
 * Translate a single TypeScript snippet
 */
export class SnippetTranslator {
  public readonly translateDiagnostics: ts.Diagnostic[] = [];
  public readonly compileDiagnostics: ts.Diagnostic[] = [];
  private readonly visibleSpans: Span[];
  private compilation!: CompilationResult;

  constructor(snippet: TypeScriptSnippet, private readonly options: SnippetTranslatorOptions = {}) {
    const compiler = options.compiler || new TypeScriptCompiler();
    const source = completeSource(snippet);
    this.compilation = compiler.compileInMemory(snippet.where, source);

    // Respect '/// !hide' and '/// !show' directives
    this.visibleSpans = calculateVisibleSpans(source);

    // This makes it about 5x slower, so only do it on demand
    if (options.includeCompilerDiagnostics) {
      const program = this.compilation.program;
      this.compileDiagnostics.push(...program.getGlobalDiagnostics(), ...program.getSyntacticDiagnostics(), ...program.getDeclarationDiagnostics(), ...program.getSemanticDiagnostics());
    }
  }

  public renderUsing(visitor: AstHandler<any>) {
    const converter = new AstRenderer(this.compilation.rootFile, this.compilation.program.getTypeChecker(), visitor, this.options);
    const converted = converter.convert(this.compilation.rootFile);
    this.translateDiagnostics.push(...converter.diagnostics);
    return renderTree(converted, { visibleSpans: this.visibleSpans });
  }

  public get diagnostics() {
    return [...this.compileDiagnostics, ...this.translateDiagnostics];
  }
}
