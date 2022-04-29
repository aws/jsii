import { Benchmark } from './lib/benchmark';
import * as cp from 'child_process';
import * as fs from 'fs-extra';
import { Compiler } from 'jsii/lib/compiler';
import { loadProjectInfo } from 'jsii/lib/project-info';
import * as os from 'os';
import * as path from 'path';

// Always run against the same version of CDK source
const CDK_TAG = 'v2.21.1';

interface SetupResult {
  /**
   * Source directory of aws-cdk-lib
   */
  awsCdkLib: string;

  /**
   * Source directory of jsiiCalc
   */
  jsiiCalc: string;
}

function setup(): SetupResult {
  const repoDir = fs.mkdtempSync(path.join(os.tmpdir(), 'jsii-cdk-bench'));
  cp.execSync(
    `git clone --depth=1 -b ${CDK_TAG} https://github.com/aws/aws-cdk.git .`,
    {
      cwd: repoDir,
    },
  );
  cp.execSync('yarn install --frozen-lockfile', { cwd: repoDir });

  // Directory of aws-cdk-lib source
  const targetDir = path.resolve(repoDir, 'packages', 'aws-cdk-lib');
  // build all dependencies but don't build aws-cdk-lib
  cp.execSync(
    `npx lerna run --include-dependencies --ignore=aws-cdk-lib build`,
    { cwd: repoDir },
  );

  const jsiiCalcDir = path.resolve(__dirname, '..', '..', 'jsii-calc');

  return {
    awsCdkLib: targetDir,
    jsiiCalc: jsiiCalcDir,
  };
}

const { awsCdkLib, jsiiCalc } = setup();
const cdk = new Benchmark<string>('Compile aws-cdk-lib', () => {
    const { projectInfo } = loadProjectInfo(awsCdkLib);
    const compiler = new Compiler({ projectInfo });

    compiler.emit();
});

const calc = new Benchmark('Compile jsii-calc', () => {
    const { projectInfo } = loadProjectInfo(jsiiCalc);
    const compiler = new Compiler({ projectInfo });

    compiler.emit();
});

console.log(cdk.run());
console.log(calc.run());
