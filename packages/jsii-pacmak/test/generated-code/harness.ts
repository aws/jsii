#!/usr/bin/env node

import { spawnSync, SpawnSyncOptions } from 'child_process';
import * as fs from 'fs-extra';
import * as os from 'os';
import * as path from 'path';
import * as process from 'process';
import { TargetName } from '../../lib/targets';

const PACMAK_CLI = path.resolve(__dirname, '..', '..', 'bin', 'jsii-pacmak');

const FILE = Symbol('file');
const MISSING = Symbol('missing');
const TARBALL = Symbol('tarball');
const TREE = Symbol('tree');

// Custom serializers so we can see the source without escape sequences
expect.addSnapshotSerializer({
  test: (val) => val?.[FILE] != null,
  serialize: (val) => val[FILE],
});
expect.addSnapshotSerializer({
  test: (val) => val?.[MISSING] != null,
  serialize: (val) => `${val[MISSING]} does not exist`,
});

expect.addSnapshotSerializer({
  test: (val) => val?.[TARBALL] != null,
  serialize: (val) =>
    `${val[TARBALL]} ${
      val[TARBALL].endsWith('.tgz') ? 'is' : 'embeds'
    } a tarball`,
});
expect.addSnapshotSerializer({
  test: (val) => val?.[TREE] != null,
  serialize: (val) => {
    return `<root>\n${formatTree(val[TREE])}`;
  },
});

export function verifyGeneratedCodeFor(targetName: TargetName) {
  let outDir: string;
  beforeEach((done) => {
    outDir = fs.mkdtempSync(path.join(os.tmpdir(), path.basename(__filename)));

    done();
  });
  afterEach((done) => {
    fs.removeSync(outDir);
    outDir = undefined as any;

    done();
  });

  for (const pkg of [
    '@scope/jsii-calc-base-of-base',
    '@scope/jsii-calc-base',
    '@scope/jsii-calc-lib',
    'jsii-calc',
  ]) {
    // Extend timeout, because this could be slow...
    jest.setTimeout(60_000);

    test(`Generated code for ${JSON.stringify(pkg)}`, () => {
      const pkgRoot = path.resolve(__dirname, '..', '..', '..', pkg);
      runPacmak(pkgRoot, targetName, outDir);

      expect({ [TREE]: checkTree(outDir) }).toMatchSnapshot('<outDir>/');

      if (targetName === 'python') {
        runMypy(path.join(outDir, 'python'));
      }
    });
  }
}

function checkTree(
  file: string,
  root: string = file,
): TreeStructure | undefined {
  const stat = tryStat(file);

  // Normalizing paths so snapshots are identical in Windows, too...
  const relativeFile = path.relative(root, file).replace(/\\/g, '/');
  const snapshotName = `<outDir>/${relativeFile}`;

  if (stat == null) {
    expect({ [MISSING]: relativeFile }).toMatchSnapshot(snapshotName);
    return undefined;
  }

  if (stat.isFile()) {
    if (file.endsWith('.tgz') || file.endsWith('.embedded.go')) {
      // Special-cased to avoid binary differences being annoying
      expect({ [TARBALL]: relativeFile }).toMatchSnapshot(snapshotName);
    } else {
      expect({
        [FILE]: fs.readFileSync(file, { encoding: 'utf-8' }),
      }).toMatchSnapshot(snapshotName);
    }
    return path.basename(file);
  }

  return fs
    .readdirSync(file)
    .map((entry) => ({
      entry,
      subtree: checkTree(path.join(file, entry), root),
    }))
    .reduce((tree, { entry, subtree }) => {
      tree[entry] = subtree!;
      return tree;
    }, {} as { [name: string]: TreeStructure });

  function tryStat(at: string) {
    try {
      return fs.statSync(at);
    } catch (e) {
      if (e.code !== os.constants.errno.ENOENT) {
        throw e;
      }
      return undefined;
    }
  }
}

