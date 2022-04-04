#!/usr/bin/env npx ts-node

import { removeSync } from 'fs-extra';
import { join, resolve } from 'path';
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
  ['-m', 'pip', 'install', '-r', resolve(__dirname, '..', 'requirements.txt')],
  { env },
);

// Sometimes, pip leaves a `build` directory behind, which can mess with mypy
// when run with `pytest --mypy`. This directory should be transient and so we
// simply clean it up here.
removeSync(resolve(__dirname, '..', 'build'));
