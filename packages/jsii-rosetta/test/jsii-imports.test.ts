// Test translation of imports with actual jsii assemblies
//
// - For Python, there is a lot of variation in what imports get translated to (mirroring
//   the style in TypeScript, occasionally adding extra imports as required).
// - For other languages, we'll mostly translate the same thing.

import { TargetLanguage, TranslatedSnippet } from '../lib';
import { MultipleSources, TestJsiiModule, DUMMY_JSII_CONFIG } from './testutil';

describe('no submodule', () => {
  describe('top-level struct', () => {
    let module: TestJsiiModule;
    beforeAll(() => {
      module = makeJsiiModule({ withModule: false, nestedStruct: false });
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
        expectTranslation(trans, TargetLanguage.PYTHON, [
          'import example_test_demo as masm',
          'obj = masm.MyClass("value",',
          '    my_struct=masm.MyStruct(',
          '        value="v"',
          '    )',
          ')',
        ]);
      });

      test('to Java', () => {
        // eslint-disable-next-line prettier/prettier
        expectTranslation(trans, TargetLanguage.JAVA, [
          'import example.test.demo.*;',
          ...DEFAULT_JAVA_CODE,
        ]);
      });

      test('to C#', () => {
        // eslint-disable-next-line prettier/prettier
        expectTranslation(trans, TargetLanguage.CSHARP, [
          'using Example.Test.Demo;',
          ...DEFAULT_CSHARP_CODE,
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
        expectTranslation(trans, TargetLanguage.PYTHON, [
          'from example_test_demo import MyStruct',
          'from example_test_demo import MyClass',
          'obj = MyClass("value",',
          '    my_struct=MyStruct(',
          '        value="v"',
          '    )',
          ')',
        ]);
      });

      test('to Java', () => {
        // eslint-disable-next-line prettier/prettier
        expectTranslation(trans, TargetLanguage.JAVA, [
          'import example.test.demo.MyClass;',
          ...DEFAULT_JAVA_CODE,
        ]);
      });

      test('to C#', () => {
        // eslint-disable-next-line prettier/prettier
        expectTranslation(trans, TargetLanguage.CSHARP, [
          'using Example.Test.Demo;',
          ...DEFAULT_CSHARP_CODE,
        ]);
      });
    });
  });

  describe('nested struct', () => {
    let module: TestJsiiModule;
    beforeAll(() => {
      module = makeJsiiModule({ withModule: false, nestedStruct: true });
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
        expectTranslation(trans, TargetLanguage.PYTHON, [
          'import example_test_demo as masm',
          'obj = masm.MyClass("value",',
          '    my_struct=masm.MyClass.MyStruct(',
          '        value="v"',
          '    )',
          ')',
        ]);
      });

      test('to Java', () => {
        // eslint-disable-next-line prettier/prettier
        expectTranslation(trans, TargetLanguage.JAVA, [
          'import example.test.demo.*;',
          ...DEFAULT_JAVA_CODE,
        ]);
      });

      test('to C#', () => {
        // eslint-disable-next-line prettier/prettier
        expectTranslation(trans, TargetLanguage.CSHARP, [
          'using Example.Test.Demo;',
          ...DEFAULT_CSHARP_CODE,
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
        expectTranslation(trans, TargetLanguage.PYTHON, [
          'from example_test_demo import MyClass',
          'obj = MyClass("value",',
          '    my_struct=MyClass.MyStruct(',
          '        value="v"',
          '    )',
          ')',
        ]);
      });

      test('to Java', () => {
        // eslint-disable-next-line prettier/prettier
        expectTranslation(trans, TargetLanguage.JAVA, [
          'import example.test.demo.MyClass;',
          ...DEFAULT_JAVA_CODE,
        ]);
      });

      test('to C#', () => {
        // eslint-disable-next-line prettier/prettier
        expectTranslation(trans, TargetLanguage.CSHARP, [
          'using Example.Test.Demo;',
          ...DEFAULT_CSHARP_CODE,
        ]);
      });
    });
  });

  describe('enum', () => {
    let module: TestJsiiModule;
    beforeAll(() => {
      module = TestJsiiModule.fromSource(
        {
          'index.ts': `export enum MyEnum { OPTION_A = 'a', OPTION_B = 'b' }

          export interface MyProps { readonly prop: MyEnum }

          export function myFun(props: MyProps) {
            Array.isArray(props);
          }
          `,
        },
        {
          name: 'my_assembly',
          jsii: DUMMY_JSII_CONFIG,
        },
      );
    });

    afterAll(() => module.cleanup());

    describe('package import', () => {
      let trans: TranslatedSnippet;
      beforeAll(() => {
        trans = module.translateHere(`
            import * as masm from 'my_assembly';
            const x = masm.MyEnum.OPTION_A;
          `);
      });

      test('to Python', () => {
        expectTranslation(trans, TargetLanguage.PYTHON, [
          'import example_test_demo as masm',
          'x = masm.MyEnum.OPTION_A',
        ]);
      });

      test('to Java', () => {
        // eslint-disable-next-line prettier/prettier
        expectTranslation(trans, TargetLanguage.JAVA, [
          'import example.test.demo.*;',
          'MyEnum x = MyEnum.OPTION_A;',
        ]);
      });

      test('to C#', () => {
        // eslint-disable-next-line prettier/prettier
        expectTranslation(trans, TargetLanguage.CSHARP, [
          'using Example.Test.Demo;',
          'var x = MyEnum.OPTION_A;',
        ]);
      });
    });

    describe('direct import', () => {
      let trans: TranslatedSnippet;
      beforeAll(() => {
        trans = module.translateHere(
          `import { MyEnum } from 'my_assembly';
          const x = MyEnum.OPTION_A;
          `,
        );
      });

      test('to Python', () => {
        expectTranslation(trans, TargetLanguage.PYTHON, [
          'from example_test_demo import MyEnum',
          'x = MyEnum.OPTION_A',
        ]);
      });

      test('to Java', () => {
        // eslint-disable-next-line prettier/prettier
        expectTranslation(trans, TargetLanguage.JAVA, [
          'import example.test.demo.MyEnum;',
          'MyEnum x = MyEnum.OPTION_A;',
        ]);
      });

      test('to C#', () => {
        // eslint-disable-next-line prettier/prettier
        expectTranslation(trans, TargetLanguage.CSHARP, [
          'using Example.Test.Demo;',
          'var x = MyEnum.OPTION_A;',
        ]);
      });
    });

    describe('implicit import', () => {
      let trans: TranslatedSnippet;
      beforeAll(() => {
        trans = module.translateHere(
          `import * as masm from 'my_assembly';
          masm.myFun({ prop: masm.MyEnum.OPTION_A });
          `,
        );
      });

      test('to Python', () => {
        expectTranslation(trans, TargetLanguage.PYTHON, [
          'import example_test_demo as masm',
          'masm.my_fun(prop=masm.MyEnum.OPTION_A)',
        ]);
      });

      test('to Java', () => {
        // eslint-disable-next-line prettier/prettier
        expectTranslation(trans, TargetLanguage.JAVA, [
          'import example.test.demo.*;',
          'myFun(MyProps.builder().prop(MyEnum.OPTION_A).build());',
        ]);
      });

      test('to C#', () => {
        // eslint-disable-next-line prettier/prettier
        expectTranslation(trans, TargetLanguage.CSHARP, [
          'using Example.Test.Demo;',
          'MyFun(new MyProps { Prop = MyEnum.OPTION_A });',
        ]);
      });
    });
  });
});

