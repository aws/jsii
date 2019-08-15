import fs = require('fs-extra');
import nodeunit = require('nodeunit');
import path = require('path');
import ts = require('typescript');
import { Compiler } from '../lib/compiler';
import { ProjectInfo } from '../lib/project-info';

const SOURCE_DIR = path.join(__dirname, 'negatives');

const testCases: { [name: string]: (test: nodeunit.Test) => void } = {};

for (const source of fs.readdirSync(SOURCE_DIR)) {
    if (!source.startsWith('neg.') || !source.endsWith('.ts') || source.endsWith('.d.ts')) { continue; }
    const filePath = path.join(SOURCE_DIR, source);
    testCases[source.replace(/neg\.(.+)\.ts/, '$1')] = async (test: nodeunit.Test) => {
        const [expectations, strict] = await _getExpectedErrorMessage(filePath);
        test.ok(expectations.length > 0, `Expected error messages should be specified using ${MATCH_ERROR_MARKER}`);
        const compiler = new Compiler({ projectInfo: _makeProjectInfo(source), watch: false, failOnWarnings: strict });
        const emitResult = await compiler.emit(path.join(SOURCE_DIR, source));
        test.equal(emitResult.emitSkipped, true, `hasErrors should be true`);
        const errors = emitResult.diagnostics.filter(diag =>
            diag.category === ts.DiagnosticCategory.Error
            || (strict && diag.category === ts.DiagnosticCategory.Warning));
        for (const expectation of expectations) {
            test.notEqual(errors.find(e => _messageText(e).indexOf(expectation) !== -1),
                          null,
                          `No error contained: ${expectation}. Errors: \n${errors.map((e, i) => `[${i}] ${e.messageText}`).join('\n')}`);
        }

        // Cleaning up...
        for (const file of await fs.readdir(SOURCE_DIR)) {
            if (file.startsWith('neg.') && (file.endsWith('.d.ts') || file.endsWith('.js'))) {
                await fs.remove(path.join(SOURCE_DIR, file));
            }
            await fs.remove(path.join(SOURCE_DIR, '.jsii'));
            await fs.remove(path.join(SOURCE_DIR, 'tsconfig.json'));
        }

        test.done();
    };
}

export = nodeunit.testCase({ 'jsii rejections': testCases });

const MATCH_ERROR_MARKER = '///!MATCH_ERROR:';
const STRICT_MARKER = '///!STRICT!';
async function _getExpectedErrorMessage(file: string): Promise<[string[], boolean]> {
    const data = await fs.readFile(file, { encoding: 'utf8' });
    const lines = data.split('\n');
    const matches = lines.filter(line => line.startsWith(MATCH_ERROR_MARKER))
                         .map(line => line.substr(MATCH_ERROR_MARKER.length).trim());
    const strict = lines.some(line => line.startsWith(STRICT_MARKER));
    return [matches, strict];
}

function _messageText(diagnostic: ts.Diagnostic | ts.DiagnosticMessageChain): string {
    if (typeof diagnostic.messageText === 'string') {
        return diagnostic.messageText;
    }
    if (diagnostic.messageText.next) {
        return diagnostic.messageText.messageText + '|' + _messageText(diagnostic.messageText.next);
    }
    return diagnostic.messageText.messageText;
}

function _makeProjectInfo(types: string): ProjectInfo {
    return {
        projectRoot: SOURCE_DIR,
        packageJson: undefined,
        types,
        main: types.replace(/(?:\.d)?\.ts(x?)/, '.js$1'),
        name: 'jsii', // That's what package.json would tell if we look up...
        version: '0.0.1',
        jsiiVersionFormat: 'short',
        license: 'Apache-2.0',
        author: { name: 'John Doe', roles: ['author'] },
        repository: { type: 'git', url: 'https://github.com/aws/jsii.git' },
        dependencies: [],
        peerDependencies: [],
        transitiveDependencies: [],
        bundleDependencies: {},
        targets: {},
        excludeTypescript: [],
    };
}
