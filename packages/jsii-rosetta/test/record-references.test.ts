import { AssemblyFixture, DUMMY_ASSEMBLY_TARGETS } from './testutil';

let assembly: AssemblyFixture;
beforeAll(async () => {
  assembly = await AssemblyFixture.fromSource(
    `
    export class ClassA {
      public someMethod() {
      }
    }
    export class ClassB {
      public argumentMethod(args: BeeArgs) {
        Array.isArray(args);
      }
    }

    export interface BeeArgs { readonly value: string; readonly nested?: NestedType; }

    export interface NestedType { readonly x: number; }
    `,
    {
      name: 'my_assembly',
      jsii: DUMMY_ASSEMBLY_TARGETS,
    },
  );
});

test('detect class instantiations', () => {
  const translator = assembly.successfullyCompile(`
    import * as ass from 'my_assembly';
    const a = new ass.ClassA();
  `);
  expect(translator.fqnsReferenced()).toEqual(['my_assembly.ClassA']);
});

test("don't detect hidden class instantiations", () => {
  const translator = assembly.successfullyCompile(`
    /// !hide
    import * as ass from 'my_assembly';
    const a = new ass.ClassA();
    /// !show
    const b = new ass.ClassB();
  `);
  expect(translator.fqnsReferenced()).toEqual(['my_assembly.ClassB']);
});

test('detect method calls', () => {
  const translator = assembly.successfullyCompile(`
    /// !hide
    import * as ass from 'my_assembly';
    const a = new ass.ClassA();
    /// !show
    a.someMethod();
  `);
  expect(translator.fqnsReferenced()).toEqual(['my_assembly.ClassA#someMethod']);
});

test('detect types of parameter used in method calls', () => {
  const translator = assembly.successfullyCompile(`
    /// !hide
    import * as ass from 'my_assembly';
    const b = new ass.ClassB();
    /// !show
    b.argumentMethod({ value: 'hello' });
  `);
  expect(translator.fqnsReferenced()).toEqual(['my_assembly.BeeArgs', 'my_assembly.ClassB#argumentMethod']);
});

test('detect nested types of parameter used in method calls', () => {
  const translator = assembly.successfullyCompile(`
    /// !hide
    import * as ass from 'my_assembly';
    const b = new ass.ClassB();
    /// !show
    b.argumentMethod({ value: 'hello', nested: { x: 3 } });
  `);
  expect(translator.fqnsReferenced()).toContain('my_assembly.NestedType');
});
