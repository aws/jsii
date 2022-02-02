import * as fs from 'fs-extra';
import * as path from 'path';

import { SnippetTranslator } from '../lib';
import { TARGET_LANGUAGES, TargetLanguage, VisitorFactory } from '../lib/languages';
import { VisualizeAstVisitor } from '../lib/languages/visualize';
import { testSnippetLocation } from './testutil';

// This iterates through all subdirectories of this directory,
// and creates a Jest test for each, by translating the TypeScript file it finds there,
// and comparing it to each of the language-specific files also present there
// with the same base name (but a different extension, of course).
// To add a new language to the tests,
// add an element to the SUPPORTED_LANGUAGES constant
//
// To run only the tests for a certain language you're working on, do this:
//
//    yarn test test/translations.test -t 'Translating .* to Python'
//    yarn test test/translations.test -t 'Translating .* to Java'
//    yarn test test/translations.test -t 'Translating .* to C#'
//
// To narrow it down even more you can of course replace the '.*' regex with
// whatever file indication you desire.

interface SupportedLanguage {
  readonly name: string;

  readonly extension: string;

  readonly visitorFactory: VisitorFactory;
}

export const SUPPORTED_LANGUAGES = new Array<SupportedLanguage>(
  {
    name: 'Python',
    extension: '.py',
    visitorFactory: TARGET_LANGUAGES[TargetLanguage.PYTHON],
  },
  {
    name: 'Java',
    extension: '.java',
    visitorFactory: TARGET_LANGUAGES[TargetLanguage.JAVA],
  },
  {
    name: 'C#',
    extension: '.cs',
    visitorFactory: TARGET_LANGUAGES[TargetLanguage.CSHARP],
  },
);

const translationsRoot = path.join(__dirname, 'translations');
const typeScriptTests = allFiles(translationsRoot)
  .filter((f) => f.endsWith('.ts') && !f.endsWith('.d.ts'))
  .filter((f) => !f.endsWith('.test.ts')); // Exclude self and other jest tests in this dir

for (const typeScriptTest of typeScriptTests) {
  describe(`Translating ${path.relative(translationsRoot, typeScriptTest)}`, () => {
    const typeScriptSource = fs.readFileSync(typeScriptTest, {
      encoding: 'utf-8',
    });

    let translator: SnippetTranslator;
    let anyFailed = false;
    beforeAll(() => {
      translator = new SnippetTranslator({
        visibleSource: typeScriptSource,
        location: testSnippetLocation(typeScriptTest),
      });
    });

    afterAll(() => {
      // Print the AST for tests that failed (to help debugging)
      if (anyFailed && translator) {
        const vis = translator.renderUsing(new VisualizeAstVisitor(true));
        console.log(`${vis}\n`);
      }
      translator = undefined as any; // Need this to properly release memory
    });

    for (const { name, extension, visitorFactory } of SUPPORTED_LANGUAGES) {
      const languageFile = replaceExtension(typeScriptTest, extension);

      // Use 'test.skip' if the file doesn't exist so that we can clearly see it's missing.
      const testConstructor = fs.existsSync(languageFile) ? test : test.skip;

      testConstructor(`to ${name}`, () => {
        const expected = fs.readFileSync(languageFile, { encoding: 'utf-8' });
        try {
          const translation = translator.renderUsing(visitorFactory.createVisitor());
          expect(stripEmptyLines(translation)).toEqual(stripEmptyLines(stripCommonWhitespace(expected)));
        } catch (e) {
          anyFailed = true;
          throw e;
        }
      });
    }
  });
}

function allFiles(root: string) {
  const ret: string[] = [];
  recurse(root);
  return ret;

  function recurse(dir: string) {
    for (const file of fs.readdirSync(dir)) {
      const fullPath = path.join(dir, file);
      const stat = fs.statSync(fullPath);
      if (stat.isFile()) {
        ret.push(fullPath);
      }
      if (stat.isDirectory()) {
        recurse(fullPath);
      }
    }
  }
}

function replaceExtension(x: string, newExtension: string) {
  return x.replace(/\.[^.]*$/, '') + newExtension;
}

function stripCommonWhitespace(x: string) {
  const lines = x.split('\n');
  const whitespaces = lines
    .filter((l) => !emptyLine(l.trim()))
    /* eslint-disable-next-line @typescript-eslint/prefer-regexp-exec */
    .map((l) => l.match(/(\s*)/)![1].length);
  const minWS = Math.min(...whitespaces);
  return lines.map((l) => l.substr(minWS)).join('\n');
}

function stripEmptyLines(x: string) {
  const lines = x.split('\n');
  while (lines.length > 0 && emptyLine(lines[0])) {
    lines.splice(0, 1);
  }
  while (lines.length > 0 && emptyLine(lines[lines.length - 1])) {
    lines.pop();
  }
  return lines.join('\n');
}

function emptyLine(x: string) {
  return x.trim() === '';
}
