import fs = require('fs-extra');
import nodeunit = require('nodeunit');
import os = require('os');
import path = require('path');
import readPackageMetadata from '../lib/package-metadata';

export = nodeunit.testCase({
    readPackageMetadata: {
        async 'correctly loads valid file'(test: nodeunit.Test) {
            try {
                await withTempDir(async (tmpdir) => {
                    const packageInfo = require('../package.json');
                    await fs.writeJson(path.join(tmpdir, 'package.json'), packageInfo);
                    const md = await readPackageMetadata(tmpdir);
                    test.notEqual(md, null);
                });
            } finally {
                test.done();
            }
        },
        async 'rejects package without a version'(test: nodeunit.Test) {
            let error: Error;
            try {
                await withTempDir(async (tmpdir) => {
                    const packageInfo = require('../package.json');
                    delete packageInfo.version;
                    await fs.writeJson(path.join(tmpdir, 'package.json'), packageInfo);
                    await readPackageMetadata(tmpdir);
                });
            } catch (e) {
                error = e;
            } finally {
                test.throws(() => {
                    if (error) { throw error; }
                }, /must contain a "version" field/);
            }
            test.done();
        }
    }
});

async function withTempDir<T>(cb: (dir: string) => T | Promise<T>): Promise<T> {
    const dir = await fs.mkdtemp(path.join(os.tmpdir(), 'package-metadata-test'));
    try {
        return await cb(dir);
    } catch (e) {
        throw e;
    } finally {
        await fs.remove(dir);
    }
}
