import '@jsii/check-node/run';

import * as chalk from 'chalk';
import * as yargs from 'yargs';

import {
  jsiiQuery,
  parseExpression,
  renderDocs,
  renderElement,
} from '../lib/jsii-query';

async function main() {
  const argv = await yargs
    .usage(
      '$0 <FILE> [QUERY...]',
      'Queries a jsii file for its entries.',
      (args) =>
        args
          .positional('FILE', {
            type: 'string',
            desc: 'path to a .jsii file or directory to load',
          })
          .positional('QUERY', {
            type: 'string',
            desc: 'a query or filter expression to include or exclude items',
          }),
    )
    .option('types', {
      type: 'boolean',
      alias: 't',
      desc: 'after selecting API elements, show all selected types, as well as types containing selected members',
      default: false,
    })
    .option('members', {
      type: 'boolean',
      alias: 'm',
      desc: 'after selecting API elements, show all selected members, as well as members of selected types',
      default: false,
    })
    .options('docs', {
      type: 'boolean',
      alias: 'd',
      desc: 'show documentation for selected elements',
      default: false,
    })
    .option('closure', {
      type: 'boolean',
      alias: 'c',
      default: false,
      desc: 'Load dependencies of package without assuming its a JSII package itself',
    }).epilogue(`
REMARKS
-------

There can be more than one QUERY part, which progressively filters from or adds
to the list of selected elements.

QUERY is of the format:

    <op><kind>[:<expression>]

Where:

    <op>          The type of operation to apply
             +    Adds new API elements matching the selector to the selection.
                  If this selects types, it also includes all type's members.
             -    Removes API elements from the current selection that match
                  the selector.
             .    Removes API elements from the current selection that do NOT
                  match the selector (i.e., retain only those that DO match
                  the selector).
    <kind>        Type of API element to select. One of 'type' or 'member',
                  or any of its more specific sub-types such as 'class',
                  'interface', 'struct', 'enum', 'property', 'method', etc.
                  Also supports aliases like 'c', 'm', 'mem', 's', 'p', etc.
    <expression>  A JavaScript expression that will be evaluated against
                  the member. Has access to a number of attributes like
                  kind, ancestors, abstract, base, datatype, docs, interfaces,
                  name, initializer, optional, overrides, protected, returns,
                  parameters, static, variadic, type. The types are the
                  same types as offered by the jsii-reflect class model.

This file evaluates the expressions as JavaScript, so this tool is not safe
against untrusted input!

EXAMPLES
-------

Select all methods with "grant" in their name:

$ jsii-query node_modules/aws-cdk-lib --members '.method:name.includes("grant")'

`).argv;

  // Add some fields that we know are there but yargs typing doesn't know
  const options: typeof argv & { FILE: string; QUERY: string[] } = argv as any;

  if (!(options.types || options.members)) {
    throw new Error('At least --types or --members must be specified');
  }

  const expressions = options.QUERY.map(parseExpression);

  const result = await jsiiQuery({
    fileName: options.FILE,
    expressions,
    closure: options.closure,
    returnTypes: options.types,
    returnMembers: options.members,
  });

  for (const element of result) {
    console.log(renderElement(element));
    if (options.docs) {
      console.log(
        chalk.gray(
          renderDocs(element)
            .split('\n')
            .map((line) => `    ${line}`)
            .join('\n'),
        ),
      );
      console.log('');
    }
  }

  process.exitCode = result.length > 0 ? 0 : 1;
}

main().catch((e) => {
  console.log(chalk.red(e));
  process.exit(1);
});
