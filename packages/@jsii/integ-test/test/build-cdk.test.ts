import { Octokit } from '@octokit/rest';
import * as dotenv from 'dotenv';
import { mkdtemp, readdir, remove } from 'fs-extra';
import { tmpdir } from 'os';
import * as path from 'path';

import {
  downloadReleaseAsset,
  minutes,
  ProcessManager,
  extractFileStream,
} from '../utils';

dotenv.config();
const JSII_CMD = require.resolve('jsii/bin/jsii');
const JSII_PACMAK_CMD = require.resolve('jsii-pacmak/bin/jsii-pacmak');

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

describe('Build CDK', () => {
  let buildDir: string;
  let processes: ProcessManager;

  beforeAll(async () => {
    processes = new ProcessManager();
    buildDir = await mkdtemp(path.resolve(tmpdir(), 'jsii-integ-test-'));
  });

  afterAll(async () => {
    await processes.killAll();
    await remove(buildDir);
  });

  test(
    'can build latest cdk release',
    async () => {
      // download latest release info
      const release = await octokit.repos.getLatestRelease({
        owner: 'aws',
        repo: 'aws-cdk',
      });

      // download and extract code
      const code = await downloadReleaseAsset(
        `https://api.github.com/repos/aws/aws-cdk/tarball/${release.data.tag_name}`,
      );
      const srcDir = path.join(
        buildDir,
        `aws-aws-cdk-${release.data.target_commitish.substring(0, 7)}`,
      );
      await extractFileStream(code, buildDir);

      // Make it a git repository, with a phony HEAD commit (parts of the build script wants a commit ID)
      await processes.spawn('git', ['init'], { cwd: srcDir });
      await processes.spawn(
        'git',
        [
          'commit',
          '--allow-empty',
          '--no-gpg-sign',
          '-m',
          'Phony initial commit',
        ],
        {
          cwd: srcDir,
          env: {
            ...process.env,
            // Provide those so Git doesn't risk failing because it doesn't know what to use instead...
            GIT_AUTHOR_NAME: 'jsii-integ-test',
            GIT_AUTHOR_EMAIL: 'jsii-integ-test@localhost',
            GIT_COMMITTER_NAME: 'jsii-integ-test',
            GIT_COMMITTER_EMAIL: 'jsii-integ-test@localhost',
          },
        },
      );

      // install cdk dependencies
      await processes.spawn(
        'yarn',
        ['install', '--frozen-lockfile', '--non-interactive'],
        {
          cwd: srcDir,
        },
      );

      // align versions for packaging
      await processes.spawn('./scripts/align-version.sh', [], {
        cwd: srcDir,
      });

      // build cdk modules
      await processes.spawn(
        path.join(srcDir, 'node_modules', '.bin', 'lerna'),
        ['run', 'build', '--stream'],
        {
          cwd: srcDir,
          env: {
            ...process.env,
            CDK_BUILD_JSII: JSII_CMD,
          },
        },
      );

      // package modules with pacmak
      await processes.spawn('yarn', ['run', 'pack'], {
        cwd: srcDir,
        env: {
          ...process.env,
          CDK_PACKAGE_JSII_PACMAK: JSII_PACMAK_CMD,
        },
      });

      // assert against cdk dist dir
      await Promise.all(
        ['js', 'dotnet', 'python', 'java'].map(async (distDir) => {
          const items = await readdir(path.join(srcDir, 'dist', distDir));
          expect(items.length).toBeGreaterThanOrEqual(1);
        }),
      );
    },
    minutes(60),
  );
});
