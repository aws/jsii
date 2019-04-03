import reflect = require('jsii-reflect');
import { ComparisonContext, shouldInspect } from './types';

export function compareEnum(original: reflect.EnumType, updated: reflect.EnumType, context: ComparisonContext) {
  for (const origMember of original.members.filter(shouldInspect(context))) {
    const updatedMember = updated.members.find(m => m.name === origMember.name);
    if (!updatedMember) {
      context.mismatches.report(original, `member ${origMember.name} has been removed`);
      continue;
    }
  }
}