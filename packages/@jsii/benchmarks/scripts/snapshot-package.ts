import * as cp from 'child_process';
import * as fs from 'fs-extra';
import * as glob from 'glob';
import * as os from 'os';
import * as path from 'path';

import { cdkTagv2_21_1, cdkDirv2_21_1 } from '../lib/constants';

function snapshotAwsCdk(tag: string, directory: string) {
  // Directory of aws-cdk repository
  const repoDir = fs.mkdtempSync(
    path.join(os.tmpdir(), `jsii-cdk-bench@${tag}`),
  );
  // Directory of aws-cdk-lib source
  const pkgDir = path.resolve(repoDir, 'packages', 'aws-cdk-lib');

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

  // Remove build artifacts so we can rebuild
  const artifacts = glob.sync(
    path.join(pkgDir, '**/*@(.js|.js.map|.d.ts|.tsbuildinfo)'),
  );
  artifacts.forEach(fs.removeSync);

  // Remove @aws-cdk/* deps from package.json so we can npm install to get hoisted dependencies
  // into local node_modules
  const packageJsonPath = path.resolve(pkgDir, 'package.json');
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

  fs.removeSync(directory);
  fs.copySync(pkgDir, directory);

  // Run npm install to get package-lock.json for reproducible dependency tree
  cp.execSync(`npm install`, { cwd: directory });
  fs.removeSync(path.resolve(directory, 'node_modules'));

  fs.removeSync(repoDir);
}

function main() {
  snapshotAwsCdk(cdkTagv2_21_1, cdkDirv2_21_1);
}

main();
