import * as path from 'path';
import { Test } from 'nodeunit';
import { bundle } from '../lib/bundle';
import { assertDirEquals } from './util';

export async function jsiitest(test: Test) {
    await bundleTest(test, 'jsii-test');
    test.done();
}

export async function hello(test: Test) {
    await bundleTest(test, 'hello');
    test.done();
}

export async function calc(test: Test) {
    await bundleTest(test, 'calc');
    test.done();
}

async function bundleTest(test: Test, testModule: string) {
    try {
        let outdir = await bundle(path.join(__dirname, testModule));
        let expdir = path.join(__dirname, testModule + '.expected');

        await assertDirEquals(outdir, expdir);
    }
    catch (e) {
        test.ifError(e);
    }
}
