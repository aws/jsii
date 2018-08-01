import { spawn, SpawnOptions } from 'child_process';
import fs = require('fs-extra');
import spec = require('jsii-spec');
import path = require('path');
import logging = require('./logging');

/**
 * Given an npm package directory and a dependency name, returns the package directory of the dep.
 * @param packageDir     the root of the package declaring the dependency.
 * @param dependencyName the name of the dependency to be resolved.
 * @return the resolved directory path.
 */
export function resolveDependencyDirectory(packageDir: string, dependencyName: string): string {
    const lookupPaths = [ path.join(packageDir, 'node_modules') ];
    return path.dirname(require.resolve(`${dependencyName}/package.json`, { paths: lookupPaths }));
}

export function shell(cmd: string, args: string[], options: SpawnOptions): Promise<string> {
    return new Promise<string>((resolve, reject) => {
        const child = spawn(cmd, args, { ...options, shell: true, stdio: ['ignore', 'pipe', 'pipe'] });
        const stdout = new Array<Buffer>();
        const stderr = new Array<Buffer>();
        child.stdout.on('data', chunk => {
            if (logging.level >= logging.LEVEL_VERBOSE) {
                process.stderr.write(chunk); // notice - we emit all build output to stderr
            }
            stdout.push(Buffer.from(chunk));
        });
        child.stderr.on('data', chunk => {
            if (logging.level >= logging.LEVEL_VERBOSE) {
                process.stderr.write(chunk);
            }
            stderr.push(Buffer.from(chunk));
        });
        child.once('error', reject);
        child.once('exit', (code, signal) => {
            const out = Buffer.concat(stdout).toString('utf-8');
            if (code === 0) { return resolve(out); }
            const err = Buffer.concat(stderr).toString('utf-8');
            if (code != null) { return reject(new Error(`Process exited with status ${code}\n${out}\n${err}`)); }
            reject(new Error(`Process terminated by signal ${signal}\n${out}\n${err}`));
        });
    });
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
        throw new Error(`Could not find ${assmPath}. Was the module built?`);
    }
    return spec.validateAssembly(await fs.readJson(assmPath));
}
