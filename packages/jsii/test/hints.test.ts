import { InterfaceType, TypeKind } from '@jsii/spec';

import { sourceToAssemblyHelper } from '../lib';

describe('@struct', () => {
  test('causes behavioral-named interfaces to be structs', () => {
    const assembly = sourceToAssemblyHelper(`
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

  test('can be used on any struct', () => {
    const assembly = sourceToAssemblyHelper(`
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
