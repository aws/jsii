//
// jsii-fix-peers
//
// Inspects the local .jsii file and adds "peerDependencies" to the local
// package.json for all modules that include types that are referenced as part
// of the current module's public API.
//
// This resolves all peer dependency warnings emitted by the jsii compiler.
//

// tslint:disable:no-console

import fs = require('fs-extra');
import spec = require('jsii-spec');

fixPeers().catch(e => {
  console.error(e.stack);
  process.exit(1);
});

async function fixPeers() {
  const jsiiFile = './.jsii';
  const pkgFile = './package.json';

  if (!(await fs.pathExists(jsiiFile))) {
    throw new Error(`Cannot find '${jsiiFile}. Make sure to compile first`);
  }

  if (!(await fs.pathExists(pkgFile))) {
    throw new Error(`Cannot find '${pkgFile}' in current working directory`);
  }

  const jsii = await fs.readJson(jsiiFile) as spec.Assembly;
  const pkg = await fs.readJson(pkgFile);

  // find all type references (FQNs) in the assembly.
  const fqns = findAllFQNs(jsii);

  let updated = false;

  // read "dependencies" and "peerDependencies" from package.json
  if (!pkg.peerDependencies) { pkg.peerDependencies = {}; }
  const peers = pkg.peerDependencies;
  const deps = pkg.dependencies || {};

  // iterate over all FQNs and ensure that all referenced modules appear as peer dependencies
  for (const fqn of fqns) {
    const [ module, ] = fqn.split('.');
    if (module === jsii.name) {
      continue;
    }

    // verify that `module` exists in peerDependencies
    if (module in peers) {
      continue;
    }

    // fetch the module's version requirement from "dependencies" (we expect it to be there)
    const dep = deps[module];
    if (!dep) {
      throw new Error(`Cannot find ${module} neither under "peerDependencies" nor "dependencies". Can't fix.`);
    }

    // fixing time! add this module to "peerDependencies"
    peers[module] = dep;
    console.log(`added ${module}@${dep} to "peerDependencies"`);
    updated = true;
  }

  if (updated) {
    await fs.writeJson(pkgFile, pkg, { spaces: 2 });
  }
}

/**
 * Looks up all { "fqn": "boom" } objects in a JSON tree.
 * @param node Initial node (i.e. a JSII assembly)
 * @param out Used by the recursive call to collect outputs
 */
function findAllFQNs(node: any, out = new Set<string>()) {
  if (typeof(node) === 'object' && 'fqn' in node) {
    out.add(node.fqn);
  }

  for (const key of Object.keys(node)) {
    const value = node[key];
    if (Array.isArray(value)) {
      value.forEach(v => findAllFQNs(v, out));
    } else if (typeof(value) === 'object') {
      findAllFQNs(value, out);
    }
  }

  return Array.from(out);
}
