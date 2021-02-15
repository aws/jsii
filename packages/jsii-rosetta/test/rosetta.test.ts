import * as mockfs from 'mock-fs';

import {
  Rosetta,
  LanguageTablet,
  TranslatedSnippet,
  TypeScriptSnippet,
  DEFAULT_TABLET_NAME,
} from '../lib';
import { TargetLanguage } from '../lib/languages';
import { fakeAssembly } from './jsii/fake-assembly';

const SAMPLE_CODE: TypeScriptSnippet = {
  visibleSource: 'callThisFunction();',
  where: 'sample',
};

test('Rosetta object can do live translation', () => {
  // GIVEN
  const rosetta = new Rosetta({
    liveConversion: true,
    targetLanguages: ['python'],
  });

  // WHEN
  const translated = rosetta.translateSnippet(SAMPLE_CODE, 'python');

  // THEN
  expect(translated).toMatchObject({
    source: 'call_this_function()',
    language: 'python',
  });
});

test('Can use preloaded tablet', () => {
  // GIVEN
  const rosetta = new Rosetta();

  const tablet = new LanguageTablet();
  tablet.addSnippet(
    makeSnippet(SAMPLE_CODE, {
      python: 'Not Really Translated',
      csharp: 'Not Really Translated C#',
      java: 'Not Really Translated Java',
    }),
  );
  rosetta.addTablet(tablet);

  // WHEN
  const translated = rosetta.translateSnippet(SAMPLE_CODE, 'python');

  // THEN
  expect(translated).toMatchObject({
    source: 'Not Really Translated',
    language: 'python',
  });
});

test('Rosetta object can do live translation', () => {
  // GIVEN
  const rosetta = new Rosetta({
    liveConversion: true,
    targetLanguages: ['python'],
  });

  // WHEN
  const translated = rosetta.translateSnippet(SAMPLE_CODE, 'python');

  // THEN
  expect(translated).toMatchObject({
    source: 'call_this_function()',
    language: 'python',
  });
});

test('Rosetta object can do translation and annotation of snippets in MarkDown', () => {
  // GIVEN
  const rosetta = new Rosetta({
    liveConversion: true,
    targetLanguages: ['python'],
  });

  // WHEN
  const translated = rosetta.translateSnippetsInMarkdown(
    [
      '# MarkDown Translation',
      '',
      'Now follows a snippet:',
      '```ts',
      SAMPLE_CODE.visibleSource,
      '```',
      'That was it, thank you for your attention.',
    ].join('\n'),
    'python',
    false,
    (trans) => {
      return {
        ...trans,
        source: `# We translated something!\n${trans.source}`,
      };
    },
  );

  // THEN
  expect(translated).toEqual(
    [
      '# MarkDown Translation',
      '',
      'Now follows a snippet:',
      '',
      '```python',
      '# We translated something!',
      'call_this_function()',
      '```',
      '',
      'That was it, thank you for your attention.',
    ].join('\n'),
  );
});

describe('with mocked filesystem', () => {
  beforeEach(() => {
    mockfs();
  });
  afterEach(() => {
    mockfs.restore();
  });

  const tablet = new LanguageTablet();
  tablet.addSnippet(
    makeSnippet(SAMPLE_CODE, {
      python: 'My Stored Translation',
      csharp: 'My Stored Translation C#',
      java: 'My Stored Translation Java',
    }),
  );

  test('Can save language tablet and load it in Rosetta class', async () => {
    // GIVEN
    await tablet.save('/test.tablet');

    // WHEN
    const rosetta = new Rosetta();
    await rosetta.loadTabletFromFile('/test.tablet');
    const translated = rosetta.translateSnippet(SAMPLE_CODE, 'python');

    // THEN
    expect(translated).toMatchObject({
      source: 'My Stored Translation',
      language: 'python',
    });
  });

  test('Rosetta class automatically loads default-named tablets in same directory as assembly', async () => {
    // GIVEN
    await tablet.save(`/${DEFAULT_TABLET_NAME}`);

    // WHEN
    const rosetta = new Rosetta();
    await rosetta.addAssembly(fakeAssembly({}), '/');
    const translated = rosetta.translateSnippet(SAMPLE_CODE, 'python');

    // THEN
    expect(translated).toMatchObject({
      source: 'My Stored Translation',
      language: 'python',
    });
  });
});

function makeSnippet(
  original: TypeScriptSnippet,
  translations: Record<TargetLanguage, string>,
) {
  const snippet = TranslatedSnippet.fromSnippet(original);
  for (const [key, value] of Object.entries(translations)) {
    snippet.addTranslatedSource(key as TargetLanguage, value);
  }
  return snippet;
}
