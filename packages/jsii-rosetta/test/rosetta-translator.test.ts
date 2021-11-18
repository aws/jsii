import { RosettaTranslator, typeScriptSnippetFromVisibleSource, SnippetLocation, TargetLanguage } from '../lib';
import { withTemporaryDirectory } from './testutil';

const location: SnippetLocation = { api: { api: 'file', fileName: 'test.ts' } };

jest.setTimeout(60_000);

test('translator can translate', async () => {
  const translator = new RosettaTranslator({
    includeCompilerDiagnostics: true,
  });

  const snippet = typeScriptSnippetFromVisibleSource('console.log("hello world");', location, true);

  const { translatedSnippets } = await translator.translateAll([snippet]);

  expect(translatedSnippets).toHaveLength(1);
  expect(translatedSnippets[0].get(TargetLanguage.PYTHON)?.source).toEqual('print("hello world")');

  expect(translator.tablet.snippetKeys).toHaveLength(1);
});

test('translator can read from cache', async () => {
  await withTemporaryDirectory(async () => {
    // GIVEN: prepare cache
    const cacheBuilder = new RosettaTranslator({ includeCompilerDiagnostics: true });
    const snippet = typeScriptSnippetFromVisibleSource('console.log("hello world");', location, true);
    await cacheBuilder.translateAll([snippet]);
    await cacheBuilder.tablet.save('temp.tabl.json');

    // WHEN: new translatro
    const translator = new RosettaTranslator({ includeCompilerDiagnostics: true });
    await translator.loadCache('temp.tabl.json');

    const cached = translator.readFromCache([snippet]);

    expect(cached.translations).toHaveLength(1);
    expect(cached.remaining).toHaveLength(0);
    expect(translator.tablet.snippetKeys).toHaveLength(1);
  });
});
