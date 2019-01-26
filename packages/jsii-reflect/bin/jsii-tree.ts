import colors = require('colors/safe');
import yargs = require('yargs');
import { TypeSystem, TypeSystemTree } from '../lib';

  // tslint:disable:no-console

async function main() {
  const options = yargs
    .usage('$0 <JSII-FILE | MODULE-DIR...>', 'Prints an ASCII tree representation of a jsii type system.', args => args
      .positional('JSII-FILE', { desc: 'path to a .jsii file to load, all dependency .jsii files must be explicitly supplied' })
      .positional('MODULE_DIR', { desc: 'path to an jsii npm module directory, all jsii dependencies will be loaded transitively' }))
    .option('all', { type: 'boolean', alias: 'a', desc: 'show all details', default: false })
    .option('colors', { type: 'boolean', desc: 'enable/disable ANSI colors in output', default: true })
    .option('dependencies', { type: 'boolean', alias: 'd', desc: 'show assembly dependencies', default: false })
    .option('inheritance', { type: 'boolean', alias: 'i', desc: 'show base classes and implemented interfaces', default: false })
    .option('members', { type: 'boolean', alias: 'm', desc: 'show type members', default: false })
    .option('signatures', { type: 'boolean', alias: 's', desc: 'show method and property signatures', default: false })
    .option('types', { type: 'boolean', alias: 't', desc: 'show types', default: false })
    .argv;

  const typesys = new TypeSystem();

  for (const fileOrDirectory of options.jsiiFile) {
    await typesys.load(fileOrDirectory);
  }

  const tst = new TypeSystemTree(typesys, {
    dependencies: options.dependencies || options.all,
    types: options.types || options.all || options.members || options.inheritance,
    members: options.members || options.all,
    inheritance: options.inheritance || options.all,
    signatures: options.signatures || options.all,
    colors: options.colors
  });

  tst.printTree();
}

main().catch(e => {
  console.log(colors.red(e));
  process.exit(1);
});