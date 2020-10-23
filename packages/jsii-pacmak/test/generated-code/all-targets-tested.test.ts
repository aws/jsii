import { pathExists, readFile } from 'fs-extra';
import { join, relative, resolve } from 'path';

import { ALL_BUILDERS } from '../../lib/targets';

const packageRoot = resolve(__dirname, '..', '..');

describe('target is tested', () => {
  for (const targetName of Object.keys(ALL_BUILDERS)) {
    if (targetName === 'js') {
      // We don't test this one because it's just a tarball
      continue;
    }
    const testFileName = `target-${targetName}.test.ts`;
    const testFilePath = join(__dirname, testFileName);

    test(`${targetName} at ${relative(
      packageRoot,
      testFilePath,
    )}`, async () => {
      await expect(pathExists(join(testFilePath))).resolves.toBeTruthy();
      return expect(
        readFile(testFilePath, { encoding: 'utf-8' }).then((content) =>
          content.trim(),
        ),
      ).resolves.toMatch(
        new RegExp(
          [
            "import \\{ verifyGeneratedCodeFor \\} from '\\./harness';",
            '',
            `verifyGeneratedCodeFor\\('${targetName}'(?:, [0-9_]+)?\\);`,
          ].join('\\n'),
        ),
      );
    });
  }
});
