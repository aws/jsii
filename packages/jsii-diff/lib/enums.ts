// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import * as reflect from 'jsii-reflect';
import { compareStabilities } from './stability';
import { ComparisonContext } from './types';

export function compareEnum(
  original: reflect.EnumType,
  updated: reflect.EnumType,
  context: ComparisonContext,
) {
  compareStabilities(original, updated, context);

  for (const origMember of original.members) {
    const updatedMember = updated.members.find(
      (m) => m.name === origMember.name,
    );
    if (!updatedMember) {
      context.mismatches.report({
        ruleKey: 'removed',
        violator: origMember,
        message: `member ${origMember.name} has been removed`,
      });
      continue;
    }

    compareStabilities(origMember, updatedMember, context);
  }
}
