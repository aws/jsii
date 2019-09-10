import fs = require("fs");
import yargs = require('yargs');
import { FileSource, isErrorDiagnostic, LiteralSource, printDiagnostics,
  renderTree, translateMarkdown, TranslateOptions, translateTypeScript } from '../lib';
import { PythonVisitor } from '../lib/languages/python';
import { VisualizeAstVisitor } from '../lib/languages/visualize';

async function main() {
  const argv = yargs
    .usage('$0 [file]')
    .option('python', { alias: 'p', boolean: true, description: 'Translate snippets to Python' })
    .option('markdown', { alias: 'm', boolean: true, description: 'Parse input as MarkDown and translate snippets inside it' })
    .help()
    .version(require('../package.json').version)
    .argv;

  const options: TranslateOptions = {};

  let visitor;
  if (argv.python) { visitor = new PythonVisitor(); }
  if (!visitor) {
    // Default to visualizing AST, including nodes we don't recognize yet
    visitor = new VisualizeAstVisitor();
    options.bestEffort = false;
  }

  const fakeInputFileName = argv.markdown ? 'stdin.md' : 'stdin.ts';

  const source = argv._.length > 0
      ? new FileSource(argv._[0])
      : new LiteralSource(fs.readFileSync(0, "utf-8"), fakeInputFileName);

  const result = argv.markdown
      ? translateMarkdown(source, visitor, options)
      : translateTypeScript(source, visitor, options);

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