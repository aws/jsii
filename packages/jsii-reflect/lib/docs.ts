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

  /**
   * Returns docstring of summary and remarks
   */
  public toString() {
    return [this.docs.summary, this.docs.remarks]
      .filter((txt) => !!txt)
      .join('\n\n');
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

  /**
   * Return any custom tags on this type
   */
  public customTag(tag: string): string | undefined {
    return this.docs.custom?.[tag];
  }

  /**
   * Return summary of this type
   */
  public get summary(): string {
    return this.docs.summary ?? '';
  }

  /**
   * Return remarks for this type
   */
  public get remarks(): string {
    return this.docs.remarks ?? '';
  }

  /**
   * Return examples for this type
   */
  public get example(): string {
    return this.docs.example ?? '';
  }

  /**
   * Return documentation links for this type
   */
  public get link(): string {
    return this.docs.see ?? '';
  }

  /**
   * Returns the return type
   */
  public get returns(): string {
    return this.docs.returns ?? '';
  }

  /**
   * Returns the default value
   */
  public get default(): string {
    return this.docs.default ?? '';
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
