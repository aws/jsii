import { TestJsiiModule, DUMMY_ASSEMBLY_TARGETS } from './testutil';

let assembly: TestJsiiModule;
beforeAll(async () => {
  assembly = await TestJsiiModule.fromSource(
    {
      'index.ts': `
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

        export * as submod from './submodule';
        `,

      'submodule.ts': `
        export class SubmoduleClass {
        }
      `,
    },
    {
      name: 'my_assembly',
      jsii: DUMMY_ASSEMBLY_TARGETS,
    },
  );
});

afterAll(() => assembly.cleanup());

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

test('detect types in submodules', () => {
  const translator = assembly.successfullyCompile(`
    import { submod as subby } from 'my_assembly';
    const b = new subby.SubmoduleClass();
  `);
  expect(translator.fqnsReferenced()).toContain('my_assembly.submod.SubmoduleClass');
});
