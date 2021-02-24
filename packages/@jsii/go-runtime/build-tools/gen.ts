#!/usr/bin/env npx ts-node

import { CodeMaker } from 'codemaker';
import { createHash } from 'crypto';
import { readdirSync, readFileSync, statSync } from 'fs';
import { resolve } from 'path';

const EMBEDDED_RUNTIME_ROOT = resolve(
  __dirname,
  '..',
  '..',
  'runtime',
  'webpack',
);

const OUTPUT_DIR = resolve(__dirname, '..', 'jsii-runtime-go', 'kernel');

const RUNTIME_FILE = 'embeddedruntime.generated.go';
const RUNTIME_TEST_FILE = 'embeddedruntime.generated_test.go';
const VERSION_FILE = 'version.generated.go';

const code = new CodeMaker({ indentationLevel: 1, indentCharacter: '\t' });

code.openFile(RUNTIME_FILE);
code.line('package kernel');
code.line();
code.open('var embeddedruntime = map[string][]byte{');
const fileInfo: Record<
  string,
  { readonly size: number; readonly hash: readonly string[] }
> = {};

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

    const { byteSlice, hash } = getByteSlice(fullPath);
    fileInfo[key] = {
      size: byteSlice.length,
      hash,
    };
    code.open(`${JSON.stringify(key)}: []byte{`);
    formatBytes(code, byteSlice);
    code.close('},');
  }
})(EMBEDDED_RUNTIME_ROOT);

code.close('}');
code.line();
const mainKey = JSON.stringify(
  Object.keys(fileInfo).find((f) => f.endsWith('jsii-runtime.js')),
)!;
code.line(`const embeddedruntimeMain = ${mainKey}`);
code.closeFile(RUNTIME_FILE);

// This allows us to sanity-check we've generated correct data
code.openFile(RUNTIME_TEST_FILE);
code.line('package kernel');
code.line();
code.open('import (');
code.line('"crypto/sha512"');
code.line('"testing"');
code.close(')');
code.line();
code.openBlock('func TestEmbeddedruntime(t *testing.T)');

code.open(
  't.Run("embeddedruntime[embeddedruntimeMain] exists", func(t *testing.T) {',
);
code.openBlock('if _, exists := embeddedruntime[embeddedruntimeMain]; !exists');
code.line(
  't.Errorf("embeddedruntimeMain refers to non-existent file %s", embeddedruntimeMain)',
);
code.closeBlock();
code.close('})');

for (const [file, { size, hash }] of Object.entries(fileInfo)) {
  code.line();
  code.open(`t.Run("embeddedruntime[\\"${file}\\"]", func(t *testing.T) {`);

  code.open('checkEmbeddedFile(');
  code.line('t,');
  code.line(`"${file}",`);
  code.line(`${readableNumber(size)},`);
  code.open('[sha512.Size]byte{');
  formatBytes(code, hash);
  code.close('},');
  code.close(')');

  code.close('})');
}
code.closeBlock();
code.line();
code.openBlock(
  'func checkEmbeddedFile(t *testing.T, name string, expectedSize int, expectedHash [sha512.Size]byte)',
);
code.line('data := embeddedruntime[name]');
code.line();
code.line('size := len(data)');
code.openBlock('if size != expectedSize');
code.line(
  't.Errorf("Size mismatch: expected %d bytes, got %d", expectedSize, size)',
);
code.closeBlock();
code.line();
code.line('hash := sha512.Sum512(data)');
code.openBlock('if hash != expectedHash');
code.line(
  't.Errorf("SHA512 do not match:\\nExpected: %x\\nActual:   %x", expectedHash, hash)',
);
code.closeBlock();
code.closeBlock();
code.closeFile(RUNTIME_TEST_FILE);

code.openFile(VERSION_FILE);
code.line('package kernel');
code.line();

// eslint-disable-next-line @typescript-eslint/no-var-requires, @typescript-eslint/no-require-imports
const thisVersion = require('../package.json').version;
code.line(`const version = ${JSON.stringify(thisVersion)}`);
code.closeFile(VERSION_FILE);

code.save(OUTPUT_DIR).catch(console.error);

function getByteSlice(path: string): { byteSlice: string[]; hash: string[] } {
  const rawData = readFileSync(path);
  return {
    byteSlice: toHexBytes(rawData),
    hash: toHexBytes(createHash('SHA512').update(rawData).digest()),
  };
}

function toHexBytes(rawData: Buffer): string[] {
  const hexString = rawData.toString('hex');
  const result = [];
  for (let i = 0; i < hexString.length; i += 2) {
    result.push(`0x${hexString[i]}${hexString[i + 1]}`);
  }
  return result;
}

function formatBytes(
  code: CodeMaker,
  byteSlice: readonly string[],
  bytesPerLine = 16,
) {
  for (let i = 0; i < byteSlice.length; i += bytesPerLine) {
    const line = byteSlice.slice(i, i + bytesPerLine);
    code.line(`${line.join(', ')},`);
  }
}

/**
 * Turns a integer into a "human-readable" format, adding an `_` thousand
 * separator.
 *
 * @param val an integer to be formatted.
 *
 * @returns the formatted number with thousand separators.
 */
function readableNumber(val: number): string {
  return val.toFixed(0).replace(
    // This regex can be a little jarring, so it is annotated below with the
    // corresponding explanation. It can also be explained in plain english:
    // matches the position before any sequence of N consecutive digits (0-9)
    // where N is a multiple of 3.
    /**/ /\B(?=(\d{3})+(?!\d))/g,
    //    \B                      -- not a word boundary (i.e: not start of input)
    //      (?=              )    -- positive lookahead (does not consume input)
    //         (     )+           -- repeated one or more times
    //          \d                -- any digit (0-9)
    //            {3}             -- repeated exactly 3 times
    //                 (?!  )     -- negative lookahead (does not consume input)
    //                    \d      -- any digit (0-9), negated by surrounding group
    //
    '_',
  );
}
