import { promises as fs } from 'fs';
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
