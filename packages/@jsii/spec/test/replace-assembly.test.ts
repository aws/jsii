import * as spec from '../lib/assembly';
import { replaceAssembly } from '../lib/replace-assembly';
import { makeType, TestAssembly } from './testutil';

const assemblyName = 'hello';
const fingerprint = 'fingerprint';
describe('replaceAssembly', () => {
  let assembly: spec.Assembly;
  let module: TestAssembly;

  beforeEach(async () => {
    // GIVEN
    assembly = {
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
      fingerprint: fingerprint,
      targets: {},
      types: {
        'org.jsii.TypeA': makeType('org.jsii', 'TypeA', assemblyName),
      },
    };
    // Create a temp directory for the assembly
    module = await TestAssembly.fromAssembly(assembly, {
      name: assemblyName,
    });
  });

  test('assembly is changed', async () => {
    // WHEN
    expect(assembly.types).toBeDefined();
    assembly.types!['org.jsii.TypeA'].docs = { example: 'new TypeA();' };
    // new assembly will have doc object for TypeA
    await replaceAssembly(assembly, {
      directory: module.directory,
      fileExtension: '.jsii',
    });

    // THEN
    await module.syncAssembly();

    expect(assembly.types).toBeDefined();
    expect(assembly.types!['org.jsii.TypeA'].docs).toEqual({
      example: 'new TypeA();',
    });
  });

  test('fingerprint is updated', async () => {
    // WHEN
    // assert that the fingerprint is what we expect
    expect(assembly.fingerprint).toEqual(fingerprint);
    await replaceAssembly(assembly, {
      directory: module.directory,
      fileExtension: '.jsii',
    });

    // THEN
    await module.syncAssembly();

    // there is a new fingerprint
    expect(assembly.fingerprint).not.toEqual(fingerprint);
  });

  afterAll(async () => {
    await module.cleanup();
  });
});
