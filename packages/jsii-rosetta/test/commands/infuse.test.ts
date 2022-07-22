import { loadAssemblyFromPath, SPEC_FILE_NAME, SPEC_FILE_NAME_COMPRESSED } from '@jsii/spec';
import * as fs from 'fs-extra';
import * as path from 'path';

import { LanguageTablet, DEFAULT_TABLET_NAME } from '../../lib';
import { extractSnippets } from '../../lib/commands/extract';
import { infuse, DEFAULT_INFUSION_RESULTS_NAME } from '../../lib/commands/infuse';
import { loadAssemblies } from '../../lib/jsii/assemblies';
import { TestJsiiModule, DUMMY_JSII_CONFIG } from '../testutil';

jest.setTimeout(30_000);

const DUMMY_README = `
  Here is an example of how to use ClassA:

  \`\`\`ts some=metadata
  import * as ass from 'my_assembly';
  const aClass = new ass.ClassA();
  aClass.someMethod();
  \`\`\`
`;

const TABLET_FILE = 'text.tabl.json';

let assembly: TestJsiiModule;
beforeEach(async () => {
  // Create an assembly in a temp directory
  assembly = TestJsiiModule.fromSource(
    {
      'index.ts': `
      export class ClassA {
        public someMethod() {
        }
      }
      export class ClassB {
        public argumentMethod(args: BeeArgs) {
          Array.isArray(args);
        }
      }
      export interface BeeArgs { readonly value: string; readonly nested?: NestedType; }
      export interface NestedType { readonly x: number; }
      `,
      'README.md': DUMMY_README,
    },
    {
      name: 'my_assembly',
      jsii: DUMMY_JSII_CONFIG,
    },
  );

  // Create a tabletFile in the same directory
  await extractSnippets([assembly.moduleDirectory], {
    cacheToFile: path.join(assembly.moduleDirectory, TABLET_FILE),
    includeCompilerDiagnostics: false,
    validateAssemblies: false,
  });
});

afterEach(() => assembly.cleanup());

test('examples are added in the assembly', async () => {
  await infuse([assembly.moduleDirectory]);

  const assemblies = loadAssemblies([assembly.moduleDirectory], false);
  const types = assemblies[0].assembly.types;
  expect(types).toBeDefined();
  expect(types!['my_assembly.ClassA'].docs?.example).toBeDefined();
});

test('infuse copies example metadata', async () => {
  await infuse([assembly.moduleDirectory]);

  // THEN: the metadata that used to be on the README snippet is also on the class example
  const updatedAssembly = loadAssemblyFromPath(assembly.moduleDirectory);

  const typeDocs = updatedAssembly.types?.['my_assembly.ClassA']?.docs;
  expect(typeDocs?.custom?.exampleMetadata).toEqual('some=metadata infused');
});

test('examples are added to the tablet under new keys', async () => {
  const originalTabletFile = path.join(assembly.moduleDirectory, TABLET_FILE);
  const updatedTabletFile = path.join(assembly.moduleDirectory, 'tablet2.tabl.json');
  const originalDefaultTablet = await LanguageTablet.fromFile(path.join(assembly.moduleDirectory, DEFAULT_TABLET_NAME));

  await infuse([assembly.moduleDirectory], {
    cacheFromFile: originalTabletFile,
    cacheToFile: updatedTabletFile,
  });

  const originalCache = await LanguageTablet.fromFile(originalTabletFile);
  const updatedCache = await LanguageTablet.fromFile(updatedTabletFile);
  const updatedDefaultTablet = await LanguageTablet.fromFile(path.join(assembly.moduleDirectory, DEFAULT_TABLET_NAME));

  expect(updatedDefaultTablet.count).toEqual(originalDefaultTablet.count + 1);
  expect(updatedCache.count).toEqual(originalCache.count);
  expect(updatedCache.snippetKeys).not.toEqual(originalCache.snippetKeys);
});

test('can log to output file', async () => {
  await infuse([assembly.moduleDirectory], {
    logFile: path.join(assembly.moduleDirectory, DEFAULT_INFUSION_RESULTS_NAME),
  });

  // assert that the output file exists and there is some information in the file.
  const stats = await fs.stat(path.join(assembly.moduleDirectory, DEFAULT_INFUSION_RESULTS_NAME));

  expect(stats.isFile()).toBeTruthy();
  expect(stats.size).toBeGreaterThan(0);
});

test('preserves the assembly compression if present', async () => {
  // Create an assembly in a temp directory
  const compAssembly = TestJsiiModule.fromSource(
    {
      'index.ts': `
      export class ClassA {
        public someMethod() {
        }
      }
      export class ClassB {
        public argumentMethod(args: BeeArgs) {
          Array.isArray(args);
        }
      }
      export interface BeeArgs { readonly value: string; readonly nested?: NestedType; }
      export interface NestedType { readonly x: number; }
      `,
      'README.md': DUMMY_README,
    },
    {
      name: 'my_assembly',
      jsii: DUMMY_JSII_CONFIG,
    },
    {
      compressAssembly: true,
    },
  );

  // Ensure assembly is compressed
  expect(fs.existsSync(path.join(compAssembly.moduleDirectory, SPEC_FILE_NAME_COMPRESSED))).toBeTruthy();

  // Create a tabletFile in the same directory
  await extractSnippets([compAssembly.moduleDirectory], {
    cacheToFile: path.join(compAssembly.moduleDirectory, TABLET_FILE),
    includeCompilerDiagnostics: false,
    validateAssemblies: false,
  });

  // Now infuse
  await infuse([compAssembly.moduleDirectory]);

  // Expect file at SPEC_FILE_NAME to still be a file redirect (not the actual assembly)
  expect(fs.readJSONSync(path.join(compAssembly.moduleDirectory, SPEC_FILE_NAME))).toEqual({
    schema: 'jsii/file-redirect',
    compression: 'gzip',
    filename: SPEC_FILE_NAME_COMPRESSED,
  });

  // Infuse works as expected
  const assemblies = loadAssemblies([compAssembly.moduleDirectory], false);
  const types = assemblies[0].assembly.types;
  expect(types).toBeDefined();
  expect(types!['my_assembly.ClassA'].docs?.example).toBeDefined();
});
