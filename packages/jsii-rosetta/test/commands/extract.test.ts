import * as path from 'path';

import { LanguageTablet, RosettaTranslator, RosettaTranslatorOptions } from '../../lib';
import * as extract from '../../lib/commands/extract';
import { loadAssemblies } from '../../lib/jsii/assemblies';
import { TARGET_LANGUAGES } from '../../lib/languages';
import { TestJsiiModule, DUMMY_JSII_CONFIG } from '../testutil';

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
  const outputFile = path.join(assembly.moduleDirectory, 'test.tabl.json');
  await extract.extractSnippets([assembly.moduleDirectory], {
    outputFile,
    ...defaultExtractOptions,
  });

  const tablet = new LanguageTablet();
  await tablet.load(outputFile);

  expect(tablet.snippetKeys.length).toEqual(1);
});

describe('with cache file', () => {
  let cacheTabletFile: string;
  beforeEach(async () => {
    cacheTabletFile = path.join(assembly.moduleDirectory, 'cache.tabl.json');
    await extract.extractSnippets([assembly.moduleDirectory], {
      outputFile: cacheTabletFile,
      ...defaultExtractOptions,
    });
  });

  describe('translation does not happen ', () => {
    test('if it can be read from cache', async () => {
      const translationFunction = jest.fn().mockResolvedValue({ diagnostics: [], translatedSnippets: [] });

      await extract.extractSnippets([assembly.moduleDirectory], {
        outputFile: path.join(assembly.moduleDirectory, 'dummy.tabl.json'),
        cacheTabletFile,
        translatorFactory: (o) => new MockTranslator(o, translationFunction),
        ...defaultExtractOptions,
      });

      expect(translationFunction).not.toHaveBeenCalled();
    });

    test('because output file acts as cache', async () => {
      const translationFunction = jest.fn().mockResolvedValue({ diagnostics: [], translatedSnippets: [] });

      await extract.extractSnippets([assembly.moduleDirectory], {
        outputFile: cacheTabletFile,
        translatorFactory: (o) => new MockTranslator(o, translationFunction),
        ...defaultExtractOptions,
      });

      expect(translationFunction).not.toHaveBeenCalled();
    });
  });

  test('translation does happen if translator version is different', async () => {
    const translationFunction = jest.fn().mockResolvedValue({ diagnostics: [], translatedSnippets: [] });

    const oldJavaVersion = TARGET_LANGUAGES.java.version;
    (TARGET_LANGUAGES.java as any).version = '999';
    try {
      await extract.extractSnippets([assembly.moduleDirectory], {
        outputFile: path.join(assembly.moduleDirectory, 'dummy.tabl.json'),
        cacheTabletFile,
        translatorFactory: (o) => new MockTranslator(o, translationFunction),
        ...defaultExtractOptions,
      });

      expect(translationFunction).toHaveBeenCalled();
    } finally {
      (TARGET_LANGUAGES.java as any).version = oldJavaVersion;
    }
  });

  test('existing tablet is updated when assembly changes', async () => {
    // Modify the assembly with a new example
    assembly.assembly.types!['my_assembly.ClassB'].docs = {
      example: 'ClassB.anotherMethod();',
    };
    await assembly.updateAssembly();

    const translationFunction = jest.fn().mockResolvedValue({ diagnostics: [], translatedSnippets: [] });

    await extract.extractSnippets([assembly.moduleDirectory], {
      outputFile: cacheTabletFile,
      translatorFactory: (o) => new MockTranslator(o, translationFunction),
      ...defaultExtractOptions,
    });

    // There are two examples, one should be cached and the other should be translated
    expect(translationFunction).toHaveBeenCalledTimes(1);
  });

  test('compiler diagnostics property is passed on', async () => {
    const translationFunction = jest.fn().mockResolvedValue({ diagnostics: [], translatedSnippets: [] });

    await extract.extractSnippets([assembly.moduleDirectory], {
      outputFile: path.join(assembly.moduleDirectory, 'dummy.tabl.json'),
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
    const outputFile = path.join(otherAssembly.moduleDirectory, 'test.tabl.json');
    await extract.extractSnippets([otherAssembly.moduleDirectory], {
      outputFile,
      ...defaultExtractOptions,
    });

    const tablet = await LanguageTablet.fromFile(outputFile);
    expect(tablet.count).toEqual(1);
    const tr = tablet.tryGetSnippet(tablet.snippetKeys[0]);
    expect(tr?.originalSource.source).toEqual('x');
  } finally {
    await otherAssembly.cleanup();
  }
});

test('extract and infuse in one command', async () => {
  const outputFile = path.join(assembly.moduleDirectory, 'test.tabl.json');
  await extract.extractAndInfuse([assembly.moduleDirectory], {
    outputFile,
    ...defaultExtractOptions,
  });

  const tablet = new LanguageTablet();
  await tablet.load(outputFile);

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
