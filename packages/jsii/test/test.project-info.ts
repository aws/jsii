import clone = require('clone');
import fs = require('fs-extra');
import spec = require('jsii-spec');
import nodeunit = require('nodeunit');
import os = require('os');
import path = require('path');
import { loadProjectInfo } from '../lib/project-info';

const BASE_PROJECT = {
    name: 'jsii-test',
    version: '1.0.0',
    description: 'A test project for jsii ProjectInfo loading',
    license: 'Apache-2.0',
    author: { name: 'Amazon Web Services', url: 'https://aws.amazon.com', organization: true },
    repository: { url: 'git://github.com/awslabs/jsii.git' },
    main: 'index.js',
    types: 'index.d.ts',
    jsii: {
        targets: { foo: { bar: 'baz' } }
    },
    dependencies: { 'jsii-test-dep': '^1.2.3' }
};

export = nodeunit.testCase({
    loadProjectInfo: {
        async 'loads valid project'(test: nodeunit.Test) {
            await _withTestProject(async projectRoot => {
                try {
                    const info = await loadProjectInfo(projectRoot);
                    test.equal(info.name, BASE_PROJECT.name);
                    test.equal(info.version, BASE_PROJECT.version);
                    test.equal(info.description, BASE_PROJECT.description);
                    test.equal(info.license, BASE_PROJECT.license);
                    test.deepEqual(_stripUndefined(info.author), { ... BASE_PROJECT.author, roles: ['author'] });
                    test.equal(info.main, BASE_PROJECT.main);
                    test.equal(info.types, BASE_PROJECT.types);
                    test.equal(info.homepage, undefined);
                    test.equal(info.repository && info.repository.type, 'git');
                    test.equal(info.repository && info.repository.url, BASE_PROJECT.repository.url);
                    test.deepEqual(info.targets, { ...BASE_PROJECT.jsii.targets, js: { npm: BASE_PROJECT.name } });
                    test.deepEqual(info.dependencies, [TEST_DEP_ASSEMBLY]);
                    test.deepEqual(info.transitiveDependencies, [TEST_DEP_ASSEMBLY, TEST_DEP_DEP_ASSEMBLY]);
                } catch (e) {
                    test.ifError(e);
                } finally {
                    test.done();
                }
            });
        },

        async 'loads valid project (UNLICENSED)'(test: nodeunit.Test) {
            await _withTestProject(async projectRoot => {
                try {
                    const info = await loadProjectInfo(projectRoot);
                    test.equal(info && info.license, 'UNLICENSED');
                } catch (e) {
                    test.ifError(e);
                } finally {
                    test.done();
                }
            }, info => {
                info.license = 'UNLICENSED';
            });
        },

        async 'loads valid project (using bundleDependencies)'(test: nodeunit.Test) {
            await _withTestProject(async projectRoot => {
                try {
                    const info = await loadProjectInfo(projectRoot);
                    test.deepEqual(info.bundleDependencies, { bundled: '^1.2.3' });
                } catch (e) {
                    test.ifError(e);
                } finally {
                    test.done();
                }
            }, info => {
                info.dependencies['bundled'] = '^1.2.3';
                info.bundleDependencies = ['bundled'];
            });
        },

        async 'loads valid project (using bundledDependencies)'(test: nodeunit.Test) {
            await _withTestProject(async projectRoot => {
                try {
                    const info = await loadProjectInfo(projectRoot);
                    test.deepEqual(info.bundleDependencies, { bundled: '^1.2.3' });
                } catch (e) {
                    test.ifError(e);
                } finally {
                    test.done();
                }
            }, info => {
                info.dependencies['bundled'] = '^1.2.3';
                info.bundledDependencies = ['bundled'];
            });
        },

        async 'loads valid project (with contributors)'(test: nodeunit.Test) {
            const contributors = [{ name: 'foo', email: 'nobody@amazon.com' }];
            await _withTestProject(async projectRoot => {
                try {
                    const info = await loadProjectInfo(projectRoot);
                    test.deepEqual(info && info.contributors && info.contributors.map(_stripUndefined),
                                   contributors.map(c => ({ ...c, roles: ['contributor'] })));
                } catch (e) {
                    test.ifError(e);
                } finally {
                    test.done();
                }
            }, info => info.contributors = contributors);
        },

        async 'rejects un-declared dependency in bundleDependencies'(test: nodeunit.Test) {
            await _withTestProject(async projectRoot => {
                let error: Error | undefined;
                try {
                    await loadProjectInfo(projectRoot);
                } catch (e) {
                    error = e;
                } finally {
                    test.throws(() => { if (error) { throw error; } },
                                /not declared in "dependencies"/i);
                    test.done();
                }
            }, info => {
                info.bundledDependencies = ['bundled'];
            });
        },

        async 'rejects invalid license'(test: nodeunit.Test) {
            await _withTestProject(async projectRoot => {
                let error: Error | undefined;
                try {
                    await loadProjectInfo(projectRoot);
                } catch (e) {
                    error = e;
                } finally {
                    test.throws(() => { if (error) { throw error; } },
                                /invalid license identifier/i);
                    test.done();
                }
            }, info => {
                info.license = 'Not an SPDX licence ID';
            });
        },

        async 'rejects incompatible dependency version'(test: nodeunit.Test) {
            await _withTestProject(async projectRoot => {
                let error: Error | undefined;
                try {
                    await loadProjectInfo(projectRoot);
                } catch (e) {
                    error = e;
                } finally {
                    test.throws(() => { if (error) { throw error; } },
                                /declared dependency on version .+ but version .+ was found/i);
                    test.done();
                }
            }, info => {
                info.dependencies[TEST_DEP_ASSEMBLY.name] = '^1.2.5';
            });
        }
    }
});

