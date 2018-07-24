#!/usr/bin/env node
import 'source-map-support/register';

import fs = require('fs-extra');
import os = require('os');
import path = require('path');
import yargs = require('yargs');
import { Target } from '../lib/target';
import { VERSION } from '../lib/version';

(async function main() {
    const argv = yargs
        .usage('Usage: jsii-pacmak --target target --outdir outdir <jsii-package-dir>')
        .option('target', {
            alias: 't',
            type: 'string',
            desc: 'target language for which to generate bindings',
            choices: Object.keys(await Target.all),
            required: true
        })
        .option('outdir', {
            alias: 'o',
            type: 'string',
            desc: 'directory where artifacts will be generated',
            required: true
        })
        .option('code-only', {
            alias: 'c',
            type: 'boolean',
            desc: 'generate code only (instead of building and packaging)',
            default: false
        })
        .option('fingerprint', {
            type: 'boolean',
            // tslint:disable-next-line:max-line-length
            desc: 'attach a fingerprint to the generated artifacts, and skip generation if outdir contains artifacts that have a matching fingerprint',
            default: true
        })
        .option('force', {
            alias: 'f',
            type: 'boolean',
            desc: 'force generation of new artifacts, even if the fingerprints match',
            default: false
        })
        .demandCommand(1, 1, '<jsii-package-dir> is required', 'only one <jsii-package-dir> can be provided')
        .version(VERSION)
        .argv;

    const target = new (await Target.all)[argv.target]({
        packageDir: argv._[0],
        fingerprint: argv.fingerprint,
        force: argv.force,
        arguments: argv
    });

    const codeDir = argv.codeOnly ? argv.outdir : await fs.mkdtemp(path.join(os.tmpdir(), 'jsii-pacmak-code'));

    await target.generateCode(codeDir);
    if (!argv.codeOnly) {
        await target.build(codeDir, argv.outdir);
        await fs.remove(codeDir);
    }

})().catch(err => {
    process.stderr.write(err.stack + '\n');
    process.exit(1);
});
