import * as cp from 'child_process';
import * as fs from 'fs-extra';
import { Compiler } from 'jsii/lib/compiler';
import { loadProjectInfo } from 'jsii/lib/project-info';
import * as os from 'os';
import * as path from 'path';
import * as tar from 'tar';

import { Benchmark } from './benchmark';
import { cdkv2_21_1 } from './constants';

// Always run against the same version of CDK source
const cdk = new Benchmark('Compile aws-cdk-lib@v2.21.1')
  .setup(() => {
    const sourceDir = fs.mkdtempSync(
      path.join(os.tmpdir(), 'jsii-cdk-bench-snapshot'),
    );
    tar.x({
      file: cdkv2_21_1,
      cwd: sourceDir,
      sync: true,
    });
    cp.execSync('npm ci', { cwd: sourceDir });
    // Working directory for benchmark
    const workingDir = fs.mkdtempSync(
      path.join(os.tmpdir(), 'jsii-cdk-bench@v2.21.1'),
    );

    return {
      workingDir,
      sourceDir,
    };
  })
  .beforeEach(({ workingDir, sourceDir }) => {
    fs.removeSync(workingDir);
    fs.copySync(sourceDir, workingDir);
  })
  .subject(({ workingDir }) => {
    const { projectInfo } = loadProjectInfo(workingDir);
    const compiler = new Compiler({ projectInfo });

    compiler.emit();
  })
  .teardown(({ workingDir, sourceDir }) => {
    fs.removeSync(workingDir);
    fs.removeSync(sourceDir);
  });

export const benchmarks = [cdk];
