#!/usr/bin/env npx ts-node

import { runCommand } from '@jsii/go-runtime/build-tools/_constants';
import { localRuntimeModules } from '@jsii/go-runtime/lib/local-runtime-modules';
import { readFileSync, removeSync, writeFileSync } from 'fs-extra';
import { join, relative, resolve } from 'path';

const genRoot = join(__dirname, '..', 'jsii-calc');

removeSync(genRoot);
runCommand(
  'node_modules/.bin/jsii-pacmak',
  [
    '-t',
    'go',
    '-v',
    '-c',
    '-o',
    genRoot,
    '--recurse',
    resolve(__dirname, '..', '..', '..', 'jsii-calc'),
  ],
  { stdio: 'inherit' },
);

// Inject "replaces" in the go.mod files so IDEs do not struggle too much...
const genModules = localRuntimeModules(genRoot);
for (const localPath of Object.values(genModules)) {
  const goModFile = join(localPath, 'go.mod');
  const goMod = readFileSync(goModFile, 'utf8');

  const replaces = new Array<{
    readonly dep: string;
    readonly depPath: string;
  }>();

  let matches: ReturnType<RegExp['exec']>;
  const depRegex = /([a-z0-9._~/-]+)\s+v\d/gi;
  while ((matches = depRegex.exec(goMod)) != null) {
    const [, dep] = matches;
    if (dep in genModules) {
      const depPath = genModules[dep];
      replaces.push({ dep, depPath });
    }
  }

  writeFileSync(
    goModFile,
    [
      goMod.trim(),
      '',
      '// Injected by "yarn gen:calc", aka build-tools/gen-calc.ts',
      'replace (',
      ...replaces
        .map(
          ({ dep, depPath }) => `\t${dep} => ${relative(localPath, depPath)}`,
        )
        .sort(),
      ')',
      '',
    ].join('\n'),
  );
}
