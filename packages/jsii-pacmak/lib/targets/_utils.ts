import * as spec from '@jsii/spec';

export function stabilityPrefixFor(element: spec.Documentable): string {
  if (element.docs?.stability === spec.Stability.Experimental) {
    return '(experimental) ';
  }
  if (element.docs?.stability === spec.Stability.Deprecated) {
    return '(deprecated) ';
  }
  return '';
}

export function renderSummary(docs?: spec.Docs): string {
  return docs?.summary ? stabilityPrefixFor({ docs }) + docs.summary : '';
}

export interface PropertyDefinition {
  readonly prop: spec.Property;
  readonly definingType: spec.Type;
}

export interface MethodDefinition {
  readonly method: spec.Method;
  readonly definingType: spec.Type;
}
