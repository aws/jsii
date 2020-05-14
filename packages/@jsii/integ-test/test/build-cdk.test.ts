import { Octokit } from '@octokit/rest';
import * as dotenv from 'dotenv';
import { readdir, mkdtemp, remove } from 'fs-extra';
import * as path from 'path';
import {
  downloadReleaseAsset,
  minutes,
  ProcessManager,
  extractFileStream,
} from '../utils';

dotenv.config();
const JSII_DIR = path.dirname(require.resolve('jsii/package.json'));
const JSII_PACMAK_DIR = path.dirname(
  require.resolve('jsii-pacmak/package.json'),
);
const JSII_ROSETTA_DIR = path.dirname(
  require.resolve('jsii-rosetta/package.json'),
);

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

describe('Build CDK', () => {
  let buildDir: string;
  let processes: ProcessManager;

  beforeAll(async () => {
    processes = new ProcessManager();
    buildDir = await mkdtemp(path.join(__dirname, 'build'));
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

      // install cdk dependencies
      await processes.spawn('yarn', ['install', '--frozen-lockfile'], {
        cwd: srcDir,
      });

      // install local version of jsii
      await processes.spawn(
        'yarn',
        ['workspace', 'cdk-build-tools', 'add', JSII_DIR, JSII_PACMAK_DIR],
        {
          cwd: srcDir,
        },
      );
      await processes.spawn(
        'yarn',
        ['add', '-W', JSII_DIR, JSII_ROSETTA_DIR, JSII_PACMAK_DIR],
        {
          cwd: srcDir,
        },
      );

      // align versions for packaging
      await processes.spawn('./scripts/align-version.sh', [], {
        cwd: srcDir,
      });

      // build cdk modules
      await processes.spawn('npx', ['lerna', 'run', 'build'], {
        cwd: srcDir,
      });

      // package modules with pacmak
      await processes.spawn('yarn', ['run', 'pack'], {
        cwd: srcDir,
      });

      // assert against cdk dist dir
      await Promise.all(
        ['js', 'dotnet', 'python', 'java'].map(async distDir => {
          const items = await readdir(path.join(srcDir, 'dist', distDir));
          expect(items.length).toBeGreaterThanOrEqual(1);
        }),
      );
    },
    minutes(60),
  );
});
