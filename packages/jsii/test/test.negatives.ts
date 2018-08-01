import fs = require('fs');
import spec = require('jsii-spec');
import { Test } from 'nodeunit';
import path = require('path');
import { compileSources } from '../lib/compiler';

const tests: any = { };
const negativesDir = path.join(__dirname, 'negatives');

const MATCH_ERROR_MARKER = '///!MATCH_ERROR:';

async function getExpectedErrorMessage(filePath: string) {
    return new Promise<string[]>((ok, fail) => {
        return fs.readFile(filePath, (err, data) => {
            if (err) { return fail(err); }
            const matches = data.toString()
                .split('\n')
                .filter(line => line.startsWith(MATCH_ERROR_MARKER))
                .map(line => line.substr(MATCH_ERROR_MARKER.length))
                .map(line => line.trim());

            if (matches.length === 0) {
                throw new Error(`Expecting at least one ${MATCH_ERROR_MARKER} in each neg. test, none found in ${filePath}`);
            }
            ok(matches);
        });
    });
}

for (const source of fs.readdirSync(negativesDir)) {
    if (!source.endsWith('.ts') || source.endsWith('.d.ts')) { continue; }
    if (!source.startsWith('neg.')) { continue; }

    tests[source] = async (test: Test) => {
        const filePath = path.join(negativesDir, source);
        const matchError = await getExpectedErrorMessage(filePath);
        let failed = false;
        try {
            await compileSources(path.join(negativesDir, source),
                                 undefined /* No extra source */,
                                 undefined /* No external types */,
                                 {
                                    schema: spec.SchemaVersion.V1_0, name: 'foo', version: 'bar', license: 'NONE', fingerprint: 'baz',
                                    targets: {}, types: {}
                                },
                                 true /* warnings as errors */);
        } catch (e) {
            for (const match of matchError) {
                if (e.message.indexOf(match) === -1) {
                    test.ifError(new Error(`Compile failed, but error message didn't match expected text "${match}". Error was: ${e.message}`));
                }
            }
            failed = true;
        }
        test.ok(failed, 'Compilation was expected to fail');
        test.done();
    };
}

export default tests;
