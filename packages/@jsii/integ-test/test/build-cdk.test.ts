import * as Octokit from '@octokit/rest';
import * as dotenv from 'dotenv';
import { mkdtemp, remove } from 'fs-extra';
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

      // build cdk build tools
      await processes.spawn(
        'npx',
        // prettier-ignore
        [
          'lerna',
          '--stream',
          '--scope', 'cdk-build-tools',
          '--scope', 'pkglint',
          '--scope', 'awslint',
          'run', 'build'
        ],
        { cwd: srcDir },
      );

      // build jsii modules
      await processes.spawn(
        'npx',
        // prettier-ignore
        [
          'lerna',
          '--stream',
          '--scope', '@aws-cdk/*',
          '--scope', 'aws-cdk',
          'run', 'build',
          '--', '--jsii',
          path.join(JSII_DIR, 'bin', 'jsii')
        ],
        { cwd: srcDir },
      );

      // build the rest
      await processes.spawn(
        'npx',
        // prettier-ignore
        [
          'lerna',
          '--stream',
          '--ignore', '@aws-cdk/*',
          '--ignore', 'aws-cdk',
          '--ignore', 'cdk-build-tools',
          '--ignore', 'pkglint',
          '--ignore', 'awslint',
          'run', 'build'
        ],
        { cwd: srcDir },
      );

      // package modules
      await processes.spawn('./pack.sh', [], {
        cwd: srcDir,
        env: {
          PACMAK: path.join(JSII_PACMAK_DIR, 'bin', 'jsii-pacmak'),
          ROSETTA: path.join(JSII_ROSETTA_DIR, 'bin', 'jsii-rosetta'),
        },
      });
    },
    minutes(60),
  );
});
