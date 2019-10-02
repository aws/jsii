import { CodeMaker } from 'codemaker';
import * as spec from 'jsii-spec';
import { DotNetNameUtils } from './nameutils';

/**
 * Generates the Jsii attributes and calls for the .NET runtime
 *
 * Uses the same instance of CodeMaker as the rest of the code
 */
export class DotNetDocGenerator {
  private readonly code: CodeMaker;
  private readonly nameutils: DotNetNameUtils = new DotNetNameUtils();

  public constructor(code: CodeMaker) {
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
  public emitDocs(obj: spec.Method | spec.InterfaceType | spec.ClassType | spec.Property | spec.EnumType | spec.Initializer): void {
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

    // At this point we only need a valid instance of docs
    if (!docs) {
      return;
    }

    if (docs.returns) {
      this.code.line('/// <returns>');
      const returnsLines = docs.returns.split('\n');
      returnsLines.forEach( line => this.code.line(`/// ${line}`));
      this.code.line('/// </returns>');
    }

    const remarks: string[] = [];
    let remarksOpen = false;
    if (docs.remarks) {
      this.code.line('/// <remarks>');
      remarksOpen = true;
      const remarkLines = docs.remarks.split('\n');
      remarkLines.forEach( line => this.code.line(`/// ${line}`));
    }

    if (docs.default) {
      const defaultLines = docs.default.split('\n');
      remarks.push('default:');
      defaultLines.forEach( line => remarks.push(`${line}`));
    }

    if (docs.stability) {
      remarks.push(`stability: ${this.nameutils.capitalizeWord(docs.stability)}`);
    }

    if (docs.example) {
      const remarkLines = docs.example.split('\n');
      remarks.push('example:');
      remarks.push('<code>');
      remarkLines.forEach( line => remarks.push(`${line}`));
      remarks.push('</code>');
    }

    if (docs.see) {
      const seeLines = docs.see.split('\n');
      remarks.push('see:');
      seeLines.forEach( line => remarks.push(`${line}`));
    }

    if (docs.subclassable) {
      remarks.push('subclassable');
    }

    if (docs.custom) {
      for (const [k, v] of Object.entries(docs.custom || {})) {
        const custom = k === 'link' ? `${k}: ${v} ` : `${k}: ${v}`; // Extra space for '@link' to keep unit tests happy
        const customLines = custom.split('\n');
        customLines.forEach( line => remarks.push(`${line}`));
      }
    }

    if (remarks.length > 0) {
      if (!remarksOpen) {
        this.code.line('/// <remarks>');
        remarksOpen = true;
      }
      remarks.forEach( line => this.code.line(`/// ${line}`));
    }

    if (remarksOpen) {
      this.code.line('/// </remarks>');
    }
  }
}
