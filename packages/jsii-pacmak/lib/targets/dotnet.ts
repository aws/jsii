import { spawn } from 'child_process';
import { dirname } from 'path';
import { IGenerator } from '../generator';
import { Target, TargetOptions } from '../target';

export default class Dotnet extends Target {
    protected readonly generator = new DotNetGenerator();

    constructor(options: TargetOptions) {
        super(options);
    }

    public build(sourceDir: string, outDir: string) {
        // TODO: Actually build!
        return this.copyFiles(sourceDir, outDir);
    }
}

// ##################
// # CODE GENERATOR #
// ##################

class DotNetGenerator implements IGenerator {
    private jsiiFile: string;

    public generate(): void {
        // The DotNet generator does not currently support in-memory generation.
        // Support can be added relatively easily if necessary.
    }

    public async load(jsiiFile: string) {
        this.jsiiFile = jsiiFile;
    }

    public upToDate(_: string): Promise<boolean> {
        return Promise.resolve(false);
    }

    public save(outdir: string, tarball: string): Promise<any> {
        const runtimeRoot = dirname(require.resolve('jsii-dotnet-generator/package.json'));
        const cliPath = `${runtimeRoot}/cli/publish/Amazon.JSII.Generator.CLI.dll`;
        const cli = spawn("dotnet", [cliPath, '--jsii', this.jsiiFile, '--tarball', tarball, '--output', outdir], { stdio: 'inherit' });

        return new Promise<number>((resolve, reject) => {
            cli.once('exit', code => {
                if (code === 0) {
                    return resolve();
                } else {
                    return reject(new Error(`jsii-dotnet-generator exited with code ${code}`));
                }
            });

            cli.once('error', err => reject(err));
        });
    }
}
