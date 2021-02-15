import { Assembly, SchemaVersion } from '@jsii/spec';

export function fakeAssembly(parts: Partial<Assembly>): Assembly {
  return {
    schema: SchemaVersion.LATEST,
    name: 'test-assembly',
    description: 'A fake assembly used for tests',
    homepage: '',
    repository: { directory: '', type: '', url: '' },
    author: { email: '', name: '', organization: false, roles: [], url: '' },
    fingerprint: '<NONE>',
    version: '0.0.0-use.local',
    jsiiVersion: '0.0.0-use.local',
    license: 'UNLICENSED',
    ...parts,
  };
}
