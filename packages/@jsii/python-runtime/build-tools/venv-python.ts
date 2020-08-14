#!/usr/bin/env npx ts-node

import { join } from 'path';
import { venv, runCommand } from './_constants';

const [, , ...args] = process.argv;

const python = join(venv.bin, 'python');

console.log(`Running: ${python} -m ${args.join(' ')}`);

runCommand(python, ['-m', ...args], {
  env: {
    ...process.env,
    PATH: `${venv.bin}:${process.env.PATH}`,
    VIRTUAL_ENV: venv.root,
  },
});
