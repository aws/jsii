import * as mockfs from 'mock-fs';

import {
  Rosetta,
  LanguageTablet,
  TranslatedSnippet,
  TypeScriptSnippet,
  DEFAULT_TABLET_NAME,
  Translation,
  UnknownSnippetMode,
} from '../lib';
import { TargetLanguage } from '../lib/languages';
import { fakeAssembly } from './jsii/fake-assembly';
import { testSnippetLocation } from './testutil';

const SAMPLE_CODE: TypeScriptSnippet = {
  visibleSource: 'callThisFunction();',
  location: testSnippetLocation('sample'),
};

const SAMPLE_CODE_COMPILING: TypeScriptSnippet = {
  visibleSource: 'console.log("hello");',
  location: testSnippetLocation('sample'),
};

describe('Rosetta object can do live translation', () => {
  let rosetta: Rosetta;
  let translated: Translation | undefined;
  beforeEach(() => {
    // GIVEN
    rosetta = new Rosetta({
      unknownSnippets: UnknownSnippetMode.TRANSLATE,
      targetLanguages: [TargetLanguage.PYTHON],
    });

    // WHEN
    translated = rosetta.translateSnippet(SAMPLE_CODE, TargetLanguage.PYTHON);
  });

  test('output is correct', () => {
    expect(translated).toMatchObject({
      source: 'call_this_function()',
      language: 'python',
    });
  });

  test('translations are added to liveTablet', () => {
    expect(rosetta.liveTablet.count).toEqual(1);
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
      go: 'Not Really Translated Go',
    }),
  );
  rosetta.addTablet(tablet);

  // WHEN
  const translated = rosetta.translateSnippet(SAMPLE_CODE, TargetLanguage.PYTHON);

  // THEN
  expect(translated).toMatchObject({
    source: 'Not Really Translated',
    language: 'python',
  });
});

test('Rosetta object can do live translation', () => {
  // GIVEN
  const rosetta = new Rosetta({
    unknownSnippets: UnknownSnippetMode.TRANSLATE,
    targetLanguages: [TargetLanguage.PYTHON],
  });

  // WHEN
  const translated = rosetta.translateSnippet(SAMPLE_CODE, TargetLanguage.PYTHON);

  // THEN
  expect(translated).toMatchObject({
    source: 'call_this_function()',
    language: 'python',
  });
});

test('Rosetta object can fail on untranslated snippet', () => {
  // GIVEN
  const rosetta = new Rosetta({
    unknownSnippets: UnknownSnippetMode.FAIL,
    targetLanguages: [TargetLanguage.PYTHON],
  });

  // WHEN
  expect(() => {
    rosetta.translateSnippet(SAMPLE_CODE, TargetLanguage.PYTHON);
  }).toThrow(/snippet was not found/);
});

test('Rosetta can give you an untranslated snippet back', () => {
  // GIVEN
  const rosetta = new Rosetta({
    unknownSnippets: UnknownSnippetMode.VERBATIM,
    targetLanguages: [TargetLanguage.PYTHON],
  });

  // WHEN
  const translated = rosetta.translateSnippet(SAMPLE_CODE, TargetLanguage.PYTHON);

  expect(translated?.source).toEqual('callThisFunction();');
});

test('Rosetta object can do translation and annotation of snippets in MarkDown', () => {
  // GIVEN
  const rosetta = new Rosetta({
    unknownSnippets: UnknownSnippetMode.TRANSLATE,
    targetLanguages: [TargetLanguage.PYTHON],
  });

  // WHEN
  const translated = rosetta.translateSnippetsInMarkdown(
    { api: 'file', fileName: 'markdown' },
    [
      '# MarkDown Translation',
      '',
      'Now follows a snippet:',
      '```ts',
      SAMPLE_CODE.visibleSource,
      '```',
      'That was it, thank you for your attention.',
    ].join('\n'),
    TargetLanguage.PYTHON,
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

describe('Rosetta object with disclaimers', () => {
  let rosetta: Rosetta;
  beforeEach(() => {
    // GIVEN
    rosetta = new Rosetta({
      includeCompilerDiagnostics: true,
      unknownSnippets: UnknownSnippetMode.TRANSLATE,
      targetLanguages: [TargetLanguage.PYTHON],
      prefixDisclaimer: true,
    });
  });

  test('compiling source code has no disclaimer', () => {
    // WHEN
    const translated = rosetta.translateSnippet(SAMPLE_CODE_COMPILING, TargetLanguage.PYTHON);

    // THEN
    expect(translated).toMatchObject({
      source: 'print("hello")',
      language: 'python',
    });
  });

  test('noncompiling source code has disclaimer', () => {
    // WHEN
    const translated = rosetta.translateSnippet(SAMPLE_CODE, TargetLanguage.PYTHON);

    // THEN
    expect(translated).toMatchObject({
      source: '# Example automatically generated from non-compiling source. May contain errors.\ncall_this_function()',
      language: 'python',
    });
  });

  test('source with no compilation information has no disclaimer', () => {
    // GIVEN
    const rosettaNoCompile = new Rosetta({
      includeCompilerDiagnostics: false,
      unknownSnippets: UnknownSnippetMode.TRANSLATE,
      targetLanguages: [TargetLanguage.PYTHON],
      prefixDisclaimer: true,
    });

    // WHEN
    const translated = rosettaNoCompile.translateSnippet(SAMPLE_CODE, TargetLanguage.PYTHON);

    // THEN
    expect(translated).toMatchObject({
      source: 'call_this_function()',
      language: 'python',
    });
  });
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
      go: 'My Stored Translation Go',
    }),
  );

  test('Can save language tablet and load it in Rosetta class', async () => {
    // GIVEN
    await tablet.save('/test.tablet');

    // WHEN
    const rosetta = new Rosetta();
    await rosetta.loadTabletFromFile('/test.tablet');
    const translated = rosetta.translateSnippet(SAMPLE_CODE, TargetLanguage.PYTHON);

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
    const translated = rosetta.translateSnippet(SAMPLE_CODE, TargetLanguage.PYTHON);

    // THEN
    expect(translated).toMatchObject({
      source: 'My Stored Translation',
      language: 'python',
    });
  });
});

function makeSnippet(original: TypeScriptSnippet, translations: Record<TargetLanguage, string>) {
  const snippet = TranslatedSnippet.fromTypeScript(original);
  for (const [key, value] of Object.entries(translations)) {
    snippet.addTranslation(key as TargetLanguage, value, 'x');
  }
  return snippet;
}
