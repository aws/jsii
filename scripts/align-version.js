#!/usr/bin/env node
//
// align the version in a package.json file to the version of the repo
//
const fs = require('fs');

const marker = require('./get-version-marker');
const repoVersion = require('./get-version');

const exclude = [
  'jsii-calc',
  '@scope/jsii-calc-base-of-base'
]

for (const file of process.argv.splice(2)) {
  const pkg = JSON.parse(fs.readFileSync(file).toString());

  // Ignore fixture packages
  if (pkg.name === '@fixtures/jsii-calc-bundled') {
    continue;
  }

  // jsii-calc have special versions to test golang major version suffix
  if (!exclude.includes(pkg.name)) {
    if (pkg.version !== marker) {
      throw new Error(`unexpected - all package.json files in this repo should have a version of ${marker}: ${file}`);
    }

    pkg.version = repoVersion;
  }

  processSection(pkg.dependencies || { }, file);
  processSection(pkg.devDependencies || { }, file);
  processSection(pkg.peerDependencies || { }, file);

  console.error(`${file} => ${repoVersion}`);
  fs.writeFileSync(file, JSON.stringify(pkg, undefined, 2));
}

function processSection(section, file) {
  for (const [name, version] of Object.entries(section)) {
    if (
      version === marker ||
      version === '^' + marker ||
      // dependencies on jsii-rosetta can include many compatible versions
      (name == 'jsii-rosetta' && version.includes('^' + marker))
    ) {
      section[name] = version.replace(marker, repoVersion);
    }
  }
}
