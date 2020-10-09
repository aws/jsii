import * as fs from 'fs-extra';
import * as path from 'path';

import { JavaVisitor, PythonVisitor, SnippetTranslator } from '../lib';
import { CSharpVisitor } from '../lib/languages/csharp';
import { VisualizeAstVisitor } from '../lib/languages/visualize';
import { AstHandler } from '../lib/renderer';

// This iterates through all subdirectories of this directory,
// and creates a Jest test for each, by translating the TypeScript file it finds there,
// and comparing it to each of the language-specific files also present there
// with the same base name (but a different extension, of course).
// To add a new language to the tests,
// add an element to the SUPPORTED_LANGUAGES constant
//
// To run only the tests for a certain language you're working on, do this:
//
//    yarn test test/translations.test.js -t 'Translating .* to Python'
//    yarn test test/translations.test.js -t 'Translating .* to Java'
//    yarn test test/translations.test.js -t 'Translating .* to C#'
//
// To narrow it down even more you can of course replace the '.*' regex with
// whatever file indication you desire.

interface SupportedLanguage {
  readonly name: string;

  readonly extension: string;

  readonly visitor: AstHandler<any>;
}

const SUPPORTED_LANGUAGES = new Array<SupportedLanguage>(
  {
    name: 'Python',
    extension: '.py',
    visitor: new PythonVisitor(),
  },
  {
    name: 'Java',
    extension: '.java',
    visitor: new JavaVisitor(),
  },
  {
    name: 'C#',
    extension: '.cs',
    visitor: new CSharpVisitor(),
  },
);

/**
 * Automatically setup tests from source files found in the directory
 */
function makeTests() {
  const translationsRoot = path.join(__dirname, 'translations');
  const typeScriptTests = allFiles(translationsRoot)
    .filter((f) => f.endsWith('.ts') && !f.endsWith('.d.ts'))
    .filter((f) => !f.endsWith('.test.ts')); // Exclude self and other jest tests in this dir

  typeScriptTests.forEach((typeScriptTest) => {
    describe(`Translating ${path.relative(
      translationsRoot,
      typeScriptTest,
    )}`, () => {
      const typeScriptSource = fs.readFileSync(typeScriptTest, {
        encoding: 'utf-8',
      });

      let translator: SnippetTranslator;
      let anyFailed = false;
      beforeAll(() => {
        translator = new SnippetTranslator({
          visibleSource: typeScriptSource,
          where: typeScriptTest,
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

      SUPPORTED_LANGUAGES.forEach((supportedLanguage) => {
        const languageFile = replaceExtension(
          typeScriptTest,
          supportedLanguage.extension,
        );

        // Use 'test.skip' if the file doesn't exist so that we can clearly see it's missing.
        const testConstructor = fs.existsSync(languageFile) ? test : test.skip;

        testConstructor(`to ${supportedLanguage.name}`, () => {
          const expected = fs.readFileSync(languageFile, { encoding: 'utf-8' });
          try {
            const translation = translator.renderUsing(
              supportedLanguage.visitor,
            );
            expect(stripEmptyLines(translation)).toEqual(
              stripEmptyLines(stripCommonWhitespace(expected)),
            );
          } catch (e) {
            anyFailed = true;
            throw e;
          }
        });
      });
    });
  });
}

makeTests();

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
