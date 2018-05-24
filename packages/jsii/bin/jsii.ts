#!/usr/bin/env node
import 'source-map-support/register'
import * as yargs from 'yargs';
import { bundle } from '../lib/bundle'
import { watch } from '../lib/watch'

process.on('unhandledRejection', err => { 
    console.error(err.stack);
    process.exit(1);
});

async function main(dir: string, argv: any) {
    if (argv.watch) {
        return await watch(dir);
    }

    return await bundle(dir);
}

const argv = yargs
    .usage('Usage: jsii [options]')
    .option('watch', { alias: 'w', desc: 'alias for tsc --watch (tsconfig.json will be created)' })
    .argv;

main(process.cwd(), argv).catch(err => {
    console.log(err.stack)
    process.exit(1);
});


