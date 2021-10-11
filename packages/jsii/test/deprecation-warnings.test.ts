import * as path from 'path';

import { compileJsiiForTest, HelperCompilationResult } from '../lib';

const DEPRECATED = '/** @deprecated Use something else */';

describe('Function generation', () => {
  test('generates the print function', async () => {
    const result = await compileJsiiForTest(``, undefined /* callback */, {
      addDeprecationWarnings: true,
    });

    expect(jsFile(result, '.warnings.jsii')).toMatch(
      `function print(value, name, deprecationMessage) {
    if (value != null) {
        const deprecated = process.env.JSII_DEPRECATED;
        const deprecationMode = ["warn", "fail", "quiet"].includes(deprecated) ? deprecated : "warn";
        const message = \`\${name} is deprecated.\\n  \${deprecationMessage}\\n  This API will be removed in the next major release.\`;
        switch (deprecationMode) {
            case "fail":
                throw new Error(message);
            case "warn":
                console.warn("[WARNING]", message);
                break;
        }
    }
}`,
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
    if (p != null) {
        testpkg_Bar(p.bar);
        testpkg_Foo(p.foo);
    }
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
    if (p != null) {
        testpkg_Bar(p.bar);
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
      `module.exports = { print, testpkg_Foo, testpkg_Bar, testpkg_Baz };`,
    );
  });

  test('generates a call to print if the type is deprecated', async () => {
    const result = await compileJsiiForTest(
      `
        ${DEPRECATED}
        export interface Foo {}
        `,
      undefined /* callback */,
      { addDeprecationWarnings: true },
    );

    expect(jsFile(result, '.warnings.jsii')).toMatch(`function testpkg_Foo(p) {
    if (p != null) {
        print(p, "testpkg.Foo", "Use something else");
    }
}`);
  });

  test('does not generate a `require` if the enum does not have deprecated members', async () => {
    const result = await compileJsiiForTest(
      `
        export enum State {
          ON,
          OFF
        }
        `,
      undefined /* callback */,
      { addDeprecationWarnings: true },
    );

    expect(jsFile(result, '.warnings.jsii')).not.toMatch('require');
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
    if (p != null) {
        const ns = require("./index.js");
        print(p === ns.State.OFF ? p : undefined, "testpkg.State#OFF", "Use something else");
    }
}
`);
  });

  test('generates calls for supertypes', async () => {
    const result = await compileJsiiForTest(
      `
        export interface Foo {}
        export interface Bar {readonly foo: Foo;}
        export interface Baz extends Bar {readonly x: string;}
        `,
      undefined /* callback */,
      { addDeprecationWarnings: true },
    );

    expect(jsFile(result, '.warnings.jsii')).toMatch(`function testpkg_Baz(p) {
    if (p != null) {
        testpkg_Bar(p);
    }
}
`);
  });
});

describe('Call injections', () => {
  test('does not add warnings, by default', async () => {
    const result = await compileJsiiForTest(
      `
    export class Foo {
      ${DEPRECATED}
      public bar(){}
    }
  `,
    );

    expect(jsFile(result)).toMatch('bar() { }');
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

    const expectedPath = ['..', '..', '.warnings.jsii.js'].join(path.sep);
    const requireRegex = /const jsiiDeprecationWarnings = require\("(.+)"\);/g;

    const content = jsFile(result, 'some/folder/source');
    const match = requireRegex.exec(content);
    expect(match).toBeDefined();

    const actualPath = match![1];
    expect(path.normalize(actualPath)).toEqual(expectedPath);
  });

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

    expect(jsFile(result)).toMatch(
      'bar() { jsiiDeprecationWarnings.print("", "testpkg.Foo#bar", "Use something else"); }',
    );
  });

  test('methods with parameters', async () => {
    const result = await compileJsiiForTest(
      `
    export interface A {readonly x: number;}
    export class Foo {
      public bar(a: A, b: number){return a.x + b;}
    }
  `,
      undefined /* callback */,
      { addDeprecationWarnings: true },
    );

    expect(jsFile(result)).toMatch(
      'bar(a, b) { jsiiDeprecationWarnings.testpkg_A(a); return a.x + b; }',
    );
  });

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

    expect(jsFile(result)).toMatch(
      'get x() { jsiiDeprecationWarnings.print("", "testpkg.Foo#x", "Use something else"); return this._x; }',
    );
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

    expect(jsFile(result)).toMatch(
      'set x(_x) { jsiiDeprecationWarnings.print("", "testpkg.Foo#x", "Use something else"); this._x = _x; }',
    );
  });

  test('deprecated classes', async () => {
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

    expect(jsFile(result)).toMatch(
      'constructor() { jsiiDeprecationWarnings.print("", "testpkg.Foo", ""); }',
    );
  });
});

function jsFile(result: HelperCompilationResult, baseName = 'index'): string {
  const file = Object.entries(result.files).find(
    ([name]) => name === `${baseName}.js`,
  );

  return file![1];
}
