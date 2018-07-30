import path = require('path');

/**
 * Given an npm package directory and a dependency name, returns the package directory of the dep.
 */
export function resolveDependencyDirectory(packageDir: string, dependencyName: string) {
    const lookupPaths = [ path.join(packageDir, 'node_modules') ];
    return path.dirname(require.resolve(`${dependencyName}/package.json`, { paths: lookupPaths }));
}