import * as fs from 'fs-extra';
import * as os from 'os';
import * as path from 'path';
import * as process from 'process';

import { pacmak, TargetName } from '../../lib';
import { shell } from '../../lib/util';

const FILE = Symbol('file');
const MISSING = Symbol('missing');
const TARBALL = Symbol('tarball');
export const TREE = Symbol('tree');

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

export function verifyGeneratedCodeFor(
  targetName: TargetName,
  timeout = 60_000,
) {
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
    // Extend timeout, because this could be slow (python has more time because of the mypy pass)...
    jest.setTimeout(timeout);

    test(`Generated code for ${JSON.stringify(pkg)}`, async () => {
      const pkgRoot = path.resolve(__dirname, '..', '..', '..', pkg);
      await runPacmak(pkgRoot, targetName, outDir);

      expect({ [TREE]: checkTree(outDir) }).toMatchSnapshot('<outDir>/');

      if (targetName !== TargetName.PYTHON) {
        return Promise.resolve();
      }
      return runMypy(path.join(outDir, targetName));
    });
  }
}

export function checkTree(
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

async function runPacmak(
  root: string,
  targetName: TargetName,
  outdir: string,
): Promise<void> {
  return expect(
    pacmak({
      codeOnly: true,
      fingerprint: false,
      inputDirectories: [root],
      outputDirectory: outdir,
      targets: [targetName],
    }),
  ).resolves.not.toThrowError();
}

async function runMypy(pythonRoot: string): Promise<void> {
  const venvRoot = path.join(__dirname, '.venv');
  const venvBin = path.join(
    venvRoot,
    process.platform === 'win32' ? 'Scripts' : 'bin',
  );
  const venvPython = path.join(
    venvBin,
    process.platform === 'win32' ? 'python.exe' : 'python',
  );

  const env = {
    ...process.env,
    PATH: `${venvBin}:${process.env.PATH}`,
    VIRTUAL_ENV: venvRoot,
  };

  // Create a Python virtual environment
  await expect(
    shell('python3', [
      '-m',
      'venv',
      '--system-site-packages', // Allow using globally installed packages (saves time & disk space)
      JSON.stringify(venvRoot),
    ]),
  ).resolves.not.toThrowError();
  // Install mypy and the jsii runtime in there as needed
  await expect(
    shell(
      venvPython,
      [
        '-m',
        'pip',
        'install',
        '--no-input',
        '"mypy>=0.782"',
        // Note: this resolution is a little ugly, but it's there to avoid creating a dependency cycle
        JSON.stringify(
          path.resolve(
            require.resolve('@jsii/python-runtime/package.json'),
            '..',
          ),
        ),
      ],
      { env, retry: { maxAttempts: 5 } },
    ),
  ).resolves.not.toThrowError();
  // Now run mypy on the Python code
  return expect(
    shell(
      venvPython,
      [
        '-m',
        'mypy',
        '--ignore-missing-imports', // We may not have the package's dependencies in scope. Let's just ignore that for now.
        '--pretty', // Output in readable form, with source excerpts and problem markers
        '--show-error-codes', // Show the "standard" error codes to make it easier to google around
        '--strict', // Enable all optional checks -- let's be pedantic about everything!
        '--no-warn-unused-ignores', // Ignore extraneous "# type: ignore" comments, they're too hard to avoid.
        JSON.stringify(pythonRoot),
      ],
      { env },
    ),
  ).resolves.not.toThrowError();
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
