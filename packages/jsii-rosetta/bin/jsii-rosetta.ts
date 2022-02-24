import '@jsii/check-node/run';

import * as fs from 'fs-extra';
import * as path from 'path';
import * as yargs from 'yargs';

import { TranslateResult, translateTypeScript, RosettaDiagnostic } from '../lib';
import { translateMarkdown } from '../lib/commands/convert';
import { checkCoverage } from '../lib/commands/coverage';
import { extractAndInfuse, extractSnippets, ExtractOptions } from '../lib/commands/extract';
import { infuse, DEFAULT_INFUSION_RESULTS_NAME } from '../lib/commands/infuse';
import { readTablet } from '../lib/commands/read';
import { transliterateAssembly } from '../lib/commands/transliterate';
import { trimCache } from '../lib/commands/trim-cache';
import { TargetLanguage } from '../lib/languages';
import { PythonVisitor } from '../lib/languages/python';
import { VisualizeAstVisitor } from '../lib/languages/visualize';
import * as logging from '../lib/logging';
import { File, fmap, printDiagnostics } from '../lib/util';

function main() {
  const argv = yargs
    .usage('$0 <cmd> [args]')
    .option('verbose', {
      alias: 'v',
      type: 'boolean',
      desc: 'Increase logging verbosity',
      count: true,
      default: 0,
    })
    .command(
      'snippet FILE',
      'Translate a single snippet',
      (command) =>
        command
          .positional('FILE', {
            type: 'string',
            describe: 'The file to translate (leave out for stdin)',
          })
          .option('python', {
            alias: 'p',
            boolean: true,
            description: 'Translate snippets to Python',
          }),
      wrapHandler(async (args) => {
        const result = translateTypeScript(await makeFileSource(args.FILE ?? '-', 'stdin.ts'), makeVisitor(args));
        handleSingleResult(result);
      }),
    )
    .command(
      'markdown FILE',
      'Translate a MarkDown file',
      (command) =>
        command
          .positional('FILE', {
            type: 'string',
            describe: 'The file to translate (leave out for stdin)',
          })
          .option('python', {
            alias: 'p',
            boolean: true,
            description: 'Translate snippets to Python',
          }),
      wrapHandler(async (args) => {
        const result = translateMarkdown(await makeFileSource(args.FILE ?? '-', 'stdin.md'), makeVisitor(args));
        handleSingleResult(result);
      }),
    )
    .command(
      'infuse [ASSEMBLY..]',
      '(EXPERIMENTAL) mutates one or more assemblies by adding documentation examples to top-level types',
      (command) =>
        command
          .positional('ASSEMBLY', {
            type: 'string',
            string: true,
            default: new Array<string>(),
            describe: 'Assembly or directory to mutate',
          })
          .option('log-file', {
            alias: 'l',
            type: 'string',
            describe: 'Output file to store logging results. Ignored if -log is not true',
            default: DEFAULT_INFUSION_RESULTS_NAME,
          })
          .option('cache-from', {
            alias: 'C',
            type: 'string',
            // eslint-disable-next-line prettier/prettier
            describe:
              'Reuse translations from the given tablet file if the snippet and type definitions did not change',
            requiresArg: true,
            default: undefined,
          })
          .option('cache-to', {
            alias: 'o',
            type: 'string',
            describe: 'Append all translated snippets to the given tablet file',
            requiresArg: true,
            default: undefined,
          })
          .option('cache', {
            alias: 'k',
            type: 'string',
            describe: 'Alias for --cache-from and --cache-to together',
            requiresArg: true,
            default: undefined,
          })
          .conflicts('cache', 'cache-from')
          .conflicts('cache', 'cache-to'),
      wrapHandler(async (args) => {
        const absAssemblies = (args.ASSEMBLY.length > 0 ? args.ASSEMBLY : ['.']).map((x) => path.resolve(x));
        const absCacheFrom = fmap(args.cache ?? args['cache-from'], path.resolve);
        const absCacheTo = fmap(args.cache ?? args['cache-to'], path.resolve);
        const result = await infuse(absAssemblies, {
          logFile: args['log-file'],
          cacheToFile: absCacheTo,
          cacheFromFile: absCacheFrom,
        });

        let totalTypes = 0;
        let insertedExamples = 0;
        for (const [directory, map] of Object.entries(result.coverageResults)) {
          const commonName = directory.split('/').pop()!;
          const newCoverage = roundPercentage(map.typesWithInsertedExamples / map.types);
          process.stdout.write(
            `${commonName}: Added ${map.typesWithInsertedExamples} examples to ${map.types} types.\n`,
          );
          process.stdout.write(`${commonName}: New coverage: ${newCoverage}%.\n`);

          insertedExamples += map.typesWithInsertedExamples;
          totalTypes += map.types;
        }
        const newCoverage = roundPercentage(insertedExamples / totalTypes);
        process.stdout.write(`\n\nFinal Stats:\nNew coverage: ${newCoverage}%.\n`);
      }),
    )
    .command(
      ['extract [ASSEMBLY..]', '$0 [ASSEMBLY..]'],
      'Extract code snippets from one or more assemblies into language tablets',
      (command) =>
        command
          .positional('ASSEMBLY', {
            type: 'string',
            string: true,
            default: new Array<string>(),
            describe: 'Assembly or directory to extract from',
          })
          .option('output', {
            type: 'string',
            describe: 'Additional output file where to store translated samples (deprecated, alias for --cache-to)',
            requiresArg: true,
            default: undefined,
          })
          .option('compile', {
            alias: 'c',
            type: 'boolean',
            describe: 'Try compiling (on by default, use --no-compile to switch off)',
            default: true,
          })
          .option('directory', {
            alias: 'd',
            type: 'string',
            describe: 'Working directory (for require() etc)',
          })
          .option('include', {
            alias: 'i',
            type: 'array',
            describe: 'Extract only snippets with given ids',
            default: new Array<string>(),
          })
          .option('infuse', {
            type: 'boolean',
            describe: 'bundle this command with the infuse command',
            default: false,
          })
          .option('fail', {
            alias: 'f',
            type: 'boolean',
            describe: 'Fail if there are compilation errors',
            default: false,
          })
          .option('validate-assemblies', {
            type: 'boolean',
            describe: 'Whether to validate loaded assemblies or not (this can be slow)',
            default: false,
          })
          .option('cache-from', {
            alias: 'C',
            type: 'string',
            // eslint-disable-next-line prettier/prettier
            describe:
              'Reuse translations from the given tablet file if the snippet and type definitions did not change',
            requiresArg: true,
            default: undefined,
          })
          .option('cache-to', {
            alias: 'o',
            type: 'string',
            describe: 'Append all translated snippets to the given tablet file',
            requiresArg: true,
            default: undefined,
          })
          .conflicts('cache-to', 'output')
          .option('cache', {
            alias: 'k',
            type: 'string',
            describe: 'Alias for --cache-from and --cache-to together',
            requiresArg: true,
            default: undefined,
          })
          .conflicts('cache', 'cache-from')
          .conflicts('cache', 'cache-to')
          .option('trim-cache', {
            alias: 'T',
            type: 'boolean',
            describe: 'Remove translations that are not referenced by any of the assemblies anymore from the cache',
          })
          .option('strict', {
            alias: 'S',
            type: 'boolean',
            describe:
              'Require all code samples compile, and fail if one does not. Strict mode always enables --compile and --fail',
            default: false,
          })
          .options('loose', {
            alias: 'l',
            describe: 'Ignore missing fixtures and literate markdown files instead of failing',
            type: 'boolean',
          })
          .conflicts('loose', 'strict')
          .conflicts('loose', 'fail'),
      wrapHandler(async (args) => {
        // `--strict` is short for `--compile --fail`, and we'll override those even if they're set to `false`, such as
        // using `--no-(compile|fail)`, because yargs does not quite give us a better option that does not hurt CX.
        if (args.strict) {
          args.compile = args.c = true;
          args.fail = args.f = true;
        }

        const absAssemblies = (args.ASSEMBLY.length > 0 ? args.ASSEMBLY : ['.']).map((x) => path.resolve(x));

        const absCacheFrom = fmap(args.cache ?? args['cache-from'], path.resolve);
        const absCacheTo = fmap(args.cache ?? args['cache-to'] ?? args.output, path.resolve);

        const extractOptions: ExtractOptions = {
          compilationDirectory: args.directory,
          includeCompilerDiagnostics: !!args.compile,
          validateAssemblies: args['validate-assemblies'],
          only: args.include,
          cacheFromFile: absCacheFrom,
          cacheToFile: absCacheTo,
          trimCache: args['trim-cache'],
          loose: args.loose,
        };

        const result = args.infuse
          ? await extractAndInfuse(absAssemblies, extractOptions)
          : await extractSnippets(absAssemblies, extractOptions);

        handleDiagnostics(result.diagnostics, args.fail, result.tablet.count);
      }),
    )
    .command(
      'transliterate [ASSEMBLY..]',
      '(EXPERIMENTAL) Transliterates the designated assemblies',
      (command) =>
        command
          .positional('ASSEMBLY', {
            type: 'string',
            string: true,
            default: new Array<string>(),
            required: true,
            describe: 'Assembly to transliterate',
          })
          .option('language', {
            alias: 'l',
            type: 'string',
            string: true,
            default: new Array<string>(),
            describe: 'Language ID to transliterate to',
          })
          .options('strict', {
            alias: 's',
            conflicts: 'loose',
            describe:
              'Fail if an example that needs live transliteration fails to compile (which could cause incorrect transpilation results)',
            type: 'boolean',
          })
          .options('loose', {
            alias: 'l',
            conflicts: 'strict',
            describe: 'Ignore missing fixtures and literate markdown files instead of failing',
            type: 'boolean',
          })
          .option('tablet', {
            alias: 't',
            type: 'string',
            describe:
              'Language tablet containing pre-translated code examples to use (these are generated by the `extract` command)',
          }),
      wrapHandler((args) => {
        const assemblies = (args.ASSEMBLY.length > 0 ? args.ASSEMBLY : ['.']).map((dir) =>
          path.resolve(process.cwd(), dir),
        );
        const languages =
          args.language.length > 0
            ? args.language.map((lang) => {
                const target = Object.entries(TargetLanguage).find(([k]) => k === lang)?.[1];
                if (target == null) {
                  throw new Error(
                    `Unknown target language: ${lang}. Expected one of ${Object.keys(TargetLanguage).join(', ')}`,
                  );
                }
                return target;
              })
            : Object.values(TargetLanguage);
        return transliterateAssembly(assemblies, languages, args);
      }),
    )
    .command(
      'trim-cache <TABLET> [ASSEMBLY..]',
      'Retain only those snippets in the cache which occur in one of the given assemblies',
      (command) =>
        command
          .positional('TABLET', {
            type: 'string',
            required: true,
            describe: 'Language tablet to trim',
          })
          .positional('ASSEMBLY', {
            type: 'string',
            string: true,
            default: new Array<string>(),
            describe: 'Assembly or directory to search',
          })
          .demandOption('TABLET'),
      wrapHandler(async (args) => {
        await trimCache({
          cacheFile: args.TABLET,
          assemblyLocations: args.ASSEMBLY,
        });
      }),
    )
    .command(
      'coverage [ASSEMBLY..]',
      'Check the translation coverage of implicit tablets for the given assemblies',
      (command) =>
        command.positional('ASSEMBLY', {
          type: 'string',
          string: true,
          default: ['.'],
          describe: 'Assembly or directory to search',
        }),
      wrapHandler(async (args) => {
        const absAssemblies = (args.ASSEMBLY.length > 0 ? args.ASSEMBLY : ['.']).map((x) => path.resolve(x));
        await checkCoverage(absAssemblies);
      }),
    )
    .command(
      'read <TABLET> [KEY] [LANGUAGE]',
      'Display snippets in a language tablet file',
      (command) =>
        command
          .positional('TABLET', {
            type: 'string',
            required: true,
            describe: 'Language tablet to read',
          })
          .positional('KEY', {
            type: 'string',
            describe: 'Snippet key to read',
          })
          .positional('LANGUAGE', {
            type: 'string',
            describe: 'Language ID to read',
          })
          .demandOption('TABLET'),
      wrapHandler(async (args) => {
        await readTablet(args.TABLET, args.KEY, args.LANGUAGE);
      }),
    )
    .command(
      'configure-strict [PACKAGE]',
      "Enables strict mode for a package's assembly",
      (command) =>
        command.positional('PACKAGE', {
          type: 'string',
          describe: 'The path to the package to configure',
          required: false,
          default: '.',
          normalize: true,
        }),
      wrapHandler(async (args) => {
        const packageJsonPath = (await fs.stat(args.PACKAGE)).isDirectory()
          ? path.join(args.PACKAGE, 'package.json')
          : args.PACKAGE;
        const packageJson = await fs.readJson(packageJsonPath);
        if (packageJson.jsii == null) {
          console.error(
            `The package in ${args.PACKAGE} does not have a jsii configuration! You can set it up using jsii-config.`,
          );
          process.exitCode = 1;
          return Promise.resolve();
        }
        if (packageJson.jsii.metadata?.jsii?.rosetta?.strict) {
          // Nothing to do - it's already configured, so we assert idempotent success!
          return Promise.resolve();
        }
        const md = (packageJson.jsii.metadata = packageJson.jsii.metadata ?? {});
        const mdJsii = (md.jsii = md.jsii ?? {});
        const mdRosetta = (mdJsii.rosetta = mdJsii.rosetta ?? {});
        mdRosetta.strict = true;

        return fs.writeJson(packageJsonPath, packageJson, { spaces: 2 });
      }),
    )
    .demandCommand()
    .help()
    .strict() // Error on wrong command
    // eslint-disable-next-line @typescript-eslint/no-require-imports,@typescript-eslint/no-var-requires
    .version(require('../package.json').version)
    .showHelpOnFail(false).argv;

  // Evaluating .argv triggers the parsing but the command gets implicitly executed,
  // so we don't need the output.
  Array.isArray(argv);
}

