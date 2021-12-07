import * as fs from 'fs-extra';
import * as path from 'path';

import {
  LanguageTablet,
  RosettaTranslator,
  RosettaTranslatorOptions,
  DEFAULT_TABLET_NAME,
  TranslatedSnippet,
  typeScriptSnippetFromVisibleSource,
} from '../../lib';
import * as extract from '../../lib/commands/extract';
import { loadAssemblies } from '../../lib/jsii/assemblies';
import { TARGET_LANGUAGES } from '../../lib/languages';
import { TestJsiiModule, DUMMY_JSII_CONFIG, testSnippetLocation } from '../testutil';

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

let assembly: TestJsiiModule;
beforeEach(async () => {
  // Create an assembly in a temp directory
  assembly = await TestJsiiModule.fromSource(
    {
      'index.ts': `
      export class ClassA {
        public someMethod() {
        }
      }
      export class ClassB {
        public anotherMethod() {
        }
      }
      `,
      'README.md': DUMMY_README,
    },
    {
      name: 'my_assembly',
      jsii: DUMMY_JSII_CONFIG,
    },
  );
});

afterEach(async () => assembly.cleanup());

test('extract samples from test assembly', async () => {
  const cacheToFile = path.join(assembly.moduleDirectory, 'test.tabl.json');
  await extract.extractSnippets([assembly.moduleDirectory], {
    cacheToFile,
    ...defaultExtractOptions,
  });

  const tablet = new LanguageTablet();
  await tablet.load(cacheToFile);

  expect(tablet.snippetKeys.length).toEqual(1);
});

