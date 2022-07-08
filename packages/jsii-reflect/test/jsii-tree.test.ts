import * as childProcess from 'child_process';
import * as path from 'path';
import { promisify } from 'util';

const exec = promisify(childProcess.exec);

test('jsii-tree', () => expect(jsiiTree()).resolves.toMatchSnapshot());

test('jsii-tree --all', () =>
  expect(jsiiTree('--all')).resolves.toMatchSnapshot());

test('jsii-tree --types', () =>
  expect(jsiiTree('--types')).resolves.toMatchSnapshot());

test('jsii-tree --members', () =>
  expect(jsiiTree('--members')).resolves.toMatchSnapshot());

test('jsii-tree --inheritance', () =>
  expect(jsiiTree('--inheritance')).resolves.toMatchSnapshot());

test('jsii-tree --signatures', () =>
  expect(jsiiTree('--signatures')).resolves.toMatchSnapshot());

async function jsiiTree(...args: string[]) {
  const command = [
    process.execPath,
    ...process.execArgv,
    path.join(__dirname, '..', 'bin', 'jsii-tree'),
    ...args,
    '--no-colors',
    path.dirname(require.resolve('jsii-calc/package.json')),
  ].join(' ');

  const { stdout, stderr } = await exec(command);

  if (stderr) {
    console.error(stderr);
  }

  return stdout;
}
