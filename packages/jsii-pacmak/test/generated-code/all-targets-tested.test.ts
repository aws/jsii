import { pathExists, readFile } from 'fs-extra';
import { join, relative, resolve } from 'path';

import { TargetName } from '../../lib/targets';

const packageRoot = resolve(__dirname, '..', '..');

describe('target is tested', () => {
  for (const [key, targetName] of Object.entries(TargetName)) {
    if (targetName === TargetName.JAVASCRIPT) {
      // We don't test this one because it's just a tarball
      continue;
    }
    const testFileName = `target-${targetName}.test.ts`;
    const testFilePath = join(__dirname, testFileName);

    test(`TargetName.${key} at ${relative(
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
            "import \\{ TargetName \\} from '\\.\\./\\.\\./lib/targets';",
            '',
            `verifyGeneratedCodeFor\\(TargetName.${key}(?:, [0-9_]+)?\\);`,
          ].join('\\n'),
        ),
      );
    });
  }
});