describe('with cache file', () => {
  let cacheTabletFile: string;
  beforeEach(async () => {
    cacheTabletFile = path.join(assembly.moduleDirectory, 'cache.tabl.json');
    await extract.extractSnippets([assembly.moduleDirectory], {
      cacheToFile: cacheTabletFile,
      ...defaultExtractOptions,
    });
  });

  async function givenThatDefaultTabletDoesNotExist() {
    await fs.unlink(path.join(assembly.moduleDirectory, DEFAULT_TABLET_NAME));
  }

  describe('translation does not happen ', () => {
    test('if it can be read from cache', async () => {
      const translationFunction = jest.fn().mockResolvedValue({ diagnostics: [], translatedSnippets: [] });

      // GIVEN
      await givenThatDefaultTabletDoesNotExist();

      // WHEN
      await extract.extractSnippets([assembly.moduleDirectory], {
        cacheToFile: path.join(assembly.moduleDirectory, 'dummy.tabl.json'),
        cacheFromFile: cacheTabletFile,
        translatorFactory: (o) => new MockTranslator(o, translationFunction),
        ...defaultExtractOptions,
      });

      expect(translationFunction).not.toHaveBeenCalled();
    });

    test('because output file acts as cache', async () => {
      const translationFunction = jest.fn().mockResolvedValue({ diagnostics: [], translatedSnippets: [] });

      // GIVEN
      await givenThatDefaultTabletDoesNotExist();

      // WHEN
      await extract.extractSnippets([assembly.moduleDirectory], {
        cacheFromFile: cacheTabletFile,
        translatorFactory: (o) => new MockTranslator(o, translationFunction),
        ...defaultExtractOptions,
      });

      expect(translationFunction).not.toHaveBeenCalled();
    });

    test('because default tablet file acts as cache', async () => {
      const translationFunction = jest.fn().mockResolvedValue({ diagnostics: [], translatedSnippets: [] });

      // WHEN
      await extract.extractSnippets([assembly.moduleDirectory], {
        translatorFactory: (o) => new MockTranslator(o, translationFunction),
        ...defaultExtractOptions,
      });

      expect(translationFunction).not.toHaveBeenCalled();
    });
  });

  test('translation does happen if translator version is different', async () => {
    const translationFunction = jest.fn().mockResolvedValue({ diagnostics: [], translatedSnippets: [] });

    // GIVEN
    await givenThatDefaultTabletDoesNotExist();

    // WHEN
    const oldJavaVersion = TARGET_LANGUAGES.java.version;
    (TARGET_LANGUAGES.java as any).version = '999';
    try {
      await extract.extractSnippets([assembly.moduleDirectory], {
        cacheToFile: path.join(assembly.moduleDirectory, 'dummy.tabl.json'),
        cacheFromFile: cacheTabletFile,
        translatorFactory: (o) => new MockTranslator(o, translationFunction),
        ...defaultExtractOptions,
      });

      expect(translationFunction).toHaveBeenCalled();
    } finally {
      (TARGET_LANGUAGES.java as any).version = oldJavaVersion;
    }
  });

  test('both default and explicit tablet are written', async () => {
    // WHEN
    await extract.extractSnippets([assembly.moduleDirectory], {
      cacheToFile: path.join(assembly.moduleDirectory, 'dummy.tabl.json'),
      ...defaultExtractOptions,
    });

    // THEN
    expect(await fs.pathExists(path.join(assembly.moduleDirectory, 'dummy.tabl.json'))).toBeTruthy();
    expect(await fs.pathExists(path.join(assembly.moduleDirectory, '.jsii.tabl.json'))).toBeTruthy();
  });

  describe('when the cache output tablet has unrelated snippets', () => {
    let cacheToFile: string;
    beforeEach(async () => {
      cacheToFile = path.join(assembly.moduleDirectory, 'dummy.tabl.json');

      const tbl = new LanguageTablet();
      tbl.addSnippet(bogusTranslatedSnippet());
      await tbl.save(cacheToFile);
    });

    test('it is not trimmed by default', async () => {
      // WHEN
      await extract.extractSnippets([assembly.moduleDirectory], {
        cacheToFile,
        ...defaultExtractOptions,
      });

      // THEN
      const cacheTablet = await LanguageTablet.fromFile(cacheToFile);

      expect(cacheTablet.count).toEqual(2);
    });

    test('it can be trimmed with an option', async () => {
      // WHEN
      await extract.extractSnippets([assembly.moduleDirectory], {
        cacheToFile,
        trimCache: true,
        ...defaultExtractOptions,
      });

      // THEN
      const cacheTablet = await LanguageTablet.fromFile(cacheToFile);

      expect(cacheTablet.count).toEqual(1);
    });
  });

  test('default tablet is always trimmed', async () => {
    const defaultTabletFile = path.join(assembly.moduleDirectory, DEFAULT_TABLET_NAME);

    // GIVEN - the '.jsii.tabl.json' file contains something already
    const tbl = new LanguageTablet();
    tbl.addSnippet(bogusTranslatedSnippet());
    await tbl.save(defaultTabletFile);

    // WHEN - we run extract
    await extract.extractSnippets([assembly.moduleDirectory], defaultExtractOptions);

    // THEN - the default tablet file now only contains one snippet, the new one
    const defaultTablet = await LanguageTablet.fromFile(defaultTabletFile);

    expect(defaultTablet.translatedSnippets.map((s) => s.snippet.location)).toEqual([
      {
        api: { api: 'moduleReadme', moduleFqn: 'my_assembly' },
        field: { field: 'markdown', line: 4 },
      },
    ]);
  });

  test('existing tablet is updated when assembly changes', async () => {
    // Modify the assembly with a new example
    assembly.assembly.types!['my_assembly.ClassB'].docs = {
      example: 'ClassB.anotherMethod();',
    };
    await assembly.updateAssembly();

    const translationFunction = jest.fn().mockResolvedValue({ diagnostics: [], translatedSnippets: [] });

    await extract.extractSnippets([assembly.moduleDirectory], {
      cacheToFile: cacheTabletFile,
      translatorFactory: (o) => new MockTranslator(o, translationFunction),
      ...defaultExtractOptions,
    });

    // There are two examples, one should be cached and the other should be translated
    expect(translationFunction).toHaveBeenCalledTimes(1);
  });

  test('compiler diagnostics property is passed on', async () => {
    const translationFunction = jest.fn().mockResolvedValue({ diagnostics: [], translatedSnippets: [] });

    await extract.extractSnippets([assembly.moduleDirectory], {
      cacheToFile: path.join(assembly.moduleDirectory, 'dummy.tabl.json'),
      validateAssemblies: false,
      includeCompilerDiagnostics: true,
      translatorFactory: (o) => {
        expect(o.includeCompilerDiagnostics).toEqual(true);
        return new MockTranslator(o, translationFunction);
      },
    });
  });
});

