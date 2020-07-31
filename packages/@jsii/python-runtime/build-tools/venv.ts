#!/usr/bin/env npx ts-node

import { join } from 'path';
import { venv, runCommand } from './_constants';

const [, , command, ...args] = process.argv;

const argv0 = join(venv.bin, command);

console.log(`Running: ${argv0} ${args.join(' ')}`);
runCommand(argv0, args);
