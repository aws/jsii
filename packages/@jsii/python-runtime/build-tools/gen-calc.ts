#!/usr/bin/env npx ts-node

import { readdirSync, removeSync } from 'fs-extra';
import { join, resolve } from 'path';
import { venv, runCommand } from './_constants';

const genRoot = join(venv.root, 'jsii-calc');

removeSync(genRoot);
runCommand(
  'npx',
  [
    'jsii-pacmak',
    '-t',
    'python',
    '-o',
    genRoot,
    '--recurse',
    resolve(__dirname, '..', '..', '..', 'jsii-calc'),
  ],
  {
    env: {
      ...process.env,
      PATH: `${venv.bin}:${process.env.PATH}`,
      VIRTUAL_ENV: venv.root,
    },
  },
);

runCommand(join(venv.bin, 'python'), [
  '-m',
  'pip',
  'install',
  '--no-input',
  '--upgrade',
  '--force-reinstall',
  ...readdirSync(join(genRoot, 'python'))
    .filter((file) => file.endsWith('.whl'))
    .map((file) => join(genRoot, 'python', file)),
]);
