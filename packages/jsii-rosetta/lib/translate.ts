import * as ts from 'typescript';
import { inspect } from 'util';

import { TARGET_LANGUAGES, TargetLanguage } from './languages';
import { RecordReferencesVisitor } from './languages/record-references';
import { supportsTransitiveSubmoduleAccess } from './languages/target-language';
import * as logging from './logging';
import { renderTree } from './o-tree';
import { AstRenderer, AstHandler, AstRendererOptions } from './renderer';
import { TypeScriptSnippet, completeSource, SnippetParameters, formatLocation } from './snippet';
import { SubmoduleReference, SubmoduleReferenceMap } from './submodule-reference';
import { snippetKey } from './tablets/key';
import { ORIGINAL_SNIPPET_KEY } from './tablets/schema';
import { TranslatedSnippet } from './tablets/tablets';
import { SyntaxKindCounter } from './typescript/syntax-kind-counter';
import { TypeScriptCompiler, CompilationResult } from './typescript/ts-compiler';
import { Spans } from './typescript/visible-spans';
import { annotateStrictDiagnostic, File, hasStrictBranding, mkDict } from './util';

export function translateTypeScript(
  source: File,
  visitor: AstHandler<any>,
  options: SnippetTranslatorOptions = {},
): TranslateResult {
  const translator = new SnippetTranslator(
    { visibleSource: source.contents, location: { api: { api: 'file', fileName: source.fileName } } },
    options,
  );
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
  #diagnostics: ts.Diagnostic[] = [];

  public constructor(private readonly includeCompilerDiagnostics: boolean) {}

  public translate(snip: TypeScriptSnippet, languages: readonly TargetLanguage[] = Object.values(TargetLanguage)) {
    logging.debug(`Translating ${snippetKey(snip)} ${inspect(snip.parameters ?? {})}`);
    const translator = this.translatorFor(snip);

    const translations = mkDict(
      languages.flatMap((lang, idx, languages) => {
        if (languages.slice(0, idx).includes(lang)) {
          // This language was duplicated in the request... we'll skip that here...
          return [];
        }
        const languageConverterFactory = TARGET_LANGUAGES[lang];
        const translated = translator.renderUsing(languageConverterFactory.createVisitor());
        return [[lang, { source: translated, version: languageConverterFactory.version }] as const];
      }),
    );

    if (snip.parameters?.infused === undefined) {
      this.#diagnostics.push(...translator.diagnostics);
    }

    return TranslatedSnippet.fromSchema({
      translations: {
        ...translations,
        [ORIGINAL_SNIPPET_KEY]: { source: snip.visibleSource, version: '0' },
      },
      location: snip.location,
      didCompile: translator.didSuccessfullyCompile,
      fqnsReferenced: translator.fqnsReferenced(),
      fullSource: completeSource(snip),
      syntaxKindCounter: translator.syntaxKindCounter(),
    });
  }

  public get diagnostics(): readonly RosettaDiagnostic[] {
    return ts.sortAndDeduplicateDiagnostics(this.#diagnostics).map(rosettaDiagFromTypescript);
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

export function makeRosettaDiagnostic(isError: boolean, formattedMessage: string): RosettaDiagnostic {
  return { isError, formattedMessage, isFromStrictAssembly: false };
}

/**
 * Translate a single TypeScript snippet
 */
export class SnippetTranslator {
  public readonly translateDiagnostics: ts.Diagnostic[] = [];
  public readonly compileDiagnostics: ts.Diagnostic[] = [];
  private readonly visibleSpans: Spans;
  private readonly compilation!: CompilationResult;
  private readonly tryCompile: boolean;
  private readonly submoduleReferences: SubmoduleReferenceMap;

  public constructor(snippet: TypeScriptSnippet, private readonly options: SnippetTranslatorOptions = {}) {
    const compiler = options.compiler ?? new TypeScriptCompiler();
    const source = completeSource(snippet);
    const fakeCurrentDirectory =
      snippet.parameters?.[SnippetParameters.$COMPILATION_DIRECTORY] ??
      snippet.parameters?.[SnippetParameters.$PROJECT_DIRECTORY];
    this.compilation = compiler.compileInMemory(
      removeSlashes(formatLocation(snippet.location)),
      source,
      fakeCurrentDirectory,
    );

    // Respect '/// !hide' and '/// !show' directives
    this.visibleSpans = Spans.visibleSpansFromSource(source);

    // Find submodule references on explicit imports
    this.submoduleReferences = SubmoduleReference.inSourceFile(
      this.compilation.rootFile,
      this.compilation.program.getTypeChecker(),
    );

    // This makes it about 5x slower, so only do it on demand
    // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
    this.tryCompile = (options.includeCompilerDiagnostics || snippet.strict) ?? false;
    if (this.tryCompile) {
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
        } catch (err: any) {
          const isExpectedTypescriptError = err.message.includes('Debug Failure');

          if (!isExpectedTypescriptError) {
            console.error(`Failed to execute ${call.name}: ${err}`);
          }

          return [];
        }
      };
    }
  }

  /**
   * Returns a boolean if compilation was attempted, and undefined if it was not.
   */
  public get didSuccessfullyCompile() {
    return this.tryCompile ? this.compileDiagnostics.length === 0 : undefined;
  }

  public renderUsing(visitor: AstHandler<any>) {
    const converter = new AstRenderer(
      this.compilation.rootFile,
      this.compilation.program.getTypeChecker(),
      visitor,
      this.options,
      // If we support transitive submodule access, don't provide a submodule reference map.
      supportsTransitiveSubmoduleAccess(visitor.language) ? undefined : this.submoduleReferences,
    );
    const converted = converter.convert(this.compilation.rootFile);
    this.translateDiagnostics.push(...filterVisibleDiagnostics(converter.diagnostics, this.visibleSpans));
    return renderTree(converted, { indentChar: visitor.indentChar, visibleSpans: this.visibleSpans });
  }

  public syntaxKindCounter(): Record<string, number> {
    const kindCounter = new SyntaxKindCounter(this.visibleSpans);
    return kindCounter.countKinds(this.compilation.rootFile);
  }

  public fqnsReferenced() {
    const visitor = new RecordReferencesVisitor(this.visibleSpans);
    const converter = new AstRenderer(
      this.compilation.rootFile,
      this.compilation.program.getTypeChecker(),
      visitor,
      this.options,
      this.submoduleReferences,
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
function filterVisibleDiagnostics(diags: readonly ts.Diagnostic[], visibleSpans: Spans): ts.Diagnostic[] {
  return diags.filter((d) => d.source !== 'rosetta' || d.start === undefined || visibleSpans.containsPosition(d.start));
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

/**
 * Remove slashes from a "where" description, as the TS compiler will interpret it as a directory
 * and we can't have that for compiling literate files
 */
function removeSlashes(x: string) {
  return x.replace(/\/|\\/g, '.');
}
