import childProcess = require('child_process');
import fs = require('fs-extra');
import spec = require('jsii-spec');
import path = require('path');

import { IGenerator } from './generator';

export abstract class Target {
    public static readonly all = new Promise<{ [name: string]: TargetConstructor }>(async (ok, ko) => {
        try {
            const result: { [name: string]: TargetConstructor } = {};
            const targetDir = path.join(__dirname, 'targets');
            for (const name of await fs.readdir(targetDir)) {
                if (!name.endsWith('.js')) { continue; }
                result[name.slice(0, name.length - 3)] = require(path.join(targetDir, name)).default;
            }
            ok(result);
        } catch (e) {
            ko(e);
        }
    });

    protected readonly packageDir: string;
    protected readonly fingerprint: boolean;
    protected readonly force: boolean;
    protected readonly arguments: { [name: string]: any };

    protected abstract get generator(): IGenerator;

    constructor(options: TargetOptions) {
        this.packageDir = options.packageDir;
        this.fingerprint = options.fingerprint != null ? options.fingerprint : true;
        this.force = options.force != null ? options.force : false;
        this.arguments = options.arguments;
    }

    /**
     * Emits code artifacts.
     *
     * @param outDir the directory where the generated source will be placed.
     */
    public async generateCode(outDir: string): Promise<void> {
        const jsiiFile = path.join(this.packageDir, spec.SPEC_FILE_NAME);
        if (!await fs.pathExists(jsiiFile)) {
            throw new Error(`No JSII assembly found at ${jsiiFile}`);
        }
        await this.generator.load(jsiiFile);
        if (this.force || !await this.generator.upToDate(outDir)) {
            await this.generator.generate(this.fingerprint);
            await this.generator.save(outDir, await this.npmPack());
        }
    }

    /**
     * Builds the generated code.
     *
     * @param sourceDir the directory where the generated source was put.
     * @param targetDir the directory where the build artifacts will be placed.
     */
    public async build(sourceDir: string, outDir: string) {
        // tslint:disable-next-line:no-console
        console.log(`${this.constructor.name} does not implement a build phase - publishing the generated source to ${outDir}`);
        await fs.copy(sourceDir, outDir, { overwrite: true, recursive: true });
    }

    protected runCommand(cmd: string, args: string[], options: childProcess.SpawnOptions): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            const child = childProcess.spawn(cmd, args, { ...options, shell: true, stdio: ['ignore', 'pipe', 'pipe'] });
            const stdout = new Array<Buffer>();
            const stderr = new Array<Buffer>();
            child.stdout.on('data', chunk => stdout.push(Buffer.from(chunk)));
            child.stderr.on('data', chunk => stderr.push(Buffer.from(chunk)));
            child.once('error', reject);
            child.once('exit', (code, signal) => {
                const out = Buffer.concat(stdout).toString('utf-8');
                if (code === 0) { return resolve(path.resolve(this.packageDir, out.trim())); }
                const err = Buffer.concat(stderr).toString('utf-8');
                if (code != null) { return reject(new Error(`Process exited with status ${code}\n${out}\n${err}`)); }
                reject(new Error(`Process terminated by signal ${signal}\n${out}\n${err}`));
            });
        });
    }

    private npmPack(): Promise<string> {
        return this.runCommand('npm', ['pack'], { cwd: this.packageDir });
    }
}

export interface TargetConstructor {
    new(options: TargetOptions): Target;
}

export interface TargetOptions {
    /** The directory where the JSII package is located */
    packageDir: string;
    /**
     * Whether to fingerprint the produced artifacts.
     * @default true
     */
    fingerprint?: boolean;
    /**
     * Whether artifacts should be re-build even if their fingerprints look up-to-date.
     * @default false
     */
    force?: boolean;
    /**
     * Arguments provided by the user (how they are used is target-dependent)
     */
    arguments: { [name: string]: any };
}
