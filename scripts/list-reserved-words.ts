#!/usr/bin/env npx ts-node
import { CSHARP_RESERVED, JAVA_RESERVED, PYTHON_RESERVED } from '../packages/jsii/lib/reserved-words';

const TS = new Set([
  // General
  'break',
  'case',
  'catch',
  'class',
  'const',
  'continue',
  'debugger',
  'default',
  'delete',
  'do',
  'else',
  'enum',
  'export',
  'extends',
  'false',
  'finally',
  'for',
  'function',
  'if',
  'import',
  'in',
  'instanceof',
  'new',
  'null',
  'return',
  'super',
  'switch',
  'this',
  'throw',
  'true',
  'try',
  'typeof',
  'var',
  'void',
  'while',
  'with',
  // Strict mode
  'as',
  'implements',
  'interface',
  'let',
  'package',
  'private',
  'protected',
  'public',
  'static',
  'yield',
]);

const CSHARP = Array.from(CSHARP_RESERVED).filter(w => !TS.has(w)).sort();
const JAVA = Array.from(JAVA_RESERVED).filter(w => !TS.has(w)).sort();
const PYTHON = Array.from(PYTHON_RESERVED).filter(w => !TS.has(w)).sort();

const length = (s: string) => s.length;
let width = Math.max(8, ...CSHARP.map(length), ...JAVA.map(length), ...PYTHON.map(length)) + 2;
const pad = (str: string) => str.length >= width ? str : `${str}${' '.repeat(width - str.length)}`;

console.log(`%s | %s | %s`, pad('**C#**'), pad('**Java**'), pad('**Python**'));
console.log(`%s-|-%s-|-%s`, '-'.repeat(width), '-'.repeat(width), '-'.repeat(width));

const count = Math.max(CSHARP.length, JAVA.length, PYTHON.length);
for (let i = 0; i < count; i++) {
  console.log(`%s | %s | %s`,
    pad(i < CSHARP.length ? `\`${CSHARP[i]}\`` : ''),
    pad(i < JAVA.length   ? `\`${JAVA[i]}\``   : ''),
    pad(i < PYTHON.length ? `\`${PYTHON[i]}\`` : ''));
}

