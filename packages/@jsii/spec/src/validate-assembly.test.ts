import { readFileSync, readdirSync } from 'node:fs';
import { resolve } from 'node:path';

import { validateAssembly } from './validate-assembly';

test('rejects invalid assembly', () =>
  expect(() => validateAssembly({})).toThrow(/Invalid assembly:/));

describe('can load older assemblies', () => {
  const samplesDir = resolve(
    __dirname,
    '..',
    'test-data',
    'previous-assemblies',
  );
  for (const sample of readdirSync(samplesDir)) {
    test(sample, () => {
      const data = JSON.parse(
        readFileSync(resolve(samplesDir, sample), { encoding: 'utf-8' }),
      );
      expect(validateAssembly(data)).toBe(data);
    });
  }
});
