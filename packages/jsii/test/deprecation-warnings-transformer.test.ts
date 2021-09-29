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

    const file = jsFile(result);
    expect(file).toMatch(
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

    const file = jsFile(result);
    expect(file).toMatch('bar(props = {}) { return props; }');
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

    const file = jsFile(result);
    expect(file).toMatch(
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

    const file = jsFile(result);
    expect(file).toMatch(
      'bar(props) { printJsiiDeprecationWarnings("testpkg.OtherProps", "Use something else", props?.other); return props; }',
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

    const file = jsFile(result);
    expect(file).toMatch(
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
