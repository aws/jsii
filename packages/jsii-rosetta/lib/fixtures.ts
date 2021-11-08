import * as fs from 'fs-extra';
import * as path from 'path';
import { createSourceFile, ScriptKind, ScriptTarget, SyntaxKind } from 'typescript';

import { TypeScriptSnippet, SnippetParameters, ApiLocation } from './snippet';

/**
 * Complete snippets with fixtures, if required
 */
export function fixturize(snippet: TypeScriptSnippet, loose = false): TypeScriptSnippet {
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
    try {
      source = loadLiterateSource(directory, literateSource);
    } catch (ex) {
      // In loose mode, we ignore this failure and stick to the visible source.
      if (!loose) {
        throw ex;
      }
    }
    parameters[SnippetParameters.$COMPILATION_DIRECTORY] = path.join(directory, path.dirname(literateSource));
  } else if (parameters[SnippetParameters.FIXTURE]) {
    // Explicitly requested fixture must exist, unless we are operating in loose mode
    source = loadAndSubFixture(directory, snippet.location.api, parameters.fixture, source, !loose);
  } else if (parameters[SnippetParameters.NO_FIXTURE] === undefined) {
    // Don't explicitly request no fixture, load the default.
    source = loadAndSubFixture(directory, snippet.location.api, 'default', source, false);
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
    throw new Error(`Sample uses literate source ${literateFileName}, but not found: ${fullPath}`);
  }
  return fs.readFileSync(fullPath, { encoding: 'utf-8' });
}

/**
 * Load the fixture with the given name, and substitute the source into it
 *
 * If no fixture could be found and `mustExist` is true, and error will be thrown.
 *
 * In principle, the fixture we're looking for is `rosetta/FIXTURE.ts-fixture`.
 * However, we want to support an automatic transform of many small packages
 * combined into a single large package, perhaps into submodules (i.e., we want
 * to support monocdk), and in those cases the names of fixtures might conflict.
 * For example, all of them will have a `default.ts-fixture`, and there won't be
 * any explicit reference to that file anywhere... yet in the combined
 * monopackage we have to distinguish those fixtures.
 *
 * Therefore, we will consider submodule names as subdirectories, based on the
 * API location of the snippet we're fixturizing.
 *
 * (For example, the fixtures for a type called `monocdk.aws_s3.Bucket` will be
 * searched both in `rosetta/aws_s3/default.ts-fixture` as well as
 * `rosetta/default.ts-fixture`).
 */
function loadAndSubFixture(
  directory: string,
  location: ApiLocation,
  fixtureName: string,
  source: string,
  mustExist: boolean,
) {
  const candidates = fixtureCandidates(directory, fixtureName, location);
  const fixtureFileName = candidates.find((n) => fs.existsSync(n));

  if (!fixtureFileName) {
    if (mustExist) {
      throw new Error(`Sample uses fixture ${fixtureName}, but not found: ${JSON.stringify(candidates)}`);
    }
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

function fixtureCandidates(directory: string, fixtureName: string, location: ApiLocation): string[] {
  const ret = new Array<string>();
  const fileName = `${fixtureName}.ts-fixture`;
  const mods = submodules(location);

  ret.push(path.join(directory, 'rosetta', fileName));
  for (let i = 0; i < mods.length; i++) {
    ret.push(path.join(directory, 'rosetta', ...mods.slice(0, i + 1), fileName));
  }

  // Most specific one up front
  ret.reverse();
  return ret;
}

/**
 * Return the submodule parts from a given ApiLocation
 */
function submodules(location: ApiLocation): string[] {
  switch (location.api) {
    case 'file':
      return [];
    case 'initializer':
    case 'member':
    case 'type':
    case 'parameter':
      return middle(location.fqn.split('.'));
    case 'moduleReadme':
      return location.moduleFqn.split('.').slice(1);
  }

  function middle(xs: string[]) {
    return xs.slice(1, xs.length - 1);
  }
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

  const sourceFile = createSourceFile('index.ts', source, ScriptTarget.Latest, true, ScriptKind.TS);
  for (const statement of sourceFile.statements) {
    if (
      statement.kind === SyntaxKind.ImportDeclaration ||
      statement.kind === SyntaxKind.ImportEqualsDeclaration ||
      (statement.kind === SyntaxKind.VariableStatement &&
        statement.getChildAt(0).getChildAt(0).kind === SyntaxKind.DeclareKeyword)
    ) {
      imports += statement.getFullText(sourceFile);
    } else {
      statements += statement.getFullText(sourceFile);
    }
  }

  return { imports, statements };
}
