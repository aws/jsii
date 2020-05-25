import * as mockfs from 'mock-fs';
import * as spec from '@jsii/spec';
import { allTypeScriptSnippets } from '../../lib/jsii/assemblies';
import * as path from 'path';
import { SnippetParameters } from '../../lib/snippet';

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
  expect(snippets[0].completeSource).toEqual(
    ['// This is a fixture', '/// !show', 'someExample();', '/// !hide'].join(
      '\n',
    ),
  );
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

  expect(snippets[0].visibleSource).toEqual('someExample();');
  expect(snippets[0].completeSource).toEqual(
    ['// This is a fixture', '/// !show', 'someExample();', '/// !hide'].join(
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
    ).toEqual('/package/test');
  } finally {
    mockfs.restore();
  }
});

export function fakeAssembly(parts: Partial<spec.Assembly>): spec.Assembly {
  return Object.assign(
    {
      schema: spec.SchemaVersion.LATEST,
      name: '',
      description: '',
      homepage: '',
      repository: { directory: '', type: '', url: '' },
      author: { email: '', name: '', organization: false, roles: [], url: '' },
      fingerprint: '',
      version: '',
      jsiiVersion: '',
      license: '',
    },
    parts,
  );
}
