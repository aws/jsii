#!/usr/bin/env node

import { spawnSync } from 'child_process';
import * as fs from 'fs-extra';
import * as os from 'os';
import * as path from 'path';
import * as process from 'process';

const PACMAK_CLI = path.resolve(__dirname, '..', 'bin', 'jsii-pacmak');

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
  serialize: (val) => `${val[TARBALL]} is a tarball`,
});
expect.addSnapshotSerializer({
  test: (val) => val?.[TREE] != null,
  serialize: (val) => {
    return `<root>\n${formatTree(val[TREE])}`;
  },
});

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
    const pkgRoot = path.resolve(__dirname, '..', '..', pkg);
    runPacmak(pkgRoot, outDir);

    expect({ [TREE]: checkTree(outDir) }).toMatchSnapshot('<outDir>/');
  });
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
    if (file.endsWith('.tgz')) {
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

function runPacmak(root: string, outdir: string): void {
  const result = spawnSync(
    process.execPath,
    [
      ...process.execArgv,
      PACMAK_CLI,
      `--code-only`,
      `--no-fingerprint`,
      `--outdir=${outdir}`,
      root,
    ],
    {
      cwd: root,
      stdio: ['inherit', 'pipe', 'pipe'],
    },
  );

  expect(result.error).toBeUndefined();

  if (result.status !== 0) {
    console.error(`#### PACMAK STDOUT:\n${result.stdout.toString('utf-8')}`);
    console.error(`#### PACMAK STDERR:\n${result.stderr.toString('utf-8')}`);
  }

  expect(result.signal).toBeNull();
  expect(result.status).toBe(0);
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
