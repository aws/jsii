import * as fs from 'fs-extra';
import * as path from 'path';

import { LanguageTablet } from '../../lib';
import { extractSnippets } from '../../lib/commands/extract';
import { infuse, DEFAULT_INFUSION_RESULTS_NAME } from '../../lib/commands/infuse';
import { loadAssemblies } from '../../lib/jsii/assemblies';
import { TestJsiiModule, DUMMY_JSII_CONFIG } from '../testutil';

const DUMMY_README = `
  Here is an example of how to use ClassA:

  \`\`\`ts
  import * as ass from 'my_assembly';
  const aClass = new ass.ClassA();
  aClass.someMethod();
  \`\`\`
`;

const TABLET_FILE = 'text.tabl.json';

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
    outputFile: path.join(assembly.moduleDirectory, TABLET_FILE),
    includeCompilerDiagnostics: false,
    validateAssemblies: false,
  });
});

afterEach(async () => assembly.cleanup());

test('examples are added in the assembly', async () => {
  await infuse([assembly.moduleDirectory], path.join(assembly.moduleDirectory, TABLET_FILE));

  const assemblies = await loadAssemblies([assembly.moduleDirectory], false);
  const types = assemblies[0].assembly.types;
  expect(types).toBeDefined();
  expect(types!['my_assembly.ClassA'].docs?.example).toBeDefined();
});

test('examples are added to the tablet under new keys', async () => {
  const originalTabletFile = path.join(assembly.moduleDirectory, TABLET_FILE);
  const updatedTabletFile = path.join(assembly.moduleDirectory, 'tablet2.tabl.json');

  await infuse([assembly.moduleDirectory], originalTabletFile, {
    tabletOutputFile: updatedTabletFile,
  });

  const original = await LanguageTablet.fromFile(originalTabletFile);
  const updated = await LanguageTablet.fromFile(updatedTabletFile);

  expect(updated.count).toEqual(original.count + 1);
});

test('can log to output file', async () => {
  await infuse([assembly.moduleDirectory], path.join(assembly.moduleDirectory, TABLET_FILE), {
    log: true,
    outputFile: path.join(assembly.moduleDirectory, DEFAULT_INFUSION_RESULTS_NAME),
  });

  // assert that the output file exists and there is some information in the file.
  const stats = await fs.stat(path.join(assembly.moduleDirectory, DEFAULT_INFUSION_RESULTS_NAME));

  expect(stats.isFile()).toBeTruthy();
  expect(stats.size).toBeGreaterThan(0);
});
