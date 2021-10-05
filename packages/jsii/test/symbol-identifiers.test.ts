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

  console.log(result.assembly);
  expect(result.assembly.symbolToFqn).toEqual({
    'index:Foo': 'testpkg.Foo',
    'some/nested/file:Bar': 'testpkg.Bar',
    'some/nested/file:Baz': 'testpkg.Baz',
  });
});
