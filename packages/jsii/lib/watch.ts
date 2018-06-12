import { spawn } from 'child_process';
import * as path from 'path';
import { saveCompilerOptions, saveLinterOptions } from './compiler-options';

export async function watch(cwd: string) {
    // create tsconfig.json
    await saveCompilerOptions(cwd);
    await saveLinterOptions(cwd);

    // find the 'tsc' executable relative to our typescript compiler module to ensure same version
    const tsc = path.resolve(path.join(require.resolve('typescript'), '../../bin/tsc'));

    // execute!
    const child = spawn(tsc, [ '--watch' ], { cwd, stdio: 'inherit' });

    // wait until child is done.
    return new Promise((ok, fail) => {
        child.on('exit', code => {
            if (code === 0) {
                ok();
            } else {
                fail(new Error('non-zero exit code: ' + code));
            }
        });
    });
}
