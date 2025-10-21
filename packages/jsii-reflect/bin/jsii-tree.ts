import '@jsii/check-node/run';

import * as spec from '@jsii/spec';
import * as chalk from 'chalk';
import * as yargs from 'yargs';

import { TypeSystem, TypeSystemTree } from '../lib';

const JSII_TREE_SUPPORTED_FEATURES: spec.JsiiFeature[] = [
  'intersection-types',
  'class-covariant-overrides',
];

async function main() {
  const options = await yargs
    .usage(
      '$0 [JSII-FILE | MODULE-DIR...]',
      'Prints an ASCII tree representation of a jsii type system.',
      (args) =>
        args
          .positional('JSII-FILE', {
            type: 'string',
            desc: 'path to a .jsii file to load, all dependency .jsii files must be explicitly supplied',
          })
          .positional('MODULE-DIR', {
            type: 'string',
            desc: 'path to an jsii npm module directory, all jsii dependencies will be loaded transitively',
          }),
    )
    .option('closure', {
      type: 'string',
      alias: 'c',
      desc: 'Load dependencies of package without assuming its a JSII package itself',
    })
    .option('all', {
      type: 'boolean',
      alias: 'a',
      desc: 'show all details',
      default: false,
    })
    .option('colors', {
      type: 'boolean',
      desc: 'enable/disable ANSI colors in output',
      default: true,
    })
    .option('dependencies', {
      type: 'boolean',
      alias: 'd',
      desc: 'show assembly dependencies',
      default: false,
    })
    .option('inheritance', {
      type: 'boolean',
      alias: 'i',
      desc: 'show base classes and implemented interfaces',
      default: false,
    })
    .option('members', {
      type: 'boolean',
      alias: 'm',
      desc: 'show type members',
      default: false,
    })
    .option('signatures', {
      type: 'boolean',
      alias: 's',
      desc: 'show method and property signatures',
      default: false,
    })
    .option('types', {
      type: 'boolean',
      alias: 't',
      desc: 'show types',
      default: false,
    })
    .option('validate', {
      type: 'boolean',
      alias: 'V',
      desc: 'Validate that assemblies match schema while loading',
      default: true,
    })
    .option('stabilities', {
      type: 'boolean',
      alias: 'S',
      desc: 'Show stabilities',
      default: false,
    }).argv;

  const typesys = new TypeSystem();

  if (options.closure) {
    await typesys.loadNpmDependencies(options.closure, {
      validate: options.validate,
    });
  }

  await Promise.all(
    ((options.jsiiFile as string[]) ?? []).map((fileOrDirectory) =>
      typesys.load(fileOrDirectory, {
        validate: options.validate,
        supportedFeatures: JSII_TREE_SUPPORTED_FEATURES,
      }),
    ),
  );

  const tst = new TypeSystemTree(typesys, {
    dependencies: options.dependencies || options.all,
    types:
      options.types || options.all || options.members || options.inheritance,
    members: options.members || options.all,
    inheritance: options.inheritance || options.all,
    signatures: options.signatures || options.all,
    stabilities: options.stabilities || options.all,
    colors: options.colors,
  });

  tst.printTree();
}

main().catch((e) => {
  console.log(chalk.red(e));
  process.exit(1);
});
