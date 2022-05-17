import * as child from 'child_process';
import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import * as process from 'process';

import { IInputOutput, Input, KernelHost, Output } from '../lib';

const recordsDir = createRecords();
const records = fs
  .readdirSync(recordsDir)
  .map((file) => path.join(recordsDir, file));

test('are present', () => {
  expect(records).not.toEqual([]);
});

describe(`replay records in ${recordsDir}`, () => {
  for (const record of records) {
    test(path.basename(record, '.log'), () => {
      const inout = new PlaybackInputOutput(record);
      const host = new KernelHost(inout, { noStack: true, debug: false });

      return new Promise<void>((ok) => {
        host.once('exit', (code) => {
          expect(code).toBe(0);
          ok(inout.expectCompleted());
        });

        host.run();
      });
    });
  }
});

function createRecords(): string {
  const records = fs.mkdtempSync(
    path.join(os.tmpdir(), 'jsii-kernel.recording.'),
  );
  const result = child.spawnSync(
    process.execPath,
    [
      ...process.execArgv,
      require.resolve('jest/bin/jest'),
      '--no-coverage',
      '--runInBand',
      'lib/kernel.test.js',
    ],
    {
      cwd: path.resolve(
        require.resolve('@jsii/kernel/lib/kernel.test.js'),
        '..',
        '..',
      ),
      env: { ...process.env, JSII_RECORD: records, JSII_NOSTACK: '1' },
      stdio: ['inherit', 'pipe', 'pipe'],
      timeout: 300_000, // 5 minutes
    },
  );

  if (result.error != null) {
    throw result.error;
  }

  if (result.signal != null || result.status !== 0) {
    console.log(
      result.stdout
        .toString('utf-8')
        .split('\n')
        .map((x) => `STDOUT: ${x}`)
        .join('\n'),
    );
    console.error(
      result.stderr
        .toString('utf-8')
        .split('\n')
        .map((x) => `STDERR: ${x}`)
        .join('\n'),
    );
  }

  if (result.signal != null) {
    throw new Error(`Kernel test runner exited with signal: ${result.signal}`);
  }

  if (result.status !== 0) {
    throw new Error(`Kernel test runner exited with code: ${result.status}`);
  }

  return records;
}

class PlaybackInputOutput implements IInputOutput {
  public readonly inputCommands: Input[];
  public readonly expectedOutputs: Output[];

  public constructor(recordPath: string) {
    const inputLines = fs
      .readFileSync(recordPath, { encoding: 'utf-8' })
      .split('\n');
    this.inputCommands = inputLines
      .filter((line) => line.startsWith('>'))
      .map((line) => JSON.parse(line.substring(1)))
      .reverse();
    this.expectedOutputs = inputLines
      .filter((line) => line.startsWith('<'))
      .map((line) => JSON.parse(line.substring(1)))
      .reverse();
  }

  public read(): Input | undefined {
    return this.inputCommands.pop();
  }

  public write(obj: Output): void {
    expect(obj).toEqual(this.expectedOutputs.pop());
  }

  /**
   * Validates that all inputs have been consumed, and all expected outputs have been checked.
   */
  public expectCompleted(): void {
    expect(this.inputCommands).toEqual([]);
    expect(this.expectedOutputs).toEqual([]);
  }
}
