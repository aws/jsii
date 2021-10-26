import * as fs from 'fs-extra';
import * as path from 'path';

import { extractSnippets } from '../../lib/commands/extract';
import { infuse, DEFAULT_INFUSION_RESULTS_NAME } from '../../lib/commands/infuse';
import { loadAssemblies } from '../../lib/jsii/assemblies';
import { AssemblyFixture, DUMMY_ASSEMBLY_TARGETS } from '../testutil';

const DUMMY_README = `
  Here is an example of how to use ClassA:

  \`\`\`ts
  import * as ass from 'my_assembly';
  const aClass = new ass.ClassA();
  aClass.someMethod();
  \`\`\`
`;

const TABLET_FILE = 'text.tabl.json';

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
      jsii: DUMMY_ASSEMBLY_TARGETS,
    },
  );

  // Create a tabletFile in the same directory
  await extractSnippets([assembly.directory], {
    outputFile: path.join(assembly.directory, TABLET_FILE),
    includeCompilerDiagnostics: false,
    validateAssemblies: false,
  });
});

afterAll(async () => assembly.cleanup());

test('examples are added in the assembly', async () => {
  await infuse([assembly.directory], path.join(assembly.directory, TABLET_FILE));

  const assemblies = await loadAssemblies([assembly.directory], false);
  const types = assemblies[0].assembly.types;
  expect(types).toBeDefined();
  expect(types!['my_assembly.ClassA'].docs?.example).toBeDefined();
});

test('can log to output file', async () => {
  await infuse([assembly.directory], path.join(assembly.directory, TABLET_FILE), {
    log: true,
    outputFile: path.join(assembly.directory, DEFAULT_INFUSION_RESULTS_NAME),
  });

  // assert that the output file exists and there is some information in the file.
  fs.stat(path.join(assembly.directory, DEFAULT_INFUSION_RESULTS_NAME), (_err, stats) => {
    expect(stats.isFile()).toBeTruthy();
    expect(stats.size).toBeGreaterThan(0);
  });
});
