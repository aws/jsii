import reflect = require('jsii-reflect');
import { ComparisonContext } from './types';

export function compareEnum(original: reflect.EnumType, updated: reflect.EnumType, context: ComparisonContext) {
  for (const origMember of original.members) {
    const updatedMember = updated.members.find(m => m.name === origMember.name);
    if (!updatedMember) {
      context.mismatches.report({
        ruleKey: 'removed',
        violator: origMember,
        message: `member ${origMember.name} has been removed`
      });
      continue;
    }
  }
}