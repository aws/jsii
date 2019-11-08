import yargs = require('yargs');
import { FileSource, isErrorDiagnostic, LiteralSource, printDiagnostics,
  renderTree, translateMarkdown, TranslateResult, translateTypeScript } from '../lib';
import { PythonVisitor } from '../lib/languages/python';
import { VisualizeAstVisitor } from '../lib/languages/visualize';

async function main() {
  const argv = yargs
    .usage('$0 <cmd> [args]')
    .command('snippet [file]', 'Translate a single snippet', command => command
        .positional('file', { type: 'string', describe: 'The file to translate (leave out for stdin)' })
        .option('python', { alias: 'p', boolean: true, description: 'Translate snippets to Python' })
    , async args => {
      const result = translateTypeScript(
        await makeFileSource(args.file || '-', 'stdin.ts'),
        makeVisitor(args));
      renderResult(result);
    })
    .command('markdown <file>', 'Translate a MarkDown file', command => command
        .positional('file', { type: 'string', describe: 'The file to translate (leave out for stdin)' })
        .option('python', { alias: 'p', boolean: true, description: 'Translate snippets to Python' })
    , async args => {
      const result = translateMarkdown(
        await makeFileSource(args.file || '-', 'stdin.md'),
        makeVisitor(args));
      renderResult(result);
      return 5;
    })
    .demandCommand()
    .help()
    .strict()  // Error on wrong command
    .version(require('../package.json').version)
    .showHelpOnFail(false)
    .argv;

  // Evaluating .argv triggers the parsing but the command gets implicitly executed,
  // so we don't need the output.
  Array.isArray(argv);
}

function makeVisitor(args: { python?: boolean }) {
  if (args.python) { return new PythonVisitor(); }
  // Default to visualizing AST, including nodes we don't recognize yet
  return new VisualizeAstVisitor();
}

async function makeFileSource(fileName: string, stdinName: string) {
  if (fileName === '-') {
    return new LiteralSource(await readStdin(), stdinName);
  }
  return new FileSource(fileName);
}

async function readStdin(): Promise<string> {
  process.stdin.setEncoding('utf8');

  const parts: string[] = [];

  return new Promise((resolve, reject) => {
    process.stdin.on('readable', () => {
      const chunk = process.stdin.read();
      if (chunk !== null) { parts.push(`${chunk}`); }
    });

    process.stdin.on('error', reject);
    process.stdin.on('end', () => resolve(parts.join('')));
  });
}

function renderResult(result: TranslateResult) {
  process.stdout.write(renderTree(result.tree) + '\n');

  if (result.diagnostics.length > 0) {
    printDiagnostics(result.diagnostics, process.stderr);

    if (result.diagnostics.some(isErrorDiagnostic)) {
      process.exit(1);
    }
  }
}

main().catch(e => {
  // tslint:disable-next-line:no-console
  console.error(e);
  process.exit(1);
});