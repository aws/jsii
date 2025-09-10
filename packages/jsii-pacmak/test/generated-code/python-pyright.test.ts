import { promises as fs } from 'fs';
import * as os from 'os';
import * as path from 'path';

import { JSII_TEST_PACKAGES, preparePythonVirtualEnv } from './harness';
import { pacmak, TargetName } from '../../lib';
import { subprocess } from '../../lib/util';

jest.setTimeout(3_600_000);

let pythonSource: string;
let venv: {
  readonly env: { [name: string]: string };
  readonly venvPython: string;
  readonly venvRoot: string;
};

// We must ensure our code is generated into python-compatible directories,
// where each directory name is a valid python module path component, or else
// pyright may fail to assign a moduleName to the source files, and produce
// incorrect errors (https://github.com/microsoft/pyright/issues/3781).
const TEST_PACKAGES = JSII_TEST_PACKAGES.map((name) => ({
  packageName: name,
  moduleName: name.replace('@', '').replace('/', '.').replace('-', '_'),
}));

beforeAll(async () => {
  pythonSource = await fs.mkdtemp(
    path.join(os.tmpdir(), 'jsii-pacmak-pyright-'),
  );

  // Generate code for all test packages into a distinct directory for each...
  await Promise.all(
    TEST_PACKAGES.map(({ packageName, moduleName }) =>
      pacmak({
        codeOnly: true,
        inputDirectories: [
          path.resolve(__dirname, '..', '..', '..', packageName),
        ],
        outputDirectory: path.join(pythonSource, moduleName),
        targets: [TargetName.PYTHON],
      }),
    ),
  );

  // Prepare virtual env, and install generated packages into it...
  venv = await preparePythonVirtualEnv({
    install: TEST_PACKAGES.flatMap(({ moduleName }) => [
      '-e',
      JSON.stringify(path.join(pythonSource, moduleName, TargetName.PYTHON)),
    ]),
    installOptions: [
      // setuptools >=64 requires this
      // https://github.com/pypa/setuptools/issues/3518
      '--config-settings',
      'editable_mode=strict',
    ],
    venvDir: pythonSource,
    systemSitePackages: false, // Interferes with pyright resolutions...
  });

  // Create a pyright project configuration file...
  await fs.writeFile(
    path.join(pythonSource, 'pyproject.toml'),
    [
      '[tool.pyright]',
      'defineConstant = { DEBUG = true }',
      'pythonVersion = "3.8"',
      'pythonPlatform = "All"',
      'reportSelfClsParameterName = false',
      `venvPath = ${JSON.stringify(path.dirname(venv.venvRoot))}`,
      `venv = ${JSON.stringify(path.basename(venv.venvRoot))}`,
    ].join('\n'),
  );
}, 300_000 /* ms -- this can be real slow 😒 */);

afterAll(async () => {
  if (!process.env.NO_CLEAN) {
    await fs.rm(pythonSource, { force: true, recursive: true });
  }
  pythonSource = '';
});

test('generated code passes pyright', async () => {
  await expect(
    subprocess(
      process.execPath,
      [
        ...process.execArgv,
        JSON.stringify(require.resolve('pyright')),
        `--project=${JSON.stringify(pythonSource)}`,
      ],
      {
        cwd: pythonSource,
        env: venv.env,
      },
    ),
  ).resolves.not.toThrow();
});
