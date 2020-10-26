import * as fs from 'fs-extra';
import * as path from 'path';
import * as ts from 'typescript';

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
    // Didn't explicitly request no fixture
    source = loadAndSubFixture(directory, 'default', source, false, parameters);
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
  {
    [SnippetParameters.ASSEMBLY]: assembly,
    [SnippetParameters.TYPE_NAME]: typeName,
  }: {
    [SnippetParameters.ASSEMBLY]?: string;
    [SnippetParameters.TYPE_NAME]?: string;
  } = {},
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
    const additions = new Array<string>();
    if (assembly) {
      // "Simplify" the assembly name, keeping only the alphanumeric tail of it
      const importName = assembly.replace(
        /^(?:.*[^a-z0-9])?([a-z0-9]+)$/i,
        '$1',
      );
      additions.push(`import * as ${importName} from '${assembly}';`);
      if (typeName) {
        additions.push(
          `const ${typeNameToInstanceName(
            typeName,
          )}: ${importName}.${typeName} = undefined as any;`,
        );
      }
    }
    return [...additions, '/// !show', source, '/// !hide'].join('\n');
  }
  const fixtureContents = fs.readFileSync(fixtureFileName, {
    encoding: 'utf-8',
  });

  const subRegex = /\/\/\/ here/i;
  if (!subRegex.test(fixtureContents)) {
    throw new Error(`Fixture does not contain '/// here': ${fixtureFileName}`);
  }

  const { imports, rest } = sliceImports(source);

  const result = fixtureContents.replace(
    subRegex,
    `/// !show\n${rest}\n/// !hide`,
  );
  return imports ? `/// !show\n${imports}\n/// !hide\n${result}` : result;

  /**
   * Given a (possibly qualified) type name, return an variable (instance) name
   * by un-qualifying the type name, and converting the resulting name to
   * camelCase (by down-casing the first letter).
   *
   * @param typeName the (possibly qualified) name of a type
   *
   * @returns a variable name
   */
  function typeNameToInstanceName(typeName: string): string {
    const parts = typeName.split('.');
    const unqualified = parts[parts.length - 1];
    const [first, ...rest] = unqualified;
    return `${first.toLowerCase()}${rest.join('')}`;
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
function sliceImports(source: string): { imports: string; rest: string } {
  let imports = '';
  let rest = '';

  const sourceFile = ts.createSourceFile(
    'index.ts',
    source,
    ts.ScriptTarget.Latest,
    true,
    ts.ScriptKind.TS,
  );
  for (const statement of sourceFile.statements) {
    switch (statement.kind) {
      case ts.SyntaxKind.ImportDeclaration:
      case ts.SyntaxKind.ImportEqualsDeclaration:
        imports += statement.getFullText(sourceFile);
        break;
      default:
        rest += statement.getFullText(sourceFile);
    }
  }

  return { imports, rest };
}
