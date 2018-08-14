import log4js = require('log4js');
import path = require('path');
import process = require('process');
import ts = require('typescript');
import yargs = require('yargs');
import { Compiler, DIAGNOSTICS } from '../lib/compiler';
import { hasDomain } from '../lib/emitter';
import { loadProjectInfo } from '../lib/project-info';
import utils = require('../lib/utils');
import { VERSION } from '../lib/version';

(async () => {
    const argv = yargs
        .env('JSII')
        .option('watch', { alias: 'w', type: 'boolean', desc: 'Watch for file changes and recompile automatically' })
        .option('verbose', { alias: 'v', type: 'count', desc: 'Increase the verbosity of output', global: true })
        .help()
        .version(VERSION)
        .argv;

    _configureLog4js(argv.verbose);

    const projectRoot = path.normalize(path.resolve(process.cwd(), argv._[0] || '.'));

    const compiler = new Compiler({
        projectInfo: await loadProjectInfo(projectRoot),
        watch: argv.watch
    });
    return { projectRoot, emitResult: await compiler.emit() };
})().then(({ projectRoot, emitResult }) => {
    for (const diagnostic of emitResult.diagnostics) {
        _logDiagnostic(diagnostic, projectRoot);
    }
    if (emitResult.emitSkipped) {
        process.exit(1);
    }
}).catch(e => {
    // tslint:disable-next-line:no-console
    console.error(`Error: ${e.stack}`);
    process.exit(-1);
});

function _configureLog4js(verbosity: number) {
    log4js.configure({
        appenders: {
            console: {
                type: 'stderr',
                layout: { type: 'colored' }
            },
            diagnostics: {
                type: 'stdout',
                layout: { type: 'messagePassThrough' }
            }
        },
        categories: {
            default: { appenders: ['console'], level: _logLevel() },
            [DIAGNOSTICS]: { appenders: ['diagnostics'], level: _logLevel() }
        }
    });

    function _logLevel(): keyof log4js.Levels {
        switch (verbosity) {
        case 0: return 'WARN';
        case 1: return 'INFO';
        case 2: return 'DEBUG';
        case 3: return 'TRACE';
        default: return 'ALL';
        }
    }
}

function _logDiagnostic(diagnostic: ts.Diagnostic, projectRoot: string) {
    const formatDiagnosticsHost = {
        getCurrentDirectory: () => projectRoot,
        getCanonicalFileName(fileName: string) { return fileName; },
        getNewLine() { return '\n'; }
    };

    let message = diagnostic.file
                ? ts.formatDiagnosticsWithColorAndContext([diagnostic], formatDiagnosticsHost)
                : ts.formatDiagnostics([diagnostic], formatDiagnosticsHost);
    if (hasDomain(diagnostic)) {
        // Make sure error codes don't render as ``TS123``, instead e.g: ``JSII123``.
        message = message.replace(/([^\w])TS(\d+)([^\w])/, `$1${diagnostic.domain}$2$3`);
    }
    const logFunc = utils.diagnosticsLogger(log4js.getLogger(DIAGNOSTICS), diagnostic);
    if (!logFunc) { return; }
    logFunc(message.trim());
}
