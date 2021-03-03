import { spawnSync } from 'child_process';
import { constants } from 'os';
import { join } from 'path';
import { argv, exit } from 'process';

import { runCommand } from './_constants';

if (argv.length < 3) {
  console.error(`Not enough arguments: ${argv[0]} ${argv[1]} <cmd> [args]`);
  exit(1);
}

const [, , cmd, ...args] = argv;

const result = spawnSync('go', ['env', 'GOPATH'], {
  stdio: ['inherit', 'pipe', 'inherit'],
});

if (result.error) {
  console.error('"go env GOPATH" failed:', result.error);
  exit(-1);
}

if (result.status !== 0) {
  console.error('"go env GOPATH" failed:', result.status ?? result.signal);
  exit(
    result.status ?? 128 + constants.signals[result.signal as NodeJS.Signals],
  );
}

const gopath = result.stdout.toString('utf8').trim();
runCommand(join(gopath, 'bin', cmd), args);
