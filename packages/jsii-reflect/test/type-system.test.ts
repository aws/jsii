import * as spec from '@jsii/spec';
import { Stability } from '@jsii/spec';
import * as path from 'path';

import { TypeSystem } from '../lib';
import { TEST_FEATURES } from './features';
import { typeSystemFromSource, assemblyFromSource } from './util';

let typesys: TypeSystem;

beforeAll(async () => {
  typesys = new TypeSystem();
  await typesys.loadModule(resolveModuleDir('jsii-calc'), {
    supportedFeatures: TEST_FEATURES,
  });
});

test('jsii-calc assembly has package.json data attached', () => {
  const asm = typesys.assemblies.find((a) => a.name === 'jsii-calc');
  expect(asm?.packageJson).toMatchObject({
    name: 'jsii-calc',
    homepage: 'https://github.com/aws/jsii',
  });
});

test('TypeSystem.hasAssembly', () => {
  expect(typesys.includesAssembly('@foo/bar')).toBeFalsy();
  expect(typesys.includesAssembly('jsii-calc')).toBeTruthy();
  expect(typesys.includesAssembly('@scope/jsii-calc-lib')).toBeTruthy();
});

test('TypeSystem.assemblies lists all the loaded assemblies', () =>
  expect(typesys.assemblies.map((a) => a.name).sort()).toMatchSnapshot());

test('TypeSystem.classes lists all the classes in the typesystem', () =>
  expect(typesys.classes.map((c) => c.fqn).sort()).toMatchSnapshot());

test('findClass', () => {
  const calc = typesys.findClass('jsii-calc.Calculator');
  const actual = new Array<string>();
  Object.values(calc.getMethods(/* inherited */ true)).forEach((method) => {
    actual.push(`${method.name} from ${method.parentType.name}`);
  });

  expect(actual.join('\n')).toMatchSnapshot();
});

test('"roots" is a list of the directly loaded assemblies', async () => {
  expect(typesys.roots.length).toBe(1);
  expect(typesys.roots[0]).toBe(typesys.findAssembly('jsii-calc'));

  // now load another assembliy directly
  await typesys.load(resolveModuleDir('@scope/jsii-calc-lib'));
  return expect(typesys.roots.length).toBe(2);
});

describe('Type', () => {
  test('.isClassType', () => {
    // GIVEN
    const clazz = typesys.findFqn('jsii-calc.AllTypes');
    const iface = typesys.findFqn('jsii-calc.IPublicInterface');
    const enumt = typesys.findFqn('jsii-calc.AllTypesEnum');

    // THEN
    expect(clazz.isClassType()).toBeTruthy();
    expect(iface.isClassType()).toBeFalsy();
    expect(enumt.isClassType()).toBeFalsy();
  });

  test('.isDataType', () => {
    // GIVEN
    const clazz = typesys.findFqn('jsii-calc.AllTypes');
    const iface = typesys.findFqn(
      'jsii-calc.IInterfaceThatShouldNotBeADataType',
    );
    const datat = typesys.findFqn('jsii-calc.CalculatorProps');
    const enumt = typesys.findFqn('jsii-calc.AllTypesEnum');

    // THEN
    expect(clazz.isDataType()).toBeFalsy();
    expect(iface.isDataType()).toBeFalsy();
    expect(datat.isDataType()).toBeTruthy();
    expect(enumt.isDataType()).toBeFalsy();
  });

  test('.isInterfaceType', () => {
    // GIVEN
    const clazz = typesys.findFqn('jsii-calc.AllTypes');
    const iface = typesys.findFqn('jsii-calc.IPublicInterface');
    const enumt = typesys.findFqn('jsii-calc.AllTypesEnum');

    // THEN
    expect(clazz.isInterfaceType()).toBeFalsy();
    expect(iface.isInterfaceType()).toBeTruthy();
    expect(enumt.isInterfaceType()).toBeFalsy();
  });

  test('.isEnumType', () => {
    // GIVEN
    const clazz = typesys.findFqn('jsii-calc.AllTypes');
    const iface = typesys.findFqn('jsii-calc.IPublicInterface');
    const enumt = typesys.findFqn('jsii-calc.AllTypesEnum');

    // THEN
    expect(clazz.isEnumType()).toBeFalsy();
    expect(iface.isEnumType()).toBeFalsy();
    expect(enumt.isEnumType()).toBeTruthy();
  });

  describe('.extends(base)', () => {
    test('with interfaces', () => {
      // GIVEN
      const base = typesys.findFqn(
        '@scope/jsii-calc-base-of-base.VeryBaseProps',
      );
      const clazz = typesys.findFqn('jsii-calc.ImplictBaseOfBase');
      const enumt = typesys.findFqn('jsii-calc.AllTypesEnum');

      // THEN
      expect(base.extends(base)).toBeTruthy();
      expect(clazz.extends(clazz)).toBeTruthy();
      expect(clazz.extends(base)).toBeTruthy();
      expect(enumt.extends(base)).toBeFalsy();
      expect(base.extends(enumt)).toBeFalsy();
      expect(base.extends(clazz)).toBeFalsy();
    });

    test('with a class and an interface', () => {
      // GIVEN
      const iface = typesys.findFqn(
        'jsii-calc.IInterfaceImplementedByAbstractClass',
      );
      const clazz = typesys.findFqn('jsii-calc.AbstractClass');

      // THEN
      expect(clazz.extends(iface)).toBeTruthy();
    });

    test('with two classes', () => {
      // GIVEN
      const base = typesys.findFqn('jsii-calc.AbstractClassBase');
      const clazz = typesys.findFqn('jsii-calc.AbstractClass');

      // THEN
      expect(clazz.extends(base)).toBeTruthy();
    });
  });

  describe('.allImplementations', () => {
    test('with an interface', () => {
      // GIVEN
      const base = typesys.findFqn(
        'jsii-calc.IInterfaceImplementedByAbstractClass',
      );

      // THEN
      expect(base.allImplementations).toEqual([
        typesys.findFqn('jsii-calc.AbstractClass'),
        base,
      ]);
    });

    test('with an enum', () => {
      // GIVEN
      const enumt = typesys.findFqn('jsii-calc.AllTypesEnum');

      // THEN
      expect(enumt.allImplementations).toEqual([]);
    });
  });
});

