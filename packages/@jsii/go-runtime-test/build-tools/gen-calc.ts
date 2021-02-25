#!/usr/bin/env npx ts-node

import { removeSync } from 'fs-extra';
import { join, resolve } from 'path';

import { runCommand } from './_constants';

const genRoot = join(__dirname, '..', 'jsii-calc');

removeSync(genRoot);
runCommand(
  'npx',
  [
    'jsii-pacmak',
    '-t',
    'go',
    '-v',
    '-c',
    '-o',
    genRoot,
    '--recurse',
    resolve(__dirname, '..', '..', '..', 'jsii-calc'),
  ],
  { stdio: 'inherit' },
);
