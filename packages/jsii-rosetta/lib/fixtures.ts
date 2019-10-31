import fs = require('fs-extra');
import path = require('path');
import { TypeScriptSnippet, SnippetParameters } from './snippet';

/**
 * Complete snippets with fixtures, if required
 */
export function fixturize(snippet: TypeScriptSnippet): TypeScriptSnippet {
  let source = snippet.visibleSource;
  const parameters = snippet.parameters || {};

  const directory = parameters[SnippetParameters.$PROJECT_DIRECTORY];
  if (!directory) { return snippet; }

  if (parameters[SnippetParameters.FIXTURE]) {
    // Explicitly request a fixture
    source = loadAndSubFixture(directory, parameters.fixture, source, true);
  } else if (parameters[SnippetParameters.NO_FIXTURE] === undefined) {
    source = loadAndSubFixture(directory, 'default', source, false);
  }

  return { visibleSource: snippet.visibleSource, completeSource: source, where: snippet.where, parameters };
}

function loadAndSubFixture(directory: string, fixtureName: string, source: string, mustExist: boolean) {
  const fixtureFileName = path.join(directory, `rosetta/${fixtureName}.ts-fixture`);
  const exists = fs.existsSync(fixtureFileName);
  if (!exists && mustExist) {
    throw new Error(`Sample uses fixture ${fixtureName}, but not found: ${fixtureFileName}`);
  }
  if (!exists) { return source; }
  const fixtureContents = fs.readFileSync(fixtureFileName, { encoding: 'utf-8' });

  const subRegex = /\/\/\/ here/i;
  if (!subRegex.test(fixtureContents)) {
    throw new Error(`Fixture does not contain '/// here': ${fixtureFileName}`);
  }

  return fixtureContents.replace(subRegex, `/// !show\n${source}\n/// !hide`);
}