test('Three Inheritance Levels', () => {
  const iface = typesys.findInterface(
    '@scope/jsii-calc-lib.IThreeLevelsInterface',
  );
  const methodnames = iface.allMethods.map((m) => m.name);
  methodnames.sort();
  expect(methodnames).toEqual(['bar', 'baz', 'foo']);
});

describe('@deprecated', () => {
  test('can be read on an item', () => {
    const klass = typesys.findClass('jsii-calc.Old');
    expect(klass.docs.deprecated).toBeTruthy();
    expect(klass.docs.stability).toBe(spec.Stability.Deprecated);
  });

  test('is inherited from class', () => {
    const klass = typesys.findClass('jsii-calc.Old');
    const method = klass.getMethods().doAThing;
    expect(method.docs.deprecated).toBeTruthy();
  });
});

/**
 * This test is actually testing the combination of `jsii`, `jsii-calc` and `jsii-reflect`.
 */
test('Submodules can have a README', () => {
  const jsiiCalc = typesys.findAssembly('jsii-calc');

  const submodule = jsiiCalc.submodules.find(
    (m) => m.fqn === 'jsii-calc.submodule',
  );
  const isolated = submodule?.submodules.find(
    (m) => m.fqn === 'jsii-calc.submodule.isolated',
  );

  expect(submodule?.readme?.markdown).toMatch(
    /This is the readme.*jsii-calc.submodule/,
  );
  expect(isolated?.readme?.markdown).toMatch(
    /This is the readme.*jsii-calc.submodule.isolated/,
  );
});

test('overridden member knows about both parent types', () => {
  const ts = typeSystemFromSource(`
    export class Foo {
      public bar() {
        Array.isArray(3);
      }

      public boo(): boolean {
        return true;
      }
    }

    export class SubFoo extends Foo {
      public boo(): boolean {
        return false;
      }
    }
  `);

  const superType = ts.findClass('testpkg.Foo');
  const subType = ts.findClass('testpkg.SubFoo');
  const fooMethod = subType.allMethods.find((m) => m.name === 'bar')!;
  const booMethod = subType.allMethods.find((m) => m.name === 'boo')!;

  expect(fooMethod.parentType).toBe(subType);
  expect(fooMethod.definingType).toBe(superType);

  expect(booMethod.parentType).toBe(subType);
  expect(booMethod.definingType).toBe(subType);
  expect(booMethod.overrides).toBe(superType);

  const superBooMethod = superType.allMethods.find((m) => m.name === 'boo')!;
  expect(booMethod.overriddenMethod).toEqual(superBooMethod);
});

