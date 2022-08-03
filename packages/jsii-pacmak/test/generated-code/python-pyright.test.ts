import { promises as fs } from 'fs';
import * as os from 'os';
import * as path from 'path';

import { pacmak, TargetName } from '../../lib';
import { shell } from '../../lib/util';
import { JSII_TEST_PACKAGES, preparePythonVirtualEnv } from './harness';

jest.setTimeout(3_600_000);

let pythonSource: string;
let venv: {
  readonly env: { [name: string]: string };
  readonly venvPython: string;
  readonly venvRoot: string;
};

beforeAll(async () => {
  pythonSource = await fs.mkdtemp(
    path.join(os.tmpdir(), 'jsii-pacmak-pyright-'),
  );

  // Generate code for all test packages into a distinct directory for each...
  await Promise.all(
    JSII_TEST_PACKAGES.map((pkg) =>
      pacmak({
        codeOnly: true,
        inputDirectories: [path.resolve(__dirname, '..', '..', '..', pkg)],
        outputDirectory: path.join(pythonSource, pkg),
        targets: [TargetName.PYTHON],
      }),
    ),
  );

  // Prepare virtual env, and install generated packages into it...
  venv = await preparePythonVirtualEnv({
    install: JSII_TEST_PACKAGES.flatMap((pkg) => [
      '-e',
      JSON.stringify(path.join(pythonSource, pkg, TargetName.PYTHON)),
    ]),
    venvDir: pythonSource,
    systemSitePackages: false, // Interferes with pyright resolutions...
  });

  // Create a pyright project configuration file...
  await fs.writeFile(
    path.join(pythonSource, 'pyproject.toml'),
    [
      '[tool.pyright]',
      'defineConstant = { DEBUG = true }',
      'pythonVersion = "3.7"',
      'pythonPlatform = "All"',
      'reportSelfClsParameterName = false',
      `venvPath = ${JSON.stringify(path.dirname(venv.venvRoot))}`,
      `venv = ${JSON.stringify(path.basename(venv.venvRoot))}`,
    ].join('\n'),
  );
}, 300_000 /* ms -- this can be real slow 😒 */);

afterAll(async () => {
  await fs.rm(pythonSource, { force: true, recursive: true });
  pythonSource = '';
});

test('generated code passes pyright', async () => {
  await expect(
    shell(
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
  ).resolves.not.toThrowError();
});
