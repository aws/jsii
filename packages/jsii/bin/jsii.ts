#!/usr/bin/env node
import 'source-map-support/register';
import * as yargs from 'yargs';
import { bundle } from '../lib/bundle';
import { VERSION } from '../lib/version';
import { watch } from '../lib/watch';

process.on('unhandledRejection', err => {
    // tslint:disable-next-line:no-console
    console.error(formatError(err));
    process.exit(1);
});

async function main(dir: string, args: any) {
    if (args.watch) {
        return await watch(dir);
    }

    return await bundle(dir);
}

/**
 * Format the error, including the stack trace.
 *
 * Exceptions shouldn't think about formatting, but some messages will
 * become very long and hard to read without line breaks. As a convention,
 * we translate '; ' to a newline when printing to improve readability.
 *
 * We also get rid of the "Error" prefix from the normal `.stack` representation.
 */
function formatError(err: Error) {
    // Discard first line of stack representation
    const stack = (err.stack || '').split('\n');
    return err.message.replace('; ', '\n') + '\n' + stack.slice(1).join('\n');
}

const argv = yargs
    .usage('Usage: jsii [options]')
    .option('watch', { alias: 'w', desc: 'alias for tsc --watch (tsconfig.json will be created)' })
    .version(VERSION)
    .argv;

main(process.cwd(), argv).catch(err => {
    process.stderr.write(formatError(err) + '\n');
    process.exit(1);
});
