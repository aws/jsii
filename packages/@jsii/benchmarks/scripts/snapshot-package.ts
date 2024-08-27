import * as cp from 'child_process';
import * as fs from 'fs-extra';
import * as glob from 'glob';
import * as os from 'os';
import * as path from 'path';
import * as tar from 'tar';
import * as ts from 'typescript';

import { cdkTag, cdk, fixturesDir } from '../lib/constants';

// Using the local `npm` package (from dependencies)
const npm = path.resolve(__dirname, '..', 'node_modules', '.bin', 'npm');

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
    `yarn lerna run --scope aws-cdk-lib --include-dependencies --concurrency=2 --stream build`,
    { cwd: repoDir },
  );

  // Copy built package to intermediate directory
  fs.copySync(path.resolve(repoDir, 'packages', 'aws-cdk-lib'), intermediate);

  // Remove build artifacts so we can rebuild
  const artifacts = glob.globSync(
    path.join(intermediate, '**/*@(.js|.js.map|.d.ts|.tsbuildinfo)'),
  );
  const exceptions = new Set([
    // Need to keep some declarations files that are part of the source...
    path.join(
      intermediate,
      'custom-resources/lib/provider-framework/types.d.ts',
    ),
  ]);
  artifacts.filter((file) => !exceptions.has(file)).forEach(fs.removeSync);

  // Remove node_modules from monorepo setup
  fs.removeSync(path.resolve(intermediate, 'node_modules'));

  // Remove @aws-cdk/* deps from package.json so we can npm install to get hoisted dependencies
  // into local node_modules
  const packageJsonPath = path.resolve(intermediate, 'package.json');
  const { devDependencies, ...pkgJson } = fs.readJsonSync(packageJsonPath);
  const newDevDependencies = Object.entries(devDependencies).reduce(
    (accum, [pkg, version]) => {
      if (pkg !== 'typescript' && !pkg.startsWith('@aws-cdk/'))
        accum[pkg] = version as string;

      return accum;
    },
    {
      // Some un-modeled dependencies that exist (will be overridden if modeled)
      '@types/aws-lambda': '^8.10.99',
      '@types/minimatch': '^3.0.5',
      '@types/node': '^14',
      '@types/punycode': '^2.1.0',
      '@types/semver': '^7.3.9',
      'aws-sdk': '^2.596.0',
      'typescript-json-schema': '0.64.0',
      // For good measure, the typescript compiler
      typescript: `~${ts.version}`,
    } as Record<string, string>,
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
  cp.execSync(`${npm} install`, { cwd: intermediate });
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
  fs.mkdirpSync(fixturesDir);
  snapshotAwsCdk(cdkTag, cdk);
}

main();
