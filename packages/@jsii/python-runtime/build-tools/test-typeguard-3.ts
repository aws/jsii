#!/usr/bin/env npx ts-node

/**
 * Run tests with typeguard 3.0.2 installed.
 *
 * Skipped on Python 3.14+ because typeguard 3.0.2 uses `ast.Str` which was
 * removed in Python 3.14. See: https://github.com/agronholm/typeguard/issues/471
 */

import { join } from 'path';
import { spawnSync } from 'child_process';
import { venv, runCommand } from './_constants';

const python = join(venv.bin, 'python');

// Check Python version
const result = spawnSync(python, [
  '-c',
  'import sys; print(f"{sys.version_info.major}.{sys.version_info.minor}")',
], { encoding: 'utf-8' });

const version = result.stdout.trim();
const [major, minor] = version.split('.').map(Number);

if (major > 3 || (major === 3 && minor >= 14)) {
  console.log(`Skipping typeguard 3.x test: typeguard 3.0.2 is incompatible with Python ${version} (uses removed ast.Str)`);
  process.exit(0);
}

runCommand(python, ['-m', 'pip', 'install', 'typeguard==3.0.2']);
runCommand(join(venv.bin, 'py.test'), ['-v', '--mypy']);