describe('Stability', () => {
  test('can be read on an item', () => {
    const klass = typesys.findClass('jsii-calc.DocumentedClass');
    expect(klass.docs.stability).toBe(spec.Stability.Stable);
  });

  test('is inherited from class', () => {
    const klass = typesys.findClass('jsii-calc.DocumentedClass');
    const method = klass.getMethods().greet;
    expect(method.docs.stability).toBe(spec.Stability.Stable);
  });

  test('can be overridden from class', () => {
    const klass = typesys.findClass('jsii-calc.DocumentedClass');
    const method = klass.getMethods().hola;
    expect(method.docs.stability).toBe(spec.Stability.Experimental);
  });

  // ----------------------------------------------------------------------

  describe('lowest stability guarantee is advertised', () => {
    test('when subclass is experimental', () => {
      const ts = typeSystemFromSource(`
        /**
         * @stable
         */
        export class Foo {
          constructor() {
            Array.isArray(3);
          }

          public bar() {
            Array.isArray(3);
          }
        }

        /**
         * @experimental
         */
        export class SubFoo extends Foo {
        }
      `);
      const classType = ts.findClass('testpkg.SubFoo');
      const initializer = classType.initializer!;
      const method = classType.allMethods.find((m) => m.name === 'bar')!;

      expect(initializer.docs.stability).toEqual(Stability.Experimental);
      expect(method.docs.stability).toEqual(Stability.Experimental);
    });

    test('when method is experimental', () => {
      const ts = typeSystemFromSource(`
        /**
         * @stable
         */
        export class Foo {
          /**
           * @experimental
           */
          constructor() {
            Array.isArray(3);
          }

          /**
           * @experimental
           */
          public bar() {
            Array.isArray(3);
          }
        }

        /**
         * @stable
         */
        export class SubFoo extends Foo {
        }
      `);

      const classType = ts.findClass('testpkg.SubFoo');
      const initializer = classType.initializer!;
      const method = classType.allMethods.find((m) => m.name === 'bar')!;

      expect(initializer.docs.stability).toEqual(Stability.Experimental);
      expect(method.docs.stability).toEqual(Stability.Experimental);
    });

    test('when method is explicitly marked stable', () => {
      const ts = typeSystemFromSource(`
        /**
         * @stable
         */
        export class Foo {
          /**
           * @stable
           */
          constructor() {
            Array.isArray(3);
          }

          /**
           * @stable
           */
          public bar() {
            Array.isArray(3);
          }
        }

        /**
         * @experimental
         */
        export class SubFoo extends Foo {
        }
      `);

      const classType = ts.findClass('testpkg.SubFoo');
      const initializer = classType.initializer!;
      const method = classType.allMethods.find((m) => m.name === 'bar')!;

      expect(initializer.docs.stability).toEqual(Stability.Experimental);
      expect(method.docs.stability).toEqual(Stability.Experimental);
    });

    test('external stability', () => {
      const ts = typeSystemFromSource(`
        /**
         * @stability external
         */
        export class Foo {
          public bar() {
            Array.isArray(3);
          }
        }

        /**
         * @stable
         */
        export class SubFoo extends Foo {
        }
      `);

      const classType = ts.findClass('testpkg.SubFoo');
      const method = classType.allMethods.find((m) => m.name === 'bar')!;

      expect(method.docs.stability).toEqual(Stability.External);
    });
  });
});

test('TypeSystem.properties', () => {
  const ts = typeSystemFromSource(`
  export namespace submodule {
    export class Foo {
      public readonly test = 'TEST';
    }
    export interface Bar {
      readonly baz: number;
    }
  }
  `);
  expect(ts.properties).toHaveLength(2);
});

test('TypeSystem.methods', () => {
  const ts = typeSystemFromSource(`
  export namespace submodule {
    export class Foo {
      public method(): void {}
    }
    export interface IBar {
      baz(): number;
    }
  }
  `);
  expect(ts.methods).toHaveLength(2);
});

test('Assembly allTypes includes submodule types', () => {
  const asm = assemblyFromSource({
    'index.ts': 'export * as submod from "./submod";',
    'submod.ts': `export class Foo {}`,
  });

  expect(asm.allTypes.map((t) => t.fqn)).toEqual(['testpkg.submod.Foo']);
});

function resolveModuleDir(name: string) {
  return path.dirname(require.resolve(`${name}/package.json`));
}
