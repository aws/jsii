import { typeScriptSnippetFromVisibleSource, SnippetLocation, typeScriptSnippetFromCompleteSource } from '../lib';

describe('construct TypeScriptSnippets', () => {
  const source = ['a', '/// !show', 'b', '/// !hide', 'c'].join('\n');
  const location: SnippetLocation = { api: { api: 'file', fileName: 'x' } };

  test('using typeScriptSnippetFromVisibleSource', () => {
    const snippet = typeScriptSnippetFromVisibleSource(source, location, true);

    expect(snippet.visibleSource).toEqual(source);
    expect(snippet.completeSource).toEqual(undefined);
  });

  test('using typeScriptSnippetFromCompleteSource', () => {
    const snippet = typeScriptSnippetFromCompleteSource(source, location, true);

    expect(snippet.visibleSource).toEqual('b');
    expect(snippet.completeSource).toEqual(source);
  });
});
