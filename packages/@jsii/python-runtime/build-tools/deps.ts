#!/usr/bin/env npx ts-node

import { join } from 'path';
import { venv, runCommand } from './_constants';

const python = join(venv.bin, 'python');

runCommand('python3', ['-m', 'venv', venv.root]);

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
    '--no-input',
    'pip~=20.2',
    'setuptools~=46.1.3',
    'wheel~=0.34.2',
  ],
  { env },
);
runCommand(
  python,
  ['-m', 'pip', 'install', '--no-input', '-r', 'requirements.txt'],
  { env },
);
