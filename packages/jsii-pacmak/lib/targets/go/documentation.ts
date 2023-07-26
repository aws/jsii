import { Stability } from '@jsii/spec';
import { CodeMaker } from 'codemaker';
import { Docs } from 'jsii-reflect';
import { ApiLocation, Rosetta, TargetLanguage } from 'jsii-rosetta';

export class Documentation {
  public constructor(
    private readonly code: CodeMaker,
    private readonly rosetta: Rosetta,
  ) {}

  /**
   * Emits all documentation depending on what is available in the jsii model
   *
   * Used by all kind of members + classes, interfaces, enums
   * Order should be
   * Summary + Remarks
   * Returns
   * Examples <transliterated example code>
   * Link
   * Stability/Deprecation description
   */
  public emit(docs: Docs, apiLocation: ApiLocation): void {
    let firstLine = true;
    if (docs.toString() !== '') {
      this.emitComment(docs.toString());
      firstLine = false;
    }

    if (docs.returns !== '') {
      if (!firstLine) {
        this.emitComment();
      }
      firstLine = false;
      this.emitComment(`Returns: ${docs.returns}`);
    }

    if (docs.example !== '') {
      if (!firstLine) {
        this.emitComment();
      }
      firstLine = false;
      // TODO: Translate code examples to Go with Rosetta (not implemented there yet)
      this.code.line('// Example:');
      const goExample = this.rosetta.translateExample(
        apiLocation,
        docs.example,
        TargetLanguage.GO,
        false,
      );
      const lines = goExample.source.split('\n');
      for (const line of lines) {
        // Inline code needs to be intented one level deeper than regular text.
        this.code.line(`//   ${line}`.trim());
      }
      this.emitComment();
    }

    if (docs.link !== '') {
      this.emitComment(`See: ${docs.link}`);
      this.emitComment();
    }

    if (docs.default !== '') {
      this.emitComment(`Default: ${docs.default}`);
      this.emitComment();
    }

    this.emitStability(docs);
  }

  public emitStability(docs: Docs): void {
    const stability = docs.stability;
    if (stability && this.shouldMentionStability(docs)) {
      if (docs.deprecated) {
        this.emitComment(`Deprecated: ${docs.deprecationReason}`);
      } else {
        this.emitComment(`${this.code.toPascalCase(stability)}.`);
      }
    }
  }

  public emitReadme(moduleFqn: string, readme: string, directory: string) {
    const goReadme = this.rosetta.translateSnippetsInMarkdown(
      { api: 'moduleReadme', moduleFqn },
      readme,
      TargetLanguage.GO,
      false,
    );

    const readmeFile = `${directory}/README.md`;
    this.code.openFile(readmeFile);
    for (const line of goReadme.split('\n')) {
      this.code.line(line);
    }
    this.code.closeFile(readmeFile);
  }

  private emitComment(text = '') {
    const lines = text.trim().split('\n');

    // Ensure the comment always ends with a final period, conform with GoDoc conventions.
    const lastLine = lines[lines.length - 1];
    if (lastLine.trim() !== '' && !/\p{Sentence_Terminal}/u.test(lastLine)) {
      lines[lines.length - 1] = `${lastLine.trim()}.`;
    }

    for (const line of lines) {
      // Final trim() here is to avoid trailing whitespace on empty comment lines.
      this.code.line(`// ${line}`.trim());
    }
  }

  private shouldMentionStability({ stability }: Docs): boolean {
    // Don't render "stable" or "external", those are both stable by implication
    return (
      stability === Stability.Deprecated || stability === Stability.Experimental
    );
  }
}
