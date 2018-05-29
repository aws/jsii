import { Test } from 'nodeunit'
import * as fs from 'fs'
import * as path from 'path'
import { compileSources } from '../lib/compiler'

let tests: any = { };
let negativesDir = path.join(__dirname, 'negatives');

const MATCH_ERROR_MARKER = '///!MATCH_ERROR:';

async function getExpectedErrorMessage(filePath: string) {
    return new Promise<string[]>((ok, fail) => {
        return fs.readFile(filePath, (err, data) => {
            if (err) return fail(err);
            let matches = data.toString()
                .split('\n')
                .filter(line => line.startsWith(MATCH_ERROR_MARKER))
                .map(line => line.substr(MATCH_ERROR_MARKER.length))
                .map(line => line.trim());

            if (matches.length === 0) {
                throw new Error(`Expecting at least one ${MATCH_ERROR_MARKER} in each neg. test`);
            }
            ok(matches);
        })
    });
}

for (let source of fs.readdirSync(negativesDir)) {
    if (!source.endsWith('.ts')) continue;
    if (!source.startsWith('neg.')) continue;

    tests[source] = async function(test: Test) {
        let filePath = path.join(negativesDir, source);
        let matchError = await getExpectedErrorMessage(filePath);
        let failed = false;
        try {
            await compileSources(path.join(negativesDir, source), undefined, undefined, /* warnings as errors */ true)
        }
        catch (e) {
            for (let match of matchError) {
                if (e.message.indexOf(match) === -1) {
                    test.ifError(new Error(`Compile failed, but error message didn't match expected text "${match}". Error was: ${e.message}`));
                }
            }
            failed = true;
        }
        test.ok(failed, 'Compilation was expected to fail');
        test.done();
    }
}

export default tests;
