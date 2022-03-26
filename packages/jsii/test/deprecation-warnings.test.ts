// eslint-disable-next-line import/no-extraneous-dependencies
import * as fs from 'fs';
import * as path from 'path';
import * as vm from 'vm';

import { compileJsiiForTest, HelperCompilationResult } from '../lib';
import { Compiler } from '../lib/compiler';
import { loadProjectInfo } from '../lib/project-info';

const DEPRECATED = '/** @deprecated Use something else */';

describe('Function generation', () => {
  test('generates the print function', async () => {
    const result = await compileJsiiForTest(``, undefined /* callback */, {
      addDeprecationWarnings: true,
    });

    expect(jsFile(result, '.warnings.jsii')).toBe(
      `function print(name, deprecationMessage, caller) {
    const deprecated = process.env.JSII_DEPRECATED;
    const deprecationMode = ["warn", "fail", "quiet"].includes(deprecated) ? deprecated : "warn";
    const message = \`\${name} is deprecated.\\n  \${deprecationMessage}\\n  This API will be removed in the next major release.\`;
    switch (deprecationMode) {
        case "fail":
            const error = new DeprecationError(message);
            if (caller) {
                Error.captureStackTrace(error, caller);
            }
            throw error;
        case "warn":
            console.warn("[WARNING]", message);
            break;
    }
}
const visitedObjects = new WeakSet();
class DeprecationError extends Error {
}
module.exports = { print, DeprecationError };
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
      `function testpkg_Foo(p, c) {
}
function testpkg_Bar(p, c) {
}
function testpkg_Baz(p, c) {
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

    expect(jsFile(result, '.warnings.jsii'))
      .toMatch(`function testpkg_Baz(p, c) {
    if (p == null)
        return;
    visitedObjects.add(p);
    try {
        if (!visitedObjects.has(p.bar))
            testpkg_Bar(p.bar, c);
        if (!visitedObjects.has(p.foo))
            testpkg_Foo(p.foo, c);
    }
    finally {
        visitedObjects.delete(p);
    }
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

    expect(jsFile(result, '.warnings.jsii'))
      .toMatch(`function testpkg_IFoo(p, c) {
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

    expect(jsFile(result, '.warnings.jsii'))
      .toMatch(`function testpkg_Foo(p, c) {
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
      `function testpkg_Bar(p, c) {
    if (p == null)
        return;
    visitedObjects.add(p);
    try {
        if (!visitedObjects.has(p.bar))
            testpkg_Bar(p.bar, c);
    }
    finally {
        visitedObjects.delete(p);
    }
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
      `module.exports = { print, DeprecationError, testpkg_Foo, testpkg_Bar, testpkg_Baz };`,
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
      .toMatch(`function testpkg_State(p, c) {
    if (p == null)
        return;
    visitedObjects.add(p);
    try {
        const ns = require("./index.js");
        if (Object.values(ns.State).filter(x => x === p).length > 1)
            return;
        if (p === ns.State.OFF)
            print("testpkg.State#OFF", "Use something else", c);
    }
    finally {
        visitedObjects.delete(p);
    }
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
    expect(warningsFileContent).toMatch(`function testpkg_Baz(p, c) {
    if (p == null)
        return;
    visitedObjects.add(p);
    try {
        if ("x" in p)
            print("testpkg.Baz#x", "message from Baz", c);
    }
    finally {
        visitedObjects.delete(p);
    }
}`);
    expect(warningsFileContent).toMatch(`function testpkg_Bar(p, c) {
    if (p == null)
        return;
    visitedObjects.add(p);
    try {
        if ("x" in p)
            print("testpkg.Bar#x", "message from Bar", c);
    }
    finally {
        visitedObjects.delete(p);
    }
}`);

    // But a call for one of the instances of the property should also be generated in the base function
    expect(warningsFileContent).toMatch(`function testpkg_Foo(p, c) {
    if (p == null)
        return;
    visitedObjects.add(p);
    try {
        if ("x" in p)
            print("testpkg.Baz#x", "message from Baz", c);
    }
    finally {
        visitedObjects.delete(p);
    }
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

    expect(warningsFileContent).toMatch(`function testpkg_Foo(p, c) {
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

    expect(jsFile(result, '.warnings.jsii'))
      .toMatch(`function testpkg_Foo(p, c) {
    if (p == null)
        return;
    visitedObjects.add(p);
    try {
        if ("bar" in p)
            print("testpkg.Foo#bar", "kkkkkkkk", c);
        if (!visitedObjects.has(p.bar))
            testpkg_Bar(p.bar, c);
    }
    finally {
        visitedObjects.delete(p);
    }
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

    expect(jsFile(result, '.warnings.jsii'))
      .toMatch(`function testpkg_Foo(p, c) {
    if (p == null)
        return;
    visitedObjects.add(p);
    try {
        if ("bar" in p)
            print("testpkg.Foo#bar", "use Bar instead", c);
        if ("baz" in p)
            print("testpkg.Foo#baz", "use Bar instead", c);
    }
    finally {
        visitedObjects.delete(p);
    }
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
          bar() { jsiiDeprecationWarnings.print(\\"testpkg.Foo#bar\\", \\"Use something else\\", this.bar); }
      }
      exports.Foo = Foo;
      _a = JSII_RTTI_SYMBOL_1;
      Foo[_a] = { fqn: \\"testpkg.Foo\\", version: \\"0.0.1\\" };
      //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFDSSxNQUFhLEdBQUc7SUFDZCxxQ0FBcUM7SUFDOUIsR0FBRyx3RkFBSTs7QUFGaEIsa0JBR0MiLCJzb3VyY2VzQ29udGVudCI6WyJcbiAgICBleHBvcnQgY2xhc3MgRm9vIHtcbiAgICAgIC8qKiBAZGVwcmVjYXRlZCBVc2Ugc29tZXRoaW5nIGVsc2UgKi9cbiAgICAgIHB1YmxpYyBiYXIoKXt9XG4gICAgfVxuICAiXX0="
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
          bar(a, b) { jsiiDeprecationWarnings.testpkg_A(a, this.bar); return a.x + b; }
      }
      exports.Foo = Foo;
      _a = JSII_RTTI_SYMBOL_1;
      Foo[_a] = { fqn: \\"testpkg.Foo\\", version: \\"0.0.1\\" };
      //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFFUyxNQUFhLEdBQUc7SUFDUixHQUFHLENBQUMsQ0FBSSxFQUFFLENBQVMsb0RBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFDOztBQUQ3QyxrQkFFQyIsInNvdXJjZXNDb250ZW50IjpbIlxuICAgICAgICBleHBvcnQgaW50ZXJmYWNlIEEge3JlYWRvbmx5IHg6IG51bWJlcjt9XG4gICAgICAgICBleHBvcnQgY2xhc3MgRm9vIHtcbiAgICAgICAgICBwdWJsaWMgYmFyKGE6IEEsIGI6IG51bWJlcil7cmV0dXJuIGEueCArIGI7fVxuICAgICAgICAgfSJdfQ=="
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
          get x() { jsiiDeprecationWarnings.print(\\"testpkg.Foo#x\\", \\"Use something else\\", Object.getOwnPropertyDescriptor(this, \\"x\\").get); return this._x; }
      }
      exports.Foo = Foo;
      _a = JSII_RTTI_SYMBOL_1;
      Foo[_a] = { fqn: \\"testpkg.Foo\\", version: \\"0.0.1\\" };
      //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFDSSxNQUFhLEdBQUc7SUFBaEI7UUFDVSxPQUFFLEdBQUcsQ0FBQyxDQUFDO0tBR2hCO0lBRkMscUNBQXFDO0lBQ3JDLElBQVcsQ0FBQywySEFBRyxPQUFPLElBQUksQ0FBQyxFQUFFLENBQUEsRUFBQzs7QUFIaEMsa0JBSUMiLCJzb3VyY2VzQ29udGVudCI6WyJcbiAgICBleHBvcnQgY2xhc3MgRm9vIHtcbiAgICAgIHByaXZhdGUgX3ggPSAwO1xuICAgICAgLyoqIEBkZXByZWNhdGVkIFVzZSBzb21ldGhpbmcgZWxzZSAqL1xuICAgICAgcHVibGljIGdldCB4KCl7cmV0dXJuIHRoaXMuX3h9XG4gICAgfVxuICAiXX0="
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
          get x() { jsiiDeprecationWarnings.print(\\"testpkg.Foo#x\\", \\"Use something else\\", Object.getOwnPropertyDescriptor(this, \\"x\\").get); return this._x; }
          /** @deprecated Use something else */
          set x(_x) { jsiiDeprecationWarnings.print(\\"testpkg.Foo#x\\", \\"Use something else\\", Object.getOwnPropertyDescriptor(this, \\"x\\").set); this._x = _x; }
      }
      exports.Foo = Foo;
      _a = JSII_RTTI_SYMBOL_1;
      Foo[_a] = { fqn: \\"testpkg.Foo\\", version: \\"0.0.1\\" };
      //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFDSSxNQUFhLEdBQUc7SUFBaEI7UUFDVSxPQUFFLEdBQUcsQ0FBQyxDQUFDO0tBS2hCO0lBSkMsSUFBVyxDQUFDLDJIQUFHLE9BQU8sSUFBSSxDQUFDLEVBQUUsQ0FBQSxFQUFDO0lBRTlCLHFDQUFxQztJQUNyQyxJQUFXLENBQUMsQ0FBQyxFQUFVLDBIQUFHLElBQUksQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUM7O0FBTDFDLGtCQU1DIiwic291cmNlc0NvbnRlbnQiOlsiXG4gICAgZXhwb3J0IGNsYXNzIEZvbyB7XG4gICAgICBwcml2YXRlIF94ID0gMDtcbiAgICAgIHB1YmxpYyBnZXQgeCgpe3JldHVybiB0aGlzLl94fVxuXG4gICAgICAvKiogQGRlcHJlY2F0ZWQgVXNlIHNvbWV0aGluZyBlbHNlICovXG4gICAgICBwdWJsaWMgc2V0IHgoX3g6IG51bWJlcikge3RoaXMuX3ggPSBfeDt9XG4gICAgfVxuICAiXX0="
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
          constructor() { jsiiDeprecationWarnings.print(\\"testpkg.Foo\\", \\"Use something else\\", Foo); }
      }
      exports.Foo = Foo;
      _a = JSII_RTTI_SYMBOL_1;
      Foo[_a] = { fqn: \\"testpkg.Foo\\", version: \\"0.0.1\\" };
      //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFDSSxxQ0FBcUM7QUFDckMsTUFBYSxHQUFHO0lBQ2QsMEZBQWU7O0FBRGpCLGtCQUVDIiwic291cmNlc0NvbnRlbnQiOlsiXG4gICAgLyoqIEBkZXByZWNhdGVkIFVzZSBzb21ldGhpbmcgZWxzZSAqL1xuICAgIGV4cG9ydCBjbGFzcyBGb28ge1xuICAgICAgY29uc3RydWN0b3IoKXt9XG4gICAgfVxuICAiXX0="
    `);
  });
});

describe('thrown exceptions have the expected stack trace', () => {
  test('constructor', async () => {
    const compilation = await compileJsiiForTest(
      `
      /** @deprecated for testing */
      export class DeprecatedConstructor {
        public constructor() {}
      }

      function test() {
        new DeprecatedConstructor();
      }

      test();
    `,
      undefined,
      { addDeprecationWarnings: true },
    );
    const source = jsFile(compilation);

    const context = createVmContext(compilation);
    try {
      vm.runInContext(source, context, { filename: 'index.js' });
      // The above line should have resulted in a DeprecationError being thrown
      expect(null).toBeInstanceOf(Error);
    } catch (error) {
      expect(error.stack).toMatchInlineSnapshot(`
        "index.js:13
                throw error;
                ^

        Error: testpkg.DeprecatedConstructor is deprecated.
         for testing
         This API will be removed in the next major release.
            at test (index.js:20:5)
            at index.js:22:1
            at Script.runInContext (node:vm:139:12)
            at Object.runInContext (node:vm:289:6)
            at Object.<anonymous> (/Users/rmuller/Development/aws/jsii/packages/jsii/test/deprecation-warnings.test.ts:634:7)"
      `);
    }
  });

  test('getter', async () => {
    const compilation = await compileJsiiForTest(
      `
      export class DeprecatedConstructor {
        /** @deprecated for testing */
        public get property() {
          return 1337;
        }
      }

      function test() {
        const subject = new DeprecatedConstructor();
        return subject.property;
      }

      test();
    `,
      undefined,
      { addDeprecationWarnings: true },
    );
    const source = jsFile(compilation);

    const context = createVmContext(compilation);
    try {
      vm.runInContext(source, context, { filename: 'index.js' });
      // The above line should have resulted in a DeprecationError being thrown
      expect(null).toBeInstanceOf(Error);
    } catch (error) {
      expect(error.stack).toMatchInlineSnapshot(`
        "index.js:14
                    throw error;
                    ^

        Error: testpkg.DeprecatedConstructor#property is deprecated.
         for testing
         This API will be removed in the next major release.
            at test (index.js:24:20)
            at index.js:26:1
            at Script.runInContext (node:vm:139:12)
            at Object.runInContext (node:vm:289:6)
            at Object.<anonymous> (/Users/rmuller/Development/aws/jsii/packages/jsii/test/deprecation-warnings.test.ts:677:6)"
      `);
    }
  });

  test('setter', async () => {
    const compilation = await compileJsiiForTest(
      `
      export class DeprecatedConstructor {
        private value = 1337;

        /** @deprecated for testing */
        public get property(): number {
          return this.value;
        }

        public set property(value: number) {
          this.value = value;
        }
      }

      function test() {
        const subject = new DeprecatedConstructor();
        subject.property = 42;
      }

      test();
    `,
      undefined,
      { addDeprecationWarnings: true },
    );
    const source = jsFile(compilation);

    const context = createVmContext(compilation);
    try {
      vm.runInContext(source, context, { filename: 'index.js' });
      // The above line should have resulted in a DeprecationError being thrown
      expect(null).toBeInstanceOf(Error);
    } catch (error) {
      expect(error.stack).toMatchInlineSnapshot(`
        "index.js:26
                    throw error;
                    ^

        Error: testpkg.DeprecatedConstructor#property is deprecated.
         for testing
         This API will be removed in the next major release.
            at test (index.js:36:22)
            at index.js:38:1
            at Script.runInContext (node:vm:139:12)
            at Object.runInContext (node:vm:289:6)
            at Object.<anonymous> (/Users/rmuller/Development/aws/jsii/packages/jsii/test/deprecation-warnings.test.ts:569:16)"
      `);
    }
  });

  test('method', async () => {
    const compilation = await compileJsiiForTest(
      `
      export class DeprecatedConstructor {
        /** @deprecated for testing */
        public deprecated(): void {
          // Nothing to do
        }
      }

      function test() {
        const subject = new DeprecatedConstructor();
        subject.deprecated();
      }

      test();
    `,
      undefined,
      { addDeprecationWarnings: true },
    );
    const source = jsFile(compilation);

    const context = createVmContext(compilation);
    try {
      vm.runInContext(source, context, { filename: 'index.js' });
      // The above line should have resulted in a DeprecationError being thrown
      expect(null).toBeInstanceOf(Error);
    } catch (error) {
      expect(error.stack).toMatchInlineSnapshot(`
        "index.js:14
                    throw error;
                    ^

        Error: testpkg.DeprecatedConstructor#deprecated is deprecated.
         for testing
         This API will be removed in the next major release.
            at test (index.js:23:13)
            at index.js:25:1
            at Script.runInContext (node:vm:139:12)
            at Object.runInContext (node:vm:289:6)
            at Object.<anonymous> (/Users/rmuller/Development/aws/jsii/packages/jsii/test/deprecation-warnings.test.ts:609:16)"
      `);
    }
  });
});

function jsFile(result: HelperCompilationResult, baseName = 'index'): string {
  const file = Object.entries(result.files).find(
    ([name]) => name === `${baseName}.js`,
  );

  if (!file) {
    throw new Error(`Could not find file with base name: ${baseName}`);
  }

  return file[1];
}

function createVmContext(compilation: HelperCompilationResult) {
  const context = vm.createContext({
    exports: {},
    process: {
      env: {
        JSII_DEPRECATED: 'fail',
      },
    },
    require: (id: string) => {
      if (!id.startsWith('./')) {
        return require(id);
      }
      const code = jsFile(compilation, path.basename(id, '.js'))
        // Pretend this has been webpack'd
        .replace(/\s+/gm, ' ');
      return vm.runInContext(
        `(function(module){
          {
            ${code}
          }
          return module.exports;
        })({ exports: {} });`,
        context,
        { filename: id, lineOffset: -2, columnOffset: -4 },
      );
    },
  });
  return context;
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
