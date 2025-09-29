import { expectError, expectNoError } from './util';

jest.setTimeout(50_000);

const PREAMBLE = `
export interface IFoo {
  readonly foo: string;
}

export interface IBar {
  readonly bar: string;
}

export interface IBaz {
  readonly baz: string;
}

export interface ICombined extends IFoo, IBar { }
`;

describe.each(['argument', 'prop'] as const)('%s position', (where) => {
  function sources(old: string, noo: string): [string, string] {
    return [old, noo].map((type) => {
      switch (where) {
        case 'argument':
          return `
            ${PREAMBLE}
            export class Api {
              public static fooAndBar(x: ${type}) {
                void(x);
                return '';
              }
            }`;

        case 'prop':
          return `
          ${PREAMBLE}
          export interface Props {
            readonly input: ${type};
          }
          export class Api {
            public static fooAndBar(props: Props) {
              Array.isArray(props);
              return '';
            }
          }`;
      }
    }) as [string, string];
  }

  // ----------------------------------------------------------------------

  test('types can remain unchanged', () =>
    expectNoError(...sources('IFoo & IBar', 'IFoo & IBar')));

  // ----------------------------------------------------------------------

  test('can turn interface into intersection', () =>
    expectNoError(...sources('ICombined', 'IFoo & IBar')));

  // ----------------------------------------------------------------------

  test('can not turn interface into intersection that requires a non-extended type', () =>
    expectError(
      /testpkg.ICombined does not extend testpkg.IBaz/,
      ...sources('ICombined', 'IFoo & IBaz'),
    ));

  // ----------------------------------------------------------------------

  test('can turn part of union into intersection', () =>
    expectNoError(...sources('string | ICombined', 'string | (IFoo & IBar)')));

  // ----------------------------------------------------------------------

  test('can require fewer intersection elements', () =>
    expectNoError(...sources('IFoo & IBar & IBaz', 'IFoo & IBar')));

  // ----------------------------------------------------------------------

  test('can not add intersection elements', () =>
    expectError(
      /some of testpkg.IBar & testpkg.IFoo are not assignable to testpkg.IBaz/,
      ...sources('IFoo & IBar', 'IFoo & IBar & IBaz'),
    ));
});

// ----------------------------------------------------------------------

test('allow requiring a new interface in intersection if interface is extended at the same time', () =>
  expectNoError(
    `
    ${PREAMBLE}
    export interface IChangeable extends IFoo {}

    export class Api {
      public static fooAndBar(x: IChangeable) {
        void(x);
        return '';
      }
    }`,
    `
    ${PREAMBLE}
    export interface IChangeable extends IFoo, IBar {}

    export class Api {
      public static fooAndBar(x: IFoo & IBar) {
        void(x);
        return '';
      }
    }`,
  ));
