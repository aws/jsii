import { compileJsiiForTest, normalizePath } from '../lib';

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

test('Submodules also have symbol identifiers', async () => {
  const result = await compileJsiiForTest(
    {
      'index.ts': `export * as submod from './submodule';`,
      'submodule.ts': `
        export class Foo {
          constructor() {
          }
        }
      `,
    },
    undefined /* callback */,
    { stripDeprecated: true },
  );

  expect(result.assembly.submodules?.['testpkg.submod']?.symbolId).toEqual(
    'submodule:',
  );
});

test('Submodules also have symbol identifiers', async () => {
  const result = await compileJsiiForTest(
    {
      'index.ts': `
        export namespace cookie {
          export class Foo {
            constructor() {
            }
          }
        }
      `,
    },
    undefined /* callback */,
    { stripDeprecated: true },
  );

  expect(result.assembly.submodules?.['testpkg.cookie']?.symbolId).toEqual(
    'index:cookie',
  );
});

describe(normalizePath, () => {
  test('basic rootDir and outDir', () => {
    expect(normalizePath('out/filename.ts', 'root', 'out')).toEqual(
      'root/filename.ts',
    );
    expect(normalizePath('out/filename.ts', undefined, 'out')).toEqual(
      'out/filename.ts',
    );
    expect(normalizePath('out/filename.ts', 'root', undefined)).toEqual(
      'out/filename.ts',
    );
    expect(normalizePath('out/filename.ts', undefined, undefined)).toEqual(
      'out/filename.ts',
    );
  });

  test('extra slashes in directories', () => {
    expect(normalizePath('out/filename.ts', 'root/', 'out/')).toEqual(
      'root/filename.ts',
    );
    expect(normalizePath('out/filename.ts', 'root////', 'out////')).toEqual(
      'root/filename.ts',
    );
    // eslint-disable-next-line prettier/prettier
    expect(normalizePath('out/lib/filename.ts', 'root///', 'out//lib//')).toEqual(
      'root/filename.ts',
    );
  });

  test('additional paths in directories', () => {
    expect(normalizePath('out/filename.ts', './root', 'out')).toEqual(
      'root/filename.ts',
    );
    expect(normalizePath('out/filename.ts', 'root', './out')).toEqual(
      'root/filename.ts',
    );
    expect(normalizePath('out/filename.ts', 'root', './here/../out')).toEqual(
      'root/filename.ts',
    );
    expect(normalizePath('out/filename.ts', 'root/../root/..', '.')).toEqual(
      'out/filename.ts',
    );
  });

  test('empty paths', () => {
    expect(normalizePath('out/lib/filename.ts', '', 'out')).toEqual(
      'lib/filename.ts',
    );
    expect(normalizePath('out/lib/filename.ts', '.', 'out')).toEqual(
      'lib/filename.ts',
    );
    expect(normalizePath('lib/filename.ts', 'root', '')).toEqual(
      'root/lib/filename.ts',
    );
    expect(normalizePath('lib/filename.ts', 'root', '.')).toEqual(
      'root/lib/filename.ts',
    );
    // eslint-disable-next-line prettier/prettier
    expect(normalizePath('lib/filename.ts', '', '')).toEqual(
      'lib/filename.ts',
    );
    expect(normalizePath('lib/filename.ts', '.', '.')).toEqual(
      'lib/filename.ts',
    );
  });

  test('specify multiple directories', () => {
    expect(normalizePath('out/lib/filename.ts', 'root', 'out/lib')).toEqual(
      'root/filename.ts',
    );
    expect(normalizePath('out/lib/filename.ts', 'root/extra', 'out')).toEqual(
      'root/extra/lib/filename.ts',
    );
    expect(normalizePath('out/lib/filename.ts', '.', 'out/lib')).toEqual(
      'filename.ts',
    );
    expect(normalizePath('lib/filename.ts', 'root/extra', '.')).toEqual(
      'root/extra/lib/filename.ts',
    );
  });
});
