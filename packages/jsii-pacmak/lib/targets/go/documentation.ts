import { Stability } from '@jsii/spec';
import { CodeMaker } from 'codemaker';
import { Docs } from 'jsii-reflect';
import { Rosetta } from 'jsii-rosetta';

export class Documentation {
  public constructor(private readonly code: CodeMaker, _rosetta: Rosetta) {}

  /**
   * Emits all documentation depending on what is available in the jsii model
   *
   * Used by all kind of members + classes, interfaces, enums
   * Order should be
   * Summary + Remarks
   * Returns
   * Examples TODO rosetta stuff
   * Link
   * Stability/Deprecation description
   */
  public emit(docs: Docs): void {
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
      this.emitComment('TODO: EXAMPLE');
      this.emitComment();
    }

    if (docs.link !== '') {
      this.emitComment(`See: ${docs.link}`);
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

  private emitComment(text = '') {
    for (const line of text.split('\n')) {
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
