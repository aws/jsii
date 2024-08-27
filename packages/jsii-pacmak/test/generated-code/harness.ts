import { createPatch } from 'diff';
import * as fs from 'fs-extra';
import * as os from 'os';
import * as path from 'path';
import * as process from 'process';

import { pacmak, TargetName } from '../../lib';
import { shell } from '../../lib/util';

export const JSII_TEST_PACKAGES: readonly string[] = [
  '@scope/jsii-calc-base-of-base',
  '@scope/jsii-calc-base',
  '@scope/jsii-calc-lib',
  'jsii-calc',
];

const CREATED = Symbol('created');
const DELETED = Symbol('deleted');

const DIFF = Symbol('diff');
const FILE = Symbol('file');
const MISSING = Symbol('missing');
const TARBALL = Symbol('tarball');
const BINARY = Symbol('binary');
export const TREE = Symbol('tree');
const TREE_ROOT = Symbol('treeRoot');

// Custom serializers so we can see the source without escape sequences
expect.addSnapshotSerializer({
  test: (val) => DIFF in val,
  serialize: (val) => val[DIFF],
});

expect.addSnapshotSerializer({
  test: (val) => FILE in val,
  serialize: (val) => val[FILE],
});
expect.addSnapshotSerializer({
  test: (val) => MISSING in val,
  serialize: (val) => `${val[MISSING]} does not exist`,
});

expect.addSnapshotSerializer({
  test: (val) => TARBALL in val,
  serialize: (val) =>
    `${val[TARBALL]} ${
      val[TARBALL].endsWith('.tgz') ? 'is' : 'embeds'
    } a tarball`,
});
expect.addSnapshotSerializer({
  test: (val) => BINARY in val,
  serialize: (val) => `${val[BINARY]} is a binary file`,
});
expect.addSnapshotSerializer({
  test: (val) => TREE in val,
  serialize: (val) => {
    return `${val[TREE_ROOT] ?? '<root>'}\n${formatTree(val[TREE])}`;
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

  for (const pkg of JSII_TEST_PACKAGES) {
    // Extend timeout, because this could be slow (python has more time because of the mypy pass)...
    jest.setTimeout(timeout);

    test(`Generated code for ${JSON.stringify(pkg)}`, async () => {
      const pkgRoot = path.resolve(__dirname, '..', '..', '..', pkg);

      const outDirNotRuntimeTypeChecked = path.join(
        outDir,
        'no-runtime-type-checking',
      );
      await runPacmak(pkgRoot, targetName, outDirNotRuntimeTypeChecked, {
        runtimeTypeChecking: false,
      });
      expect({
        [TREE]: checkTree(outDirNotRuntimeTypeChecked),
      }).toMatchSnapshot('<outDir>/');

      // Now we'll generate WITHOUT runtime type-checks, and assert on the differences
      const outDirRuntimeTypeChecked = path.join(
        outDir,
        'runtime-type-checking',
      );
      await runPacmak(pkgRoot, targetName, outDirRuntimeTypeChecked, {
        runtimeTypeChecking: true,
      });

      // Run MyPY on Python generated code...
      if (targetName === TargetName.PYTHON && !process.env.SKIP_MYPY_CHECK) {
        await runMypy(path.join(outDirRuntimeTypeChecked, targetName));
      }

      expect({
        [TREE]: diffTrees(
          outDirNotRuntimeTypeChecked,
          outDirRuntimeTypeChecked,
        ),
        [TREE_ROOT]: '<runtime-type-check-diff>',
      }).toMatchSnapshot('<runtime-type-check-diff>/');
    });
  }
}

export function checkTree(
  file: string,
  {
    root = file,
    excludes = (_) => false,
  }: { root?: string; excludes?: (file: string) => boolean } = {},
): TreeStructure | undefined {
  const stat = tryStat(file);

  if (excludes(path.relative(root, file))) {
    return undefined;
  }

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
    } else if (file.endsWith('.png')) {
      // Special-cased to avoid binary differences being annoying
      expect({ [BINARY]: relativeFile }).toMatchSnapshot(snapshotName);
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
      subtree: checkTree(path.join(file, entry), { root, excludes }),
    }))
    .reduce(
      (tree, { entry, subtree }) => {
        if (subtree != null) {
          tree[entry] = subtree;
        }
        return tree;
      },
      {} as { [name: string]: TreeStructure },
    );
}

