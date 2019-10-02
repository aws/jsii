import childProcess = require('child_process');
import path = require('path');
import { promisify } from 'util';
import { diffTest } from './util';

const exec = promisify(childProcess.exec);

test('jsii-tree', async () => {
  const stdout = await jsiiTree();
  expect(stdout).toEqual(
    `assemblies
 ├── jsii-calc
 ├── @scope/jsii-calc-base
 ├── @scope/jsii-calc-base-of-base
 └── @scope/jsii-calc-lib
`);
});

test('jsii-tree --all', async () => {
  await jsiiTreeTest('jsii-tree.test.all.expected.txt', '--all');
});

test('jsii-tree --types', async () => {
  await jsiiTreeTest('jsii-tree.test.types.expected.txt', '--types');
});

test('jsii-tree --members', async () => {
  await jsiiTreeTest('jsii-tree.test.members.expected.txt', '--members');
});

test('jsii-tree --inheritance', async () => {
  await jsiiTreeTest('jsii-tree.test.inheritance.expected.txt', '--inheritance');
});

test('jsii-tree --signatures', async () => {
  await jsiiTreeTest('jsii-tree.test.signatures.expected.txt', '--signatures');
});

async function jsiiTreeTest(expectedFile: string, ...args: string[]) {
  const actual = await jsiiTree(...args);

  await diffTest(actual, expectedFile);
}

async function jsiiTree(...args: string[]) {
  const command = [
    path.join(__dirname, '..', 'bin', 'jsii-tree'),
    args.join(' '),
    '--no-colors',
    path.dirname(require.resolve('jsii-calc/package.json'))
  ].join(' ');

  const { stdout, stderr } = await exec(command);

  if (stderr) {
    console.error(stderr);
  }

  return stdout;
}
