import * as path from 'path';

import { resolveBinScript } from './bin-script';

const packageDir = path.resolve('/install/node_modules/pkg');

test.each([
  ['bin/run', path.join(packageDir, 'bin', 'run')],
  ['./bin/run', path.join(packageDir, 'bin', 'run')],
  ['bin/../lib/cli.js', path.join(packageDir, 'lib', 'cli.js')],
  // npm treats absolute bin paths as relative to the package
  ['/bin/sh', path.join(packageDir, 'bin', 'sh')],
])('resolves %j inside the package directory', (scriptPath, expected) => {
  expect(resolveBinScript(packageDir, { cli: scriptPath }, 'cli')).toBe(
    expected,
  );
});

test.each([
  '..',
  '../other/bin/run',
  '../../../etc/passwd',
  'bin/../../escape',
  '.',
  './',
])('rejects %j, which does not resolve inside the package', (scriptPath) => {
  expect(() =>
    resolveBinScript(packageDir, { cli: scriptPath }, 'cli'),
  ).toThrow(/resolves outside of the package directory/);
});

test.each<[string, unknown, string]>([
  ['no bin field', undefined, 'cli'],
  ['null bin field', null, 'cli'],
  ['bin field as a string', 'bin/run', 'cli'],
  ['script not declared', { other: 'bin/run' }, 'cli'],
  ['inherited property', {}, 'toString'],
  ['non-string script path', { cli: 42 }, 'cli'],
  ['empty script path', { cli: '' }, 'cli'],
])('rejects %s', (_, bin, script) => {
  expect(() => resolveBinScript(packageDir, bin, script)).toThrow(
    `Script with name ${script} was not defined.`,
  );
});
