import * as ts from 'typescript';
import { inspect } from 'util';

import { TARGET_LANGUAGES, TargetLanguage } from './languages';
import { RecordReferencesVisitor } from './languages/record-references';
import * as logging from './logging';
import { renderTree, Span, spanContains } from './o-tree';
import { AstRenderer, AstHandler, AstRendererOptions } from './renderer';
import { TypeScriptSnippet, completeSource, SnippetParameters } from './snippet';
import { snippetKey } from './tablets/key';
import { TranslatedSnippet } from './tablets/tablets';
import { calculateVisibleSpans } from './typescript/ast-utils';
import { SyntaxKindCounter } from './typescript/syntax-kind-counter';
import { TypeScriptCompiler, CompilationResult } from './typescript/ts-compiler';
import { annotateStrictDiagnostic, File, hasStrictBranding } from './util';

export function translateTypeScript(
  source: File,
  visitor: AstHandler<any>,
  options: SnippetTranslatorOptions = {},
): TranslateResult {
  const translator = new SnippetTranslator({ visibleSource: source.contents, where: source.fileName }, options);
  const translated = translator.renderUsing(visitor);

  return {
    translation: translated,
    diagnostics: translator.diagnostics.map(rosettaDiagFromTypescript),
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
  // eslint-disable-next-line @typescript-eslint/explicit-member-accessibility
  #diagnostics: readonly ts.Diagnostic[] = [];

  public constructor(private readonly includeCompilerDiagnostics: boolean) {}

  public translate(snip: TypeScriptSnippet, languages: readonly TargetLanguage[] = Object.values(TargetLanguage)) {
    logging.debug(`Translating ${snippetKey(snip)} ${inspect(snip.parameters ?? {})}`);
    const translator = this.translatorFor(snip);
    const snippet = TranslatedSnippet.fromSnippet(
      snip,
      this.includeCompilerDiagnostics ? translator.compileDiagnostics.length === 0 : undefined,
    );

    for (const lang of languages) {
      const languageConverterFactory = TARGET_LANGUAGES[lang];
      const translated = translator.renderUsing(languageConverterFactory());
      snippet.addTranslatedSource(lang, translated);
    }

    snippet.addFqnsReferenced(translator.fqnsReferenced());
    snippet.addSyntaxKindCounter(translator.syntaxKindCounter());

    this.#diagnostics = ts.sortAndDeduplicateDiagnostics(this.#diagnostics.concat(translator.diagnostics));

    return snippet;
  }

  public get diagnostics(): readonly ts.Diagnostic[] {
    return Array.from(this.#diagnostics);
  }

  /**
   * Return the snippet translator for the given snippet
   *
   * We used to cache these, but each translator holds on to quite a bit of memory,
   * so we don't do that anymore.
   */
  public translatorFor(snippet: TypeScriptSnippet) {
    const translator = new SnippetTranslator(snippet, {
      compiler: this.compiler,
      includeCompilerDiagnostics: this.includeCompilerDiagnostics,
    });
    return translator;
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
  diagnostics: readonly RosettaDiagnostic[];
}

/**
 * A translation of a TypeScript diagnostic into a data-only representation for Rosetta
 *
 * We cannot use the original `ts.Diagnostic` since it holds on to way too much
 * state (the source file and by extension the entire parse tree), which grows
 * too big to be properly serialized by a worker and also takes too much memory.
 *
 * Reduce it down to only the information we need.
 */
export interface RosettaDiagnostic {
  /**
   * If this is an error diagnostic or not
   */
  readonly isError: boolean;

  /**
   * If the diagnostic was emitted from an assembly that has its 'strict' flag set
   */
  readonly isFromStrictAssembly: boolean;

  /**
   * The formatted message, ready to be printed (will have colors and newlines in it)
   *
   * Ends in a newline.
   */
  readonly formattedMessage: string;
}

/**
 * Translate a single TypeScript snippet
 */
export class SnippetTranslator {
  public readonly translateDiagnostics: ts.Diagnostic[] = [];
  public readonly compileDiagnostics: ts.Diagnostic[] = [];
  private readonly visibleSpans: Span[];
  private readonly compilation!: CompilationResult;

  public constructor(snippet: TypeScriptSnippet, private readonly options: SnippetTranslatorOptions = {}) {
    const compiler = options.compiler ?? new TypeScriptCompiler();
    const source = completeSource(snippet);

    const fakeCurrentDirectory =
      snippet.parameters?.[SnippetParameters.$COMPILATION_DIRECTORY] ??
      snippet.parameters?.[SnippetParameters.$PROJECT_DIRECTORY];
    this.compilation = compiler.compileInMemory(snippet.where, source, fakeCurrentDirectory);

    // Respect '/// !hide' and '/// !show' directives
    this.visibleSpans = calculateVisibleSpans(source);

    // This makes it about 5x slower, so only do it on demand
    if (options.includeCompilerDiagnostics || snippet.strict) {
      const program = this.compilation.program;
      const diagnostics = [
        ...neverThrowing(program.getGlobalDiagnostics)(),
        ...neverThrowing(program.getSyntacticDiagnostics)(this.compilation.rootFile),
        ...neverThrowing(program.getDeclarationDiagnostics)(this.compilation.rootFile),
        ...neverThrowing(program.getSemanticDiagnostics)(this.compilation.rootFile),
      ];
      if (snippet.strict) {
        // In a strict assembly, so we'll need to brand all diagnostics here...
        diagnostics.forEach(annotateStrictDiagnostic);
      }
      this.compileDiagnostics.push(...diagnostics);
    }

    /**
     * Intercepts all exceptions thrown by the wrapped call, and logs them to
     * console.error instead of re-throwing, then returns an empty array. This
     * is here to avoid compiler crashes due to broken code examples that cause
     * the TypeScript compiler to hit a "Debug Failure".
     */
    function neverThrowing<A extends unknown[], R>(call: (...args: A) => readonly R[]): (...args: A) => readonly R[] {
      return (...args: A) => {
        try {
          return call(...args);
        } catch (err) {
          console.error(`Failed to execute ${call.name}: ${err}`);
          return [];
        }
      };
    }
  }

  public renderUsing(visitor: AstHandler<any>) {
    const converter = new AstRenderer(
      this.compilation.rootFile,
      this.compilation.program.getTypeChecker(),
      visitor,
      this.options,
    );
    const converted = converter.convert(this.compilation.rootFile);
    this.translateDiagnostics.push(...filterVisibleDiagnostics(converter.diagnostics, this.visibleSpans));
    return renderTree(converted, { visibleSpans: this.visibleSpans });
  }

  public syntaxKindCounter(): Record<string, number> {
    const kindCounter = new SyntaxKindCounter();
    return kindCounter.countKinds(this.compilation.rootFile);
  }

  public fqnsReferenced() {
    const visitor = new RecordReferencesVisitor();
    const converter = new AstRenderer(
      this.compilation.rootFile,
      this.compilation.program.getTypeChecker(),
      visitor,
      this.options,
    );
    converter.convert(this.compilation.rootFile);
    return visitor.fqnsReferenced();
  }

  public get diagnostics(): readonly ts.Diagnostic[] {
    return ts.sortAndDeduplicateDiagnostics(this.compileDiagnostics.concat(this.translateDiagnostics));
  }
}

/**
 * Hide diagnostics that are rosetta-sourced if they are reported against a non-visible span
 */
function filterVisibleDiagnostics(diags: readonly ts.Diagnostic[], visibleSpans: Span[]): ts.Diagnostic[] {
  return diags.filter(
    (d) => d.source !== 'rosetta' || d.start === undefined || visibleSpans.some((s) => spanContains(s, d.start!)),
  );
}

/**
 * Turn TypeScript diagnostics into Rosetta diagnostics
 */
export function rosettaDiagFromTypescript(diag: ts.Diagnostic): RosettaDiagnostic {
  return {
    isError: diag.category === ts.DiagnosticCategory.Error,
    isFromStrictAssembly: hasStrictBranding(diag),
    formattedMessage: ts.formatDiagnosticsWithColorAndContext([diag], DIAG_HOST),
  };
}

const DIAG_HOST = {
  getCurrentDirectory() {
    return '.';
  },
  getCanonicalFileName(fileName: string) {
    return fileName;
  },
  getNewLine() {
    return '\n';
  },
};
