import * as fs from 'fs-extra';
import * as path from 'path';
import * as yargs from 'yargs';

import {
  TranslateResult,
  DEFAULT_TABLET_NAME,
  translateTypeScript,
} from '../lib';
import { translateMarkdown } from '../lib/commands/convert';
import { extractSnippets } from '../lib/commands/extract';
import { readTablet } from '../lib/commands/read';
import { PythonVisitor } from '../lib/languages/python';
import { VisualizeAstVisitor } from '../lib/languages/visualize';
import * as logging from '../lib/logging';
import { File, printDiagnostics, isErrorDiagnostic } from '../lib/util';

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
          .positional('file', {
            type: 'string',
            describe: 'The file to translate (leave out for stdin)',
          })
          .option('python', {
            alias: 'p',
            boolean: true,
            description: 'Translate snippets to Python',
          }),
      wrapHandler(async (args) => {
        const result = translateTypeScript(
          await makeFileSource(args.file ?? '-', 'stdin.ts'),
          makeVisitor(args),
        );
        renderResult(result);
      }),
    )
    .command(
      'markdown FILE',
      'Translate a MarkDown file',
      (command) =>
        command
          .positional('file', {
            type: 'string',
            describe: 'The file to translate (leave out for stdin)',
          })
          .option('python', {
            alias: 'p',
            boolean: true,
            description: 'Translate snippets to Python',
          }),
      wrapHandler(async (args) => {
        const result = translateMarkdown(
          await makeFileSource(args.file ?? '-', 'stdin.md'),
          makeVisitor(args),
        );
        renderResult(result);
      }),
    )
    .command(
      ['extract [ASSEMBLY..]', '$0 [ASSEMBLY..]'],
      'Extract code snippets from one or more assemblies into a language tablets',
      (command) =>
        command
          .positional('ASSEMBLY', {
            type: 'string',
            string: true,
            default: new Array<string>(),
            describe: 'Assembly or directory to extract from',
          })
          .option('output', {
            alias: 'o',
            type: 'string',
            describe: 'Output file where to store the sample tablets',
            default: DEFAULT_TABLET_NAME,
          })
          .option('compile', {
            alias: 'c',
            type: 'boolean',
            describe: 'Try compiling',
            default: false,
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
          .option('fail', {
            alias: 'f',
            type: 'boolean',
            describe: 'Fail if there are compilation errors',
            default: false,
          })
          .option('validate-assemblies', {
            type: 'boolean',
            describe:
              'Whether to validate loaded assemblies or not (this can be slow)',
            default: false,
          }),
      wrapHandler(async (args) => {
        // Easiest way to get a fixed working directory (for sources) in is to
        // chdir, since underneath the in-memory layer we're using a regular TS
        // compilerhost. Have to make all file references absolute before we chdir
        // though.
        const absAssemblies = (args.ASSEMBLY.length > 0
          ? args.ASSEMBLY
          : ['.']
        ).map((x) => path.resolve(x));
        const absOutput = path.resolve(args.output);
        if (args.directory) {
          process.chdir(args.directory);
        }

        const result = await extractSnippets(absAssemblies, {
          outputFile: absOutput,
          includeCompilerDiagnostics: args.compile,
          validateAssemblies: args['validate-assemblies'],
          only: args.include,
        });

        printDiagnostics(result.diagnostics, process.stderr);

        if (result.diagnostics.length > 0) {
          logging.warn(
            `${result.diagnostics.length} diagnostics encountered in ${result.tablet.count} snippets`,
          );
        }

        if (result.diagnostics.some(isErrorDiagnostic) && args.fail) {
          process.exit(1);
        }
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
function wrapHandler<A extends { verbose?: number }, R>(
  handler: (x: A) => Promise<R>,
) {
  return (argv: A) => {
    logging.configure({ level: argv.verbose !== undefined ? argv.verbose : 0 });
    handler(argv).catch((e) => {
      throw e;
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

async function makeFileSource(
  fileName: string,
  stdinName: string,
): Promise<File> {
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
    process.stdin.on('end', () =>
      resolve(Buffer.concat(parts).toString('utf-8')),
    );
  });
}

function renderResult(result: TranslateResult) {
  process.stdout.write(`${result.translation}\n`);

  if (result.diagnostics.length > 0) {
    printDiagnostics(result.diagnostics, process.stderr);

    if (result.diagnostics.some(isErrorDiagnostic)) {
      process.exit(1);
    }
  }
}

main();
