import * as ts from 'typescript';
import { inspect } from 'util';

import { TARGET_LANGUAGES, TargetLanguage } from './languages';
import * as logging from './logging';
import { renderTree, Span, spanContains } from './o-tree';
import { AstRenderer, AstHandler, AstRendererOptions } from './renderer';
import {
  TypeScriptSnippet,
  completeSource,
  SnippetParameters,
} from './snippet';
import { snippetKey } from './tablets/key';
import { TranslatedSnippet } from './tablets/tablets';
import { calculateVisibleSpans } from './typescript/ast-utils';
import {
  TypeScriptCompiler,
  CompilationResult,
} from './typescript/ts-compiler';
import { annotateStrictDiagnostic, File } from './util';

export function translateTypeScript(
  source: File,
  visitor: AstHandler<any>,
  options: SnippetTranslatorOptions = {},
): TranslateResult {
  const translator = new SnippetTranslator(
    { visibleSource: source.contents, where: source.fileName },
    options,
  );
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
  // eslint-disable-next-line @typescript-eslint/explicit-member-accessibility
  #diagnostics: readonly ts.Diagnostic[] = [];

  public constructor(private readonly includeCompilerDiagnostics: boolean) {}

  public translate(
    snip: TypeScriptSnippet,
    languages: readonly TargetLanguage[] = Object.values(TargetLanguage),
  ) {
    logging.debug(
      `Translating ${snippetKey(snip)} ${inspect(snip.parameters ?? {})}`,
    );
    const translator = this.translatorFor(snip);
    const snippet = TranslatedSnippet.fromSnippet(
      snip,
      this.includeCompilerDiagnostics
        ? translator.compileDiagnostics.length === 0
        : undefined,
    );

    for (const lang of languages) {
      const languageConverterFactory = TARGET_LANGUAGES[lang];
      const translated = translator.renderUsing(languageConverterFactory());
      snippet.addTranslatedSource(lang, translated);
    }

    this.#diagnostics = ts.sortAndDeduplicateDiagnostics(
      this.#diagnostics.concat(translator.diagnostics),
    );

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
  diagnostics: readonly ts.Diagnostic[];
}

/**
 * Translate a single TypeScript snippet
 */
export class SnippetTranslator {
  public readonly translateDiagnostics: ts.Diagnostic[] = [];
  public readonly compileDiagnostics: ts.Diagnostic[] = [];
  private readonly visibleSpans: Span[];
  private readonly compilation!: CompilationResult;

  public constructor(
    snippet: TypeScriptSnippet,
    private readonly options: SnippetTranslatorOptions = {},
  ) {
    const compiler = options.compiler ?? new TypeScriptCompiler();
    const source = completeSource(snippet);

    const fakeCurrentDirectory =
      snippet.parameters?.[SnippetParameters.$COMPILATION_DIRECTORY] ??
      snippet.parameters?.[SnippetParameters.$PROJECT_DIRECTORY];
    this.compilation = compiler.compileInMemory(
      snippet.where,
      source,
      fakeCurrentDirectory,
    );

    // Respect '/// !hide' and '/// !show' directives
    this.visibleSpans = calculateVisibleSpans(source);

    // This makes it about 5x slower, so only do it on demand
    if (options.includeCompilerDiagnostics || snippet.strict) {
      const program = this.compilation.program;
      const diagnostics = [
        ...program.getGlobalDiagnostics(),
        ...program.getSyntacticDiagnostics(this.compilation.rootFile),
        ...program.getDeclarationDiagnostics(this.compilation.rootFile),
        ...program.getSemanticDiagnostics(this.compilation.rootFile),
      ];
      if (snippet.strict) {
        // In a strict assembly, so we'll need to brand all diagnostics here...
        diagnostics.forEach(annotateStrictDiagnostic);
      }
      this.compileDiagnostics.push(...diagnostics);
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
    this.translateDiagnostics.push(
      ...filterVisibleDiagnostics(converter.diagnostics, this.visibleSpans),
    );
    return renderTree(converted, { visibleSpans: this.visibleSpans });
  }

  public get diagnostics(): readonly ts.Diagnostic[] {
    return ts.sortAndDeduplicateDiagnostics(
      this.compileDiagnostics.concat(this.translateDiagnostics),
    );
  }
}

/**
 * Hide diagnostics that are rosetta-sourced if they are reported against a non-visible span
 */
function filterVisibleDiagnostics(
  diags: readonly ts.Diagnostic[],
  visibleSpans: Span[],
): ts.Diagnostic[] {
  return diags.filter(
    (d) =>
      d.source !== 'rosetta' ||
      d.start === undefined ||
      visibleSpans.some((s) => spanContains(s, d.start!)),
  );
}
