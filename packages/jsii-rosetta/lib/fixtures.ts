import * as fs from 'fs-extra';
import * as path from 'path';
import {
  createSourceFile,
  ScriptKind,
  ScriptTarget,
  SyntaxKind,
} from 'typescript';

import { TypeScriptSnippet, SnippetParameters } from './snippet';

/**
 * Complete snippets with fixtures, if required
 */
export function fixturize(snippet: TypeScriptSnippet): TypeScriptSnippet {
  let source = snippet.visibleSource;
  const parameters = snippet.parameters ?? {};

  const directory = parameters[SnippetParameters.$PROJECT_DIRECTORY];
  if (!directory) {
    return snippet;
  }

  const literateSource = parameters[SnippetParameters.LITERATE_SOURCE];
  if (literateSource) {
    // Compatibility with the "old school" example inclusion mechanism.
    // Completely load this file and attach a parameter with its directory.
    source = loadLiterateSource(directory, literateSource);
    parameters[SnippetParameters.$COMPILATION_DIRECTORY] = path.join(
      directory,
      path.dirname(literateSource),
    );
  } else if (parameters[SnippetParameters.FIXTURE]) {
    // Explicitly request a fixture
    source = loadAndSubFixture(directory, parameters.fixture, source, true);
  } else if (parameters[SnippetParameters.NO_FIXTURE] === undefined) {
    // Don't explicitly request no fixture
    source = loadAndSubFixture(directory, 'default', source, false);
  }

  return {
    ...snippet,
    completeSource: source,
    parameters,
  };
}

function loadLiterateSource(directory: string, literateFileName: string) {
  const fullPath = path.join(directory, literateFileName);
  const exists = fs.existsSync(fullPath);
  if (!exists) {
    // This couldn't really happen in practice, but do the check anyway
    throw new Error(
      `Sample uses literate source ${literateFileName}, but not found: ${fullPath}`,
    );
  }
  return fs.readFileSync(fullPath, { encoding: 'utf-8' });
}

function loadAndSubFixture(
  directory: string,
  fixtureName: string,
  source: string,
  mustExist: boolean,
) {
  const fixtureFileName = path.join(
    directory,
    `rosetta/${fixtureName}.ts-fixture`,
  );
  const exists = fs.existsSync(fixtureFileName);
  if (!exists && mustExist) {
    throw new Error(
      `Sample uses fixture ${fixtureName}, but not found: ${fixtureFileName}`,
    );
  }
  if (!exists) {
    return source;
  }
  const fixtureContents = fs.readFileSync(fixtureFileName, {
    encoding: 'utf-8',
  });

  const subRegex = /[/]{3}[ \t]*here[ \t]*$/im;
  if (!subRegex.test(fixtureContents)) {
    throw new Error(`Fixture does not contain '/// here': ${fixtureFileName}`);
  }

  const { imports, statements } = sidelineImports(source);
  const show = '/// !show';
  const hide = '/// !hide';

  const result = fixtureContents.replace(
    subRegex,
    [
      '// Code snippet begins after !show marker below',
      show,
      statements,
      hide,
      '// Code snippet ended before !hide marker above',
    ].join('\n'),
  );

  return imports
    ? [
        '// Hoisted imports begin after !show marker below',
        show,
        imports,
        hide,
        '// Hoisted imports ended before !hide marker above',
        result,
      ].join('\n')
    : result;
}

/**
 * When embedding code fragments in a fixture, "import" statements must be
 * hoisted up to the top of the resulting document, as TypeScript only allows
 * those to be present in the top-level context of an ESM.
 *
 * @param source a block of TypeScript source
 *
 * @returns an object containing the import statements on one end, and the rest
 *          on the other hand.
 */
function sidelineImports(source: string): {
  imports: string;
  statements: string;
} {
  let imports = '';
  let statements = '';

  const sourceFile = createSourceFile(
    'index.ts',
    source,
    ScriptTarget.Latest,
    true,
    ScriptKind.TS,
  );
  for (const statement of sourceFile.statements) {
    switch (statement.kind) {
      case SyntaxKind.ImportDeclaration:
      case SyntaxKind.ImportEqualsDeclaration:
        imports += statement.getFullText(sourceFile);
        break;
      default:
        statements += statement.getFullText(sourceFile);
    }
  }

  return { imports, statements };
}
