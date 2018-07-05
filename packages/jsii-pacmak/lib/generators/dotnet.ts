import { spawn } from "child_process";
import { dirname } from "path";
import { IGenerator } from "../generator";

export default class DotNetGenerator implements IGenerator {
    private jsiiFile: string;

    public generate(): void {
        // The DotNet generator does not currently support in-memory generation.
        // Support can be added relatively easily if necessary.
    }

    public async load(jsiiFile: string) {
        this.jsiiFile = jsiiFile;
    }

    public save(outdir: string, tarball: string): Promise<any> {
        const runtimeRoot = dirname(require.resolve('jsii-dotnet-generator/package.json'));
        const cliPath = `${runtimeRoot}/cli/${this.getRuntime()}/publish/AWS.Jsii.Generator.CLI`;
        const cli = spawn(cliPath, ['--jsii', this.jsiiFile, '--tarball', tarball, '--output', outdir], { stdio: 'inherit' });

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

    private getRuntime(): string {
        // We don't want to require dotnet core as a pacmak dependency,
        // so we use dotnet publish to create a standalone bundle that
        // includes the dotnet runtime. This bundle is platform-specific,
        // so we generate a different bundle for each platform supported
        // by nodejs.
        return `${this.getPlatform()}-${this.getArchitecture()}`;
    }

    private getPlatform(): string {
        switch (process.platform) {
            case "darwin":
                return "osx";

            case "linux":
                return "linux";

            case "win32":
                return "win";

            default:
                throw new Error(`Unsupported platform: '${process.platform}'`);
        }
    }

    private getArchitecture(): string {
        switch (process.arch) {
            case "x32":
                if (process.platform !== "win32") {
                    throw new Error(`x86 architecture is not supported on ${process.platform}`);
                }

                return "x86";

            case "x64":
                return "x64";

            default:
                throw new Error(`Unsupported architecture: '${process.arch}'`);
        }
    }
}
