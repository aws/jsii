import { Test, testCase } from 'nodeunit';
import { NameTree } from '../lib/name-tree';
import * as spec from '../lib/spec';

const moduleName = '@foo/bar';

// tslint:disable:no-string-literal makes the code easier to grep.

export = testCase({
    NameTree: {
        'correctly represents sample assembly'(test: Test) {
            // GIVEN
            const assm: spec.Assembly = {
                schema: spec.SchemaVersion.V1_0,
                name: moduleName,
                version: '0.0.1',
                fingerprint: '<no-fingerprint>',
                targets: {},
                types: {
                    'org.jsii.ClassA': makeType('org.jsii', 'ClassA', spec.TypeKind.Class),
                    'org.jsii.ClassA.NestedInterface': makeType('org.jsii.ClassA', 'NestedInterface', spec.TypeKind.Interface),
                    'org.jsii.enums.EnumType': makeType('org.jsii.enums', 'EnumType', spec.TypeKind.Enum)
                }
            };

            // WHEN
            const nameTree = NameTree.of(assm);

            // THEN
            test.deepEqual(Object.keys(nameTree.children), ['org']);
            test.deepEqual(Object.keys(nameTree.children['org'].children), ['jsii']);
            test.deepEqual(new Set(Object.keys(nameTree.children['org'].children['jsii'].children)),
                           new Set(['enums', 'ClassA']));
            test.deepEqual(Object.keys(nameTree.children['org'].children['jsii'].children['enums'].children), ['EnumType']);
            test.deepEqual(Object.keys(nameTree.children['org'].children['jsii'].children['ClassA'].children), ['NestedInterface']);

            test.equal(nameTree.fqn, null);
            test.equal(nameTree.children['org'].fqn, null);
            test.equal(nameTree.children['org'].children['jsii'].fqn, null);
            test.equal(nameTree.children['org'].children['jsii'].children['enums'].fqn, null);

            test.equal(nameTree.children['org'].children['jsii'].children['ClassA'].fqn, 'org.jsii.ClassA');
            test.equal(nameTree.children['org'].children['jsii'].children['ClassA'].children['NestedInterface'].fqn,
                       'org.jsii.ClassA.NestedInterface');
            test.equal(nameTree.children['org'].children['jsii'].children['enums'].children['EnumType'].fqn,
                       'org.jsii.enums.EnumType');

            test.done();
        }
    }
});

function makeType(ns: string, name: string, kind: spec.TypeKind): spec.Type {
    const fqn = `${ns}.${name}`;
    return { fqn, name, module: moduleName, kind };
}
