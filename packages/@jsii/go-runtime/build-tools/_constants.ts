import {
  exec as cpExec,
  spawnSync,
  SpawnOptions,
  SpawnSyncReturns,
} from 'child_process';
import { promisify } from 'util';

export function runCommand(
  command: string,
  args: readonly string[],
  opts: SpawnOptions = {},
): SpawnSyncReturns<Buffer> {
  const result = spawnSync(command, args, {
    ...opts,
    shell: process.platform === 'win32',
  });
  if (result.error) {
    throw result.error;
  }
  if (result.status !== 0) {
    throw new Error(
      `Command failed with ${
        result.signal != null
          ? `signal ${result.signal}`
          : `code ${result.status}`
      }: ${command} ${args.join(' ')}`,
    );
  }
  return result;
}

export const exec = promisify(cpExec);
