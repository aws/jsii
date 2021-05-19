#!/usr/bin/env node
import * as yargs from 'yargs';

import { pacmak, configureLogging, TargetName } from '../lib';
import { debug } from '../lib/logging';
import { VERSION_DESC } from '../lib/version';

(async function main() {
  const argv = yargs
    .env('JSII_PACMAK')
    .command(
      ['$0  [PROJECTS...]', 'generate [PROJECTS...]'],
      'Generates jsii bindings for the selected project(s)',
      (argv) =>
        argv.positional('PROJECTS', {
          type: 'string',
          desc: 'Project(s) to generate',
          normalize: true,
          default: ['.'],
        }),
    )
    .option('targets', {
      alias: ['target', 't'],
      type: 'array',
      desc: 'target languages for which to generate bindings',
      defaultDescription:
        'all targets defined in `package.json` will be generated',
      choices: Object.values(TargetName),
      required: false,
    })
    .option('outdir', {
      alias: 'o',
      type: 'string',
      desc: 'directory where artifacts will be generated',
      defaultDescription: 'based on `jsii.output` in `package.json`',
      required: false,
    })
    .option('code-only', {
      alias: 'c',
      type: 'boolean',
      desc: 'generate code only (instead of building and packaging)',
      default: false,
    })
    .option('fingerprint', {
      type: 'boolean',
      desc: 'attach a fingerprint to the generated artifacts, and skip generation if outdir contains artifacts that have a matching fingerprint',
      default: true,
    })
    .option('force', {
      alias: 'f',
      type: 'boolean',
      desc: 'force generation of new artifacts, even if the fingerprints match',
      default: false,
    })
    .option('force-subdirectory', {
      type: 'boolean',
      desc: 'force generation into a target-named subdirectory, even in single-target mode',
      default: true,
    })
    .option('force-target', {
      type: 'boolean',
      desc: 'force generation of the given targets, even if the source package.json doesnt declare it',
      default: false,
    })
    .option('recurse', {
      alias: 'R',
      type: 'boolean',
      desc: 'recursively generate and build all dependencies into `outdir`',
      default: false,
    })
    .option('verbose', {
      alias: 'v',
      type: 'boolean',
      desc: 'emit verbose build output',
      count: true,
      default: 0,
    })
    .option('clean', {
      type: 'boolean',
      desc: 'clean up temporary files upon success (use --no-clean to disable)',
      default: true,
    })
    .option('npmignore', {
      type: 'boolean',
      desc: 'Auto-update .npmignore to exclude the output directory and include the .jsii file',
      default: true,
    })
    .option('rosetta-tablet', {
      type: 'string',
      desc: "Location of a jsii-rosetta tablet with sample translations (created using 'jsii-rosetta extract')",
    })
    .option('rosetta-translate-live', {
      type: 'boolean',
      desc: "Translate code samples on-the-fly if they can't be found in the samples tablet",
      default: true,
    })
    .option('parallel', {
      type: 'boolean',
      desc: 'Generate all configured targets in parallel (disabling this might help if you encounter EMFILE errors)',
      default: true,
    })
    .option('dotnet-nuget-global-packages-folder', {
      type: 'string',
      desc: 'Configure a different NuGet package cache for NuGet',
      default: undefined,
      // This is a hidden option, folks need not bother it unless they're very advanced
      hidden: true,
      // This is expected to be a path, which should be normalized
      normalize: true,
    })
    .version(VERSION_DESC)
    .strict().argv;

  configureLogging({ level: argv.verbose !== undefined ? argv.verbose : 0 });

  // Default to 4 threads in case of concurrency, good enough for most situations
  debug('command line arguments:', argv);

  return pacmak({
    argv,
    clean: argv.clean,
    codeOnly: argv['code-only'],
    fingerprint: argv.fingerprint,
    force: argv.force,
    forceSubdirectory: argv['force-subdirectory'],
    forceTarget: argv['force-target'],
    inputDirectories: argv.PROJECTS,
    outputDirectory: argv.outdir,
    parallel: argv.parallel,
    recurse: argv.recurse,
    rosettaLiveConversion: argv['rosetta-translate-live'],
    rosettaTablet: argv['rosetta-tablet'],
    targets: argv.targets?.map((target) => target as TargetName),
    updateNpmIgnoreFiles: argv.npmignore,
  });
})().catch((err) => {
  process.stderr.write(`${err.stack}\n`);
  process.exit(1);
});
