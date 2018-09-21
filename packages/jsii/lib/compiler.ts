import Case = require('case');
import colors = require('colors/safe');
import fs = require('fs-extra');
import log4js = require('log4js');
import path = require('path');
import ts = require('typescript');
import { Assembler } from './assembler';
import { EmitResult, Emitter } from './emitter';
import { ProjectInfo } from './project-info';
import utils = require('./utils');

const COMPILER_OPTIONS: ts.CompilerOptions = {
    alwaysStrict: true,
    charset: 'utf8',
    declaration: true,
    composite: true,
    experimentalDecorators: true,
    inlineSourceMap: true,
    inlineSources: true,
    jsx: ts.JsxEmit.React,
    jsxFactory: 'jsx.create',
    lib: ['lib.es2016.d.ts', 'lib.es2017.object.d.ts', 'lib.es2017.string.d.ts'],
    module: ts.ModuleKind.CommonJS,
    noEmitOnError: true,
    noFallthroughCasesInSwitch: true,
    noImplicitAny: true,
    noImplicitReturns: true,
    noImplicitThis: true,
    noUnusedLocals: true,
    noUnusedParameters: true,
    resolveJsonModule: true,
    strict: true,
    strictNullChecks: true,
    strictPropertyInitialization: false,
    target: ts.ScriptTarget.ES2018
};

const LOG = log4js.getLogger('jsii/compiler');
export const DIAGNOSTICS = 'diagnostics';

export interface CompilerOptions {
    /** The information about the project to be built */
    projectInfo: ProjectInfo;
    /** Whether the compiler should watch for changes or just compile once */
    watch: boolean;
}

export interface TypescriptConfig {
    compilerOptions: ts.CompilerOptions;
    include?: string[];
    exclude?: string[];
    references?: ts.ProjectReference[];
}

export class Compiler implements Emitter {
    private readonly compilerHost: ts.CompilerHost;
    private typescriptConfig: TypescriptConfig;
    private readonly rootFiles: string[] = [];
    private readonly configPath: string;

    public constructor(private readonly options: CompilerOptions) {
        this.compilerHost = ts.createCompilerHost(COMPILER_OPTIONS);
        this.compilerHost.getCurrentDirectory = () => this.options.projectInfo.projectRoot;
        this.configPath = path.join(this.options.projectInfo.projectRoot, 'tsconfig.json');
    }

    /**
     * Compiles the configured program.
     *
     * @param files can be specified to override the standard source code location logic. Useful for example when testing "negatives".
     */
    public async emit(...files: string[]): Promise<EmitResult | never> {
        await this.buildTypeScriptConfig();
        await this.writeTypeScriptConfig();
        await this.determineSources(files);

        if (this.options.watch) {
            if (files.length > 0) {
                throw new Error(`Files cannot be specified in watch mode!`);
            }
            return await this._startWatch();
        } else {
            return await this._buildOnce();
        }
    }

    /**
     * Do a single build
     */
    private async _buildOnce(): Promise<EmitResult> {
        const prog = ts.createProgram({
            rootNames: this.rootFiles.concat(_pathOfLibraries(this.compilerHost)),
            options: COMPILER_OPTIONS,
            projectReferences: this.typescriptConfig.references,
            host: this.compilerHost
        });
        return await this._consumeProgram(prog);
    }

    /**
     * Start a watch on the config that has been written to disk
     */
    private async _startWatch(): Promise<never> {
        return new Promise<never>(async () => {
            const projectRoot = this.options.projectInfo.projectRoot;
            const host = ts.createWatchCompilerHost(
                this.configPath,
                COMPILER_OPTIONS,
                { ...ts.sys, getCurrentDirectory() { return projectRoot; } }
            );
            const orig = host.afterProgramCreate;
            host.afterProgramCreate = async builderProgram => {
                await this._consumeProgram(builderProgram.getProgram());
                if (orig) { orig.call(host, builderProgram); }
            };
            ts.createWatchProgram(host);
            // Previous call never returns
        });
    }

    private async _consumeProgram(program: ts.Program): Promise<EmitResult> {
        const emit = program.emit();
        if (emit.emitSkipped) {
            LOG.error('Compilation errors prevented the JSII assembly from being created');
            return emit;
        }
        const assembler = new Assembler(this.options.projectInfo, program);
        const assmEmit = await assembler.emit();
        if (assmEmit.emitSkipped) {
            LOG.error('Type model errors prevented the JSII assembly from being created');
        }
        return {
            emitSkipped: assmEmit.emitSkipped,
            diagnostics: [...emit.diagnostics, ...assmEmit.diagnostics]
        };
    }

