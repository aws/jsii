import * as path from 'node:path';

import { TranslatedSnippet, typeScriptSnippetFromVisibleSource, LanguageTablet, DEFAULT_TABLET_NAME } from '../../lib';
import { extractSnippets } from '../../lib/commands/extract';
import { trimCache } from '../../lib/commands/trim-cache';
import { TestJsiiModule, DUMMY_JSII_CONFIG, testSnippetLocation } from '../testutil';

const DUMMY_README = `
  Here is an example of how to use ClassA:

  \`\`\`ts
  import * as ass from 'my_assembly';
  const aClass = new ass.ClassA();
  aClass.someMethod();
  \`\`\`
`;

let assembly: TestJsiiModule;
beforeEach(() => {
  // Create an assembly in a temp directory
  assembly = TestJsiiModule.fromSource(
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

afterEach(() => assembly.cleanup());

test('trim-cache removes unused snippets', async () => {
  const cacheFile = path.join(assembly.moduleDirectory, 'dummy.tabl.json');

  // GIVEN
  const tbl = new LanguageTablet();
  tbl.addSnippet(bogusTranslatedSnippet());
  await tbl.save(cacheFile);

  // WHEN
  await trimCache({
    assemblyLocations: [assembly.moduleDirectory],
    cacheFile,
  });

  // THEN
  const updated = await LanguageTablet.fromFile(cacheFile);
  expect(updated.count).toEqual(0);
});

test('trim-cache leaves used snippets', async () => {
  const defaultTablet = path.join(assembly.moduleDirectory, DEFAULT_TABLET_NAME);

  // GIVEN
  await extractSnippets([assembly.moduleDirectory]);

  // WHEN
  await trimCache({
    assemblyLocations: [assembly.moduleDirectory],
    cacheFile: defaultTablet,
  });

  // THEN
  const updated = await LanguageTablet.fromFile(defaultTablet);
  expect(updated.count).toEqual(1);
});

function bogusTranslatedSnippet() {
  return TranslatedSnippet.fromTypeScript(
    typeScriptSnippetFromVisibleSource('console.log("hello");', testSnippetLocation('x.ts'), true),
    true,
  );
}