const TEST_DEP_ASSEMBLY: spec.Assembly = {
    schema: spec.SchemaVersion.V1_0,
    name: 'jsii-test-dep',
    version: '1.2.4',
    license: 'Apache-2.0',
    description: 'A jsii dependency of jsii-test',
    homepage: 'https://github.com/awslabs/jsii',
    repository: { type: 'git', url: 'git://github.com/awslabs/jsii.git' },
    author: { name: 'Amazon Web Services', url: 'https://aws.amazon.com', organization: true, roles: ['author'] },
    fingerprint: 'F1NG3RPR1N7',
    dependencies: {
        'jsii-test-dep-dep': {
            version: '3.2.1'
        }
    }
};

const TEST_DEP_DEP_ASSEMBLY: spec.Assembly = {
    schema: spec.SchemaVersion.V1_0,
    name: 'jsii-test-dep-dep',
    version: '3.2.1',
    license: 'Apache-2.0',
    description: 'A jsii dependency of jsii-test-dep',
    homepage: 'https://github.com/awslabs/jsii',
    repository: { type: 'git', url: 'git://github.com/awslabs/jsii.git' },
    author: { name: 'Amazon Web Services', url: 'https://aws.amazon.com', organization: true, roles: ['author'] },
    fingerprint: 'F1NG3RPR1N7'
};

/**
 * Creates a throw-away directory with a ``package.json`` file. Cleans up after itself.
 *
 * @param cb      a callback that will be invoked with the temporary directory's path
 * @param gremlin a function that can modify the content of ``package.json`` before it is written
 *
 * @return the result of executing ``cb``.
 */
async function _withTestProject<T>(cb: (projectRoot: string) => T | Promise<T>, gremlin?: (packageInfo: any) => void): Promise<T> {
    const tmpdir = await fs.mkdtemp(path.join(os.tmpdir(), path.basename(__filename)));
    try {
        const packageInfo = clone(BASE_PROJECT);
        if (gremlin) { gremlin(packageInfo); }
        await fs.writeJson(path.join(tmpdir, 'package.json'), packageInfo, { spaces: 2 });
        await fs.writeFile(path.join(tmpdir, 'index.js'), '// There ought to be some javascript');
        await fs.writeFile(path.join(tmpdir, 'index.ts'), '// There ought to be some typescript');
        await fs.writeFile(path.join(tmpdir, 'index.d.ts'), '// There ought to be some typescript definitions');

        const jsiiTestDep = path.join(tmpdir, 'node_modules', 'jsii-test-dep');
        await fs.mkdirs(jsiiTestDep);
        await fs.writeJson(path.join(jsiiTestDep, '.jsii'), TEST_DEP_ASSEMBLY);
        const jsiiTestDepDep = path.join(jsiiTestDep, 'node_modules', 'jsii-test-dep-dep');
        await fs.mkdirs(jsiiTestDepDep);
        await fs.writeJson(path.join(jsiiTestDepDep, '.jsii'), TEST_DEP_DEP_ASSEMBLY);

        return await cb(tmpdir);
    } catch (e) {
        throw e;
    } finally {
        await fs.remove(tmpdir);
    }
}

/**
 * Removes keys from an object if the associated value is ``undefined``.
 *
 * @param obj the object to be stripped.
 *
 * @return ``obj`` after it has been stripped.
 */
function _stripUndefined(obj: { [key: string]: any } | undefined): { [key: string]: any } | undefined {
    if (!obj) { return obj; }
    for (const key of Object.keys(obj)) {
        if (obj[key] === undefined) {
            delete obj[key];
        }
    }
    return obj;
}