test('do not ignore example strings', async () => {
  // Create an assembly in a temp directory
  const otherAssembly = await TestJsiiModule.fromSource(
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
      jsii: DUMMY_JSII_CONFIG,
    },
  );
  try {
    const cacheToFile = path.join(otherAssembly.moduleDirectory, 'test.tabl.json');
    await extract.extractSnippets([otherAssembly.moduleDirectory], {
      cacheToFile,
      ...defaultExtractOptions,
    });

    const tablet = await LanguageTablet.fromFile(cacheToFile);
    expect(tablet.count).toEqual(1);
    const tr = tablet.tryGetSnippet(tablet.snippetKeys[0]);
    expect(tr?.originalSource.source).toEqual('x');
  } finally {
    await otherAssembly.cleanup();
  }
});

describe('can find fqns via symbolId when ', () => {
  test('there is an outDir', async () => {
    const outDir = 'jsii-outDir';
    const otherAssembly = await createAssemblyWithDirectories(undefined, outDir);
    try {
      const outputFile = path.join(otherAssembly.moduleDirectory, 'test.tabl.json');
      await extract.extractSnippets([otherAssembly.moduleDirectory], {
        cacheToFile: outputFile,
        ...defaultExtractOptions,
      });

      const tablet = await LanguageTablet.fromFile(outputFile);
      const tr = tablet.tryGetSnippet(tablet.snippetKeys[0]);
      expect(tr?.fqnsReferenced()).toEqual(['my_assembly.ClassA']);
    } finally {
      await otherAssembly.cleanup();
    }
  });

  test('there is an outDir and rootDir', async () => {
    const outDir = 'jsii-outDir';
    const rootDir = '.';
    const otherAssembly = await createAssemblyWithDirectories(rootDir, outDir);
    try {
      const outputFile = path.join(otherAssembly.moduleDirectory, 'test.tabl.json');
      await extract.extractSnippets([otherAssembly.moduleDirectory], {
        cacheToFile: outputFile,
        ...defaultExtractOptions,
      });

      const tablet = await LanguageTablet.fromFile(outputFile);
      const tr = tablet.tryGetSnippet(tablet.snippetKeys[0]);
      expect(tr?.fqnsReferenced()).toEqual(['my_assembly.ClassA']);
    } finally {
      await otherAssembly.cleanup();
    }
  });
});

test('extract and infuse in one command', async () => {
  const cacheToFile = path.join(assembly.moduleDirectory, 'test.tabl.json');
  await extract.extractAndInfuse([assembly.moduleDirectory], {
    cacheToFile,
    ...defaultExtractOptions,
  });

  const tablet = new LanguageTablet();
  await tablet.load(cacheToFile);

  // extract works as expected, with a caveat
  // the infuse part of this call will re-insert the example back
  // into the tablet under a new key and new location.
  // so we confirm that the locations of the snippets are as expected.
  expect(tablet.snippetKeys.length).toEqual(2);
  const locations = new Set();
  for (const key of tablet.snippetKeys) {
    locations.add(tablet.tryGetSnippet(key)?.snippet.location.api.api);
  }
  expect(locations).toContain('type');
  expect(locations).toContain('moduleReadme');

  const assemblies = await loadAssemblies([assembly.moduleDirectory], false);
  const types = assemblies[0].assembly.types;

  // infuse works as expected
  expect(types).toBeDefined();
  expect(types!['my_assembly.ClassA'].docs?.example).toBeDefined();
});

class MockTranslator extends RosettaTranslator {
  public constructor(opts: RosettaTranslatorOptions, translatorFn: jest.Mock) {
    super(opts);
    this.translateAll = translatorFn;
  }
}

async function createAssemblyWithDirectories(rootDir?: string, outDir?: string) {
  return TestJsiiModule.fromSource(
    {
      'index.ts': `
      export class ClassA {
        /**
         * Some method
         *
         * @example
         * import * as ass from 'my_assembly';
         * new ass.ClassA.someMethod();
         */
        public someMethod() {
        }
      }
      `,
      'README.md': '',
    },
    {
      name: 'my_assembly',
      main: `${outDir}/index.js`,
      types: `${outDir}/index.d.ts`,
      jsii: {
        ...DUMMY_JSII_CONFIG,
        tsc: {
          outDir,
          rootDir,
        },
      },
    },
  );
}

function bogusTranslatedSnippet() {
  return TranslatedSnippet.fromTypeScript(
    typeScriptSnippetFromVisibleSource('console.log("hello");', testSnippetLocation('x.ts'), true),
    true,
  );
}
