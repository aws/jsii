import { Docs } from 'jsii-reflect';
import { Rosetta } from 'jsii-rosetta';
import { CodeMaker } from 'codemaker';

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
   * Examples TODO rosetta stuff
   * Link
   * Stability/Deprecation description
   */
  public emit(docs: Docs): void {
    console.log(this.rosetta); // Placeholder, until rosetta is used

    if (docs.toString() !== '') {
      const lines = docs.toString().split('\n');
      for (const line of lines) {
        this.code.line(`// ${line}`);
      }
    }

    if (docs.returns !== '') {
      this.code.line(`//`);
      this.code.line(`// Returns: ${docs.returns}.`);
      this.code.line(`//`);
    }

    if (docs.example !== '') {
      this.code.line(`//`);
      // TODO: Translate code examples to Golang with Rosetta (not implemented there yet)
      this.code.line('// TODO: EXAMPLE');
      this.code.line(`//`);
    }

    if (docs.link !== '') {
      this.code.line(`// See: ${docs.link}`);
      this.code.line(`//`);
    }

    if (docs.deprecated) {
      this.code.line(`// Deprecated : ${docs.deprecationReason}`);
    } else {
      this.code.line(`// Stability: ${docs.stability}`);
    }
  }
}

// "docs": {
//   "custom": {
//     "customAttribute": "hasAValue"
//   },
//   "example": "function anExample() {\n}",
//   "remarks": "The docs are great. They're a bunch of tags.",
//   "see": "https://aws.amazon.com/",
//   "stability": "stable",
//   "summary": "This class has docs."
// },
