import { Docs } from 'jsii-reflect';
import { EmitContext } from './emit-context';

export class Documentation {
  public constructor(private readonly docs: Docs) {}

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
  public emit(context: EmitContext): void {
    const { code } = context;
    if (this.docs.toString() !== '') {
      const lines = this.docs.toString().split('\n');
      for (const line of lines) {
        code.line(`// ${line}`);
      }
    }

    if (this.docs.returns !== '') {
      code.line(`//`);
      code.line(`// Returns: ${this.docs.returns}.`);
      code.line(`//`);
    }

    if (this.docs.example !== '') {
      code.line(`//`);
      // TODO: Translate code examples to Golang with Rosetta (not implemented there yet)
      code.line('// TODO: EXAMPLE');
      code.line(`//`);
    }

    if (this.docs.link !== '') {
      code.line(`// See: ${this.docs.link}`);
      code.line(`//`);
    }

    if (this.docs.deprecated) {
      code.line(`// Deprecated : ${this.docs.deprecationReason}`);
    } else {
      code.line(`// Stability: ${this.docs.stability}`);
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
