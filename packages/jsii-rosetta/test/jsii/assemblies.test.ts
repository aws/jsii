import * as spec from '@jsii/spec';
import * as mockfs from 'mock-fs';
import * as path from 'path';

import { allTypeScriptSnippets } from '../../lib/jsii/assemblies';
import { SnippetParameters } from '../../lib/snippet';
import { fakeAssembly } from './fake-assembly';

test('Extract snippet from README', () => {
  const snippets = Array.from(
    allTypeScriptSnippets([
      {
        assembly: fakeAssembly({
          readme: {
            markdown: [
              'Before the example.',
              '```ts',
              'someExample();',
              '```',
              'After the example.',
            ].join('\n'),
          },
        }),
        directory: path.join(__dirname, 'fixtures'),
      },
    ]),
  );

  expect(snippets[0].visibleSource).toEqual('someExample();');
});

test('Extract snippet from submodule READMEs', () => {
  const snippets = Array.from(
    allTypeScriptSnippets([
      {
        assembly: fakeAssembly({
          submodules: {
            'my.submodule': {
              readme: {
                markdown: [
                  'Before the example.',
                  '```ts',
                  'someExample();',
                  '```',
                  'After the example.',
                ].join('\n'),
              },
            },
          },
        }),
        directory: path.join(__dirname, 'fixtures'),
      },
    ]),
  );

  expect(snippets[0].visibleSource).toEqual('someExample();');
});

test('Extract snippet from type docstring', () => {
  const snippets = Array.from(
    allTypeScriptSnippets([
      {
        assembly: fakeAssembly({
          types: {
            'asm.MyType': {
              kind: spec.TypeKind.Class,
              assembly: 'asm',
              fqn: 'asm.MyType',
              name: 'MyType',
              docs: {
                summary: 'My Type',
                remarks: [
                  'Before the example.',
                  '```ts',
                  'someExample();',
                  '```',
                  'After the example.',
                ].join('\n'),
              },
            },
          },
        }),
        directory: path.join(__dirname, 'fixtures'),
      },
    ]),
  );

  expect(snippets[0].visibleSource).toEqual('someExample();');
});

test('Snippet can include fixture', () => {
  const snippets = Array.from(
    allTypeScriptSnippets([
      {
        assembly: fakeAssembly({
          readme: {
            markdown: [
              'Before the example.',
              '```ts fixture=explicit',
              'someExample();',
              '```',
              'After the example.',
            ].join('\n'),
          },
        }),
        directory: path.join(__dirname, 'fixtures'),
      },
    ]),
  );

  expect(snippets[0].visibleSource).toEqual('someExample();');
  expect(snippets[0].completeSource).toMatchInlineSnapshot(`
    "// This is a fixture

    // This is a wrapper so that \`import\` statements are invalid if included in
    // the code example that'll be inlined at the \`here\` marker.
    (function () {
      // Code snippet begins after !show marker below
    /// !show
    someExample();
    /// !hide
    // Code snippet ended before !hide marker above
    })()
    "
  `);
});

test('Use fixture from example', () => {
  const snippets = Array.from(
    allTypeScriptSnippets([
      {
        assembly: fakeAssembly({
          types: {
            'asm.MyType': {
              kind: spec.TypeKind.Class,
              assembly: 'asm',
              fqn: 'asm.MyType',
              name: 'MyType',
              docs: {
                example: ['/// fixture=explicit', 'someExample();'].join('\n'),
              },
            },
          },
        }),
        directory: path.join(__dirname, 'fixtures'),
      },
    ]),
  );

  expect(snippets[0].completeSource).toMatchInlineSnapshot(`
    "// This is a fixture

    // This is a wrapper so that \`import\` statements are invalid if included in
    // the code example that'll be inlined at the \`here\` marker.
    (function () {
      // Code snippet begins after !show marker below
    /// !show
    someExample();
    /// !hide
    // Code snippet ended before !hide marker above
    })()
    "
  `);
  expect(snippets[0].visibleSource).toEqual('someExample();');
});

test('Fixture allows use of import statements', () => {
  const snippets = Array.from(
    allTypeScriptSnippets([
      {
        assembly: fakeAssembly({
          types: {
            'asm.MyType': {
              kind: spec.TypeKind.Class,
              assembly: 'asm',
              fqn: 'asm.MyType',
              name: 'MyType',
              docs: {
                example: [
                  '/// fixture=explicit',
                  'import { exit } from "process";',
                  'someExample();',
                  'exit(0);',
                ].join('\n'),
              },
            },
          },
        }),
        directory: path.join(__dirname, 'fixtures'),
      },
    ]),
  );

  expect(snippets[0].completeSource).toMatchInlineSnapshot(`
    "// Hoisted imports begin after !show marker below
    /// !show
    import { exit } from \\"process\\";
    /// !hide
    // Hoisted imports ended before !hide marker above
    // This is a fixture

    // This is a wrapper so that \`import\` statements are invalid if included in
    // the code example that'll be inlined at the \`here\` marker.
    (function () {
      // Code snippet begins after !show marker below
    /// !show

    someExample();
    exit(0);
    /// !hide
    // Code snippet ended before !hide marker above
    })()
    "
  `);
  expect(snippets[0].visibleSource).toEqual(
    ['import { exit } from "process";', 'someExample();', 'exit(0);'].join(
      '\n',
    ),
  );
});

test('Backwards compatibility with literate integ tests', () => {
  mockfs({
    '/package/test/integ.example.lit.ts': '# Some literate source file',
  });

  try {
    const snippets = Array.from(
      allTypeScriptSnippets([
        {
          assembly: fakeAssembly({
            readme: {
              markdown: [
                'Before the example.',
                '```ts lit=test/integ.example.lit.ts',
                'someExample();',
                '```',
                'After the example.',
              ].join('\n'),
            },
          }),
          directory: '/package',
        },
      ]),
    );

    expect(snippets[0].visibleSource).toEqual('someExample();');
    expect(snippets[0].completeSource).toEqual('# Some literate source file');
    expect(
      snippets[0]?.parameters?.[SnippetParameters.$COMPILATION_DIRECTORY],
    ).toEqual(path.normalize('/package/test'));
  } finally {
    mockfs.restore();
  }
});
