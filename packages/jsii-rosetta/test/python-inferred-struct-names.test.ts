// Test interactions with actual jsii assemblies

import { TargetLanguage } from '../lib';
import { MultipleSources, TestJsiiModule, DUMMY_ASSEMBLY_TARGETS } from './testutil';

describe('no submodule', () => {
  describe('package import', () => {
    test(
      'top-level struct',
      withJsiiModule(makeModuleSource({ withModule: false, nestedStruct: false }), (module) => {
        const trans = module.translateHere(`
            import * as masm from 'my_assembly';
            const obj = new masm.MyClass('value', {
              myStruct: {
                value: 'v',
              },
            });
          `);

        expect(trans.get(TargetLanguage.PYTHON)?.source.split('\n')).toEqual([
          'import my_assembly as masm',
          'obj = masm.MyClass("value",',
          '    my_struct=masm.MyStruct(',
          '        value="v"',
          '    )',
          ')',
        ]);
      }),
    );

    test(
      'nested struct',
      withJsiiModule(makeModuleSource({ withModule: false, nestedStruct: true }), (module) => {
        const trans = module.translateHere(`
            import * as masm from 'my_assembly';
            const obj = new masm.MyClass('value', {
              myStruct: {
                value: 'v',
              },
            });
          `);

        expect(trans.get(TargetLanguage.PYTHON)?.source.split('\n')).toEqual([
          'import my_assembly as masm',
          'obj = masm.MyClass("value",',
          '    my_struct=masm.MyClass.MyStruct(',
          '        value="v"',
          '    )',
          ')',
        ]);
      }),
    );
  });

  describe('class import', () => {
    test(
      'top-level struct',
      withJsiiModule(makeModuleSource({ withModule: false, nestedStruct: false }), (module) => {
        const trans = module.translateHere(`
          import { MyClass } from 'my_assembly';
          const obj = new MyClass('value', {
            myStruct: {
              value: 'v',
            },
          });
        `);

        expect(trans.get(TargetLanguage.PYTHON)?.source.split('\n')).toEqual([
          'from my_assembly import MyStruct',
          '', // FIXME: don't know where this newline is coming from but at least it compiles
          'from my_assembly import MyClass',
          'obj = MyClass("value",',
          '    my_struct=MyStruct(',
          '        value="v"',
          '    )',
          ')',
        ]);
      }),
    );

    test(
      'nested struct',
      withJsiiModule(makeModuleSource({ withModule: false, nestedStruct: true }), (module) => {
        const trans = module.translateHere(`
          import { MyClass } from 'my_assembly';
          const obj = new MyClass('value', {
            myStruct: {
              value: 'v',
            },
          });
        `);

        expect(trans.get(TargetLanguage.PYTHON)?.source.split('\n')).toEqual([
          'from my_assembly import MyClass',
          'obj = MyClass("value",',
          '    my_struct=MyClass.MyStruct(',
          '        value="v"',
          '    )',
          ')',
        ]);
      }),
    );
  });
});

describe('with submodule', () => {
  describe('namespace import', () => {
    test(
      'top-level struct',
      withJsiiModule(makeModuleSource({ withModule: true, nestedStruct: false }), (module) => {
        const trans = module.translateHere(`
            import { submod } from 'my_assembly';
            const obj = new submod.MyClass('value', {
              myStruct: {
                value: 'v',
              },
            });
          `);

        expect(trans.get(TargetLanguage.PYTHON)?.source.split('\n')).toEqual([
          'from my_assembly import submod as mod',
          'obj = mod.MyClass("value",',
          '    my_struct=mod.MyStruct(',
          '        value="v"',
          '    )',
          ')',
        ]);
      }),
    );

    test(
      'nested struct',
      withJsiiModule(makeModuleSource({ withModule: true, nestedStruct: true }), (module) => {
        const trans = module.translateHere(`
            import { submod } from 'my_assembly';
            const obj = new submod.MyClass('value', {
              myStruct: {
                value: 'v',
              },
            });
          `);

        expect(trans.get(TargetLanguage.PYTHON)?.source.split('\n')).toEqual([
          'from my_assembly import submod as mod',
          'obj = mod.MyClass("value",',
          '    my_struct=mod.MyClass.MyStruct(',
          '        value="v"',
          '    )',
          ')',
        ]);
      }),
    );
  });
});

function withJsiiModule<A>(sources: string | MultipleSources, cb: (m: TestJsiiModule) => A | Promise<A>) {
  return async () => {
    const module = await TestJsiiModule.fromSource(sources, {
      name: 'my_assembly',
      jsii: DUMMY_ASSEMBLY_TARGETS,
    });
    try {
      return await cb(module);
    } finally {
      await module.cleanup();
    }
  };
}

function makeModuleSource(options: { readonly withModule: boolean; readonly nestedStruct: boolean }): MultipleSources {
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

  return options.withModule
    ? {
        'index.ts': 'export * as submod from "./module";',
        'module.ts': payload,
      }
    : {
        'index.ts': payload,
      };
}
