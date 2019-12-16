import { CodeMaker } from 'codemaker';
import * as spec from '@jsii/spec';
import * as xmlbuilder from 'xmlbuilder';
import { DotNetNameUtils } from './nameutils';
import { prefixMarkdownTsCodeBlocks } from '../../util';


const SAMPLES_DISCLAIMER = '// This example is in TypeScript, examples in C# are coming soon.';

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
    this.emitXmlDoc('summary', docs?.summary || '');

    // Handling parameters only if the obj is a method
    const objMethod = obj as spec.Method;
    if (objMethod.parameters) {
      objMethod.parameters.forEach(param => {
        // Remove any slug `@` from the parameter name - it's not supposed to show up here.
        const paramName = this.nameutils.convertParameterName(param.name).replace(/^@/, '');
        this.emitXmlDoc('param', param.docs?.summary || '', { attributes: { name: paramName } });
      });
    }

    // At this point we only need a valid instance of docs
    if (!docs) {
      return;
    }

    if (docs.returns) {
      this.emitXmlDoc('returns', docs.returns);
    }

    const remarks = xmlbuilder.create('remarks', { headless: true });
    if (docs.remarks) {
      remarks.text(`\n${prefixMarkdownTsCodeBlocks(docs.remarks, SAMPLES_DISCLAIMER)}\n`);
    }

    if (docs.default) {
      remarks.text(`\ndefault:\n${docs.default}\n`);
    }

    if (docs.stability) {
      remarks.text(`\nstability: ${this.nameutils.capitalizeWord(docs.stability)}\n`);
    }

    if (docs.example) {
      remarks.text('\nexample:\n');
      remarks.ele('code')
        .text('\n// Examples in C# are coming soon.\n')
        .text(`${docs.example}\n`)
      remarks.text('\n');
    }

    if (docs.see) {
      remarks.text(`\nsee:\n${docs.see}\n`);
    }

    if (docs.subclassable) {
      remarks.text('\nsubclassable\n');
    }

    if (docs.custom) {
      for (const [k, v] of Object.entries(docs.custom ?? {})) {
        const custom = k === 'link' ? `${k}: ${v} ` : `${k}: ${v}`; // Extra space for '@link' to keep unit tests happy
        remarks.text(`\n${custom}\n`);
      }
    }

    const remarksXml = remarks.end({ allowEmpty: true });
    if (remarksXml !== '<remarks></remarks>') {
      for (const line of remarksXml.split('\n')) {
        this.code.line(`/// ${line}`);
      }
    }
  }

  private emitXmlDoc(tag: string, content: string, { attributes = {} }: { attributes?: { [name: string]: string } } = {}): void {
    const xml = xmlbuilder.create(tag, { headless: true })
      .text(content);
    for (const [name, value] of Object.entries(attributes)) {
      xml.att(name, value);
    }
    const xmlstring = xml.end({ allowEmpty: true, pretty: false });

    for (const line of xmlstring.split('\n').map(x => x.trim())) {
      this.code.line(`/// ${line}`)
    }
  }
}
