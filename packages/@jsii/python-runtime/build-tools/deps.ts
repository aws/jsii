#!/usr/bin/env npx ts-node

import { join, resolve } from 'path';
import { venv, runCommand } from './_constants';

const python = join(venv.bin, 'python');

runCommand('python3', ['-m', 'venv', '--system-site-packages', venv.root]);

const env = {
  ...process.env,
  PATH: `${venv.bin}:${process.env.PATH}`,
  VIRTUAL_ENV: venv.root,
};

runCommand(
  python,
  [
    '-m',
    'pip',
    'install',
    '-r',
    resolve(__dirname, '..', 'requirements-dev.txt'),
  ],
  { env },
);
