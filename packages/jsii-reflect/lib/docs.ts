import jsii = require('jsii-spec');
import { TypeSystem } from './type-system';

export interface Documentable {
  docs: Docs;
}

export class Docs {
  public readonly docs: jsii.Docs;

  constructor(
    public readonly system: TypeSystem,
    public readonly target: Documentable,
    spec: jsii.Docs,
    private readonly parentDocs?: Docs,
    ) {

    this.docs = spec || {};

  }

  public toString() {
    const ret = new Array<string>();
    if (this.docs.summary) { ret.push(this.docs.summary); }
    if (this.docs.remarks) { ret.push('', this.docs.remarks); }
    return ret.join('\n');
  }

  /**
   * Return the reason for deprecation of this type
   */
  public get deprecationReason(): string | undefined {
    if (this.docs.deprecated !== undefined) { return this.docs.deprecated; }
    if (this.parentDocs) { return this.parentDocs.deprecationReason; }
    return undefined;
  }

  /**
   * Return whether this type is deprecated
   */
  public get isDeprecated(): boolean {
    return this.deprecationReason !== undefined;
  }

  /**
   * Return the stability of this type
   */
  public get stability(): jsii.Stability | undefined {
    if (this.docs.stability !== undefined) { return this.docs.stability; }
    if (this.parentDocs) { return this.parentDocs.stability; }
    return undefined;
  }

  public customTag(tag: string): string | undefined {
    return this.docs.custom && this.docs.custom[tag];
  }
}