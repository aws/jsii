import * as cp from 'child_process';
import * as fs from 'fs-extra';
import * as os from 'os';
import * as path from 'path';

import { cdkTag, cdk } from '../../constants';
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
  await streamUntar(cdk, { cwd: sourceDir });
  cp.execSync(`${npm} ci`, { cwd: sourceDir });

  // Working directory for benchmark
  const workingDir = await fs.mkdtemp(
    path.join(os.tmpdir(), `tsc-cdk-bench@${cdkTag}`),
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
              // eslint-disable-next-line @typescript-eslint/prefer-promise-reject-errors
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
              // eslint-disable-next-line @typescript-eslint/prefer-promise-reject-errors
              ko(result.error);
            } else {
              ok(result.success);
            }
          })
          .send({ workingDir }),
      ),
  );
}
