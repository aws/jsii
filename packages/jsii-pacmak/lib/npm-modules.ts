import fs = require('fs-extra');
import path = require('path');
import spec = require('jsii-spec');
import { resolveDependencyDirectory } from './util';

import logging = require('../lib/logging');
import { JsiiModule } from './packaging';


/**
 * Find all modules that need to be packagerd
 *
 * If the input list is empty, include the current directory. The result
 * is NOT topologically sorted.
 */
export async function findJsiiModules(directories: string[], recurse: boolean) {
  const ret: JsiiModule[] = [];
  const visited = new Set<string>();
  for (const dir of directories.length > 0 ? directories : ['.']) {
    await visitPackage(dir, true);
  }
  return ret;

  async function visitPackage(dir: string, isRoot: boolean) {
    const realPath = await fs.realpath(dir);
    if (visited.has(realPath)) { return; } // Already visited
    visited.add(realPath);

    const pkg = await fs.readJson(path.join(realPath, 'package.json'));
    if (!pkg.jsii || !pkg.jsii.outdir || !pkg.jsii.targets) {
      if (isRoot) {
        throw new Error(`Invalid "jsii" section in ${realPath}. Expecting "outdir" and "targets"`);
      } else {
        return; // just move on, this is not a jsii package
      }
    }

    // if --recurse is set, find dependency dirs and build them.
    if (recurse) {
      for (const dep of Object.keys(pkg.dependencies || {})) {
        const depDir = resolveDependencyDirectory(realPath, dep);
        await visitPackage(depDir, false);
      }
    }

    // outdir is either by package.json/jsii.outdir (relative to package root) or via command line (relative to cwd)
    const outputDirectory = pkg.jsii.outdir && path.resolve(realPath, pkg.jsii.outdir);
    const targets = [...Object.keys(pkg.jsii.targets), 'js']; // "js" is an implicit target.

    ret.push(new JsiiModule({
      name: pkg.name,
      moduleDirectory: realPath,
      defaultOutputDirectory: outputDirectory,
      availableTargets: targets
    }));
  }

}

export async function updateAllNpmIgnores(packages: JsiiModule[]) {
  for (const pkg of packages) {
    // updates .npmignore to exclude the output directory and include the .jsii file
    await updateNpmIgnore(pkg.moduleDirectory, pkg.outputDirectory);
  }
}

async function updateNpmIgnore(packageDir: string, excludeOutdir: string | undefined) {
  const npmIgnorePath = path.join(packageDir, '.npmignore');
  let lines = new Array<string>();
  let modified = false;
  if (await fs.pathExists(npmIgnorePath)) {
    lines = (await fs.readFile(npmIgnorePath)).toString().split('\n');
  }

  // if this is a fresh .npmignore, we can be a bit more opinionated
  // otherwise, we add just add stuff that's critical
  if (lines.length === 0) {
    excludePattern('Exclude typescript source and config', '*.ts', 'tsconfig.json');
    includePattern('Include javascript files and typescript declarations', '*.js', '*.d.ts');
  }

  if (excludeOutdir) {
    excludePattern('Exclude jsii outdir', path.relative(packageDir, excludeOutdir));
  }

  includePattern('Include .jsii', spec.SPEC_FILE_NAME);

  if (modified) {
    await fs.writeFile(npmIgnorePath, `${lines.join('\n')}\n`);
    logging.info('Updated .npmignore');
  }

  function includePattern(comment: string, ...patterns: string[]) {
    excludePattern(comment, ...patterns.map(p => `!${p}`));
  }

  function excludePattern(comment: string, ...patterns: string[]) {
    let first = true;
    for (const pattern of patterns) {
      if (lines.includes(pattern)) {
        return; // already in .npmignore
      }

      modified = true;

      if (first) {
        lines.push('');
        lines.push(`# ${comment}`);
        first = false;
      }

      lines.push(pattern);
    }
  }
}