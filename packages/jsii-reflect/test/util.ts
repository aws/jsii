import fs = require('fs');
import { sourceToAssemblyHelper } from 'jsii/lib/helpers';
import os = require('os');
import path = require('path');
import { promisify } from 'util';
import { Assembly, TypeSystem } from '../lib';

const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);
const mkdtemp = promisify(fs.mkdtemp);
const exists = promisify(fs.exists);

export async function diffTest(actual: string, expectedFile: string) {
  const expectedPath = path.join(__dirname, expectedFile);
  const actualPath = path.join(await mkdtemp(path.join(os.tmpdir(), 'diff-test')), 'actual.out');
  const expected = await exists(expectedPath) ? (await readFile(expectedPath)).toString() : '';

  await writeFile(actualPath, actual);

  if (actual !== expected) {
    let msg = '===============================================================================\n';
    msg += `Diff test failed. Actual output differs from contents of: ${expectedFile}\n`;

    if (process.env.UPDATE_DIFF) {
      await writeFile(expectedPath, actual);
      msg += `Updated "${expectedFile}" (since UPDATE_DIFF=1)\n`;
    } else {
      msg += 'To see the diff run:\n';
      msg += '\n';
      msg += '    diff \\\n';
      msg += `        ${actualPath}\\\n`;
      msg += `        ${expectedPath}\n`;
      msg += '\n';
      msg += 'To update expectation file: run tests with UPDATE_DIFF=1\n';
    }

    msg += '===============================================================================\n';
    console.log(msg);
  }

  expect(actual).toEqual(expected);
}

export async function typeSystemFromSource(source: string) {
  const assembly = await sourceToAssemblyHelper(source);
  const ts = new TypeSystem();
  ts.addAssembly(new Assembly(ts, assembly));
  return ts;
}
