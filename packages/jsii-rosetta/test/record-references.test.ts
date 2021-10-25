import { AssemblyFixture, DUMMY_ASSEMBLY_TARGETS } from './testutil';

let assembly: AssemblyFixture;
beforeAll(async () => {
  assembly = await AssemblyFixture.fromSource(
    `
    export class ClassA {
    }
    export class ClassB {
    }
    `,
    {
      name: 'my_assembly',
      jsii: DUMMY_ASSEMBLY_TARGETS,
    },
  );
});

test('detect class instantiations', () => {
  const translator = assembly.successFullyCompile(`
    import * as ass from 'my_assembly';
    const a = new ass.ClassA();
  `);
  expect(translator.fqnsReferenced()).toContain('my_assembly.ClassA');
});
