// Test interactions with actual jsii assemblies

import { TargetLanguage, TranslatedSnippet } from '../lib';
import { MultipleSources, TestJsiiModule, DUMMY_JSII_CONFIG } from './testutil';

describe('no submodule', () => {
  describe('top-level struct', () => {
    let module: TestJsiiModule;
    beforeAll(async () => {
      module = await makeJsiiModule({ withModule: false, nestedStruct: false });
    });

    afterAll(() => module.cleanup());

    describe('package import', () => {
      let trans: TranslatedSnippet;
      beforeAll(() => {
        trans = module.translateHere(`
            import * as masm from 'my_assembly';
            const obj = new masm.MyClass('value', {
              myStruct: {
                value: 'v',
              },
            });
          `);
      });

      test('to Python', () => {
        expect(trans.get(TargetLanguage.PYTHON)?.source.split('\n')).toEqual([
          'import example_test_demo as masm',
          'obj = masm.MyClass("value",',
          '    my_struct=masm.MyStruct(',
          '        value="v"',
          '    )',
          ')',
        ]);
      });
    });

    describe('class import', () => {
      let trans: TranslatedSnippet;
      beforeAll(() => {
        trans = module.translateHere(
          `import { MyClass } from 'my_assembly';
            const obj = new MyClass('value', {
              myStruct: {
                value: 'v',
              },
            });
          `,
        );
      });

      test('to Python', () => {
        expect(trans.get(TargetLanguage.PYTHON)?.source.split('\n')).toEqual([
          'from example_test_demo import MyStruct',
          'from example_test_demo import MyClass',
          'obj = MyClass("value",',
          '    my_struct=MyStruct(',
          '        value="v"',
          '    )',
          ')',
        ]);
      });
    });
  });

  describe('nested struct', () => {
    let module: TestJsiiModule;
    beforeAll(async () => {
      module = await makeJsiiModule({ withModule: false, nestedStruct: true });
    });
    afterAll(() => module.cleanup());

    describe('package import', () => {
      let trans: TranslatedSnippet;
      beforeAll(() => {
        trans = module.translateHere(`
            import * as masm from 'my_assembly';
            const obj = new masm.MyClass('value', {
              myStruct: {
                value: 'v',
              },
            });
          `);
      });

      test('to Python', () => {
        expect(trans.get(TargetLanguage.PYTHON)?.source.split('\n')).toEqual([
          'import example_test_demo as masm',
          'obj = masm.MyClass("value",',
          '    my_struct=masm.MyClass.MyStruct(',
          '        value="v"',
          '    )',
          ')',
        ]);
      });
    });

    describe('class import', () => {
      let trans: TranslatedSnippet;
      beforeAll(() => {
        trans = module.translateHere(`
            import { MyClass } from 'my_assembly';
            const obj = new MyClass('value', {
              myStruct: {
                value: 'v',
              },
            });
          `);
      });

      test('to Python', () => {
        expect(trans.get(TargetLanguage.PYTHON)?.source.split('\n')).toEqual([
          'from example_test_demo import MyClass',
          'obj = MyClass("value",',
          '    my_struct=MyClass.MyStruct(',
          '        value="v"',
          '    )',
          ')',
        ]);
      });
    });
  });
});

describe('with submodule', () => {
  describe('top-level struct', () => {
    let module: TestJsiiModule;
    beforeAll(async () => {
      module = await makeJsiiModule({ withModule: true, nestedStruct: false });
    });

    afterAll(() => module.cleanup());

    describe('namespace import', () => {
      let trans: TranslatedSnippet;
      beforeAll(() => {
        trans = module.translateHere(`
            import { submod as mod } from 'my_assembly';
            const obj = new mod.MyClass('value', {
              myStruct: {
                value: 'v',
              },
            });
          `);
      });

      test('to Python', () => {
        expect(trans.get(TargetLanguage.PYTHON)?.source.split('\n')).toEqual([
          'from example_test_demo import submod as mod',
          'obj = mod.MyClass("value",',
          '    my_struct=mod.MyStruct(',
          '        value="v"',
          '    )',
          ')',
        ]);
      });
    });
  });

  describe('nested struct', () => {
    let module: TestJsiiModule;
    beforeAll(async () => {
      module = await makeJsiiModule({ withModule: true, nestedStruct: true });
    });

    afterAll(() => module.cleanup());

    describe('namespace import', () => {
      let trans: TranslatedSnippet;
      beforeAll(() => {
        trans = module.translateHere(`
            import { submod as mod } from 'my_assembly';
            const obj = new mod.MyClass('value', {
              myStruct: {
                value: 'v',
              },
            });
          `);
      });

      test('to Python', () => {
        expect(trans.get(TargetLanguage.PYTHON)?.source.split('\n')).toEqual([
          'from example_test_demo import submod as mod',
          'obj = mod.MyClass("value",',
          '    my_struct=mod.MyClass.MyStruct(',
          '        value="v"',
          '    )',
          ')',
        ]);
      });
    });
  });
});

async function makeJsiiModule(options: {
  readonly withModule: boolean;
  readonly nestedStruct: boolean;
}): Promise<TestJsiiModule> {
  const nsRef = options.nestedStruct ? 'MyClass.' : '';
  const nsDeclBegin = options.nestedStruct ? 'export namespace MyClass {\n' : '';
  const nsDeclEnd = options.nestedStruct ? '}' : '';

  const payload = `
    export class MyClass {
      constructor(value: string, props: ${nsRef}MyClassProps) {
        Array.isArray(value);
        Array.isArray(props);
      }
    }

    ${nsDeclBegin}
    export interface MyClassProps {
      readonly myStruct: MyStruct;
    }

    export interface MyStruct {
      readonly value: string;
    }
    ${nsDeclEnd}
    `;

  const source: MultipleSources = options.withModule
    ? {
        'index.ts': 'export * as submod from "./submodule/lib/module";',
        'submodule/lib/module.ts': payload,
        // Submodule needs to live 2 levels deep, because that' the only place jsii
        // will look for a '.jsiirc.json',
        'submodule/.jsiirc.json': JSON.stringify({
          targets: {
            python: {
              module: 'example_test_demo.boop',
            },
          },
        }),
      }
    : {
        'index.ts': payload,
      };

  return TestJsiiModule.fromSource(source, {
    name: 'my_assembly',
    jsii: DUMMY_JSII_CONFIG,
  });
}
