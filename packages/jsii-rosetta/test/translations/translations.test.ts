import fs = require('fs-extra');
import path = require('path');
import { JavaVisitor, PythonVisitor, SnippetTranslator } from '../../lib';
import { AstHandler } from '../../lib/renderer';

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
      extension: 'py',
      visitor: new PythonVisitor(),
    },
    {
      name: 'Java',
      extension: 'java',
      visitor: new JavaVisitor(),
    },
);

describe('samples translation', () => {
  const rootDir = __dirname;
  const files = fs.readdirSync(rootDir);
  for (const file of files) {
    const fullFilePath = path.join(rootDir, file);
    const fileStats = fs.statSync(fullFilePath);
    if (fileStats.isDirectory()) {
      handleTestsForDirectory(fullFilePath);
    }
  }

  function handleTestsForDirectory(rootDir: string): void {
    const tsFile = fs.readdirSync(rootDir).find(file => {
      return file.endsWith('.ts') && !file.endsWith('.d.ts');
    });
    if (!tsFile) {
      throw new Error(`Directory '${rootDir}' must contain a TS file!`);
    }
    const tsFilePath = path.join(rootDir, tsFile);
    const typeScriptSource = fs.readFileSync(tsFilePath).toString();
    const translator = new SnippetTranslator({
      visibleSource: typeScriptSource,
      where: tsFilePath,
    });
    const baseName = path.basename(tsFile, '.ts');

    for (const supportedLanguage of SUPPORTED_LANGUAGES) {
      const languageFile = path.join(rootDir, `${baseName}.${supportedLanguage.extension}`);
      if (fs.existsSync(languageFile)) {
        const expected = fs.readFileSync(languageFile).toString();
        test(`correctly translates '${baseName}' to ${supportedLanguage.name}`, () => {
          const translation = translator.renderUsing(supportedLanguage.visitor);
          expect(stripEmptyLines(translation)).toEqual(stripEmptyLines(stripCommonWhitespace(expected)));
        })
      }
    }
  }
});

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