/**
 * Wrap a command's handler with standard pre- and post-work
 */
function wrapHandler<A extends { verbose?: number }, R>(handler: (x: A) => Promise<R>) {
  return (argv: A) => {
    logging.configure({ level: argv.verbose !== undefined ? argv.verbose : 0 });
    handler(argv).catch((e) => {
      logging.error(e.message);
      logging.error(e.stack);
      process.exitCode = 1;
    });
  };
}

function makeVisitor(args: { python?: boolean }) {
  if (args.python) {
    return new PythonVisitor();
  }
  // Default to visualizing AST, including nodes we don't recognize yet
  return new VisualizeAstVisitor();
}

async function makeFileSource(fileName: string, stdinName: string): Promise<File> {
  if (fileName === '-') {
    return {
      contents: await readStdin(),
      fileName: stdinName,
    };
  }
  return {
    contents: await fs.readFile(fileName, { encoding: 'utf-8' }),
    fileName: fileName,
  };
}

async function readStdin(): Promise<string> {
  process.stdin.setEncoding('utf8');

  const parts: Buffer[] = [];

  return new Promise((resolve, reject) => {
    process.stdin.on('readable', () => {
      const chunk = process.stdin.read();
      if (chunk !== null) {
        parts.push(Buffer.from(chunk));
      }
    });

    process.stdin.on('error', reject);
    process.stdin.on('end', () => resolve(Buffer.concat(parts).toString('utf-8')));
  });
}

