import { readFileSync, readdirSync } from 'fs';
import { resolve } from 'path';

import { validateAssembly } from './validate-assembly';

test('rejects invalid assembly', () =>
  expect(() => validateAssembly({})).toThrowErrorMatchingInlineSnapshot(`
    "Invalid assembly:
    * assembly must have required property 'author'
    * assembly must have required property 'description'
    * assembly must have required property 'fingerprint'
    * assembly must have required property 'homepage'
    * assembly must have required property 'jsiiVersion'
    * assembly must have required property 'license'
    * assembly must have required property 'name'
    * assembly must have required property 'repository'
    * assembly must have required property 'schema'
    * assembly must have required property 'version'"
  `));

test('rejects invalid assembly (alt)', () =>
  expect(() =>
    validateAssembly({
      author: {
        name: 'John Doe',
        email: 'john.doe@nowhere.blackhole',
        organization: 'Nowhere, Inc.',
      },

      description: 'Yada yada',
      name: 'dummy-assembly',
    }),
  ).toThrowErrorMatchingInlineSnapshot(`
    "Invalid assembly dummy-assembly:
    * assembly must have required property 'fingerprint'
    * assembly must have required property 'homepage'
    * assembly must have required property 'jsiiVersion'
    * assembly must have required property 'license'
    * assembly must have required property 'repository'
    * assembly must have required property 'schema'
    * assembly must have required property 'version'
    * assembly/author must have required property 'roles'
    * assembly/author/organization must be boolean"
  `));

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
