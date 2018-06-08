import { spawn } from "child_process";
import { dirname } from "path";
import { IGenerator } from "../generator";

export default class DotNetGenerator implements IGenerator {
    constructor(private jsiiFile: string) {
    }

    public generate(): void {
        // The DotNet generator does not currently support in-memory generation.
        // Support can be added relatively easily if necessary.
    }

    public save(outdir: string): Promise<any> {
        const runtimeRoot = dirname(require.resolve('jsii-dotnet-generator'));
        const cliPath = `${runtimeRoot}/cli/${this.getRuntime()}/publish/AWS.Jsii.Generator.CLI`;

        const promise = new Promise<number>((resolve, reject) => {
            const cli = spawn(cliPath, ['--jsii', this.jsiiFile, '--output', outdir]);
            let resolved = false;

            cli.on('close', code => {
                if (!resolved) {
                    resolved = true;
                    resolve(code);
                }
            });

            cli.on('error', code => {
                if (!resolved) {
                    resolved = true;
                    reject(code);
                }
            });
        });

        return promise;
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
