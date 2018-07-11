#!/usr/bin/env node
import 'source-map-support/register';
import * as yargs from 'yargs';
import { generate } from '../lib';

const argv = yargs
    .usage('Usage: jsii-pacmak -t target -o outdir <jsii-package-dir>')
    .option('target', { alias: 't', type: 'string', desc: 'target language' })
    .option('outdir', { alias: 'o', type: 'string', desc: 'output directory' })
    .option('force', { alias: 'f', type: 'boolean', desc: 'force generation', default: false })
    .demandOption('target')
    .demandOption('outdir')
    .demandCommand(1, '<jsii-package-dir> is required')
    .argv;

const target = argv.target;
const outDir = argv.outdir;
const force = argv.force;
const packageDir = argv._[0];

generate(target, packageDir, outDir, force).catch(err => {
    process.stderr.write(err.stack + '\n');
    process.exit(1);
});
