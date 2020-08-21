import * as child from 'child_process';
import * as fs from 'fs';
import { api } from '@jsii/kernel';
import * as spec from '@jsii/spec';
import * as path from 'path';
import { KernelHost, InputOutput, Input, Output } from '../lib';

test('can load libraries from within a callback', () => {
  const inout = new TestInputOutput([
    { api: 'load', ...loadRequest('@scope/jsii-calc-base-of-base') },
    { api: 'load', ...loadRequest('@scope/jsii-calc-base') },
    { api: 'load', ...loadRequest('@scope/jsii-calc-lib') },
    {
      api: 'create',
      fqn: 'Object',
      interfaces: ['@scope/jsii-calc-lib.IFriendly'],
      overrides: [{ method: 'hello' }],
    },
    {
      api: 'invoke',
      objref: { [api.TOKEN_REF]: 'Object@10000' },
      method: 'hello',
    },
    { api: 'load', ...loadRequest('jsii-calc') },
    { complete: { cbid: 'jsii::callback::20000', result: 'SUCCESS!' } },
  ]);
  const host = new KernelHost(inout, { noStack: true, debug: false });
  return new Promise<void>((ok) => {
    host.on('exit', () => ok(inout.expectCompleted()));
    host.run();
  });
});

class TestInputOutput extends InputOutput {
  private readonly inputCommands: Input[];

  public constructor(
    inputCommands: Input[],
    private readonly allowErrors = false,
  ) {
    super();
    this.inputCommands = inputCommands.reverse();
  }

  public read(): Input | undefined {
    return this.inputCommands.pop();
  }

  public write(obj: Output): void {
    if (!this.allowErrors) {
      expect(obj).not.toHaveProperty('error');
    }
    if ('ok' in obj && 'assembly' in obj.ok) {
      // Removing the type count as this is subject to change!
      (obj.ok as any).types = '*redacted*';
    }
    expect(obj).toMatchSnapshot();
  }

  /**
   * Validates that all inputs have been consumed, and all expected outputs have been checked.
   */
  public expectCompleted(): void {
    expect(this.inputCommands).toEqual([]);
  }
}

function loadRequest(library: string): api.LoadRequest {
  const assembly = loadAssembly();
  const tarball = path.join(
    __dirname,
    '_tarballs',
    library,
    `${assembly.fingerprint.replace('/', '_')}.tgz`,
  );
  if (!fs.existsSync(tarball)) {
    packageLibrary(tarball);
  }
  return {
    name: assembly.name,
    version: assembly.version,
    tarball,
  };

  function loadAssembly(): spec.Assembly {
    const assemblyFile = path.resolve(
      require.resolve(`${library}/package.json`),
      '..',
      '.jsii',
    );
    return JSON.parse(fs.readFileSync(assemblyFile, { encoding: 'utf-8' }));
  }

  function packageLibrary(target: string): void {
    const targetDir = path.dirname(target);
    fs.mkdirSync(targetDir, { recursive: true });
    const result = child.spawnSync(
      'npm',
      ['pack', path.dirname(require.resolve(`${library}/package.json`))],
      { cwd: targetDir, shell: true, stdio: ['inherit', 'pipe', 'pipe'] },
    );
    if (result.error) {
      throw result.error;
    }
    if (result.status !== 0) {
      console.error(result.stderr.toString('utf-8'));
      throw new Error(
        `Unable to 'npm pack' ${library}: process ${
          result.signal != null
            ? `killed by ${result.signal}`
            : `exited with code ${result.status}`
        }`,
      );
    }
    fs.renameSync(
      path.join(targetDir, result.stdout.toString('utf-8').trim()),
      target,
    );
  }
}
