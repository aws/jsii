import * as fs from 'fs-extra';
import * as cp from 'node:child_process';
import * as os from 'node:os';
import * as path from 'node:path';

import { cdkTagv2_21_1, cdkv2_21_1 } from '../../constants';
import { inDirectory, streamUntar } from '../../util';

// Using the local `npm` package (from dependencies)
const npm = path.resolve(
  __dirname,
  '..',
  '..',
  '..',
  'node_modules',
  '.bin',
  'npm',
);

export interface Context {
  readonly workingDir: string;
  readonly sourceDir: string;
}

export async function setup(): Promise<Context> {
  const sourceDir = await fs.mkdtemp(
    path.join(os.tmpdir(), 'jsii-cdk-bench-snapshot'),
  );
  await streamUntar(cdkv2_21_1, { cwd: sourceDir });
  cp.execSync(`${npm} ci`, { cwd: sourceDir });

  // Working directory for benchmark
  const workingDir = await fs.mkdtemp(
    path.join(os.tmpdir(), `tsc-cdk-bench@${cdkTagv2_21_1}`),
  );

  return {
    workingDir,
    sourceDir,
  };
}

export async function beforeEach({ workingDir, sourceDir }: Context) {
  await fs.remove(workingDir);
  await fs.copy(sourceDir, workingDir);
}

export async function teardown({ workingDir, sourceDir }: Context) {
  await Promise.all([fs.remove(workingDir), fs.remove(sourceDir)]);
}

export async function buildWithTsc({ workingDir }: Context): Promise<void> {
  return inDirectory(
    workingDir,
    () =>
      new Promise((ok, ko) =>
        cp
          .fork(require.resolve('./build-with-tsc'), { stdio: 'inherit' })
          .once('close', ko)
          .once('message', (result: { success: any } | { error: unknown }) => {
            if ('error' in result) {
              ko(result.error);
            } else {
              ok(result.success);
            }
          })
          .send({ workingDir }),
      ),
  );
}

export async function buildWithJsii({ workingDir }: Context): Promise<void> {
  return inDirectory(
    workingDir,
    () =>
      new Promise((ok, ko) =>
        cp
          .fork(require.resolve('./build-with-jsii'), { stdio: 'inherit' })
          .once('close', ko)
          .once('message', (result: { success: any } | { error: unknown }) => {
            if ('error' in result) {
              ko(result.error);
            } else {
              ok(result.success);
            }
          })
          .send({ workingDir }),
      ),
  );
}
