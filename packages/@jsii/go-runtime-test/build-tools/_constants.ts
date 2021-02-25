import { spawnSync, SpawnOptions } from 'child_process';

export function runCommand(
  command: string,
  args: readonly string[],
  opts: SpawnOptions = {},
): void {
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
}
