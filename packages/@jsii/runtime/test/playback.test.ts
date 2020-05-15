import * as child from 'child_process';
import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import * as process from 'process';

import { InputOutput, KernelHost, Input, Output } from '../lib';

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
        host.on('exit', () => {
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
    require.resolve('jest/bin/jest'),
    [require.resolve('@jsii/kernel/test/kernel.test.js')],
    {
      env: { ...process.env, JSII_RECORD: records, JSII_NOSTACK: '1' },
      shell: true,
      stdio: ['inherit', 'pipe', 'pipe'],
      cwd: path.resolve(
        require.resolve('@jsii/kernel/test/kernel.test.js'),
        '..',
        '..',
      ),
    },
  );

  if (result.error != null) {
    throw result.error;
  }

  if (result.signal != null || result.status !== 0) {
    console.log(result.stdout);
    console.error(result.stderr.toString('utf-8'));
  }

  if (result.signal != null) {
    throw new Error(`Kernel test runner exited with signal: ${result.signal}`);
  }

  if (result.status !== 0) {
    throw new Error(`Kernel test runner exited with code: ${result.status}`);
  }

  return records;
}

class PlaybackInputOutput extends InputOutput {
  public readonly inputCommands: Input[];
  public readonly expectedOutputs: Output[];

  public constructor(recordPath: string) {
    super();
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
