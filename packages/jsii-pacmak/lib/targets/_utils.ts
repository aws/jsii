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
