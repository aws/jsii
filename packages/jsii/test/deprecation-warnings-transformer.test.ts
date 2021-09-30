import { compileJsiiForTest, HelperCompilationResult } from '../lib';

const DEPRECATED = '/** @deprecated Use something else */';

describe('Deprecation warnings', () => {
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

    expect(jsFile(result, 'index')).toMatch(
      'bar() { printJsiiDeprecationWarnings("testpkg.Foo.bar", "Use something else", ""); }',
    );
  });

  test('does not inject warnings by default', async () => {
    const result = await compileJsiiForTest(
      `
    ${DEPRECATED}
    export class Foo {
      ${DEPRECATED}
      public bar(){}
    }
    `,
      undefined /* callback */,
      {}, // addDeprecationWarnings was not set
    );

    expect(jsFile(result, 'index')).toMatch('bar() { }');
  });

  // TODO Flagged for review
  test.skip('methods that receive parameters of enum types with deprecated values', async () => {
    const result = await compileJsiiForTest(
      `
      export enum SecurityPolicy {
        ${DEPRECATED}
        TLS_1_0 = 'TLS_1_0',
        TLS_1_2 = 'TLS_1_2',
      }
      
    export class Foo {
      public bar(policy: SecurityPolicy){return policy;}
    }
    `,
      undefined /* callback */,
      { addDeprecationWarnings: true },
    );

    jsFile(result);
    fail('How should we handle this case?');
  });

  test('methods that receive parameters of deprecated enum types', async () => {
    const result = await compileJsiiForTest(
      `
      ${DEPRECATED}
      export enum SecurityPolicy {
        TLS_1_0 = 'TLS_1_0',
        TLS_1_2 = 'TLS_1_2',
      }
      
    export class Foo {
      public bar(policy: SecurityPolicy){return policy;}
    }
    `,
      undefined /* callback */,
      { addDeprecationWarnings: true },
    );

    expect(jsFile(result)).toMatch(
      'bar(policy) { printJsiiDeprecationWarnings("testpkg.SecurityPolicy", "Use something else", policy); return policy; }',
    );
  });

  test('methods of a class that extends a deprecated class', async () => {
    const result = await compileJsiiForTest(
      `
    ${DEPRECATED}  
    export class Deprecated {}
      
    export class Foo extends Deprecated {
      public bar(){}
      public zee(){}
    }
    `,
      undefined /* callback */,
      { addDeprecationWarnings: true },
    );

    const file = jsFile(result);
    expect(file).toMatch(
      'bar() { printJsiiDeprecationWarnings("testpkg.Deprecated", "Use something else", ""); }',
    );
    expect(file).toMatch(
      'zee() { printJsiiDeprecationWarnings("testpkg.Deprecated", "Use something else", ""); }',
    );
  });

  test('deprecated constructors', async () => {
    const result = await compileJsiiForTest(
      `
    export class Bar {}  
    export class Foo extends Bar {
      ${DEPRECATED}
      public constructor(){super();}
    }
    `,
      undefined /* callback */,
      { addDeprecationWarnings: true },
    );

    expect(jsFile(result, 'index')).toMatch(
      'constructor() { super(); printJsiiDeprecationWarnings("testpkg.Foo", "Use something else", ""); }',
    );
  });

  test('deprecated getters', async () => {
    const result = await compileJsiiForTest(
      `
    export class Foo {
      private _bar = 0;
      ${DEPRECATED}
      public get bar(){return this._bar;}
    }
    `,
      undefined /* callback */,
      { addDeprecationWarnings: true },
    );

    expect(jsFile(result, 'index')).toMatch(
      'get bar() { printJsiiDeprecationWarnings("testpkg.Foo.bar", "Use something else", ""); return this._bar; }',
    );
  });

  test('deprecated setters', async () => {
    const result = await compileJsiiForTest(
      `
    export class Foo {
      private _bar = 0;
      ${DEPRECATED}
      public set bar(_bar: number){this._bar = _bar;}
      public get bar(){return this._bar;}
    }
    `,
      undefined /* callback */,
      { addDeprecationWarnings: true },
    );

    expect(jsFile(result, 'index')).toMatch(
      'set bar(_bar) { printJsiiDeprecationWarnings("testpkg.Foo.bar", "Use something else", ""); this._bar = _bar; }',
    );
  });

  test('skip internal methods', async () => {
    const result = await compileJsiiForTest(
      `
    export class Foo {
      /** 
       * @deprecated Use something else
       * @internal 
       */
      public _bar(){}
    }
    `,
      undefined /* callback */,
      { addDeprecationWarnings: true },
    );

    expect(jsFile(result, 'index')).toMatch('bar() { }');
  });

  test('all methods of deprecated classes', async () => {
    const result = await compileJsiiForTest(
      `
    ${DEPRECATED}
    export class Foo {
      public bar(){}
      public zee(){}
    }
    `,
      undefined /* callback */,
      { addDeprecationWarnings: true },
    );

    const file = jsFile(result);
    expect(file).toMatch(
      'bar() { printJsiiDeprecationWarnings("testpkg.Foo", "Use something else", ""); }',
    );
    expect(file).toMatch(
      'zee() { printJsiiDeprecationWarnings("testpkg.Foo", "Use something else", ""); }',
    );
  });

  test('skip non-exported interfaces', async () => {
    const result = await compileJsiiForTest(
      `
    ${DEPRECATED}
    class Foo {
      public bar(){}
      public zee(){}
    }
    `,
      undefined /* callback */,
      { addDeprecationWarnings: true },
    );

    const file = jsFile(result);
    expect(file).toMatch('bar() { }');
    expect(file).toMatch('zee() { }');
  });

  test('all methods of a class that implements a deprecated interface', async () => {
    const result = await compileJsiiForTest(
      `
    ${DEPRECATED}  
    export interface IDeprecated {}
      
    export class Foo implements IDeprecated {
      public bar(){}
      public zee(){}
    }
    `,
      undefined /* callback */,
      { addDeprecationWarnings: true },
    );

    const file = jsFile(result);
    expect(file).toMatch(
      'bar() { printJsiiDeprecationWarnings("testpkg.IDeprecated", "Use something else", ""); }',
    );
    expect(file).toMatch(
      'zee() { printJsiiDeprecationWarnings("testpkg.IDeprecated", "Use something else", ""); }',
    );
  });

  test('methods that receive parameters of deprecated types', async () => {
    const result = await compileJsiiForTest(
      `
    ${DEPRECATED}  
    export interface SomeProps {
      readonly bar: string;
    }
      
    export class Foo {
      public bar(props: SomeProps){return props;}
    }
    `,
      undefined /* callback */,
      { addDeprecationWarnings: true },
    );

    expect(jsFile(result, 'index')).toMatch(
      'bar(props) { printJsiiDeprecationWarnings("testpkg.SomeProps", "Use something else", props); return props; }',
    );
  });

  test('skip parameters of deprecated types if the parameters have initializers', async () => {
    const result = await compileJsiiForTest(
      `
    ${DEPRECATED}  
    export interface SomeProps {
      readonly bar?: string;
    }
      
    export class Foo {
      public bar(props: SomeProps = {}){return props;}
    }
    `,
      undefined /* callback */,
      { addDeprecationWarnings: true },
    );

    expect(jsFile(result, 'index')).toMatch(
      'bar(props = {}) { return props; }',
    );
  });

  test('methods that receive parameters with deprecated fields', async () => {
    const result = await compileJsiiForTest(
      `
    export interface SomeProps {
      ${DEPRECATED}  
      readonly bar: string;
    }
      
    export class Foo {
      public bar(props: SomeProps){return props;}
    }
    `,
      undefined /* callback */,
      { addDeprecationWarnings: true },
    );

    expect(jsFile(result, 'index')).toMatch(
      'bar(props) { printJsiiDeprecationWarnings("testpkg.SomeProps.bar", "Use something else", props?.bar); return props; }',
    );
  });

  test('methods that receive parameters with fields of deprecated types', async () => {
    const result = await compileJsiiForTest(
      `
    export interface SomeProps {
      readonly bar: string;
      readonly other: OtherProps;
    }

    ${DEPRECATED}  
    export interface OtherProps {
      readonly zee: string;      
    }
      
    export class Foo {
      public bar(props: SomeProps){return props;}
    }
    `,
      undefined /* callback */,
      { addDeprecationWarnings: true },
    );

    expect(jsFile(result, 'index')).toMatch(
      'bar(props) { printJsiiDeprecationWarnings("testpkg.OtherProps", "Use something else", props?.other); return props; }',
    );
  });

  test('nested fields with deprecated supertypes', async () => {
    const result = await compileJsiiForTest(
      `
    export interface SomeProps {
      readonly bar: string;
      readonly other: OtherProps;
    }

    export interface OtherProps extends SuperOtherProps {
      readonly zee: string;      
    }
      
    ${DEPRECATED}  
    export interface SuperOtherProps {
      readonly abc?: string;
    }

    export class Foo {
      public bar(props: SomeProps){return props;}
    }
    `,
      undefined /* callback */,
      { addDeprecationWarnings: true },
    );

    expect(jsFile(result, 'index')).toMatch(
      'bar(props) { printJsiiDeprecationWarnings("testpkg.SuperOtherProps", "Use something else", props?.other); return props; }',
    );
  });

  test('nested fields with supertypes having deprecated fields', async () => {
    const result = await compileJsiiForTest(
      `
    export interface SomeProps {
      readonly bar: string;
      readonly other: OtherProps;
    }

    export interface OtherProps extends SuperOtherProps {
      readonly zee: string;      
    }
      
    export interface SuperOtherProps {
      ${DEPRECATED}  
      readonly abc?: string;
    }

    export class Foo {
      public bar(props: SomeProps){return props;}
    }
    `,
      undefined /* callback */,
      { addDeprecationWarnings: true },
    );

    expect(jsFile(result, 'index')).toMatch(
      'bar(props) { printJsiiDeprecationWarnings("testpkg.SuperOtherProps.abc", "Use something else", props?.other?.abc); return props; }',
    );
  });

  test('methods that receive parameters with deprecated nested fields', async () => {
    const result = await compileJsiiForTest(
      `
    export interface SomeProps {
      readonly bar: string;
      readonly other: OtherProps;
    }

    export interface OtherProps {
      ${DEPRECATED}  
      readonly zee: string;      
    }
      
    export class Foo {
      public bar(props: SomeProps){return props;}
    }
    `,
      undefined /* callback */,
      { addDeprecationWarnings: true },
    );

    expect(jsFile(result, 'index')).toMatch(
      'bar(props) { printJsiiDeprecationWarnings("testpkg.OtherProps.zee", "Use something else", props?.other?.zee); return props; }',
    );
  });
});

function jsFile(result: HelperCompilationResult, baseName = 'index'): string {
  const file = Object.entries(result.files).find(
    ([name]) => name === `${baseName}.js`,
  );

  return file![1];
}
