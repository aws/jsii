import { validateAssembly } from '../lib/validate-assembly';

describe('validateAssembly', () => {
  test('rejects invalid assembly', () =>
    expect(() => validateAssembly({})).toThrow(/Invalid assembly:/));
});
