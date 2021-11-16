import { compileJsiiForTest } from '../lib';

test('Symbol map is generated', async () => {
  const result = await compileJsiiForTest(
    {
      'index.ts': `
        export * from './some/nested/file';
        export class Foo {
          public bar(){}
        }
      `,
      'some/nested/file.ts': `
        export interface Bar {
          readonly x: string;
        }
        export enum Baz {
          ALPHA = 0,
          BETA = 1,
        }
        `,
    },
    undefined /* callback */,
    { stripDeprecated: true },
  );

  const types = result.assembly.types ?? {};
  expect(types['testpkg.Foo'].symbolId).toEqual('index:Foo');
  expect(types['testpkg.Bar'].symbolId).toEqual('some/nested/file:Bar');
  expect(types['testpkg.Baz'].symbolId).toEqual('some/nested/file:Baz');
});

test('Module declarations are included in symbolId', async () => {
  const result = await compileJsiiForTest(
    {
      'index.ts': `
        export class Foo {
          constructor() {
          }
        }
        export namespace Foo {
          export class Bar {
            public baz() {}
          }
        }
      `,
    },
    undefined /* callback */,
    { stripDeprecated: true },
  );

  const types = result.assembly.types ?? {};
  expect(types['testpkg.Foo.Bar'].symbolId).toEqual('index:Foo.Bar');
});
