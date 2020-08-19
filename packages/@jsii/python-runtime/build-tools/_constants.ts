import { spawnSync, SpawnOptions } from 'child_process';
import { join, resolve } from 'path';

const venvRoot = resolve(__dirname, '..', '.env');

export const venv = {
  root: venvRoot,
  bin: join(venvRoot, process.platform === 'win32' ? 'Scripts' : 'bin'),
} as const;

export function runCommand(
  command: string,
  args: readonly string[],
  opts: SpawnOptions = {},
): void {
  const result = spawnSync(command, args, {
    ...opts,
    shell: process.platform === 'win32',
    stdio: 'inherit',
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
}
