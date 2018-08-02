import { Test, testCase } from 'nodeunit';
import { NameTree } from '../lib/name-tree';
import * as spec from '../lib/spec';

const assemblyName = '@foo/bar';

// tslint:disable:no-string-literal makes the code easier to grep.

export = testCase({
    NameTree: {
        'correctly represents sample assembly'(test: Test) {
            // GIVEN
            const assm: spec.Assembly = {
                schema: spec.SchemaVersion.V1_0,
                name: assemblyName,
                description: 'bla',
                homepage: 'https://github.com/bla/bla',
                repository: {
                    type: 'git',
                    url: 'https://github.com/bla/bla'
                },
                version: '0.0.1',
                license: 'NONE',
                fingerprint: '<no-fingerprint>',
                targets: {},
                types: {
                    'org.jsii.TypeA': makeType('org.jsii', 'TypeA'),
                    'org.jsii.TypeA.NestedType': makeType('org.jsii.TypeA', 'NestedType'),
                    'org.jsii.enums.TypeB': makeType('org.jsii.enums', 'TypeB')
                }
            };

            // WHEN
            const nameTree = NameTree.of(assm);

            // THEN
            test.deepEqual(Object.keys(nameTree.children), ['org']);
            test.deepEqual(Object.keys(nameTree.children['org'].children), ['jsii']);
            test.deepEqual(new Set(Object.keys(nameTree.children['org'].children['jsii'].children)),
                           new Set(['enums', 'TypeA']));
            test.deepEqual(Object.keys(nameTree.children['org'].children['jsii'].children['enums'].children), ['TypeB']);
            test.deepEqual(Object.keys(nameTree.children['org'].children['jsii'].children['TypeA'].children), ['NestedType']);

            test.equal(nameTree.fqn, null);
            test.equal(nameTree.children['org'].fqn, null);
            test.equal(nameTree.children['org'].children['jsii'].fqn, null);
            test.equal(nameTree.children['org'].children['jsii'].children['enums'].fqn, null);

            test.equal(nameTree.children['org'].children['jsii'].children['TypeA'].fqn, 'org.jsii.TypeA');
            test.equal(nameTree.children['org'].children['jsii'].children['TypeA'].children['NestedType'].fqn,
                       'org.jsii.TypeA.NestedType');
            test.equal(nameTree.children['org'].children['jsii'].children['enums'].children['TypeB'].fqn,
                       'org.jsii.enums.TypeB');

            test.done();
        }
    }
});

function makeType(ns: string, name: string): spec.Type {
    const fqn = `${ns}.${name}`;
    return { fqn, name, assembly: assemblyName, kind: spec.TypeKind.Class };
}
