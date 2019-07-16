/*
 * Installs repo-local dependencies manually, as lerna ignores those...
 */
const { exec, execSync } = require('child_process');
const { existsSync, mkdirSync, symlinkSync } = require('fs');
const { dirname, join, resolve } = require('path');

exec('lerna ls --json --all', { shell: true }, (error, stdout) => {
  if (error) {
    console.error('Error: ', error);
    process.exit(-1);
  }
  const modules = JSON.parse(stdout.toString('utf8'));
  for (const module of modules.reverse()) {
    console.log(`Installing dependencies of ${module.name} in ${module.location} ...`);
    const packageInfo = require(join(module.location, 'package.json'));
    const installed = installDeps(module.location, packageInfo.dependencies, packageInfo.devDependencies);
    console.log(`... installed ${installed} local dependencies!`);
  }
});

function installDeps(location, ...depLists) {
  let paths = new Set();
  for (const depList of depLists) {
    Object.entries(depList || {})
      .forEach(([, version]) => {
        const matched = version.match(/^file:(.+)$/);
        if (!matched) { return; }
        paths.add(matched[1]);
      });
  }

  if (paths.size > 0)
    execSync(`npm install --ignore-scripts --no-save ${[...paths].join(' ')}`, { cwd: location, shell: true, stdio: 'ignore' });

  return paths.size;
}
