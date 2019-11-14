import fs = require('fs-extra');
import path = require('path');
import { JavaVisitor, PythonVisitor, SnippetTranslator } from '../lib';
import { AstHandler } from '../lib/renderer';

// This iterates through all subdirectories of this directory,
// and creates a Jest test for each, by translating the TypeScript file it finds there,
// and comparing it to each of the language-specific files also present there
// with the same base name (but a different extension, of course).
// To add a new language to the tests,
// add an element to the SUPPORTED_LANGUAGES constant

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
);

/**
 * Automatically setup tests from source files found in the directory
 */
function makeTests() {
  const typeScriptTests = allFiles(path.join(__dirname, 'translations'))
    .filter(f => f.endsWith('.ts') && !f.endsWith('.d.ts'))
    .filter(f => !f.endsWith('.test.ts')); // Exclude self and other jest tests in this dir

  typeScriptTests.forEach(typeScriptTest => {
    describe(`Translating: ${path.basename(typeScriptTest)}`, () => {
      const typeScriptSource = fs.readFileSync(typeScriptTest, { encoding: 'utf-8' });

      let translator: SnippetTranslator;
      beforeAll(() => {
        translator = new SnippetTranslator({
          visibleSource: typeScriptSource,
          where: typeScriptTest,
        });
      });
      afterAll(() => {
        (translator as any) = undefined; // Need this to properly release memory
      });

      SUPPORTED_LANGUAGES.forEach(supportedLanguage => {
        const languageFile = replaceExtension(typeScriptTest, supportedLanguage.extension);

        // Use 'test.skip' if the file doesn't exist so that we can clearly see it's missing.
        const testConstructor = fs.existsSync(languageFile) ? test : test.skip;

        testConstructor(supportedLanguage.name, () => {
          const expected = fs.readFileSync(languageFile, { encoding: 'utf-8' });
          const translation = translator.renderUsing(supportedLanguage.visitor);
          expect(stripEmptyLines(translation)).toEqual(stripEmptyLines(stripCommonWhitespace(expected)));
        });
      });
    });
  });
}

makeTests();

function allFiles(root: string) {
  const ret: string [] = [];
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
  const whitespaces = lines.filter(l => !emptyLine(l.trim())).map(l => l.match(/(\s*)/)![1].length);
  const minWS = Math.min(...whitespaces);
  return lines.map(l => l.substr(minWS)).join('\n');
}

function stripEmptyLines(x: string) {
  const lines = x.split('\n');
  while (lines.length > 0 && emptyLine(lines[0])) { lines.splice(0, 1); }
  while (lines.length > 0 && emptyLine(lines[lines.length - 1])) { lines.pop(); }
  return lines.join('\n');
}

function emptyLine(x: string) {
  return x.trim() === '';
}
