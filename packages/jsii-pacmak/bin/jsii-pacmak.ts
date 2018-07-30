#!/usr/bin/env node
import 'source-map-support/register';

import fs = require('fs-extra');
import os = require('os');
import path = require('path');
import process = require('process');
import yargs = require('yargs');
import logging = require('../lib/logging');
import { Target } from '../lib/target';
import { resolveDependencyDirectory } from '../lib/util';
import { VERSION } from '../lib/version';

(async function main() {
    const targetConstructors = await Target.findAll();
    const argv = yargs
        .usage('Usage: jsii-pacmak [-t target,...] [-o outdir] [package-dir]')
        .option('targets', {
            alias: 't',
            type: 'array',
            desc: 'target languages for which to generate bindings',
            defaultDescription: 'all targets defined in `package.json` will be generated',
            choices: Object.keys(targetConstructors),
            required: false
        })
        .option('outdir', {
            alias: 'o',
            type: 'string',
            desc: 'directory where artifacts will be generated',
            defaultDescription: 'based on `jsii.output` in `package.json`',
            required: false
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
        .option('recurse', {
            alias: 'R',
            type: 'boolean',
            desc: 'recursively generate and build all dependencies into `outdir`',
            default: false
        })
        .option('verbose', {
            alias: 'v',
            type: 'boolean',
            desc: 'emit verbose build output',
            count: true,
            default: 0
        })
        .option('clean', {
            type: 'boolean',
            desc: 'clean up temporary files upon success (use --no-clean to disable)',
            default: true,
        })
        .version(VERSION)
        .argv;

    logging.level = argv.verbose !== undefined ? argv.verbose : 0;

    logging.debug('command line arguments:', argv);

    const rootDir = path.resolve(process.cwd(), argv._[0] || '.');

    await buildPackage(rootDir);

    async function buildPackage(packageDir: string, isRoot = true) {

        // read package.json and extract the "jsii" configuration from it.
        const pkg = await fs.readJson(path.join(packageDir, 'package.json'));
        if (!pkg.jsii || !pkg.jsii.outdir || !pkg.jsii.targets) {
            if (isRoot) {
                throw new Error(`Invalid "jsii" section in ${packageDir}. Expecting "outdir" and "targets"`);
            } else {
                return; // just move on, this is not a jsii package
            }
        }

        // if --recurse is set, find dependency dirs and build them.
        if (argv.recurse) {
            for (const dep of Object.keys(pkg.dependencies || { })) {
                const depDir = resolveDependencyDirectory(packageDir, dep);
                await buildPackage(depDir, /* isRoot */ false);
            }
        }

        // outdir is either by package.json/jsii.outdir (relative to package root) or via command line (relative to cwd)
        const outDir = argv.outdir !== undefined ? path.resolve(process.cwd(), argv.outdir) : path.resolve(packageDir, pkg.jsii.outdir);
        const targets = argv.targets || [ ...Object.keys(pkg.jsii.targets), 'npm' ]; // "npm" is an implicit target

        logging.info(`Building ${path.relative(process.cwd(), packageDir)} (${targets.join(',')}) into ${path.relative(process.cwd(), outDir)}`);

        for (const targetName of targets) {
             // if we are targeting a single language, output to outdir, otherwise outdir/<target>
            const targetOutputDir = targets.length > 1 ? path.join(outDir, targetName) : outDir;
            logging.debug(`Building ${pkg.name}/${targetName}: ${targetOutputDir}`);
            await generateTarget(packageDir, targetName, targetOutputDir);
        }
    }

    async function generateTarget(packageDir: string, targetName: string, targetOutputDir: string) {
        // ``argv.target`` is guaranteed valid by ``yargs`` through the ``choices`` directive.
        const targetConstructor = targetConstructors[targetName];
        if (!targetConstructor) {
            throw new Error(`Unsupported target ${targetName}`);
        }

        const target = new targetConstructor({
            targetName,
            packageDir,
            fingerprint: argv.fingerprint,
            force: argv.force,
            arguments: argv
        });

        const codeDir = argv.codeOnly ? targetOutputDir : await fs.mkdtemp(path.join(os.tmpdir(), 'jsii-pacmak-code'));

        await target.generateCode(codeDir);

        if (argv.codeOnly) { return; }

        await target.build(codeDir, targetOutputDir);

        if (argv.clean) {
            await fs.remove(codeDir);
        } else {
            logging.info('Generated code retained at:', codeDir);
        }
    }

})().catch(err => {
    process.stderr.write(err.stack + '\n');
    process.exit(1);
});
