import fs = require('fs-extra');
import spec = require('jsii-spec');
import path = require('path');

import { IGenerator } from './generator';
import logging = require('./logging');
import { resolveDependencyDirectory } from './util';

export abstract class Target {
    public static async findAll() {
        return new Promise<{ [name: string]: TargetConstructor }>(async (ok, ko) => {
            try {
                const result: { [name: string]: TargetConstructor } = {};
                const targetDir = path.join(__dirname, 'targets');
                for (const name of await fs.readdir(targetDir)) {
                    if (!name.endsWith('.js')) { continue; }
                    result[path.basename(name, '.js')] = require(path.join(targetDir, name)).default;
                }
                ok(result);
            } catch (e) {
                ko(e);
            }
        });
    }

    protected readonly packageDir: string;
    protected readonly fingerprint: boolean;
    protected readonly force: boolean;
    protected readonly arguments: { [name: string]: any };
    protected readonly targetName: string;

    protected abstract get generator(): IGenerator;

    constructor(options: TargetOptions) {
        this.packageDir = options.packageDir;
        this.fingerprint = options.fingerprint != null ? options.fingerprint : true;
        this.force = options.force != null ? options.force : false;
        this.arguments = options.arguments;
        this.targetName = options.targetName;
    }

    /**
     * Emits code artifacts.
     *
     * @param outDir the directory where the generated source will be placed.
     */
    public async generateCode(outDir: string, tarball: string): Promise<void> {
        await this.generator.load(this.packageDir);
        if (this.force || !await this.generator.upToDate(outDir)) {
            await this.generator.generate(this.fingerprint);
            await this.generator.save(outDir, tarball);
        } else {
            logging.info(`Generated code for ${this.targetName} was already up-to-date in ${outDir} (use --force to re-generate)`);
        }
    }

    /**
     * Builds the generated code.
     *
     * @param sourceDir the directory where the generated source was put.
     * @param outDir    the directory where the build artifacts will be placed.
     */
    public abstract build(sourceDir: string, outDir: string): Promise<void>;

    /**
     * A utility to copy files from one directory to another.
     *
     * @param sourceDir the directory to copy from.
     * @param targetDir the directory to copy into.
     */
    protected async copyFiles(sourceDir: string, targetDir: string) {
        await fs.copy(sourceDir, targetDir, { recursive: true });
    }

    /**
     * Traverses the dep graph and returns a list of pacmak output directories
     * available locally for this specific target. This allows target builds to
     * take local dependencies in case a dependency is checked-out.
     *
     * @param packageDir The directory of the package to resolve from.
     */
    protected async findLocalDepsOutput(packageDir: string, isRoot = true) {
        const results = new Array<string>();
        const pkg = await fs.readJson(path.join(packageDir, 'package.json'));

        // no jsii or jsii.outdir - either a misconfigured jsii package or a non-jsii dependency. either way, we are done here.
        if (!pkg.jsii || !pkg.jsii.outdir) {
            return [];
        }

        // if an output directory exists for this module, then we add it to our
        // list of results (unless it's the root package, which we are currently building)
        const outdir = path.join(packageDir, pkg.jsii.outdir, this.targetName);
        if (!isRoot && await fs.pathExists(outdir)) {
            logging.debug(`Found ${outdir} as a local dependency output`);
            results.push(outdir);
        }

        // now descend to dependencies
        for (const dependencyName of Object.keys(pkg.dependencies || {})) {
            const dependencyDir =  resolveDependencyDirectory(packageDir, dependencyName);
            for (const dir of await this.findLocalDepsOutput(dependencyDir, /* isRoot */ false)) {
                results.push(dir);
            }
        }

        return results;
    }
}

export interface TargetConstructor {
    /**
     * Provides information about an assembly in the usual package repositories for the target. This includes information
     * necessary to locate the package in the repositories (a URL to the repository's public endpoint), as well as usage
     * instructions for the various configruation files (e.g: Maven POM, Gemfile, ...) and/or installation instructions
     * using the standard command line tools (npm, yarn, ...).
     *
     * @param assm the assembly for which coodinates are requested.
     *
     * @return Information about the assembly in the various package managers supported for a given language.
     */
    toPackageInfos?: (assm: spec.Assembly) => { [language: string]: PackageInfo };

    /**
     * Provides the native way to reference a Type, for example a Java import statement, or a Javscript require directive.
     * Particularly useful when generating documentation.
     *
     * @param type    the JSII type for which a native reference is requested.
     * @param options the target-specific options provided.
     *
     * @return the native reference for the target for each supported language.
     */
    toNativeReference?: (type: spec.Type, options: any) => { [language: string]: string };

    new(options: TargetOptions): Target;
}

/**
 * Information about a package
 */
export interface PackageInfo {
    /** The name by which the package repository is known */
    repository: string;

    /** The URL to the package within it's repository */
    url: string;

    /**
     * Configuration fragments or installation instructions, by client scenario (e.g: maven + gradle). Values can be a
     * plain string (documentation should render as a pre-formatted block of text using monospace font), or an object
     * describing a language-tagged block of code.
     */
    usage: { [label: string]: string | { language: string, code: string } };
}

export interface TargetOptions {
    /** The name of the target language we are generating */
    targetName: string;

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
