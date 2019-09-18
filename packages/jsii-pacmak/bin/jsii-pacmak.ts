#!/usr/bin/env node
import fs = require('fs-extra');
import reflect = require('jsii-reflect');
import spec = require('jsii-spec');
import os = require('os');
import path = require('path');
import process = require('process');
import yargs = require('yargs');
import logging = require('../lib/logging');
import { Target } from '../lib/target';
import { Timers } from '../lib/timer';
import { resolveDependencyDirectory, shell } from '../lib/util';
import { VERSION_DESC } from '../lib/version';

(async function main() {
  const targetConstructors = await Target.findAll();
  const argv = yargs
    .usage('Usage: jsii-pacmak [-t target,...] [-o outdir] [package-dir]')
    .env('JSII_PACMAK')
    .option('targets', {
      alias: ['target', 't'],
      type: 'array',
      desc: 'target languages for which to generate bindings',
      defaultDescription: 'all targets defined in `package.json` will be generated',
      choices: Object.keys(targetConstructors),
      required: false
    })
    .option('outdir', {
      alias: 'o',
      type: 'string',
      desc: 'directory where artifacts will be generated',
      defaultDescription: 'based on `jsii.output` in `package.json`',
      required: false
    })
    .option('code-only', {
      alias: 'c',
      type: 'boolean',
      desc: 'generate code only (instead of building and packaging)',
      default: false
    })
    .option('fingerprint', {
      type: 'boolean',
      desc: 'attach a fingerprint to the generated artifacts, and skip generation if outdir contains artifacts that have a matching fingerprint',
      default: true
    })
    .option('force', {
      alias: 'f',
      type: 'boolean',
      desc: 'force generation of new artifacts, even if the fingerprints match',
      default: false
    })
    .option('force-subdirectory', {
      type: 'boolean',
      desc: 'force generation into a target-named subdirectory, even in single-target mode',
      default: true,
    })
    .option('recurse', {
      alias: 'R',
      type: 'boolean',
      desc: 'recursively generate and build all dependencies into `outdir`',
      default: false
    })
    .option('verbose', {
      alias: 'v',
      type: 'boolean',
      desc: 'emit verbose build output',
      count: true,
      default: 0
    })
    .option('clean', {
      type: 'boolean',
      desc: 'clean up temporary files upon success (use --no-clean to disable)',
      default: true,
    })
    .option('npmignore', {
      type: 'boolean',
      desc: 'Auto-update .npmignore to exclude the output directory and include the .jsii file',
      default: true
    })
    .version(VERSION_DESC)
    .argv;

  logging.level = argv.verbose !== undefined ? argv.verbose : 0;

  logging.debug('command line arguments:', argv);

  const rootDir = path.resolve(process.cwd(), argv._[0] || '.');

  const visited = new Set<string>();
  await buildPackage(rootDir, true /* isRoot */, argv['force-subdirectory']);

  async function buildPackage(packageDir: string, isRoot: boolean, forceSubdirectory: boolean) {
    if (visited.has(packageDir)) {
      return; // already built
    }

    visited.add(packageDir);

    // read package.json and extract the "jsii" configuration from it.
    const pkg = await fs.readJson(path.join(packageDir, 'package.json'));
    if (!pkg.jsii || !pkg.jsii.outdir || !pkg.jsii.targets) {
      if (isRoot) {
        throw new Error(`Invalid "jsii" section in ${packageDir}. Expecting "outdir" and "targets"`);
      } else {
        return; // just move on, this is not a jsii package
      }
    }

    // if --recurse is set, find dependency dirs and build them.
    if (argv.recurse) {
      for (const dep of Object.keys(pkg.dependencies || {})) {
        const depDir = resolveDependencyDirectory(packageDir, dep);
        /* eslint-disable no-await-in-loop */
        await buildPackage(depDir, /* isRoot */ false, forceSubdirectory);
        /* eslint-enable no-await-in-loop */
      }
    }

    // outdir is either by package.json/jsii.outdir (relative to package root) or via command line (relative to cwd)
    const outDir = argv.outdir !== undefined ? path.resolve(process.cwd(), argv.outdir) : path.resolve(packageDir, pkg.jsii.outdir);
    const targets = argv.targets || [...Object.keys(pkg.jsii.targets), 'js']; // "js" is an implicit target.

    logging.info(`Building ${pkg.name} (${targets.join(',')}) into ${path.relative(process.cwd(), outDir)}`);

    if (argv.npmignore) {
      // if outdir is coming from package.json, verify it is excluded by .npmignore. if it is explicitly
      // defined via --out, don't perform this verification.
      const npmIgnoreExclude = argv.outdir ? undefined : outDir;

      // updates .npmignore to exclude the output directory and include the .jsii file
      await updateNpmIgnore(packageDir, npmIgnoreExclude);
    }

    const timers = new Timers();

    const tmpdir = await fs.mkdtemp(path.join(os.tmpdir(), 'npm-pack'));
    try {
      const tarball = await timers.recordAsync('npm pack', () => {
        return npmPack(packageDir, tmpdir);
      });

      const ts = new reflect.TypeSystem();
      const assembly = await ts.loadModule(packageDir);

      await Promise.all(targets.map(targetName => {
        // if we are targeting a single language, output to outdir, otherwise outdir/<target>
        const targetOutputDir = targets.length > 1 || forceSubdirectory
          ? path.join(outDir, targetName.toString())
          : outDir;
        logging.debug(`Building ${pkg.name}/${targetName}: ${targetOutputDir}`);

        return timers.recordAsync(targetName.toString(), () =>
          generateTarget(assembly, packageDir, targetName.toString(), targetOutputDir, tarball)
        );
      }));
    } finally {
      if (argv.clean) {
        logging.debug(`Removing ${tmpdir}`);
      } else {
        logging.debug(`Temporary directory retained (--no-clean): ${tmpdir}`);
      }
      await fs.remove(tmpdir);
    }

    logging.info(`Packaged. ${timers.display()}`);
  }

  async function generateTarget(assembly: reflect.Assembly, packageDir: string, targetName: string, targetOutputDir: string, tarball: string) {
    // ``argv.target`` is guaranteed valid by ``yargs`` through the ``choices`` directive.
    const targetConstructor = targetConstructors[targetName];
    if (!targetConstructor) {
      throw new Error(`Unsupported target: "${targetName}"`);
    }

    const target = new targetConstructor({
      targetName,
      packageDir,
      assembly,
      fingerprint: argv.fingerprint,
      force: argv.force,
      arguments: argv
    });

    const codeDir = argv.codeOnly ? targetOutputDir : await fs.mkdtemp(path.join(os.tmpdir(), 'jsii-pacmak-code'));

    logging.debug(`Generating ${targetName} code into ${codeDir}`);

    await target.generateCode(codeDir, tarball);

    if (argv.codeOnly) { return; }

    logging.debug(`Building into ${targetOutputDir}`);
    await target.build(codeDir, targetOutputDir);

    if (argv.clean) {
      await fs.remove(codeDir);
    } else {
      logging.info(`Generated code for ${targetName} retained at: ${codeDir}`);
    }
  }

})().catch(err => {
  process.stderr.write(`${err.stack}\n`);
  process.exit(1);
});

async function npmPack(packageDir: string, tmpdir: string): Promise<string> {
  logging.debug(`Running "npm pack ${packageDir}" in ${tmpdir}`);
  const args = ['pack', packageDir];
  if (logging.level >= logging.LEVEL_VERBOSE) {
    args.push('--loglevel=verbose');
  }
  const out = await shell('npm', args, { cwd: tmpdir });
  // Take only the last line of npm pack which should contain the
  // tarball name. otherwise, there can be a lot of extra noise there
  // from scripts that emit to STDOUT.
  const lines = out.trim().split(os.EOL);
  return path.resolve(tmpdir, lines[lines.length - 1].trim());
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
