import * as path from 'path';

import { JsiiFault } from './errors';

/**
 * Resolves the path of the `script` entry declared in the `bin` field of a
 * package's `package.json`.
 *
 * @param packageDir the directory the package is installed in.
 * @param bin        the `bin` field of the package's `package.json`.
 * @param script     the name of the script to resolve.
 *
 * @throws JsiiFault if `script` is not declared in `bin`, or if it resolves to
 *         a path outside of `packageDir`.
 */
export function resolveBinScript(
  packageDir: string,
  bin: unknown,
  script: string,
): string {
  const scriptPath =
    typeof bin === 'object' &&
    bin != null &&
    Object.prototype.hasOwnProperty.call(bin, script)
      ? (bin as Record<string, unknown>)[script]
      : undefined;

  if (typeof scriptPath !== 'string' || scriptPath === '') {
    throw new JsiiFault(`Script with name ${script} was not defined.`);
  }

  const command = path.join(packageDir, scriptPath);

  const relative = path.relative(packageDir, command);
  if (
    relative === '' ||
    relative === '..' ||
    relative.startsWith(`..${path.sep}`) ||
    path.isAbsolute(relative)
  ) {
    throw new JsiiFault(
      `Script with name ${script} resolves outside of the package directory: ${JSON.stringify(scriptPath)}`,
    );
  }

  return command;
}
