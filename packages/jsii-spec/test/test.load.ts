import fs = require('fs-extra');
import { Test, testCase } from 'nodeunit';
import path = require('path');
import { loadAssembly } from '../lib/load';
import * as asyncTest from './async-test';

export = testCase({
    loadAssembly: {
        async 'can load a valid assembly document'(test: Test) {
            await asyncTest.doesNotReject(async () => loadAssembly(await testInput()), test);
            test.done();
        },
        async 'rejects a document that is not json'(test: Test) {
            await asyncTest.rejects(() => loadAssembly(__filename), test);
            test.done();
        },
        async 'rejects a document that lacks `schema`'(test: Test) {
            await asyncTest.rejects(async () => loadAssembly(await testInput(assm => delete assm.schema)), test);
            test.done();
        },
        async 'rejects a document that has invalid `schema`'(test: Test) {
            await asyncTest.rejects(async () => loadAssembly(await testInput(assm => assm.schema = 'foo')), test);
            test.done();
        },
        async 'rejects a document that lacks `name`'(test: Test) {
            await asyncTest.rejects(async () => loadAssembly(await testInput(assm => delete assm.name)), test);
            test.done();
        },
        async 'rejects a document that has blank `name`'(test: Test) {
            await asyncTest.rejects(async () => loadAssembly(await testInput(assm => assm.name = '')), test);
            test.done();
        },
        async 'rejects a document that lacks `version`'(test: Test) {
            await asyncTest.rejects(async () => loadAssembly(await testInput(assm => delete assm.version)), test);
            test.done();
        },
        async 'rejects a document that has blank `version`'(test: Test) {
            await asyncTest.rejects(async () => loadAssembly(await testInput(assm => assm.version = '')), test);
            test.done();
        },
        async 'rejects a document that lacks `fingerprint`'(test: Test) {
            await asyncTest.rejects(async () => loadAssembly(await testInput(assm => delete assm.fingerprint)), test);
            test.done();
        },
        async 'rejects a document that has blank `fingerprint`'(test: Test) {
            await asyncTest.rejects(async () => loadAssembly(await testInput(assm => assm.fingerprint = '')), test);
            test.done();
        },
        async 'rejects a document that lacks `targets`'(test: Test) {
            await asyncTest.rejects(async () => loadAssembly(await testInput(assm => delete assm.targets)), test);
            test.done();
        },
        async 'rejects a document that has `targets` not an object'(test: Test) {
            await asyncTest.rejects(async () => loadAssembly(await testInput(assm => assm.targets = 'nope')), test);
            test.done();
        },
        async 'rejects a document that lacks `types`'(test: Test) {
            await asyncTest.rejects(async () => loadAssembly(await testInput(assm => delete assm.types)), test);
            test.done();
        },
        async 'rejects a document that has blank `types`'(test: Test) {
            await asyncTest.rejects(async () => loadAssembly(await testInput(assm => assm.types = {})), test);
            test.done();
        },
        async 'rejects a document that has `types` not an object'(test: Test) {
            await asyncTest.rejects(async () => loadAssembly(await testInput(assm => assm.types = 'nope')), test);
            test.done();
        },
    }
});

/**
 * Returns the path to a JSON document that is a valid JSII assembly, except if
 * ``modifier`` is set, in which case it points to the JSON document after having
 * called ``modifier`` with it.
 *
 * @param modifier a function that modifies the assembly in place.
 *
 * @returns the path to a valid file.
 */
async function testInput(modifier?: (assm: any) => void): Promise<string> {
    const vanillaPath = path.join(__dirname, 'test.load', 'valid-assembly.json');
    if (modifier == null) { return vanillaPath; }
    const data = await fs.readJson(vanillaPath);
    modifier(data);
    const file = path.join(__dirname, 'test.load', 'modified.jsii');
    await fs.writeJson(file, data);
    return file;
}
