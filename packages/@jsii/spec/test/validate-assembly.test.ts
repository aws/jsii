// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import { readFileSync, readdirSync } from 'fs';
import { resolve } from 'path';
import { validateAssembly } from '../lib/validate-assembly';

test('rejects invalid assembly', () =>
  expect(() => validateAssembly({})).toThrow(/Invalid assembly:/));

describe('can load older assemblies', () => {
  const samplesDir = resolve(__dirname, 'previous-assemblies');
  for (const sample of readdirSync(samplesDir)) {
    test(sample, () => {
      const data = JSON.parse(
        readFileSync(resolve(samplesDir, sample), { encoding: 'utf-8' }),
      );
      expect(validateAssembly(data)).toBe(data);
    });
  }
});
