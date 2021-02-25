#!/usr/bin/env npx ts-node

import { CodeMaker } from 'codemaker';
import { copySync, mkdirpSync } from 'fs-extra';
import { join, resolve } from 'path';

const EMBEDDED_RUNTIME_SOURCE_ROOT = resolve(
  __dirname,
  '..',
  '..',
  'runtime',
  'webpack',
);

const RUNTIME_ROOT = resolve(__dirname, '..', 'jsii-runtime-go');

const EMBEDDED_RESOURCE_DIR = join(RUNTIME_ROOT, 'embedded', 'resources');

mkdirpSync(EMBEDDED_RESOURCE_DIR);
copySync(EMBEDDED_RUNTIME_SOURCE_ROOT, EMBEDDED_RESOURCE_DIR, {
  dereference: true,
  errorOnExist: false,
  overwrite: true,
  preserveTimestamps: true,
  recursive: true,
});

const KERNEL_LIB_DIR = resolve(RUNTIME_ROOT, 'kernel');
const code = new CodeMaker({ indentationLevel: 1, indentCharacter: '\t' });

const VERSION_FILE = 'version.generated.go';
code.openFile(VERSION_FILE);
code.line('package kernel');
code.line();

// eslint-disable-next-line @typescript-eslint/no-var-requires, @typescript-eslint/no-require-imports
const thisVersion = require('../package.json').version;
code.line(`const version = ${JSON.stringify(thisVersion)}`);
code.closeFile(VERSION_FILE);

code.save(KERNEL_LIB_DIR).catch(console.error);
