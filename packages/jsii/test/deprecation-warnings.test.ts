// eslint-disable-next-line import/no-extraneous-dependencies
import * as fs from 'fs';
import * as path from 'path';

import { compileJsiiForTest, HelperCompilationResult } from '../lib';
import { Compiler } from '../lib/compiler';
import { loadProjectInfo } from '../lib/project-info';

const DEPRECATED = '/** @deprecated Use something else */';

describe('Function generation', () => {
  test('generates the print function', async () => {
    const result = await compileJsiiForTest(``, undefined /* callback */, {
      addDeprecationWarnings: true,
    });

    expect(jsFile(result, '.warnings.jsii')).toMatch(
      `function print(name, deprecationMessage) {
    const deprecated = process.env.JSII_DEPRECATED;
    const deprecationMode = ["warn", "fail", "quiet"].includes(deprecated) ? deprecated : "warn";
    const message = \`\${name} is deprecated.\\n  \${deprecationMessage}\\n  This API will be removed in the next major release.\`;
    switch (deprecationMode) {
        case "fail":
            throw new DeprecationError(message);
        case "warn":
            console.warn("[WARNING]", message);
            break;
    }
}
const visitedObjects = new Set();
class DeprecationError extends Error {
}
module.exports = { print };
module.exports.DeprecationError = DeprecationError;
`,
    );
  });

  test('generates a function for each type', async () => {
    const result = await compileJsiiForTest(
      `
        export interface Foo {}
        export interface Bar {}
        export interface Baz {}
        `,
      undefined /* callback */,
      { addDeprecationWarnings: true },
    );

    expect(jsFile(result, '.warnings.jsii')).toMatch(
      `function testpkg_Foo(p) {
}
function testpkg_Bar(p) {
}
function testpkg_Baz(p) {
}`,
    );
  });

  test('generates metadata', async () => {
    const result = await compileJsiiForTest(
      `
        export interface Foo {}
        export interface Bar {}
        export interface Baz {}
        `,
      undefined /* callback */,
      { addDeprecationWarnings: true },
    );
    expect(
      result.assembly.metadata?.jsii?.compiledWithDeprecationWarnings,
    ).toBe(true);
  });

  test('for each non-primitive property, generates a call', async () => {
    const result = await compileJsiiForTest(
      `
        export interface Foo {}
        export interface Bar {}
        export interface Baz {
          readonly foo: Foo;
          readonly bar: Bar;
          readonly x: string;
        }
        `,
      undefined /* callback */,
      { addDeprecationWarnings: true },
    );

    expect(jsFile(result, '.warnings.jsii')).toMatch(`function testpkg_Baz(p) {
    if (p == null)
        return;
    visitedObjects.add(p);
    if (!visitedObjects.has(p.bar))
        testpkg_Bar(p.bar);
    if (!visitedObjects.has(p.foo))
        testpkg_Foo(p.foo);
    visitedObjects.delete(p);
}`);
  });

  test('generates empty functions for interfaces', async () => {
    const result = await compileJsiiForTest(
      `
        export interface IFoo {
          bar(): string;
        }
        `,
      undefined /* callback */,
      { addDeprecationWarnings: true },
    );

    expect(jsFile(result, '.warnings.jsii')).toMatch(`function testpkg_IFoo(p) {
}`);
  });

  test('generates empty functions for classes', async () => {
    const result = await compileJsiiForTest(
      `
        export class Foo {
          bar() {return 0};
        }
        `,
      undefined /* callback */,
      { addDeprecationWarnings: true },
    );

    expect(jsFile(result, '.warnings.jsii')).toMatch(`function testpkg_Foo(p) {
}`);
  });

  test('generates calls for recursive types', async () => {
    const result = await compileJsiiForTest(
      `
        export interface Bar {readonly bar?: Bar}
        `,
      undefined /* callback */,
      { addDeprecationWarnings: true },
    );

    expect(jsFile(result, '.warnings.jsii')).toMatch(
      `function testpkg_Bar(p) {
    if (p == null)
        return;
    visitedObjects.add(p);
    if (!visitedObjects.has(p.bar))
        testpkg_Bar(p.bar);
    visitedObjects.delete(p);
}`,
    );
  });

  test('generates exports for all the functions', async () => {
    const result = await compileJsiiForTest(
      `
        export interface Foo {}
        export interface Bar {}
        export interface Baz {}
        `,
      undefined /* callback */,
      { addDeprecationWarnings: true },
    );

    expect(jsFile(result, '.warnings.jsii')).toMatch(
      `module.exports = { print, testpkg_Foo, testpkg_Bar, testpkg_Baz };`,
    );
  });

  test('generates functions for enums', async () => {
    const result = await compileJsiiForTest(
      `
        export enum State {
          ON,

          ${DEPRECATED}
          OFF
        }
        `,
      undefined /* callback */,
      { addDeprecationWarnings: true },
    );

    expect(jsFile(result, '.warnings.jsii'))
      .toMatch(`function testpkg_State(p) {
    if (p == null)
        return;
    visitedObjects.add(p);
    const ns = require("./index.js");
    if (Object.values(ns.State).filter(x => x === p).length > 1)
        return;
    if (p === ns.State.OFF)
        print("testpkg.State#OFF", "Use something else");
    visitedObjects.delete(p);
}
`);
  });

  test('generates calls for deprecated inherited properties', async () => {
    const result = await compileJsiiForTest(
      `
        export interface Baz {
          /** @deprecated message from Baz */
          readonly x: string;
        }
        export interface Bar {
          /** @deprecated message from Bar */
          readonly x: string;
        }
        export interface Foo extends Bar, Baz {
        }
        `,
      undefined /* callback */,
      { addDeprecationWarnings: true },
    );

    const warningsFileContent = jsFile(result, '.warnings.jsii');

    // For each supertype, its corresponding function should be generated, as usual
    expect(warningsFileContent).toMatch(`function testpkg_Baz(p) {
    if (p == null)
        return;
    visitedObjects.add(p);
    if ("x" in p)
        print("testpkg.Baz#x", "message from Baz");
    visitedObjects.delete(p);
}`);
    expect(warningsFileContent).toMatch(`function testpkg_Bar(p) {
    if (p == null)
        return;
    visitedObjects.add(p);
    if ("x" in p)
        print("testpkg.Bar#x", "message from Bar");
    visitedObjects.delete(p);
}`);

    // But a call for one of the instances of the property should also be generated in the base function
    expect(warningsFileContent).toMatch(`function testpkg_Foo(p) {
    if (p == null)
        return;
    visitedObjects.add(p);
    if ("x" in p)
        print("testpkg.Baz#x", "message from Baz");
    visitedObjects.delete(p);
}`);
  });

  test('skips properties that are deprecated in one supertype but not the other', async () => {
    const result = await compileJsiiForTest(
      `
        export interface Baz {
          readonly x: string;
        }
        export interface Bar {
          /** @deprecated message from Bar */
          readonly x: string;
        }
        export interface Foo extends Bar, Baz {
        }
        `,
      undefined /* callback */,
      { addDeprecationWarnings: true },
    );

    const warningsFileContent = jsFile(result, '.warnings.jsii');

    expect(warningsFileContent).toMatch(`function testpkg_Foo(p) {
}`);
  });

  test('generates calls for types with deprecated properties', async () => {
    const result = await compileJsiiForTest(
      `
      export interface Bar {
        readonly x: string;
      }

      export interface Foo {
        readonly y: string;

        /** @deprecated kkkkkkkk */
        readonly bar: Bar;
      }
      `,
      undefined /* callback */,
      { addDeprecationWarnings: true },
    );

    expect(jsFile(result, '.warnings.jsii')).toMatch(`function testpkg_Foo(p) {
    if (p == null)
        return;
    visitedObjects.add(p);
    if ("bar" in p)
        print("testpkg.Foo#bar", "kkkkkkkk");
    if (!visitedObjects.has(p.bar))
        testpkg_Bar(p.bar);
    visitedObjects.delete(p);
}
`);
  });

  test('generates calls for each property of a deprecated type', async () => {
    const result = await compileJsiiForTest(
      `
      /** @deprecated use Bar instead */
      export interface Foo {
        readonly bar: string;
        readonly baz: number;
      }
      `,
      undefined /* callback */,
      { addDeprecationWarnings: true },
    );

    expect(jsFile(result, '.warnings.jsii')).toMatch(`function testpkg_Foo(p) {
    if (p == null)
        return;
    visitedObjects.add(p);
    if ("bar" in p)
        print("testpkg.Foo#bar", "use Bar instead");
    if ("baz" in p)
        print("testpkg.Foo#baz", "use Bar instead");
    visitedObjects.delete(p);
}
`);
  });

  test('generates calls for types in other assemblies', async () => {
    const calcBaseOfBaseRoot = resolveModuleDir(
      '@scope/jsii-calc-base-of-base',
    );
    const calcBaseRoot = resolveModuleDir('@scope/jsii-calc-base');
    const calcLibRoot = resolveModuleDir('@scope/jsii-calc-lib');

    await compile(calcBaseOfBaseRoot, false);
    await compile(calcBaseRoot, true);
    await compile(calcLibRoot, true);
    const warningsFile = loadWarningsFile(calcBaseRoot);

    // jsii-calc-base was compiled with warnings. So we expect to see handlers for its types in the warnings file
    expect(warningsFile).toMatch('_scope_jsii_calc_base');

    // jsii-calc-base-of-base was not compiled with warnings. Its types shouldn't be in the warnings file
    expect(warningsFile).not.toMatch('_scope_jsii_calc_base_of_base');

    // Recompiling without deprecation warning to leave the packages in a clean state
    await compile(calcBaseRoot, false);
    await compile(calcLibRoot, false);
  }, 120000);
});

