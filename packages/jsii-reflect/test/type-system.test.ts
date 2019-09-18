import spec = require('jsii-spec');
import { Stability } from 'jsii-spec';
import path = require('path');
import { TypeSystem } from '../lib';
import { diffTest, typeSystemFromSource } from './util';

let typesys: TypeSystem;

beforeAll(async () => {
  typesys = new TypeSystem();
  await typesys.loadModule(resolveModuleDir('jsii-calc'));
});

test('TypeSystem.hasAssembly', () => {
  expect(typesys.includesAssembly('@foo/bar')).toBeFalsy();
  expect(typesys.includesAssembly('jsii-calc')).toBeTruthy();
  expect(typesys.includesAssembly('@scope/jsii-calc-lib')).toBeTruthy();
});

test('TypeSystem.assemblies lists all the loaded assemblies', () => {
  return diffTest(typesys.assemblies.map(a => a.name).sort().join('\n'), 'assemblies.expected.txt');
});

test('TypeSystem.classes lists all the classes in the typesystem', () => {
  return diffTest(typesys.classes.map(c => c.name).sort().join('\n'), 'classes.expected.txt');
});

test('findClass', async () => {
  const calc = typesys.findClass('jsii-calc.Calculator');
  const actual = new Array<string>();
  Object.values(calc.getMethods(/* inherited */ true)).forEach(method => {
    actual.push(`${method.name} from ${method.parentType.name}`);
  });

  return diffTest(actual.join('\n'), 'findClass.expected.txt');
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
    const iface = typesys.findFqn('jsii-calc.IInterfaceThatShouldNotBeADataType');
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
      const base = typesys.findFqn('@scope/jsii-calc-base-of-base.VeryBaseProps');
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
      const iface = typesys.findFqn('jsii-calc.IInterfaceImplementedByAbstractClass');
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
      const base = typesys.findFqn('jsii-calc.IInterfaceImplementedByAbstractClass');

      // THEN
      expect(base.allImplementations).toEqual([typesys.findFqn('jsii-calc.AbstractClass'), base]);
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
  const iface = typesys.findInterface('@scope/jsii-calc-lib.IThreeLevelsInterface');
  const methodnames = iface.allMethods.map(m => m.name);
  methodnames.sort();
  expect(methodnames).toEqual(['bar', 'baz', 'foo']);
});

describe('@deprecated', () => {
  test('can be read on an item', () => {
    const klass = typesys.findClass('jsii-calc.Old');
    expect(klass.docs.deprecated).toBeTruthy();
  });

  test('is inherited from class', () => {
    const klass = typesys.findClass('jsii-calc.Old');
    const method = klass.getMethods().doAThing;
    expect(method.docs.deprecated).toBeTruthy();
  });
});

test('overridden member knows about both parent types', async () => {
  const ts = await typeSystemFromSource(`
    export class Foo {
      public foo() {
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
  const fooMethod = subType.allMethods.find(m => m.name === 'foo')!;
  const booMethod = subType.allMethods.find(m => m.name === 'boo')!;

  expect(fooMethod.parentType).toBe(subType);
  expect(fooMethod.definingType).toBe(superType);

  expect(booMethod.parentType).toBe(subType);
  expect(booMethod.definingType).toBe(subType);
  expect(booMethod.overrides).toBe(superType);
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
    test('when subclass is experimental', async () => {
      const ts = await typeSystemFromSource(`
        /**
         * @stable
         */
        export class Foo {
          constructor() {
            Array.isArray(3);
          }

          public foo() {
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
      const method = classType.allMethods.find(m => m.name === 'foo')!;

      expect(initializer.docs.stability).toEqual(Stability.Experimental);
      expect(method.docs.stability).toEqual(Stability.Experimental);
    });

    test('when method is experimental', async () => {
      const ts = await typeSystemFromSource(`
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
          public foo() {
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
      const method = classType.allMethods.find(m => m.name === 'foo')!;

      expect(initializer.docs.stability).toEqual(Stability.Experimental);
      expect(method.docs.stability).toEqual(Stability.Experimental);
    });

    test('when method is explicitly marked stable', async () => {
      const ts = await typeSystemFromSource(`
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
          public foo() {
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
      const method = classType.allMethods.find(m => m.name === 'foo')!;

      expect(initializer.docs.stability).toEqual(Stability.Experimental);
      expect(method.docs.stability).toEqual(Stability.Experimental);
    });

    test('external stability', async () => {
      const ts = await typeSystemFromSource(`
        /**
         * @stability external
         */
        export class Foo {
          public foo() {
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
      const method = classType.allMethods.find(m => m.name === 'foo')!;

      expect(method.docs.stability).toEqual(Stability.External);
    });
  });
});

function resolveModuleDir(name: string) {
  return path.dirname(require.resolve(`${name}/package.json`));
}
