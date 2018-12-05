import child_process = require('child_process');
import fs = require('fs');
import path = require('path');
import { promisify } from 'util';

const exec = promisify(child_process.exec);
const writeFile = promisify(fs.writeFile);
const readFile = promisify(fs.readFile);

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

test(`jsii-tree -all`, async () => {
  await jsiiTreeTest('jsii-tree.test.all.expected.txt', '--all');
});

test(`jsii-tree --types`, async () => {
  await jsiiTreeTest('jsii-tree.test.types.expected.txt', '--types');
});

test(`jsii-tree --members`, async () => {
  await jsiiTreeTest('jsii-tree.test.members.expected.txt', '--members');
});

test(`jsii-tree --inheritance`, async () => {
  await jsiiTreeTest('jsii-tree.test.inheritance.expected.txt', '--inheritance');
});

test(`jsii-tree --signatures`, async () => {
  await jsiiTreeTest('jsii-tree.test.signatures.expected.txt', '--signatures');
});

async function jsiiTreeTest(expected: string, ...args: string[]) {
  expect(await jsiiTree(...args)).toEqual(await readExpected(expected));
}

async function jsiiTree(...args: string[]) {
  const command = [
    path.join(__dirname, '..', 'bin', 'jsii-tree'),
    args.join(' '),
    '--no-colors',
    path.dirname(require.resolve('jsii-calc/package.json'))
  ].join(' ');
  const { stdout, stderr } = (await exec(command));

  await writeFile('jsii-tree.test.stdout', stdout);

  if (stderr) {
    // tslint:disable-next-line:no-console
    console.error(stderr);
  }

  return stdout;
}

async function readExpected(file: string) {
  return (await readFile(path.join(__dirname, file))).toString();
}