describe('Call injections', () => {
  test('does not add warnings by default', async () => {
    const result = await compileJsiiForTest(
      `
    export class Foo {
      ${DEPRECATED}
      public bar(){}
    }
  `,
    );

    expect(jsFile(result)).toMatch('bar() { }');
    expect(
      result.assembly.metadata?.jsii?.compiledWithDeprecationWarnings,
    ).toBeFalsy();
  });

  test('generates a require statement', async () => {
    const result = await compileJsiiForTest(
      {
        'index.ts': `export * from './some/folder/source'`,
        'some/folder/source.ts': `
          export class Foo {
            ${DEPRECATED}
            public bar(){}
          }
        `,
      },
      undefined /* callback */,
      { addDeprecationWarnings: true },
    );

    const expectedPath = ['..', '..', '.warnings.jsii.js'].join('/');

    const content = jsFile(result, 'some/folder/source');
    expect(content).toContain(
      `const jsiiDeprecationWarnings = require("${expectedPath}")`,
    );
  }, 60000);

  test('does not generate a require statement when no calls were injected', async () => {
    const result = await compileJsiiForTest(
      {
        'index.ts': `export * from './some/folder/handler'`,
        'some/folder/handler.ts': `
          export function handler(event: any) { return event; }
        `,
      },
      undefined /* callback */,
      { addDeprecationWarnings: true },
    );

    const expectedPath = ['..', '..', '.warnings.jsii.js'].join('/');

    const content = jsFile(result, 'some/folder/handler');
    expect(content).not.toContain(
      `const jsiiDeprecationWarnings = require("${expectedPath}")`,
    );
  }, 60000);

  test('deprecated methods', async () => {
    const result = await compileJsiiForTest(
      `
    export class Foo {
      ${DEPRECATED}
      public bar(){}
    }
  `,
      undefined /* callback */,
      { addDeprecationWarnings: true },
    );

    expect(jsFile(result)).toMatchInlineSnapshot(`
      "\\"use strict\\";
      var _a;
      Object.defineProperty(exports, \\"__esModule\\", { value: true });
      exports.Foo = void 0;
      const jsiiDeprecationWarnings = require(\\"./.warnings.jsii.js\\");
      const JSII_RTTI_SYMBOL_1 = Symbol.for(\\"jsii.rtti\\");
      class Foo {
          /** @deprecated Use something else */
          bar() { try {
              jsiiDeprecationWarnings.print(\\"testpkg.Foo#bar\\", \\"Use something else\\");
          }
          catch (err) {
              if (err instanceof jsiiDeprecationWarnings.DeprecationError) {
                  // creating a new error of same type to clean error stack
                  throw new jsiiDeprecationWarnings.DeprecationError(err.message);
              }
              throw err;
          } }
      }
      exports.Foo = Foo;
      _a = JSII_RTTI_SYMBOL_1;
      Foo[_a] = { fqn: \\"testpkg.Foo\\", version: \\"0.0.1\\" };
      //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFDSSxNQUFhLEdBQUc7SUFDZCxxQ0FBcUM7SUFDOUIsR0FBRzs7Ozs7Ozs7O09BQUk7O0FBRmhCLGtCQUdDIiwic291cmNlc0NvbnRlbnQiOlsiXG4gICAgZXhwb3J0IGNsYXNzIEZvbyB7XG4gICAgICAvKiogQGRlcHJlY2F0ZWQgVXNlIHNvbWV0aGluZyBlbHNlICovXG4gICAgICBwdWJsaWMgYmFyKCl7fVxuICAgIH1cbiAgIl19"
    `);
  });

  test('methods with parameters', async () => {
    const result = await compileJsiiForTest(
      `
        export interface A {readonly x: number;}
         export class Foo {
          public bar(a: A, b: number){return a.x + b;}
         }`,
      undefined /* callback */,
      { addDeprecationWarnings: true },
    );

    expect(jsFile(result)).toMatchInlineSnapshot(`
      "\\"use strict\\";
      var _a;
      Object.defineProperty(exports, \\"__esModule\\", { value: true });
      exports.Foo = void 0;
      const jsiiDeprecationWarnings = require(\\"./.warnings.jsii.js\\");
      const JSII_RTTI_SYMBOL_1 = Symbol.for(\\"jsii.rtti\\");
      class Foo {
          bar(a, b) { try {
              jsiiDeprecationWarnings.testpkg_A(a);
          }
          catch (err) {
              if (err instanceof jsiiDeprecationWarnings.DeprecationError) {
                  // creating a new error of same type to clean error stack
                  throw new jsiiDeprecationWarnings.DeprecationError(err.message);
              }
              throw err;
          } return a.x + b; }
      }
      exports.Foo = Foo;
      _a = JSII_RTTI_SYMBOL_1;
      Foo[_a] = { fqn: \\"testpkg.Foo\\", version: \\"0.0.1\\" };
      //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFFUyxNQUFhLEdBQUc7SUFDUixHQUFHLENBQUMsQ0FBSSxFQUFFLENBQVM7Ozs7Ozs7OztNQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBQzs7QUFEN0Msa0JBRUMiLCJzb3VyY2VzQ29udGVudCI6WyJcbiAgICAgICAgZXhwb3J0IGludGVyZmFjZSBBIHtyZWFkb25seSB4OiBudW1iZXI7fVxuICAgICAgICAgZXhwb3J0IGNsYXNzIEZvbyB7XG4gICAgICAgICAgcHVibGljIGJhcihhOiBBLCBiOiBudW1iZXIpe3JldHVybiBhLnggKyBiO31cbiAgICAgICAgIH0iXX0="
    `);
  }, 60000);

  test('deprecated getters', async () => {
    const result = await compileJsiiForTest(
      `
    export class Foo {
      private _x = 0;
      ${DEPRECATED}
      public get x(){return this._x}
    }
  `,
      undefined /* callback */,
      { addDeprecationWarnings: true },
    );

    expect(jsFile(result)).toMatchInlineSnapshot(`
      "\\"use strict\\";
      var _a;
      Object.defineProperty(exports, \\"__esModule\\", { value: true });
      exports.Foo = void 0;
      const jsiiDeprecationWarnings = require(\\"./.warnings.jsii.js\\");
      const JSII_RTTI_SYMBOL_1 = Symbol.for(\\"jsii.rtti\\");
      class Foo {
          constructor() {
              this._x = 0;
          }
          /** @deprecated Use something else */
          get x() { try {
              jsiiDeprecationWarnings.print(\\"testpkg.Foo#x\\", \\"Use something else\\");
          }
          catch (err) {
              if (err instanceof jsiiDeprecationWarnings.DeprecationError) {
                  // creating a new error of same type to clean error stack
                  throw new jsiiDeprecationWarnings.DeprecationError(err.message);
              }
              throw err;
          } return this._x; }
      }
      exports.Foo = Foo;
      _a = JSII_RTTI_SYMBOL_1;
      Foo[_a] = { fqn: \\"testpkg.Foo\\", version: \\"0.0.1\\" };
      //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFDSSxNQUFhLEdBQUc7SUFBaEI7UUFDVSxPQUFFLEdBQUcsQ0FBQyxDQUFDO0tBR2hCO0lBRkMscUNBQXFDO0lBQ3JDLElBQVcsQ0FBQzs7Ozs7Ozs7O01BQUcsT0FBTyxJQUFJLENBQUMsRUFBRSxDQUFBLEVBQUM7O0FBSGhDLGtCQUlDIiwic291cmNlc0NvbnRlbnQiOlsiXG4gICAgZXhwb3J0IGNsYXNzIEZvbyB7XG4gICAgICBwcml2YXRlIF94ID0gMDtcbiAgICAgIC8qKiBAZGVwcmVjYXRlZCBVc2Ugc29tZXRoaW5nIGVsc2UgKi9cbiAgICAgIHB1YmxpYyBnZXQgeCgpe3JldHVybiB0aGlzLl94fVxuICAgIH1cbiAgIl19"
    `);
  });

  test('deprecated setters', async () => {
    const result = await compileJsiiForTest(
      `
    export class Foo {
      private _x = 0;
      public get x(){return this._x}

      ${DEPRECATED}
      public set x(_x: number) {this._x = _x;}
    }
  `,
      undefined /* callback */,
      { addDeprecationWarnings: true },
    );

    expect(jsFile(result)).toMatchInlineSnapshot(`
      "\\"use strict\\";
      var _a;
      Object.defineProperty(exports, \\"__esModule\\", { value: true });
      exports.Foo = void 0;
      const jsiiDeprecationWarnings = require(\\"./.warnings.jsii.js\\");
      const JSII_RTTI_SYMBOL_1 = Symbol.for(\\"jsii.rtti\\");
      class Foo {
          constructor() {
              this._x = 0;
          }
          get x() { try {
              jsiiDeprecationWarnings.print(\\"testpkg.Foo#x\\", \\"Use something else\\");
          }
          catch (err) {
              if (err instanceof jsiiDeprecationWarnings.DeprecationError) {
                  // creating a new error of same type to clean error stack
                  throw new jsiiDeprecationWarnings.DeprecationError(err.message);
              }
              throw err;
          } return this._x; }
          /** @deprecated Use something else */
          set x(_x) { try {
              jsiiDeprecationWarnings.print(\\"testpkg.Foo#x\\", \\"Use something else\\");
          }
          catch (err) {
              if (err instanceof jsiiDeprecationWarnings.DeprecationError) {
                  // creating a new error of same type to clean error stack
                  throw new jsiiDeprecationWarnings.DeprecationError(err.message);
              }
              throw err;
          } this._x = _x; }
      }
      exports.Foo = Foo;
      _a = JSII_RTTI_SYMBOL_1;
      Foo[_a] = { fqn: \\"testpkg.Foo\\", version: \\"0.0.1\\" };
      //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFDSSxNQUFhLEdBQUc7SUFBaEI7UUFDVSxPQUFFLEdBQUcsQ0FBQyxDQUFDO0tBS2hCO0lBSkMsSUFBVyxDQUFDOzs7Ozs7Ozs7TUFBRyxPQUFPLElBQUksQ0FBQyxFQUFFLENBQUEsRUFBQztJQUU5QixxQ0FBcUM7SUFDckMsSUFBVyxDQUFDLENBQUMsRUFBVTs7Ozs7Ozs7O01BQUcsSUFBSSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBQzs7QUFMMUMsa0JBTUMiLCJzb3VyY2VzQ29udGVudCI6WyJcbiAgICBleHBvcnQgY2xhc3MgRm9vIHtcbiAgICAgIHByaXZhdGUgX3ggPSAwO1xuICAgICAgcHVibGljIGdldCB4KCl7cmV0dXJuIHRoaXMuX3h9XG5cbiAgICAgIC8qKiBAZGVwcmVjYXRlZCBVc2Ugc29tZXRoaW5nIGVsc2UgKi9cbiAgICAgIHB1YmxpYyBzZXQgeChfeDogbnVtYmVyKSB7dGhpcy5feCA9IF94O31cbiAgICB9XG4gICJdfQ=="
    `);
  });

  test('creates a new instance of error when test', async () => {
    const result = await compileJsiiForTest(
      `
    ${DEPRECATED}
    export class Foo {
      constructor(){}
    }
  `,
      undefined /* callback */,
      { addDeprecationWarnings: true },
    );

    expect(jsFile(result)).toMatchInlineSnapshot(`
      "\\"use strict\\";
      var _a;
      Object.defineProperty(exports, \\"__esModule\\", { value: true });
      exports.Foo = void 0;
      const jsiiDeprecationWarnings = require(\\"./.warnings.jsii.js\\");
      const JSII_RTTI_SYMBOL_1 = Symbol.for(\\"jsii.rtti\\");
      /** @deprecated Use something else */
      class Foo {
          constructor() { try {
              jsiiDeprecationWarnings.print(\\"testpkg.Foo\\", \\"Use something else\\");
          }
          catch (err) {
              if (err instanceof jsiiDeprecationWarnings.DeprecationError) {
                  // creating a new error of same type to clean error stack
                  throw new jsiiDeprecationWarnings.DeprecationError(err.message);
              }
              throw err;
          } }
      }
      exports.Foo = Foo;
      _a = JSII_RTTI_SYMBOL_1;
      Foo[_a] = { fqn: \\"testpkg.Foo\\", version: \\"0.0.1\\" };
      //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFDSSxxQ0FBcUM7QUFDckMsTUFBYSxHQUFHO0lBQ2Q7Ozs7Ozs7OztPQUFlOztBQURqQixrQkFFQyIsInNvdXJjZXNDb250ZW50IjpbIlxuICAgIC8qKiBAZGVwcmVjYXRlZCBVc2Ugc29tZXRoaW5nIGVsc2UgKi9cbiAgICBleHBvcnQgY2xhc3MgRm9vIHtcbiAgICAgIGNvbnN0cnVjdG9yKCl7fVxuICAgIH1cbiAgIl19"
    `);
  });
});

function jsFile(result: HelperCompilationResult, baseName = 'index'): string {
  const file = Object.entries(result.files).find(
    ([name]) => name === `${baseName}.js`,
  );

  return file![1];
}

function resolveModuleDir(name: string) {
  return path.dirname(require.resolve(`${name}/package.json`));
}

async function compile(projectRoot: string, addDeprecationWarnings: boolean) {
  const { projectInfo } = await loadProjectInfo(projectRoot);

  const compiler = new Compiler({
    projectInfo,
    addDeprecationWarnings,
  });

  await compiler.emit();
}

function loadWarningsFile(projectRoot: string) {
  return fs
    .readFileSync(path.join(projectRoot, '.warnings.jsii.js'))
    .toString();
}
