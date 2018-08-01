import fs = require('fs-extra');
import spec = require('jsii-spec');
import path = require('path');

/**
 * Given an npm package directory and a dependency name, returns the package directory of the dep.
 * @param packageDir     the root of the package declaring the dependency.
 * @param dependencyName the name of the dependency to be resolved.
 * @return the resolved directory path.
 */
export function resolveDependencyDirectory(packageDir: string, dependencyName: string): string {
    return path.dirname(require.resolve(`${dependencyName}/package.json`, { paths: [packageDir] }));
}

/**
 * Loads the assembly from a given module root directory.
 *
 * @param modulePath the path at which the node module is located.
 *
 * @return the parsed ``Assembly``.
 *
 * @throws if the module does not contain a JSII assembly file, or if it's invalid.
 */
export async function loadAssembly(modulePath: string): Promise<spec.Assembly> {
    const assmPath = path.join(modulePath, spec.SPEC_FILE_NAME);
    if (!await fs.pathExists(assmPath)) {
        throw new Error(`Could not find ${spec.SPEC_FILE_NAME} in ${modulePath}. Was the module built?`);
    }
    return spec.validateAssembly(await fs.readJson(assmPath));
}