function runPacmak(root: string, targetName: TargetName, outdir: string): void {
  return runCommand(
    process.execPath,
    [
      ...process.execArgv,
      PACMAK_CLI,
      `--code-only`,
      `--no-fingerprint`,
      `--outdir=${outdir}`,
      `--target=${targetName}`,
      '--',
      root,
    ],
    {
      cwd: root,
      stdio: ['inherit', 'pipe', 'pipe'],
    },
  );
}

function runMypy(pythonRoot: string): void {
  const venvRoot = path.join(__dirname, '.venv');
  const venvBin = path.join(
    venvRoot,
    process.platform === 'win32' ? 'Scripts' : 'bin',
  );
  const venvPython = path.join(venvBin, 'python');

  const env = {
    ...process.env,
    PATH: `${venvBin}:${process.env.PATH}`,
    VIRTUAL_ENV: venvRoot,
  };

  // Create a Python virtual environment
  runCommand('python3', [
    '-m',
    'venv',
    '--system-site-packages', // Allow using globally installed packages (saves time & disk space)
    venvRoot,
  ]);
  // Install mypy and the jsii runtime in there as needed
  runCommand(
    venvPython,
    [
      '-m',
      'pip',
      'install',
      '--no-input',
      'mypy>=0.782',
      // Note: this resolution is a little ugly, but it's there to avoid creating a dependency cycle
      path.resolve(require.resolve('@jsii/python-runtime/package.json'), '..'),
    ],
    {
      env,
    },
  );
  // Now run mypy on the Python code
  runCommand(
    venvPython,
    [
      '-m',
      'mypy',
      '--ignore-missing-imports', // We may not have the package's dependencies in scope. Let's just ignore that for now.
      '--pretty', // Output in readable form, with source excerpts and problem markers
      '--show-error-codes', // Show the "standard" error codes to make it easier to google around
      '--strict', // Enable all optional checks -- let's be pedantic about everything!
      pythonRoot,
    ],
    { env },
  );
}

/**
 * Runs a command and asserts that it was successful. If the command failed,
 * it's standard out and error from the child process will be made visible
 * through `console.error`, unless the `stdio` option for `stdout` and/or
 * `stderr` is overridden from `inherit`.
 *
 * By default, `spawnSync` is invoked with `shell: true` if the current platform
 * is `win32`. This can be overridden through `options`.
 *
 * @param argv0   the entry point for the command to be run.
 * @param argv    the arguments to pass to argv0.
 * @param options options to be provided to `spawnSync`.
 */
function runCommand(
  argv0: string,
  argv: readonly string[],
  options?: SpawnSyncOptions,
) {
  const { error, signal, status, stderr, stdout } = spawnSync(argv0, argv, {
    shell: process.platform === 'win32',
    stdio: ['inherit', 'pipe', 'pipe'],
    ...options,
  });

  expect(error).toBeUndefined();

  if (status !== 0) {
    const reason = signal ? `signal ${signal}` : `status ${status}`;
    console.error(
      [
        `Command failed with ${reason}: ${argv0} ${argv.join(' ')}`,
        prefix(stdout, '#STDOUT> '),
        prefix(stderr, '#STDERR> '),
      ].join('\n'),
    );
  }

  expect(signal).toBeNull();
  expect(status).toBe(0);

  function prefix(buffer: Buffer, prefix: string): string {
    return buffer
      .toString('utf-8')
      .split('\n')
      .map((line) => prefix + line)
      .join('\n');
  }
}

type TreeStructure = string | { [name: string]: TreeStructure };

function formatTree(tree: TreeStructure): string {
  if (typeof tree === 'string') {
    return `┗━ 📄 ${tree}`;
  }

  // Sort the entries by name to minimize differences.
  const entries = Object.entries(tree).sort(([l], [r]) => l.localeCompare(r));

  const lastIndex = entries.length - 1;
  return entries
    .map(([name, children], index) => {
      const box = index < lastIndex ? ' ┣' : ' ┗';
      if (typeof children === 'string') {
        return `${box}━ 📄 ${name}`;
      }

      const subtree = formatTree(children)
        .split('\n')
        .map((line) => ` ${index < lastIndex ? '┃' : ' '} ${line}`)
        .join('\n');
      return `${box}━ 📁 ${name}\n${subtree}`;
    })
    .join('\n');
}
