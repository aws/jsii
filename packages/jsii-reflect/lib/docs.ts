import * as jsii from '@jsii/spec';
import { Stability } from '@jsii/spec';
import { TypeSystem } from './type-system';

export interface Documentable {
  docs: Docs;
}

export class Docs {
  public readonly docs: jsii.Docs;

  public constructor(
    public readonly system: TypeSystem,
    public readonly target: Documentable,
    spec: jsii.Docs,
    private readonly parentDocs?: Docs,
  ) {
    this.docs = spec ?? {};
  }

  public toString() {
    const ret = new Array<string>();
    if (this.docs.summary) {
      ret.push(this.docs.summary);
    }
    if (this.docs.remarks) {
      ret.push('', this.docs.remarks);
    }
    return ret.join('\n');
  }

  public get subclassable(): boolean {
    return !!this.docs.subclassable;
  }

  /**
   * Return the reason for deprecation of this type
   */
  public get deprecationReason(): string | undefined {
    if (this.docs.deprecated !== undefined) {
      return this.docs.deprecated;
    }
    if (this.parentDocs) {
      return this.parentDocs.deprecationReason;
    }
    return undefined;
  }

  /**
   * Return whether this type is deprecated
   */
  public get deprecated(): boolean {
    return this.deprecationReason !== undefined;
  }

  /**
   * Return the stability of this type
   */
  public get stability(): jsii.Stability | undefined {
    return lowestStability(this.docs.stability, this.parentDocs?.stability);
  }

  public customTag(tag: string): string | undefined {
    return this.docs.custom?.[tag];
  }

  public get summary(): string {
    return this.docs.summary ?? '';
  }

  public get remarks(): string {
    return this.docs.remarks ?? '';
  }
}

const stabilityPrecedence = {
  [Stability.Deprecated]: 0,
  [Stability.Experimental]: 1,
  [Stability.External]: 2,
  [Stability.Stable]: 3,
};

function lowestStability(a?: Stability, b?: Stability): Stability | undefined {
  if (a === undefined) {
    return b;
  }
  if (b === undefined) {
    return a;
  }
  return stabilityPrecedence[a] < stabilityPrecedence[b] ? a : b;
}
