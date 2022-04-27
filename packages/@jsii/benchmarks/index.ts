import * as Benchmark from 'benchmark';
import * as cp from 'child_process';
import * as fs from 'fs-extra';
import { Compiler } from 'jsii/lib/compiler';
import { loadProjectInfo } from 'jsii/lib/project-info';
import * as os from 'os';
import * as path from 'path';
import { promisify } from 'util';

// Always run against the same version of CDK source
const CDK_TAG = 'v2.21.1';
const exec = promisify(cp.exec);
async function setupAwsCdkLib(): Promise<{ awsCdkLib: string }> {
  const repoDir = await fs.mkdtemp(path.join(os.tmpdir(), 'jsii-cdk-bench'));
  await exec(`git clone -b ${CDK_TAG} https://github.com/aws/aws-cdk.git .`, {
    cwd: repoDir,
  });
  await exec('yarn', { cwd: repoDir });

  // Directory of aws-cdk-lib source
  const targetDir = path.resolve(repoDir, 'packages', 'aws-cdk-lib');
  // build all dependencies but don't build aws-cdk-lib
  await exec(`npx lerna run --include-dependencies --ignore=aws-cdk-lib build`);

  return {
    awsCdkLib: targetDir,
  };
}

void setupAwsCdkLib().then(({ awsCdkLib }) => {
  const suite = new Benchmark.Suite();
  const jsiiCalcDir = path.resolve(__dirname, '..', '..', 'jsii-calc');

  suite.add('Compile aws-cdk-lib@2.21.1', () => {
    const { projectInfo } = loadProjectInfo(awsCdkLib);
    const compiler = new Compiler({ projectInfo });

    compiler.emit();
  });

  suite.add('Compile jsii-calc', () => {
    const { projectInfo } = loadProjectInfo(jsiiCalcDir);
    const compiler = new Compiler({ projectInfo });

    compiler.emit();
  });

  suite.on('cycle', (event: any) => {
    console.log(String(event.target));
  });

  suite.run();
});
