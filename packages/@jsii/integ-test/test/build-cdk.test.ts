// import { IncomingMessage } from 'http';
import * as fs from 'fs';
import * as path from 'path';
import * as Octokit from '@octokit/rest';
import { downloadReleaseAsset, minutes, ProcessManager, rmdirRecursive } from '../utils';
import * as dotenv from 'dotenv';

const { mkdtemp } = fs.promises;

dotenv.config();
const JSII_DIR = path.resolve(require.resolve('jsii'), '..', '..');
const JSII_PACMAK_DIR = path.resolve(require.resolve('jsii-pacmak'), '..', '..');

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN
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
    await rmdirRecursive(buildDir);
  });

  test('can build latest cdk release', async (done) => {
    // download latest release info
    console.time('cdkbuild');
    const release = await octokit.repos.getLatestRelease({
      owner: 'aws',
      repo: 'aws-cdk'
    });

    // save code to tmp dir
    const fileName = 'cdk.tar.gz';
    const tarFile = path.join(buildDir, fileName);
    const code = await downloadReleaseAsset(`https://api.github.com/repos/aws/aws-cdk/tarball/${release.data.tag_name}`);
    const codeStream = fs.createWriteStream(tarFile);

    // save to file and wait to finish
    code.pipe(codeStream);
    await new Promise(resolve => codeStream.on('close', () => {
      resolve();
    }));

    // unzip tar archive
    await processes.spawn('tar', ['-xzvf', fileName], {
      cwd: buildDir
    });

    // root dir of extracted src
    // `${buildDir}/${owner}-${repo}-${first 7 chars of commit hash}
    const srcDir = path.join(buildDir, `aws-aws-cdk-${release.data.target_commitish.substring(0, 7)}`);

    // install cdk dependencies
    await processes.spawn('yarn', ['install'], {
      cwd: srcDir
    });

    // link local jsii/jsii-pacmak builds
    await processes.spawn('rm', ['-rf', './node_modules/jsii'], { cwd: srcDir });
    await processes.spawn('rm', ['-rf', './node_modules/jsii-pacmak'], { cwd: srcDir });
    await processes.spawn('ln', ['-s', JSII_DIR, './node_modules'], { cwd: srcDir });
    await processes.spawn('ln', ['-s', JSII_PACMAK_DIR, './node_modules'], { cwd: srcDir });

    // build cdk
    await processes.spawn('./node_modules/.bin/lerna', ['run', 'build', '--stream'], { cwd: srcDir });

    // package modules
    await processes.spawn('yarn', ['run', 'pack'], { cwd: srcDir });
    console.timeEnd('cdkbuild');
    done();

  }, minutes(60));
});
