import { CodeMaker } from 'codemaker';
import * as spec from 'jsii-spec';
import { DotNetNameUtils } from './nameutils';
import { Rosetta, Translation, transformMarkdown, typeScriptSnippetFromSource, CSharpXmlCommentRenderer } from 'jsii-rosetta';
import { INCOMPLETE_DISCLAIMER_COMPILING, INCOMPLETE_DISCLAIMER_NONCOMPILING } from '..';

/**
 * Generates the Jsii attributes and calls for the .NET runtime
 *
 * Uses the same instance of CodeMaker as the rest of the code
 */
export class DotNetDocGenerator {
  private readonly code: CodeMaker;
  private readonly nameutils: DotNetNameUtils = new DotNetNameUtils();

  public constructor(code: CodeMaker, private readonly rosetta: Rosetta) {
    this.code = code;
  }

  /**
     * Emits all documentation depending on what is available in the jsii model
     *
     * Used by all kind of members + classes, interfaces, enums
     * Order should be
     * Summary
     * Param
     * Returns
     * Remarks (includes examples, links, deprecated)
     */
  public emitDocs(obj: spec.Documentable): void {
    const docs = obj.docs;

    // The docs may be undefined at the method level but not the parameters level
    if (docs) {
      if (docs.summary) {
        this.code.line(`/// <summary>${docs.summary}</summary>`);
      }
    }

    // Handling parameters only if the obj is a method
    const objMethod = obj as spec.Method;
    if (objMethod.parameters) {
      objMethod.parameters.forEach(param => {
        if (param.docs) {
          const paramSummary = param.docs.summary;
          if (paramSummary) {
            this.code.line(`/// <param name = "${this.nameutils.convertParameterName(param.name)}">${paramSummary}</param>`);
          }
        }
      });
    }

    // At this pdocfx namespacedocd a valid instance of docs
    if (!docs) {
      return;
    }

    if (docs.returns) {
      this.code.line('/// <returns>');
      const returnsLines = docs.returns.split('\n');
      returnsLines.forEach( line => this.code.line(`/// ${line}`));
      this.code.line('/// </returns>');
    }

    const remarks = this.renderRemarks(docs);
    if (remarks.length > 0) {
      this.code.line('/// <remarks>');
      remarks.forEach(r => this.code.line(`/// ${r}`));
      this.code.line('/// </remarks>');
    }

    if (docs.example) {
      const exampleLines = this.convertExample(docs.example).split('\n');
      this.code.line('/// <example>');
      this.code.line('/// <code>');
      exampleLines.forEach( line => this.code.line(`/// ${line}`));
      this.code.line('/// </code>');
      this.code.line('/// </example>');
    }
  }

  public emitMarkdownAsRemarks(markdown: string | undefined) {
    if (!markdown) { return; }

    const translated = this.markDownToXml(this.convertSamplesInMarkdown(markdown));
    const lines = translated.split('\n');

    this.code.line('/// <remarks>');
    for (const line of lines) {
      this.code.line(`/// ${line}`);
    }
    this.code.line('/// </remarks>');
  }

  /**
   * Returns the lines that should go into the <remarks> section
   */
  private renderRemarks(docs: spec.Docs): string[] {
    const ret: string[] = [];

    if (docs.remarks) {
      const translated = this.markDownToXml(this.convertSamplesInMarkdown(docs.remarks));
      ret.push(...translated.split('\n'));
      ret.push('');
    }

    // All the "tags" need to be rendered with empyt lines between them or they'll be word wrapped.

    if (docs.default) {
      const ls = docs.default.split('\n');
      ret.push(`default: ${ls[0]}`);
      ret.push(...ls.slice(1));
      ret.push('');
    }

    if (docs.stability) {
      ret.push(`stability: ${this.nameutils.capitalizeWord(docs.stability)}`);
      ret.push('');
    }

    if (docs.see) {
      const ls = docs.see.split('\n');
      ret.push(`see: ${ls[0]}`);
      ret.push(...ls.slice(1));
      ret.push('');
    }

    if (docs.subclassable) {
      ret.push('subclassable');
      ret.push('');
    }

    for (const [k, v] of Object.entries(docs.custom || {})) {
      const custom = k === 'link' ? `${k}: ${v} ` : `${k}: ${v}`; // Extra space for '@link' to keep unit tests happy
      ret.push(...custom.split('\n'));
      ret.push('');
    }

    // Remove leading and trailing empty lines
    while (ret.length > 0 && ret[0] === '') { ret.shift(); }
    while (ret.length > 0 && ret[ret.length - 1] === '') { ret.pop(); }

    return ret;
  }

  private convertExample(example: string): string {
    const snippet = typeScriptSnippetFromSource(example, 'example');
    const translated = this.rosetta.translateSnippet(snippet, 'csharp');
    if (!translated) { return example; }
    return this.prefixDisclaimer(translated);
  }

  private convertSamplesInMarkdown(markdown: string): string {
    return this.rosetta.translateSnippetsInMarkdown(markdown, 'csharp', trans => ({
      language: trans.language,
      source: this.prefixDisclaimer(trans)
    }));
  }

  /**
   * Convert MarkDown to XML using routines that we have available in Rosetta anyway
   */
  private markDownToXml(md: string) {
    return transformMarkdown(md, new CSharpXmlCommentRenderer());
  }

  private prefixDisclaimer(translated: Translation) {
    if (translated.didCompile && INCOMPLETE_DISCLAIMER_COMPILING) {
      return `// ${INCOMPLETE_DISCLAIMER_COMPILING}\n${translated.source}`;
    }
    if (!translated.didCompile && INCOMPLETE_DISCLAIMER_NONCOMPILING) {
      return `// ${INCOMPLETE_DISCLAIMER_NONCOMPILING}\n${translated.source}`;
    }
    return translated.source;
  }
}
