import * as fs from 'fs';
import * as path from 'path';

/**
 * A regular expression that matches a module declaration in a go.mod file. This
 * currently only captures the single-line form of the declaration (which is
 * used in this project).
 *
 * @see https://golang.org/ref/mod#go-mod-file-ident
 */
const submodulesRegex = /^\s*module\s+([a-z0-9._~/-]+)\s/i;

/**
 * Recursively searches the provided directory for `go.mod` files, and produces
 * a mapping of found module names (per the `module` directive found in the
 * `go.mod` files) to the local directory that contains the corresponding go
 * source code.
 *
 * @param dir the directory to be searched.
 */
export function localRuntimeModules(
  dir: string,
): { readonly [module: string]: string } {
  const result: Record<string, string> = {};

  for (const name of fs.readdirSync(dir)) {
    const fullPath = path.join(dir, name);

    // Recursively search in sub-directories
    if (fs.statSync(fullPath).isDirectory()) {
      for (const [module, localPath] of Object.entries(
        localRuntimeModules(fullPath),
      )) {
        result[module] = localPath;
      }
      continue;
    }

    // We only care about go.mod files
    if (name !== 'go.mod') {
      continue;
    }

    const content = fs.readFileSync(fullPath, 'utf8');
    const matches = submodulesRegex.exec(content);
    if (matches == null) {
      throw new Error(
        `Unable to determine module from go.mod file ${fullPath}`,
      );
    }
    result[matches[1]] = dir;
  }

  return result;
}