describe('with submodule', () => {
  describe('top-level struct', () => {
    let module: TestJsiiModule;
    beforeAll(() => {
      module = makeJsiiModule({ withModule: true, nestedStruct: false });
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
        expectTranslation(trans, TargetLanguage.PYTHON, [
          'from example_test_demo import boop as mod',
          'obj = mod.MyClass("value",',
          '    my_struct=mod.MyStruct(',
          '        value="v"',
          '    )',
          ')',
        ]);
      });

      test('to Java', () => {
        // eslint-disable-next-line prettier/prettier
        expectTranslation(trans, TargetLanguage.JAVA, [
          'import example.test.demo.boop.*;',
          ...DEFAULT_JAVA_CODE,
        ]);
      });

      test('to C#', () => {
        // eslint-disable-next-line prettier/prettier
        expectTranslation(trans, TargetLanguage.CSHARP, [
          'using Example.Test.Demo.Boop;',
          ...DEFAULT_CSHARP_CODE,
        ]);
      });
    });
  });

  describe('nested struct', () => {
    let module: TestJsiiModule;
    beforeAll(() => {
      module = makeJsiiModule({ withModule: true, nestedStruct: true });
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
        expectTranslation(trans, TargetLanguage.PYTHON, [
          'from example_test_demo import boop as mod',
          'obj = mod.MyClass("value",',
          '    my_struct=mod.MyClass.MyStruct(',
          '        value="v"',
          '    )',
          ')',
        ]);
      });

      test('to Java', () => {
        // eslint-disable-next-line prettier/prettier
        expectTranslation(trans, TargetLanguage.JAVA, [
          'import example.test.demo.boop.*;',
          ...DEFAULT_JAVA_CODE,
        ]);
      });

      test('to C#', () => {
        // eslint-disable-next-line prettier/prettier
        expectTranslation(trans, TargetLanguage.CSHARP, [
          'using Example.Test.Demo.Boop;',
          ...DEFAULT_CSHARP_CODE,
        ]);
      });
    });
  });
});

function makeJsiiModule(options: { readonly withModule: boolean; readonly nestedStruct: boolean }): TestJsiiModule {
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
        'index.ts': 'export * as submod from "./submodule/module";',
        'submodule/module.ts': payload,
        'submodule/.jsiirc.json': JSON.stringify({
          targets: {
            python: {
              module: 'example_test_demo.boop',
            },
            java: {
              package: 'example.test.demo.boop',
            },
            dotnet: {
              namespace: 'Example.Test.Demo.Boop',
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

// The implementation part of the Java code is always the same
const DEFAULT_JAVA_CODE = [
  'MyClass obj = MyClass.Builder.create("value")',
  '        .myStruct(MyStruct.builder()',
  '                .value("v")',
  '                .build())',
  '        .build();',
];

// The implementation part of the CSharp code is always the same
const DEFAULT_CSHARP_CODE = [
  'var obj = new MyClass("value", new MyClassProps {',
  '    MyStruct = new MyStruct {',
  '        Value = "v"',
  '    }',
  '});',
];

/**
 * Verify the output in the given language. All expected outputs look the same.
 */
function expectTranslation(trans: TranslatedSnippet, lang: TargetLanguage, expected: string[]) {
  expect(trans.get(lang)?.source.split('\n')).toEqual(expected);
}