function handleSingleResult(result: TranslateResult) {
  process.stdout.write(`${result.translation}\n`);

  // For a single result, we always request implicit failure.
  handleDiagnostics(result.diagnostics, 'implicit');
}

/**
 * Print diagnostics and set exit code
 *
 * 'fail' is whether or not the user passed '--fail' for commands that accept
 * it, or 'implicit' for commands that should always fail. 'implicit' will be
 * treated as 'fail=true, but will not print to the user that the '--fail' is
 * set (because for this particular command that switch does not exist and so it
 * would be confusing).
 */
function handleDiagnostics(diagnostics: readonly RosettaDiagnostic[], fail: boolean | 'implicit', snippetCount = 1) {
  if (fail !== false) {
    // Fail on any diagnostic
    if (diagnostics.length > 0) {
      printDiagnostics(diagnostics, process.stderr);
      logging.error(
        [
          `${diagnostics.length} diagnostics encountered in ${snippetCount} snippets`,
          ...(fail === true ? ["(running with '--fail')"] : []),
        ].join(' '),
      );
      process.exitCode = 1;
    }

    return;
  }

  // Otherwise fail only on strict diagnostics. If we have strict diagnostics, print only those
  // (so it's very clear what is failing the build), otherwise print everything.
  const strictDiagnostics = diagnostics.filter((diag) => diag.isFromStrictAssembly);
  if (strictDiagnostics.length > 0) {
    printDiagnostics(strictDiagnostics, process.stderr);
    const remaining = diagnostics.length - strictDiagnostics.length;
    logging.warn(
      [
        `${strictDiagnostics.length} diagnostics from assemblies with 'strict' mode on`,
        ...(remaining > 0 ? [`(and ${remaining} more non-strict diagnostics)`] : []),
      ].join(' '),
    );
    process.exitCode = 1;
    return;
  }

  if (diagnostics.length > 0) {
    printDiagnostics(diagnostics, process.stderr);
    logging.warn(`${diagnostics.length} diagnostics encountered in ${snippetCount} snippets`);
  }
}

/**
 * Rounds a decimal number to two decimal points.
 * The function is useful for fractions that need to be outputted as percentages.
 */
function roundPercentage(num: number): number {
  return Math.round(10000 * num) / 100;
}

main();