export function diffTrees(
  original: string,
  updated: string,
  { root = original }: { root?: string } = {},
): TreeStructure | undefined {
  const originalStat = tryStat(original);
  const updatedStat = tryStat(updated);

  const relativeFile = path.relative(root, original).replace(/\\/g, '/');

  if (updatedStat == null) {
    return { [DELETED]: path.basename(original) };
  }

  // Should exist on both sides AND have the same file type
  if (originalStat != null) {
    expect(originalStat?.isDirectory()).toBe(updatedStat?.isDirectory());
    expect(originalStat?.isFile()).toBe(updatedStat?.isFile());
  }

  if (updatedStat.isFile()) {
    if (original.endsWith('.tgz') || original.endsWith('.png')) {
      // Allow no difference in binary file existence...
      expect(originalStat).toBeDefined();
      // This is a binary object, these should match exactly
      expect(fs.readFileSync(original)).toEqual(fs.readFileSync(updated));
      return undefined;
    }
    const patch = createPatch(
      relativeFile,
      // Note: if originalStat is null, the file is new in the diff...
      originalStat != null ? fs.readFileSync(original, 'utf-8') : '',
      fs.readFileSync(updated, 'utf-8'),
      '--no-runtime-type-checking',
      '--runtime-type-checking',
      {
        context: 5,
        ignoreWhitespace: false,
        newlineIsToken: true,
      },
    )
      .trimEnd()
      .split(/\n/)
      .slice(2);

    if (patch.length === 2) {
      return undefined;
    }

    const snapshotName = `<runtime-type-check-diff>/${relativeFile}.diff`;
    expect({ [DIFF]: patch.join('\n') }).toMatchSnapshot(snapshotName);
    return originalStat != null
      ? `${path.basename(original)}.diff`
      : { [CREATED]: `${path.basename(original)}.diff` };
  }

  return Array.from(
    new Set([...fs.readdirSync(original), ...fs.readdirSync(updated)]),
  )
    .sort()
    .map((entry) => ({
      entry,
      subtree: diffTrees(
        path.join(original, entry),
        path.join(updated, entry),
        { root },
      ),
    }))
    .reduce(
      (tree, { entry, subtree }) => {
        if (subtree != null) {
          tree = tree ?? {};
          if (typeof subtree === 'string' && subtree.startsWith(entry)) {
            entry = subtree;
          }
          tree[entry] = subtree;
        }
        return tree;
      },
      undefined as { [name: string]: TreeStructure } | undefined,
    );
}

function tryStat(at: string) {
  try {
    return fs.statSync(at);
  } catch (e: any) {
    if (e.code !== 'ENOENT') {
      throw e;
    }
    return undefined;
  }
}

async function runPacmak(
  root: string,
  targetName: TargetName,
  outdir: string,
  { runtimeTypeChecking }: { readonly runtimeTypeChecking: boolean },
): Promise<void> {
  return expect(
    pacmak({
      codeOnly: true,
      fingerprint: false,
      inputDirectories: [root],
      outputDirectory: outdir,
      runtimeTypeChecking,
      targets: [targetName],
    }),
  ).resolves.not.toThrowError();
}

