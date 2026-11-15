import * as spec from '@jsii/spec';
import { CodeMaker } from 'codemaker';
import * as fs from 'fs-extra';
import * as os from 'os';
import * as path from 'path';

import { FileGenerator } from '../../lib/targets/dotnet/filegenerator';
import { VERSION } from '../../lib/version';

const ASSEMBLY: spec.Assembly = {
  schema: spec.SchemaVersion.LATEST,
  name: 'test-assembly',
  version: '1.2.3',
  description: 'A test assembly',
  homepage: 'https://example.com',
  repository: { type: 'git', url: 'https://example.com/repo.git' },
  author: { name: 'Test', roles: ['author'] },
  license: 'Apache-2.0',
  fingerprint: '<fingerprint>',
  jsiiVersion: '0.0.0',
  targets: {
    dotnet: {
      namespace: 'Test.Assembly',
      packageId: 'Test.Assembly',
    },
  },
};

let outdir: string;
beforeEach(async () => {
  outdir = await fs.mkdtemp(
    path.join(os.tmpdir(), 'jsii-pacmak-dotnet-filegenerator-'),
  );
});
afterEach(async () => {
  await fs.remove(outdir);
});

test('the jsii runtime reference uses the provided runtime version', async () => {
  const runtimeReference = await generateRuntimeReference('1.141.0');

  expect(runtimeReference).toBe(
    '<PackageReference Include="Amazon.JSII.Runtime" Version="[1.141.0,2.0.0)" />',
  );
});

test('the jsii runtime reference defaults to the jsii-pacmak version', async () => {
  const runtimeReference = await generateRuntimeReference(undefined);

  expect(runtimeReference).toContain(`Version="[${VERSION},`);
});

async function generateRuntimeReference(
  runtimeVersion: string | undefined,
): Promise<string | undefined> {
  const code = new CodeMaker();
  new FileGenerator(
    ASSEMBLY,
    'test-assembly-1.2.3.tgz',
    code,
    runtimeVersion,
  ).generateProjectFile(new Map());
  await code.save(outdir);

  const csproj = await fs.readFile(
    path.join(outdir, 'Test.Assembly', 'Test.Assembly.csproj'),
    'utf-8',
  );
  return csproj
    .split('\n')
    .map((line) => line.trim())
    .find((line) => line.includes('"Amazon.JSII.Runtime"'));
}
