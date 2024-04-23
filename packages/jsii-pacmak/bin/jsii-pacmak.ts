#!/usr/bin/env node
import '@jsii/check-node/run';

import { UnknownSnippetMode } from 'jsii-rosetta';
import * as yargs from 'yargs';

import { pacmak, configureLogging, TargetName } from '../lib';
import { debug } from '../lib/logging';
import { DEFAULT_PACK_COMMAND } from '../lib/packaging';
import { VERSION_DESC } from '../lib/version';

(async function main() {
  const argv = await yargs
    .env('JSII_PACMAK')
    .command(
      ['$0  [PROJECTS...]', 'generate [PROJECTS...]'],
      'Generates jsii bindings for the selected project(s)',
      (argv) =>
        argv.positional('PROJECTS', {
          type: 'string',
          array: true,
          desc: 'Project(s) to generate',
          normalize: true,
          default: ['.'],
        }),
    )
    .option('targets', {
      alias: ['target', 't'],
      type: 'string',
      array: true,
      desc: 'target languages for which to generate bindings',
      defaultDescription:
        'all targets defined in `package.json` will be generated',
      coerce: (value: string | string[]) =>
        (typeof value === 'string'
          ? value.split(',')
          : value.flatMap((item) => item.split(','))
        ).map((choice) => {
          if (Object.values(TargetName).includes(choice as any)) {
            return choice as TargetName;
          }
          throw new Error(
            `Invalid target name: ${choice} (valid values are: ${Object.values(
              TargetName,
            ).join(', ')})`,
          );
        }),
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
    .option('runtime-type-checking', {
      type: 'boolean',
      desc: [
        'generate runtime type checking code where compile-time type checking is not possible.',
        'Disabling this will generate less code, but will produce less helpful error messages when',
        'developers pass invalid values to the generated bindings.',
      ].join(' '),
      default: true,
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
      desc: "Translate code samples on-the-fly if they can't be found in the samples tablet (deprecated)",
      default: undefined,
    })
    .option('rosetta-unknown-snippets', {
      type: 'string',
      requiresArg: true,
      optional: true,
      choices: [
        UnknownSnippetMode.VERBATIM,
        UnknownSnippetMode.TRANSLATE,
        UnknownSnippetMode.FAIL,
      ],
      desc: "What to do with code samples if they can't be found in the samples tablet",
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
    .option('maven-local-repository', {
      type: 'string',
      desc: 'Configure a custom path (relative to current working directory) to a repository when packaging a Java package.',
      defaultDescription: 'A temporary directory is used.',
      default: undefined,
      hidden: true,
    })
    .option('pack-command', {
      type: 'string',
      desc: 'Configure a custom command to create package tarballs. Command must output the name of the tarball.',
      default: DEFAULT_PACK_COMMAND,
      hidden: true,
    })
    .option('validate-assemblies', {
      type: 'boolean',
      desc: 'Whether jsii assemblies should be validated. This can be expensive and is skipped by default.',
      default: false,
    })
    .version(VERSION_DESC).argv;

  configureLogging({ level: argv.verbose ?? 0 });

  // Default to 4 threads in case of concurrency, good enough for most situations
  debug('command line arguments:', argv);

  if (
    argv['rosetta-translate-live'] !== undefined &&
    argv['rosetta-unknown-snippets'] !== undefined
  ) {
    throw new Error(
      'Prefer using --rosetta-unknown-snippets over --rosetta-translate-live',
    );
  }

  const rosettaUnknownSnippets =
    argv['rosetta-unknown-snippets'] ??
    (argv['rosetta-translate-live']
      ? UnknownSnippetMode.TRANSLATE
      : UnknownSnippetMode.VERBATIM);

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
    rosettaUnknownSnippets,
    rosettaTablet: argv['rosetta-tablet'],
    runtimeTypeChecking: argv['runtime-type-checking'],
    targets: argv.targets?.map((target) => target),
    updateNpmIgnoreFiles: argv.npmignore,
    validateAssemblies: argv['validate-assemblies'],
  });
})().catch((err) => {
  process.stderr.write(`${err.stack}\n`);
  process.exit(1);
});