export async function preparePythonVirtualEnv({
  install = [],
  installOptions = [],
  venvDir = __dirname,
  systemSitePackages = true,
}: {
  install?: readonly string[];
  // some options like `--config-settings` should only be
  // passed once. If they are passed multiple times
  // then it registers as an array with multiple values
  installOptions?: readonly string[];
  venvDir?: string;
  systemSitePackages?: boolean;
} = {}) {
  const venvRoot = path.join(venvDir, '.venv');
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
    // On Windows, there is usually no python3.exe (the GitHub action workers will have a python3
    // shim, but using this actually results in a WinError with Python 3.7 and 3.8 where venv will
    // fail to copy the python binary if it's not invoked as python.exe). More on this particular
    // issue can be read here: https://bugs.python.org/issue43749
    shell(process.platform === 'win32' ? 'python' : 'python3', [
      '-m',
      'venv',
      ...(systemSitePackages
        ? [
            '--system-site-packages', // Allow using globally installed packages (saves time & disk space)
          ]
        : []),
      JSON.stringify(venvRoot),
    ]),
  ).resolves.not.toThrowError();

  // First install dev dependencies
  await expect(
    shell(
      venvPython,
      [
        '-m',
        'pip',
        'install',
        '--no-input',
        '-r',
        path.resolve(__dirname, 'requirements-dev.txt'),
      ],
      { env, retry: { maxAttempts: 5 } },
    ),
  ).resolves.not.toThrowError();

  await expect(
    shell(
      venvPython,
      [
        '-m',
        'pip',
        'install',
        '--no-input',
        ...installOptions,
        // Additional install parameters
        ...install,
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

  return { env, venvPython, venvRoot };
}

async function runMypy(pythonRoot: string): Promise<void> {
  const { env, venvPython } = await preparePythonVirtualEnv();

  // Now run mypy on the Python code
  return expect(
    shell(
      venvPython,
      [
        '-m',
        'mypy',
        // We may not have the package's dependencies in scope. Let's just ignore that for now.
        '--ignore-missing-imports',
        // Output in readable form, with source excerpts and problem markers
        '--pretty',
        // Show the "standard" error codes to make it easier to google around
        '--show-error-codes',
        // Enable all optional checks -- let's be pedantic about everything! (except what we disable next)
        '--strict',
        // Ignore extraneous "# type: ignore" comments, they're too hard to avoid.
        '--no-warn-unused-ignores',
        // Ignore miscellaneous errors, typically due to unsupported stuff
        '--disable-error-code=misc',
        // Allow references to nested types within their nesting parent (this cannot statically type-check, as sub-types
        // could override the nested one, so mypy does not even try).
        // For more info => https://github.com/python/mypy/issues/8482
        '--disable-error-code=name-defined',
        // Ignore subclassing types that did not resolve because we don't have dependencies
        '--allow-subclassing-any',
        JSON.stringify(pythonRoot),
      ],
      { env },
    ),
  ).resolves.not.toThrowError();
}

type TreeStructure =
  | string
  | { [name: string]: TreeStructure }
  | { [CREATED]: string }
  | { [DELETED]: string };

function formatTree(tree: TreeStructure | undefined): string {
  if (tree == null) {
    return `┗━ 🕳 There is nothing here`;
  }

  if (typeof tree === 'string') {
    return `┗━ 📄 ${tree}`;
  }

  if (DELETED in tree) {
    return `┗━ 🗑 ${(tree as any)[DELETED]}`;
  }
  if (CREATED in tree) {
    return `┗━ 🆕 ${(tree as any)[CREATED]}`;
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

      if (DELETED in children) {
        return `${box}━ 🗑 ${name}`;
      }
      if (
        CREATED in children &&
        typeof (children as any)[CREATED] === 'string'
      ) {
        return `${box}━ 🆕 ${name}`;
      }

      const subtree = formatTree(children)
        .split('\n')
        .map((line) => ` ${index < lastIndex ? '┃' : ' '} ${line}`)
        .join('\n');
      return `${box}━ 📁 ${name}\n${subtree}`;
    })
    .join('\n');
}
