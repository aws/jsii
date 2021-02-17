import * as fs from 'fs';
import * as path from 'path';

export const runtimePath = path.resolve(__dirname, '..', 'jsii-runtime-go');

/**
 * A map representing all go modules locally available from this package. This
 * includes one entry per submodule of the jsii runtime for go.
 */
export const runtimeModules = localRuntimeModules(runtimePath);

/**
 * A regular expression that matches a module declaration in a go.mod file. This
 * currently only captures the single-line form of the declaration (which is
 * used in this project).
 *
 * @see https://golang.org/ref/mod#go-mod-file-ident
 */
const submodulesRegex = /^\s*module\s+([a-z0-9._~/-]+)\s/i;

function localRuntimeModules(
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
