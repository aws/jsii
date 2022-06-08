import * as spec from './assembly';
import { NameTree } from './name-tree';

const assemblyName = '@foo/bar';

test('correctly represents sample assembly', () => {
  // GIVEN
  const assm: spec.Assembly = {
    schema: spec.SchemaVersion.LATEST,
    name: assemblyName,
    description: 'bla',
    homepage: 'https://github.com/bla/bla',
    author: { name: 'Author', roles: ['author'] },
    repository: {
      type: 'scm',
      url: 'https://github.com/bla/bla',
    },
    version: '0.0.1',
    jsiiVersion: 'TEST',
    license: 'NONE',
    fingerprint: '<no-fingerprint>',
    targets: {},
    types: {
      'org.jsii.TypeA': makeType('org.jsii', 'TypeA'),
      'org.jsii.TypeA.NestedType': makeType('org.jsii.TypeA', 'NestedType'),
      'org.jsii.enums.TypeB': makeType('org.jsii.enums', 'TypeB'),
    },
  };

  // WHEN
  const nameTree = NameTree.of(assm);

  // THEN
  expect(Object.keys(nameTree.children)).toEqual(['org']);
  expect(Object.keys(nameTree.children.org.children)).toEqual(['jsii']);
  expect(
    new Set(Object.keys(nameTree.children.org.children.jsii.children)),
  ).toEqual(new Set(['enums', 'TypeA']));
  expect(
    Object.keys(nameTree.children.org.children.jsii.children.enums.children),
  ).toEqual(['TypeB']);
  expect(
    Object.keys(nameTree.children.org.children.jsii.children.TypeA.children),
  ).toEqual(['NestedType']);

  expect(nameTree.fqn).toBe(undefined);
  expect(nameTree.children.org.fqn).toBe(undefined);
  expect(nameTree.children.org.children.jsii.fqn).toBe(undefined);
  expect(nameTree.children.org.children.jsii.children.enums.fqn).toBe(
    undefined,
  );

  expect(nameTree.children.org.children.jsii.children.TypeA.fqn).toBe(
    'org.jsii.TypeA',
  );
  expect(
    nameTree.children.org.children.jsii.children.TypeA.children.NestedType.fqn,
  ).toBe('org.jsii.TypeA.NestedType');
  expect(
    nameTree.children.org.children.jsii.children.enums.children.TypeB.fqn,
  ).toBe('org.jsii.enums.TypeB');
});

function makeType(ns: string, name: string): spec.Type {
  const fqn = `${ns}.${name}`;
  return { fqn, name, assembly: assemblyName, kind: spec.TypeKind.Class };
}