    /**
     * Build the TypeScript config object
     */
    private async buildTypeScriptConfig() {
        const references = await this.findProjectReferences();

        this.typescriptConfig = {
            compilerOptions: {
                ...COMPILER_OPTIONS,
                // Need to stip the `lib.` prefix and `.d.ts` suffix
                lib: COMPILER_OPTIONS.lib && COMPILER_OPTIONS.lib.map(name => name.slice(4, name.length - 5)),
                // Those int-enums, we need to output the names instead
                module: COMPILER_OPTIONS.module && ts.ModuleKind[COMPILER_OPTIONS.module],
                target: COMPILER_OPTIONS.target && ts.ScriptTarget[COMPILER_OPTIONS.target],
                jsx: COMPILER_OPTIONS.jsx && Case.snake(ts.JsxEmit[COMPILER_OPTIONS.jsx]),
            },
            include: ["**/*.ts"],
            exclude: ["node_modules"],
            // Change the references a little. We write 'originalpath' to the file under 'path', which is
            // the same as what the TypeScript compiler does.
            references: references.map(p => ({ path: p })),
        } as any;
    }

    /**
     * Creates a `tsconfig.json` file to improve the IDE experience.
     *
     * @return the fully qualified path to the ``tsconfig.json`` file
     */
    private async writeTypeScriptConfig(): Promise<void> {
        const commentKey = '_generated_by_jsii_';
        const commentValue = 'Generated by jsii - safe to delete, and ideally should be in .gitignore';

        (this.typescriptConfig as any)[commentKey] = commentValue;

        if (await fs.pathExists(this.configPath)) {
            const currentConfig = await fs.readJson(this.configPath);
            if (!(commentKey in currentConfig)) {
                // tslint:disable-next-line:max-line-length
                throw new Error(`A '${this.configPath}' file that was not generated by jsii is in ${this.options.projectInfo.projectRoot}. Aborting instead of overwriting.`);
            }
        }
        LOG.debug(`Creating or updating ${colors.blue(this.configPath)}`);
        await fs.writeJson(this.configPath, this.typescriptConfig, {  replacer: utils.filterEmpty, spaces: 4 });
    }

    /**
     * Find all dependencies that look like TypeScript projects.
     *
     * Enumerate all dependencies, if they have a tsconfig.json file with
     * "composite: true" we consider them project references.
     *
     * Unfortunately it doesn't seem like the TypeScript compiler itself
     * resolves transitive references in a way that
     *
     */
    private async findProjectReferences(): Promise<string[]> {
        const ret = new Array<string>();
        const pkg = require(path.join(this.options.projectInfo.projectRoot, 'package.json'));
        for (const dependencyMap of [pkg.dependencies, pkg.devDependencies]) {
            if (dependencyMap === undefined) { continue; }

            for (const depName of Object.keys(dependencyMap)) {
                let tsconfigFile = path.join('node_modules', depName, 'tsconfig.json');
                if (!await fs.pathExists(tsconfigFile)) { continue; }

                // Resolve symlinks, otherwise the TypeScript compiler will not
                // find the project the files belong to.
                tsconfigFile = await fs.realpath(tsconfigFile);

                const tsconfig = require(tsconfigFile);
                if (tsconfig.compilerOptions && tsconfig.compilerOptions.composite) {
                    ret.push(path.dirname(tsconfigFile));
                }

                for (const reference of tsconfig.references || []) {
                    ret.push(await fs.realpath(reference.path));
                }
            }
        }
        return ret;
    }

    /**
     * Find source files using the same mechanism that the TypeScript compiler itself uses.
     *
     * Respects includes/excludes/etc.
     *
     * This makes it so that running 'tsc' and running 'jsii' has the same behavior.
     */
    private async determineSources(files: string[]): Promise<void> {
        this.rootFiles.splice(0);

        if (files.length > 0) {
            this.rootFiles.push(...files);
        } else {
            const parseConfigHost = (ts as any /* private API */).parseConfigHostFromCompilerHost(this.compilerHost);
            const parsed = ts.parseJsonConfigFileContent(this.typescriptConfig, parseConfigHost, this.options.projectInfo.projectRoot);
            this.rootFiles.push(...parsed.fileNames);
        }
    }
}

function _pathOfLibraries(host: ts.CompilerHost | ts.WatchCompilerHost<any>): string[] {
    if (!COMPILER_OPTIONS.lib || COMPILER_OPTIONS.lib.length === 0) { return []; }
    const lib = host.getDefaultLibLocation && host.getDefaultLibLocation();
    if (!lib) {
        throw new Error(`Compiler host doesn't have a default library directory available for ${COMPILER_OPTIONS.lib.join(', ')}`);
    }
    return COMPILER_OPTIONS.lib.map(name => path.join(lib, name));
}