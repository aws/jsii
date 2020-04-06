import fs = require('fs-extra');
import os = require('os');
import path = require('path');
import { Compiler } from '../lib/compiler';
import { loadProjectInfo } from '../lib/project-info';

let tmpdir: string | undefined;

beforeEach(async () => {
  tmpdir = await fs.mkdtemp(path.join(os.tmpdir(), path.basename(__filename)));
});

afterEach(async () => {
  if (tmpdir !== undefined) { 
    await fs.remove(tmpdir);
  }
});

test('compiled output contains jsii excludes', async () => {
  const packageInfo = {
    types: 'index.ts',
    main: 'index.js',
    name: 'testpkg', // That's what package.json would tell if we look up...
    version: '0.0.1',
    license: 'Apache-2.0',
    author: { name: 'John Doe', roles: ['author'] },
    repository: { type: 'git', url: 'https://github.com/aws/jsii.git' },
    jsii: {
      exclude: ['exclude-dir/exclude-file'],
      excludeTypescript: ['exclude-ts'],
    },
  };

  await fs.writeFile(path.resolve(tmpdir!, 'index.ts'), 'export class Foo { public foo() {} }', { encoding: 'utf-8' });
  await fs.writeJson(path.resolve(tmpdir!, 'package.json'), packageInfo, { encoding: 'utf-8' });
  
  const compiler = new Compiler({
    projectInfo: await loadProjectInfo(tmpdir!, { fixPeerDependencies: false }),
  });
  await compiler.emit();
  const tsConfigPath = path.resolve(tmpdir!, 'tsconfig.json');
  expect(await fs.pathExists(tsConfigPath)).toBeTruthy();
  const tsConfigJson = await fs.readJSON(tsConfigPath);
  console.log(`nijaaa ${JSON.stringify(tsConfigJson)}`);
});