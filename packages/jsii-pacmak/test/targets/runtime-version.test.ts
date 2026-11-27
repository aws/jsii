import * as fs from 'fs-extra';
import { TypeSystem } from 'jsii-reflect';
import { RosettaTabletReader } from 'jsii-rosetta';
import * as os from 'os';
import * as path from 'path';

import * as runtimeVersion from '../../lib/runtime-version';
import { Target, TargetOptions } from '../../lib/target';
import { TargetName } from '../../lib/targets';
import Dotnet from '../../lib/targets/dotnet';
import { Golang } from '../../lib/targets/go';
import Java from '../../lib/targets/java';
import Python from '../../lib/targets/python';

jest.setTimeout(60_000);

const RUNTIME_VERSION = '1.141.0';

const PACKAGE_DIR = path.dirname(
  require.resolve('@scope/jsii-calc-base-of-base/package.json'),
);

let outDir: string;
beforeEach(async () => {
  outDir = await fs.mkdtemp(path.join(os.tmpdir(), 'pacmak-runtime-version-'));
});
afterEach(async () => {
  await fs.remove(outDir);
  jest.restoreAllMocks();
});

test.each([
  [
    TargetName.DOTNET,
    (options: TargetOptions) => new Dotnet(options, []),
    '.csproj',
    `<PackageReference Include="Amazon.JSII.Runtime" Version="[${RUNTIME_VERSION},2.0.0)" />`,
  ],
  [
    TargetName.GO,
    (options: TargetOptions) => new Golang(options),
    'go.mod',
    `github.com/aws/jsii-runtime-go v${RUNTIME_VERSION}`,
  ],
  [
    TargetName.JAVA,
    (options: TargetOptions) => new Java(options),
    'pom.xml',
    `<version>[${RUNTIME_VERSION},2.0.0)</version>`,
  ],
  [
    TargetName.PYTHON,
    (options: TargetOptions) => new Python(options),
    'setup.py',
    `"jsii>=${RUNTIME_VERSION}, <2.0.0",`,
  ],
])(
  '%s package depends on the jsii runtime version required by dependencies',
  async (targetName, makeTarget, fileName, expected) => {
    const resolveRuntimeVersion = jest
      .spyOn(runtimeVersion, 'resolveRuntimeVersion')
      .mockResolvedValue(RUNTIME_VERSION);
    const typeSystem = new TypeSystem();
    const assembly = await typeSystem.loadModule(PACKAGE_DIR);
    const tarball = path.join(outDir, 'mock-tarball.tgz');
    await fs.writeFile(tarball, 'Mock Tarball');

    const target: Target = makeTarget({
      arguments: {},
      assembly,
      packageDir: PACKAGE_DIR,
      rosetta: new RosettaTabletReader(),
      runtimeTypeChecking: true,
      targetName,
    });
    const codeDir = path.join(outDir, 'code');
    await target.generateCode(codeDir, tarball);
    expect(resolveRuntimeVersion).toHaveBeenCalledWith(PACKAGE_DIR);

    const file = findFile(codeDir, fileName);
    expect(file).toBeDefined();
    const lines = (await fs.readFile(file!, 'utf-8'))
      .split('\n')
      .map((line) => line.trim());
    expect(lines).toContain(expected);
  },
);

function findFile(dir: string, suffix: string): string | undefined {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const entryPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      const found = findFile(entryPath, suffix);
      if (found) {
        return found;
      }
    } else if (entry.name.endsWith(suffix)) {
      return entryPath;
    }
  }
  return undefined;
}
