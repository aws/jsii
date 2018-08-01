import { spawn, SpawnOptions } from 'child_process';
import path = require('path');
import logging = require('./logging');

/**
 * Given an npm package directory and a dependency name, returns the package directory of the dep.
 */
export function resolveDependencyDirectory(packageDir: string, dependencyName: string) {
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
