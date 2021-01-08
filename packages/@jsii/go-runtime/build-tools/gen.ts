#!/usr/bin/env npx ts-node

import { CodeMaker } from 'codemaker';
import { readdirSync, readFileSync, statSync } from 'fs';
import { resolve } from 'path';

const EMBEDDED_RUNTIME_ROOT = resolve(
  __dirname,
  '..',
  '..',
  'runtime',
  'webpack',
);

const OUTPUT_DIR = resolve(__dirname, '..', 'jsii-experimental');

const RUNTIME_FILE = 'embeddedruntime.generated.go';
const VERSION_FILE = 'version.generated.go';

const code = new CodeMaker({ indentationLevel: 1, indentCharacter: '\t' });

code.openFile(RUNTIME_FILE);
code.line('package jsii');
code.line();
code.open('var embeddedruntime = map[string][]byte{');
const bytesPerLine = 16;
const fileSize: Record<string, number> = {};

(function emitFiles(directory: string, prefix?: string) {
  for (const file of readdirSync(directory)) {
    // Ignore dot-files
    if (file.startsWith('.')) {
      continue;
    }
    const fullPath = resolve(directory, file);

    if (statSync(fullPath).isDirectory()) {
      // Not using path.join because we don't want Windows delimiters here!
      emitFiles(fullPath, prefix ? `${prefix}/${file}` : file);
      continue;
    }

    const key = prefix ? `${prefix}/${file}` : file;

    const byteSlice = getByteSlice(fullPath);
    fileSize[key] = byteSlice.length;
    code.open(`${JSON.stringify(key)}: []byte{`);
    for (let i = 0; i < byteSlice.length; i += bytesPerLine) {
      const line = byteSlice.slice(i, i + bytesPerLine);
      code.line(`${line.join(', ')},`);
    }
    code.close('},');
  }
})(EMBEDDED_RUNTIME_ROOT);

code.close('}');
code.line();
const mainKey = JSON.stringify(
  Object.keys(fileSize).find((f) => f.endsWith('jsii-runtime.js')),
)!;
code.line(`const embeddedruntimeMain = ${mainKey}`);
code.line();
// This performs sanity tests upon initialization
code.open('func init() {');
for (const [file, size] of Object.entries(fileSize)) {
  code.open(`if len(embeddedruntime[${JSON.stringify(file)}]) != ${size} {`);
  code.line(
    `panic("Embedded runtime file ${file} does not have expected size of ${size} bytes!")`,
  );
  code.close('}');
}
code.close('}');
code.closeFile(RUNTIME_FILE);

code.openFile(VERSION_FILE);
code.line('package jsii');
code.line();

// eslint-disable-next-line @typescript-eslint/no-var-requires, @typescript-eslint/no-require-imports
const thisVersion = require('../package.json').version;
code.line(`const version = ${JSON.stringify(thisVersion)}`);
code.closeFile(VERSION_FILE);

code.save(OUTPUT_DIR).catch(console.error);

function getByteSlice(path: string) {
  const fileData = readFileSync(path).toString('hex');
  const result = [];
  for (let i = 0; i < fileData.length; i += 2) {
    result.push(`0x${fileData[i]}${fileData[i + 1]}`);
  }

  return result;
}
