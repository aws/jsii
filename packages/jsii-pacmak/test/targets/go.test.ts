import { SPEC_FILE_NAME } from '@jsii/spec';
import { promises as fs } from 'fs';
import { compileJsiiForTest } from 'jsii';
import { TypeSystem } from 'jsii-reflect';
import { RosettaTabletReader } from 'jsii-rosetta';
import { tmpdir } from 'os';
import { join } from 'path';

import { Golang } from '../../lib/targets/go';

test('does not generate imports for unused types', async () => {
  const outDir = await fs.mkdtemp(join(tmpdir(), 'pacmak-golang-'));
  try {
    const tarball = join(outDir, 'mock-tarball.tgz');
    await fs.writeFile(tarball, 'Mock Tarball');

    const typeSystem = new TypeSystem();
    await typeSystem.load(require.resolve('./fixtures/base.jsii.json'));
    const assembly = await typeSystem.load(
      require.resolve('./fixtures/dependent.jsii.json'),
    );

    const rosetta = new RosettaTabletReader();
    const subject = new Golang({
      arguments: {},
      assembly,
      packageDir: '',
      rosetta,
      runtimeTypeChecking: true,
      targetName: 'golang',
    });

    await subject.generateCode(outDir, tarball);

    await expect(
      fs.readFile(join(outDir, assembly.name, `${assembly.name}.go`), 'utf-8'),
    ).resolves.not.toContain(
      'github.com/aws/jsii/packages/jsii-pacmak/test/targets/fixtures/base',
    );
  } finally {
    await fs.rm(outDir, { recursive: true });
  }
});

test('qualifies types from a submodule that shares the package name', async () => {
  // `service` and `interfaces.service` both map to Go package `service`.
  const { assembly: spec } = compileJsiiForTest({
    'index.ts': [
      `export * as service from './service';`,
      `export * as interfaces from './interfaces';`,
    ].join('\n'),
    'interfaces/index.ts': `export * as service from './service';`,
    'interfaces/service.ts': [
      `export interface IThing { readonly name: string; }`,
      `export interface ThingProps { readonly size: number; }`,
    ].join('\n'),
    'service.ts': [
      `import * as ifc from './interfaces/service';`,
      `export class Consumer {`,
      `  public constructor(public readonly props: ifc.ThingProps) {}`,
      `  public use(thing: ifc.IThing): ifc.IThing { return thing; }`,
      `}`,
      `export interface IExtended extends ifc.IThing {}`,
    ].join('\n'),
  });

  const outDir = await fs.mkdtemp(join(tmpdir(), 'pacmak-golang-'));
  try {
    const assemblyFile = join(outDir, SPEC_FILE_NAME);
    await fs.writeFile(
      assemblyFile,
      JSON.stringify({
        ...spec,
        targets: { go: { moduleName: 'example.test' } },
      }),
    );
    const tarball = join(outDir, 'mock-tarball.tgz');
    await fs.writeFile(tarball, 'Mock Tarball');

    const assembly = await new TypeSystem().load(assemblyFile);
    const subject = new Golang({
      arguments: {},
      assembly,
      packageDir: '',
      rosetta: new RosettaTabletReader(),
      runtimeTypeChecking: true,
      targetName: 'golang',
    });
    await subject.generateCode(outDir, tarball);

    const serviceDir = join(outDir, assembly.name, 'service');
    const consumer = await fs.readFile(
      join(serviceDir, 'Consumer.go'),
      'utf-8',
    );
    expect(consumer).toContain(
      `"example.test/${assembly.name}/interfaces/service"`,
    );
    expect(consumer).toContain('Props() *service.ThingProps');
    expect(consumer).toContain('Use(thing service.IThing) service.IThing');
    expect(consumer).toContain('func NewConsumer(props *service.ThingProps)');

    await expect(
      fs.readFile(join(serviceDir, 'IExtended.go'), 'utf-8'),
    ).resolves.toMatch(/type IExtended interface \{\s+service\.IThing\s+\}/);
    await expect(
      fs.readFile(join(serviceDir, 'internal', 'types.go'), 'utf-8'),
    ).resolves.toMatch(/= service\.IThing$/m);
  } finally {
    await fs.rm(outDir, { recursive: true });
  }
});
