#!/usr/bin/env node
import 'source-map-support/register'
import * as yargs from 'yargs'
import { generate } from '../lib'

const argv = yargs
    .usage('Usage: jsii-pacmak -t target -o outdir <jsii-dir>')
    .option('target', { alias: 't', type: 'string', desc: 'target language' })
    .option('outdir', { alias: 'o', type: 'string', desc: 'output directory '})
    .demandOption('target')
    .demandOption('outdir')
    .demandCommand(1, '<jsii-dir> is required')
    .argv;

const target = argv.target;
const outDir = argv.outdir;
const jsiiFile = argv._[0];

generate(target, jsiiFile, outDir).catch(e => {
    console.error(e);
    process.exit(1);
});