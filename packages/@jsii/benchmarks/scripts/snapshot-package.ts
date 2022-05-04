import * as cp from 'child_process';
import * as fs from 'fs-extra';
import * as glob from 'glob';
import * as os from 'os';
import * as path from 'path';
import * as tar from 'tar';

import { cdkTagv2_21_1, cdkv2_21_1 } from '../lib/constants';

function snapshotAwsCdk(tag: string, file: string) {
  // Directory of aws-cdk repository
  const repoDir = fs.mkdtempSync(
    path.join(os.tmpdir(), `jsii-cdk-bench@${tag}`),
  );
  // Directory for snapshot of aws-cdk-lib source
  const intermediate = fs.mkdtempSync(
    path.join(os.tmpdir(), `jsii-cdk-bench-inter@${tag}`),
  );

  // Clone aws/aws-cdk
  cp.execSync(
    `git clone --depth=1 -b ${tag} https://github.com/aws/aws-cdk.git .`,
    {
      cwd: repoDir,
    },
  );

  // Install/link dependencies
  cp.execSync('yarn install --frozen-lockfile', { cwd: repoDir });

  // build aws-cdk-lib and dependencies
  cp.execSync(
    `npx lerna run --scope aws-cdk-lib --include-dependencies build`,
    { cwd: repoDir },
  );

  // Copy built package to intermediate directory
  fs.copySync(path.resolve(repoDir, 'packages', 'aws-cdk-lib'), intermediate);

  // Remove build artifacts so we can rebuild
  const artifacts = glob.sync(
    path.join(intermediate, '**/*@(.js|.js.map|.d.ts|.tsbuildinfo)'),
  );
  artifacts.forEach(fs.removeSync);

  // Remove node_modules from monorepo setup
  fs.removeSync(path.resolve(intermediate, 'node_modules'));

  // Remove @aws-cdk/* deps from package.json so we can npm install to get hoisted dependencies
  // into local node_modules
  const packageJsonPath = path.resolve(intermediate, 'package.json');
  const { devDependencies, ...pkgJson } = fs.readJsonSync(packageJsonPath);
  const newDevDependencies = Object.entries(devDependencies).reduce(
    (accum, [pkg, version]) => {
      if (pkg.startsWith('@aws-cdk/')) return accum;

      return {
        ...accum,
        [pkg]: version,
      };
    },
    {},
  );

  fs.writeFileSync(
    packageJsonPath,
    JSON.stringify(
      { ...pkgJson, devDependencies: newDevDependencies },
      undefined,
      2,
    ),
  );

  // Run npm install to get package-lock.json for reproducible dependency tree
  cp.execSync(`npm install`, { cwd: intermediate });
  fs.removeSync(path.resolve(intermediate, 'node_modules'));
  tar.c(
    {
      file,
      cwd: intermediate,
      sync: true,
      gzip: true,
    },
    ['.'],
  );

  fs.removeSync(intermediate);
  fs.removeSync(repoDir);
}

function main() {
  snapshotAwsCdk(cdkTagv2_21_1, cdkv2_21_1);
}

main();
