import * as crypto from 'crypto';
import * as fs from 'fs-extra';
import * as path from 'path';

import { Assembly } from './assembly';

// eslint-disable-next-line @typescript-eslint/no-var-requires, @typescript-eslint/no-require-imports
const sortJson = require('sort-json');

/**
 * Options for replacing the assembly
 */
interface ReplaceAssemblyOptions {
  /**
   * The assembly file extension that you want to overwrite.
   */
  readonly fileExtension: string;

  /**
   * The directory where the assembly is located.
   */
  readonly directory: string;
}

/**
 * Replaces the file where the original assembly file *should* be found with a new assembly file.
 * Recalculates the fingerprint of the assembly to avoid tampering detection.
 */
export async function replaceAssembly(
  assembly: Assembly,
  options: ReplaceAssemblyOptions,
): Promise<void> {
  const fileName = path.join(options.directory, options.fileExtension);
  await fs.writeJson(fileName, _fingerprint(assembly), {
    encoding: 'utf8',
    spaces: 2,
  });
}

function _fingerprint(assembly: Assembly): Assembly {
  delete (assembly as any).fingerprint;
  assembly = sortJson(assembly);
  const fingerprint = crypto
    .createHash('sha256')
    .update(JSON.stringify(assembly))
    .digest('base64');
  return { ...assembly, fingerprint };
}
