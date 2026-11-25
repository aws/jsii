import { SPEC_FILE_NAME } from '@jsii/spec';
import { spawnSync } from 'child_process';
import { promises as fs } from 'fs';
import { compileJsiiForTest } from 'jsii';
import { TypeSystem } from 'jsii-reflect';
import { RosettaTabletReader } from 'jsii-rosetta';
import { tmpdir } from 'os';
import { join } from 'path';

import Python from '../../../lib/targets/python';

// Characters that JSON.stringify escapes with a backslash
const DESCRIPTION =
  'A "quoted" word, a C:\\path\\name, a \\\\ pair, a\ttab and a\nsecond line';

test('setup.py reads back metadata that JSON escapes', async () => {
  const { assembly: spec } = compileJsiiForTest(
    'export class Foo { public bar() { return 1; } }',
  );

  const outDir = await fs.mkdtemp(join(tmpdir(), 'pacmak-python-'));
  try {
    const assemblyFile = join(outDir, SPEC_FILE_NAME);
    await fs.writeFile(
      assemblyFile,
      JSON.stringify({
        ...spec,
        description: DESCRIPTION,
        targets: { python: { distName: 'testpkg', module: 'testpkg' } },
      }),
    );
    const tarball = join(outDir, 'mock-tarball.tgz');
    await fs.writeFile(tarball, 'Mock Tarball');

    const assembly = await new TypeSystem().load(assemblyFile);
    const subject = new Python({
      arguments: {},
      assembly,
      packageDir: '',
      rosetta: new RosettaTabletReader(),
      runtimeTypeChecking: true,
      targetName: 'python',
    });
    await subject.generateCode(outDir, tarball);

    // Run setup.py against a stand-in setuptools that prints what it was given
    const stubDir = join(outDir, 'stub');
    await fs.mkdir(stubDir);
    await fs.writeFile(
      join(stubDir, 'setuptools.py'),
      'import json\n\ndef setup(**kwargs):\n    print(json.dumps(kwargs))\n',
    );
    const result = spawnSync(
      process.platform === 'win32' ? 'python' : 'python3',
      ['setup.py'],
      {
        cwd: outDir,
        encoding: 'utf-8',
        env: { ...process.env, PYTHONPATH: stubDir },
      },
    );

    expect(result.error).toBeUndefined();
    expect({ status: result.status, stderr: result.stderr }).toEqual({
      status: 0,
      stderr: '',
    });
    expect(JSON.parse(result.stdout).description).toBe(DESCRIPTION);
  } finally {
    await fs.rm(outDir, { recursive: true });
  }
});
