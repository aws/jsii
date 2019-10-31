import spec = require('jsii-spec');
import { allTypeScriptSnippets } from '../../lib/jsii/assemblies';
import path = require('path');

test('Extract snippet from README', () => {
  const snippets = Array.from(allTypeScriptSnippets([{
    assembly: fakeAssembly({
      readme: {
        markdown: [
          'Before the example.',
          '```ts',
          'someExample();',
          '```',
          'After the example.'
        ].join('\n')
      }
    }),
    directory: path.join(__dirname, 'fixtures'),
  }]));

  expect(snippets[0].visibleSource).toEqual('someExample();');
});

test('Extract snippet from type docstring', () => {
  const snippets = Array.from(allTypeScriptSnippets([{
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
              'After the example.'
            ].join('\n'),
          }
        },
      }
    }),
    directory: path.join(__dirname, 'fixtures'),
  }]));

  expect(snippets[0].visibleSource).toEqual('someExample();');
});

test('Snippet can include fixture', () => {
  const snippets = Array.from(allTypeScriptSnippets([{
    assembly: fakeAssembly({
      readme: {
        markdown: [
          'Before the example.',
          '```ts fixture=explicit',
          'someExample();',
          '```',
          'After the example.'
        ].join('\n')
      }
    }),
    directory: path.join(__dirname, 'fixtures'),
  }]));

  expect(snippets[0].visibleSource).toEqual('someExample();');
  expect(snippets[0].completeSource).toEqual([
    '// This is a fixture',
    '/// !show',
    'someExample();',
    '/// !hide',
  ].join('\n'));
});

test('Use fixture from example', () => {
  const snippets = Array.from(allTypeScriptSnippets([{
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
              'someExample();',
            ].join('\n'),
          }
        },
      }
    }),
    directory: path.join(__dirname, 'fixtures'),
  }]));

  expect(snippets[0].visibleSource).toEqual('someExample();');
  expect(snippets[0].completeSource).toEqual([
    '// This is a fixture',
    '/// !show',
    'someExample();',
    '/// !hide',
  ].join('\n'));
});

export function fakeAssembly(parts: Partial<spec.Assembly>): spec.Assembly {
  return Object.assign({
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
  }, parts);
}