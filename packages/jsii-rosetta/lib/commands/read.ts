import { TargetLanguage } from '../languages';
import { LanguageTablet, TranslatedSnippet, Translation } from '../tablets/tablets';

export async function readTablet(tabletFile: string, key?: string, lang?: string) {
  const tab = new LanguageTablet();
  await tab.load(tabletFile);

  if (key !== undefined) {
    const snippet = tab.tryGetSnippet(key);
    if (snippet === undefined) {
      throw new Error(`No such snippet: ${key}`);
    }
    displaySnippet(snippet);
  } else {
    listSnippets();
  }

  function listSnippets() {
    for (const key of tab.snippetKeys) {
      process.stdout.write(`${snippetHeader(key)}\n`);
      displaySnippet(tab.tryGetSnippet(key)!);
      process.stdout.write('\n');
    }
  }

  function displaySnippet(snippet: TranslatedSnippet) {
    if (snippet.didCompile !== undefined) {
      process.stdout.write(`Compiled: ${snippet.didCompile}\n`);
    }

    if (lang !== undefined) {
      const translation = snippet.get(lang as TargetLanguage);
      if (translation === undefined) {
        throw new Error(`No translation for ${lang} in snippet ${snippet.key}`);
      }
      displayTranslation(translation);
    } else {
      listTranslations(snippet);
    }
  }

  function listTranslations(snippet: TranslatedSnippet) {
    const original = snippet.originalSource;
    if (original !== undefined) {
      displayTranslation(original);
    }

    for (const lang of snippet.languages) {
      process.stdout.write(`${languageHeader(lang)}\n`);
      displayTranslation(snippet.get(lang)!);
    }
  }

  function displayTranslation(translation: Translation) {
    process.stdout.write(`${translation.source}\n`);
  }
}

function snippetHeader(key: string) {
  return center(` ${key} `, 100, '=');
}

function languageHeader(key: string) {
  return center(` ${key} `, 30, '-');
}

function center(str: string, n: number, fill: string) {
  const before = Math.floor((n - str.length) / 2);
  const after = Math.ceil((n - str.length) / 2);

  return fill.repeat(Math.max(before, 0)) + str + fill.repeat(Math.max(after, 0));
}
