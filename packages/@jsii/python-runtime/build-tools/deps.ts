#!/usr/bin/env npx ts-node

import { removeSync } from 'fs-extra';
import { join, resolve } from 'path';
import { venv, runCommand } from './_constants';

const python = join(venv.bin, 'python');

// On Windows, there is usually no python3.exe (the GitHub action workers will have a python3
// shim, but using this actually results in a WinError with Python 3.7 and 3.8 where venv will
// fail to copy the python binary if it's not invoked as python.exe). More on this particular
// issue can be read here: https://bugs.python.org/issue43749
runCommand(process.platform === 'win32' ? 'python' : 'python3', ['-m', 'venv', venv.root]);

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
