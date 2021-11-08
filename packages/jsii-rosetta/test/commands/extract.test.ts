import * as path from 'path';

import { LanguageTablet } from '../../lib';
import * as extract from '../../lib/commands/extract';
import { TARGET_LANGUAGES } from '../../lib/languages';
import { AssemblyFixture, DUMMY_ASSEMBLY_TARGETS } from '../testutil';

const DUMMY_README = `
  Here is an example of how to use ClassA:

  \`\`\`ts
  import * as ass from 'my_assembly';
  const aClass = new ass.ClassA();
  aClass.someMethod();
  \`\`\`
`;

const defaultExtractOptions = {
  includeCompilerDiagnostics: false,
  validateAssemblies: false,
};

let assembly: AssemblyFixture;
beforeAll(async () => {
  // Create an assembly in a temp directory
  assembly = await AssemblyFixture.fromSource(
    {
      'index.ts': `
      export class ClassA {
        public someMethod() {
        }
      }
      `,
      'README.md': DUMMY_README,
    },
    {
      name: 'my_assembly',
      jsii: DUMMY_ASSEMBLY_TARGETS,
    },
  );
});

afterAll(async () => assembly.cleanup());

test('extract samples from test assembly', async () => {
  const outputFile = path.join(assembly.directory, 'test.tabl.json');
  await extract.extractSnippets([assembly.directory], {
    outputFile,
    ...defaultExtractOptions,
  });

  const tablet = new LanguageTablet();
  await tablet.load(outputFile);

  expect(tablet.snippetKeys.length).toEqual(1);
});

describe('with cache file', () => {
  let cacheTabletFile: string;
  beforeAll(async () => {
    cacheTabletFile = path.join(assembly.directory, 'cache.tabl.json');
    await extract.extractSnippets([assembly.directory], {
      outputFile: cacheTabletFile,
      ...defaultExtractOptions,
    });
  });

  test('translation does not happen if it can be read from cache', async () => {
    const translationFunction = jest.fn().mockResolvedValue({ diagnostics: [], translatedSnippets: [] });

    await extract.extractSnippets([assembly.directory], {
      outputFile: path.join(assembly.directory, 'dummy.tabl.json'),
      cacheTabletFile,
      translationFunction,
      ...defaultExtractOptions,
    });

    expect(translationFunction).not.toHaveBeenCalled();
  });

  test('translation does happen if translator version is different', async () => {
    const translationFunction = jest.fn().mockResolvedValue({ diagnostics: [], translatedSnippets: [] });

    const oldJavaVersion = TARGET_LANGUAGES.java.version;
    (TARGET_LANGUAGES.java as any).version = '999';
    try {
      await extract.extractSnippets([assembly.directory], {
        outputFile: path.join(assembly.directory, 'dummy.tabl.json'),
        cacheTabletFile,
        translationFunction,
        ...defaultExtractOptions,
      });

      expect(translationFunction).toHaveBeenCalled();
    } finally {
      (TARGET_LANGUAGES.java as any).version = oldJavaVersion;
    }
  });
});

test('do not ignore example strings', async () => {
  // Create an assembly in a temp directory
  const otherAssembly = await AssemblyFixture.fromSource(
    {
      'index.ts': `
      export class ClassA {
        /**
         * Some method
         * @example x
         */
        public someMethod() {
        }
      }
      `,
    },
    {
      name: 'my_assembly',
      jsii: DUMMY_ASSEMBLY_TARGETS,
    },
  );
  try {
    const outputFile = path.join(otherAssembly.directory, 'test.tabl.json');
    await extract.extractSnippets([otherAssembly.directory], {
      outputFile,
      ...defaultExtractOptions,
    });

    const tablet = await LanguageTablet.fromFile(outputFile);
    expect(tablet.count).toEqual(1);
    const tr = tablet.tryGetSnippet(tablet.snippetKeys[0]);
    expect(tr?.originalSource.source).toEqual('x');
  } finally {
    await assembly.cleanup();
  }
});
