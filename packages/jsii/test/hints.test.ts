import { InterfaceType, TypeKind } from '@jsii/spec';

import { sourceToAssemblyHelper } from '../lib';

jest.mock('lodash', () => ({
  memoize: (fn: () => unknown) => fn,
}));

describe('@struct', () => {
  test('causes behavioral-named interfaces to be structs', async () => {
    const assembly = await sourceToAssemblyHelper(`
      /** @struct */
      export interface IPSet {
        readonly cidr: string;
      }
    `);

    expect(assembly.types!['testpkg.IPSet'].kind).toBe(TypeKind.Interface);
    expect((assembly.types!['testpkg.IPSet'] as InterfaceType).datatype).toBe(
      true,
    );
  });

  test('can be used on any struct', async () => {
    const assembly = await sourceToAssemblyHelper(`
      /** @struct */
      export interface Struct {
        readonly cidr: string;
      }
    `);

    expect(assembly.types!['testpkg.Struct'].kind).toBe(TypeKind.Interface);
    expect((assembly.types!['testpkg.Struct'] as InterfaceType).datatype).toBe(
      true,
    );
  });
});
