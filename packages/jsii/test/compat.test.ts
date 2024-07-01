import { sourceToAssemblyHelper } from '../lib';

////////////////////////////////////////////////////////////////////////////////
// In Python and Ruby, positional parameters can be referred to by name, making
// them part of a function's signature. Always using the root implementation
// parameter names makes no difference in the undelying runtime, as JS
// positional arguments are... positional, but it reduces friction for Python
// and Ruby developers.
test('overriding methods use the overriden parameter names', async () => {
  const assembly = await sourceToAssemblyHelper(`
    export abstract class AbstractClass {
      public abstract method(param: number): void;
    }

    export class ConcreteClass extends AbstractClass {
      private constructor() { super(); }

      public method(_arg: number): void {
        // Nothing to do...
      }
    }
  `);

  expect(assembly.types!['testpkg.AbstractClass']).toEqual({
    abstract: true,
    assembly: 'testpkg',
    fqn: 'testpkg.AbstractClass',
    kind: 'class',
    methods: [
      {
        abstract: true,
        locationInModule: { filename: 'index.ts', line: 3 },
        name: 'method',
        parameters: [{ name: 'param', type: { primitive: 'number' } }],
      },
    ],
    initializer: {},
    locationInModule: { filename: 'index.ts', line: 2 },
    name: 'AbstractClass',
  });

  expect(assembly.types!['testpkg.ConcreteClass']).toEqual({
    assembly: 'testpkg',
    base: 'testpkg.AbstractClass',
    fqn: 'testpkg.ConcreteClass',
    kind: 'class',
    methods: [
      {
        locationInModule: { filename: 'index.ts', line: 9 },
        name: 'method',
        overrides: 'testpkg.AbstractClass',
        parameters: [{ name: 'param', type: { primitive: 'number' } }],
      },
    ],
    locationInModule: { filename: 'index.ts', line: 6 },
    name: 'ConcreteClass',
  });
});

test('implementing methods use the interface parameter names', async () => {
  const assembly = await sourceToAssemblyHelper(`
    export interface IInterface {
      method(param: number): void;
    }

    export class ConcreteClass implements IInterface {
      private constructor() {}

      public method(_arg: number): void {
        // Nothing to do...
      }
    }
  `);

  expect(assembly.types!['testpkg.IInterface']).toEqual({
    assembly: 'testpkg',
    fqn: 'testpkg.IInterface',
    kind: 'interface',
    methods: [
      {
        abstract: true,
        locationInModule: { filename: 'index.ts', line: 3 },
        name: 'method',
        parameters: [{ name: 'param', type: { primitive: 'number' } }],
      },
    ],
    locationInModule: { filename: 'index.ts', line: 2 },
    name: 'IInterface',
  });

  expect(assembly.types!['testpkg.ConcreteClass']).toEqual({
    assembly: 'testpkg',
    interfaces: ['testpkg.IInterface'],
    fqn: 'testpkg.ConcreteClass',
    kind: 'class',
    methods: [
      {
        locationInModule: { filename: 'index.ts', line: 9 },
        name: 'method',
        overrides: 'testpkg.IInterface',
        parameters: [{ name: 'param', type: { primitive: 'number' } }],
      },
    ],
    locationInModule: { filename: 'index.ts', line: 6 },
    name: 'ConcreteClass',
  });
});
