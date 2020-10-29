import * as fs from 'fs-extra';
import * as path from 'path';

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
    visibleSource: snippet.visibleSource,
    completeSource: source,
    where: snippet.where,
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

  const subRegex = /\/\/\/ here/i;
  if (!subRegex.test(fixtureContents)) {
    throw new Error(`Fixture does not contain '/// here': ${fixtureFileName}`);
  }

  return fixtureContents.replace(subRegex, `/// !show\n${source}\n/// !hide`);
}
