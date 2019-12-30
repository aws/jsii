import * as Case from 'case';
import * as colors from 'colors/safe';
import * as events from 'events';
import * as fs from 'fs-extra';
import * as log4js from 'log4js';
import * as path from 'path';
import * as ts from 'typescript';
import { Assembler } from './assembler';
import { EmitResult, Emitter, Diagnostic } from './emitter';
import { ProjectInfo } from './project-info';
import * as utils from './utils';

const COMPILER_OPTIONS: ts.CompilerOptions = {
  alwaysStrict: true,
  charset: 'utf8',
  declaration: true,
  experimentalDecorators: true,
  inlineSourceMap: true,
  inlineSources: true,
  lib: ['lib.es2018.d.ts'],
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
  strictPropertyInitialization: true,
  stripInternal: true,
  target: ts.ScriptTarget.ES2018
};

const LOG = log4js.getLogger('jsii/compiler');
export const DIAGNOSTICS = 'diagnostics';
export const JSII_DIAGNOSTICS_CODE = 9999;

export interface CompilerOptions {
  /** The information about the project to be built */
  projectInfo: ProjectInfo;
  /** Whether to detect and generate TypeScript project references */
  projectReferences?: boolean;
  /** Whether to fail when a warning is emitted */
  failOnWarnings?: boolean;
}

export interface TypescriptConfig {
  compilerOptions: ts.CompilerOptions;
  include?: string[];
  exclude?: string[];
  references?: ts.ProjectReference[];
}

export class Compiler implements Emitter {
  private readonly compilerHost: ts.CompilerHost;
  private typescriptConfig?: TypescriptConfig;
  private rootFiles: string[] = [];
  private readonly configPath: string;
  private readonly projectReferences: boolean;
  private readonly eventEmitter = new events.EventEmitter();

  public constructor(private readonly options: CompilerOptions) {
    this.compilerHost = ts.createCompilerHost(COMPILER_OPTIONS);
    this.compilerHost.getCurrentDirectory = () => this.options.projectInfo.projectRoot;
    this.configPath = path.join(this.options.projectInfo.projectRoot, 'tsconfig.json');

    this.projectReferences = options.projectReferences !== undefined ? options.projectReferences :
      options.projectInfo.projectReferences !== undefined ? options.projectInfo.projectReferences : false;
  }

  /**
   * Adds a listener for the 'result' event that is called with EmitResult.
   *
   * @param event    the 'result' event
   * @param listener the listener to be called with the EmitResult.
   */
  public on(event: 'result', listener: (result: EmitResult) => any): this;
  /**
   * Adds a listener for the 'statusChanged' event that is called with a Diagnostic whenever the
   * status of the current watch process changes.
   *
   * @param event    the 'statusChanged' event
   * @param listener the listener to be called with the Diagnostic.
   */
  public on(event: 'statusChanged', listener: (message: Diagnostic) => any): this;
  public on(event: string, listener: (...args: any[]) => any): this {
    this.eventEmitter.on(event, listener);
    return this;
  }

  /**
   * Adds a once-only listener for the 'result' event that is called with EmitResult.
   *
   * @param event    the 'result' event
   * @param listener the listener to be called with the EmitResult.
   */
  public once(event: 'result', listener: (result: EmitResult) => any): this;
  /**
   * Adds a once-only listener for the 'statusChanged' event that is called with a Diagnostic
   * whenever the status of the current watch process changes.
   *
   * @param event    the 'statusChanged' event
   * @param listener the listener to be called with the Diagnostic.
   */
  public once(event: 'statusChanged', listener: (message: Diagnostic) => any): this;
  public once(event: string, listener: (...args: any[]) => any): this {
    this.eventEmitter.once(event, listener);
    return this;
  }

  /**
   * Compiles the configured program.
   *
   * @param files can be specified to override the standard source code location logic. Useful for example when testing "negatives".
   */
  public async emit(...files: string[]): Promise<EmitResult | never> {
    await this._prepareForBuild(...files);
    return this._buildOnce();

  }

  /**
   * Watches for file changes and dynamically re-compiles whenever needed.
   */
  public async watch(): Promise<Watch> {
    await this._prepareForBuild();
    return this._startWatch();
  }

  /**
   * Prepares the project for build, by creating the necessary configuration
   * file(s), and assigning the relevant root file(s).
   *
   * @param files the files that were specified as input in the CLI invocation.
   */
  private async _prepareForBuild(...files: string[]): Promise<void> {
    await this.buildTypeScriptConfig();
    await this.writeTypeScriptConfig();
    this.rootFiles = this.determineSources(files);
  }

  /**
   * Do a single build
   */
  private async _buildOnce(): Promise<EmitResult> {
    if (!this.compilerHost.getDefaultLibLocation) {
      throw new Error('No default library location was found on the TypeScript compiler host!');
    }

    const tsconf = this.typescriptConfig!;
    const pi = this.options.projectInfo;

    const prog = ts.createProgram({
      rootNames: this.rootFiles.concat(_pathOfLibraries(this.compilerHost)),
      options: { ...pi.tsc, ...COMPILER_OPTIONS },
      // Make the references absolute for the compiler
      projectReferences: tsconf.references?.map(ref => ({ path: path.resolve(ref.path) })),
      host: this.compilerHost
    });

    return this._consumeProgram(prog, this.compilerHost.getDefaultLibLocation());
  }

  /**
   * Start a watch on the config that has been written to disk
   */
  private _startWatch(): Watch {
    const pi = this.options.projectInfo;
    const projectRoot = pi.projectRoot;
    const host = ts.createWatchCompilerHost(
      this.configPath,
      {
        ...pi.tsc,
        ...COMPILER_OPTIONS,
        noEmitOnError: false,
      },
      { ...ts.sys, getCurrentDirectory() { return projectRoot; } },
      ts.createSemanticDiagnosticsBuilderProgram,
      undefined,
      diag => this.eventEmitter.emit('statusChanged', diag)
    );
    if (!host.getDefaultLibLocation) {
      throw new Error('No default library location was found on the TypeScript compiler host!');
    }
    const orig = host.afterProgramCreate;
    host.afterProgramCreate = async builderProgram => {
      const emitResult = await this._consumeProgram(builderProgram.getProgram(), host.getDefaultLibLocation!());

      for (const diag of emitResult.diagnostics.filter(d => d.code === JSII_DIAGNOSTICS_CODE)) {
        utils.logDiagnostic(diag, projectRoot);
      }

      if (orig) { orig.call(host, builderProgram); }
    };
    return ts.createWatchProgram(host);
  }

  private async _consumeProgram(program: ts.Program, stdlib: string): Promise<EmitResult> {
    const emit = program.emit();
    let hasErrors = emitHasErrors(emit, this.options.failOnWarnings);
    const diagnostics = [...emit.diagnostics];

    if (hasErrors) {
      LOG.error('Compilation errors prevented the JSII assembly from being created');
    }

    // we continue to do jsii checker even if there are compilation errors so that
    // jsii warnings will appear. However, the Assembler might throw an exception
    // because broken/missing type information might lead it to fail completely.
    try {
      const assembler = new Assembler(this.options.projectInfo, program, stdlib);
      const assmEmit = await assembler.emit();
      if (assmEmit.emitSkipped) {
        LOG.error('Type model errors prevented the JSII assembly from being created');
      }

      hasErrors = hasErrors || emitHasErrors(assmEmit, this.options.failOnWarnings);
      diagnostics.push(...assmEmit.diagnostics);
    } catch (e) {
      LOG.error(`Error during type model analysis: ${e}`);
    }

    const result: EmitResult = { emitSkipped: hasErrors, diagnostics, emittedFiles: emit.emittedFiles };
    this.eventEmitter.emit('result', result);
    return result;
  }

  /**
   * Build the TypeScript config object
   *
   * This is the object that will be written to disk.
   */
  private async buildTypeScriptConfig() {
    let references: string[] | undefined;
    let composite: boolean | undefined;
    if (this.projectReferences) {
      references = await this.findProjectReferences();
      composite = true;
    }

    const pi = this.options.projectInfo;

    this.typescriptConfig = {
      compilerOptions: {
        ...pi.tsc,
        ...COMPILER_OPTIONS,
        composite,
        // Need to stip the `lib.` prefix and `.d.ts` suffix
        lib: COMPILER_OPTIONS.lib?.map(name => name.slice(4, name.length - 5)),
        // Those int-enums, we need to output the names instead
        module: COMPILER_OPTIONS.module && ts.ModuleKind[COMPILER_OPTIONS.module],
        target: COMPILER_OPTIONS.target && ts.ScriptTarget[COMPILER_OPTIONS.target],
        jsx: COMPILER_OPTIONS.jsx && Case.snake(ts.JsxEmit[COMPILER_OPTIONS.jsx]),
      },
      include: [pi.tsc?.rootDir ? `${pi.tsc.rootDir}/**/*.ts` : '**/*.ts'],
      exclude: ['node_modules'].concat(pi.excludeTypescript),
      // Change the references a little. We write 'originalpath' to the
      // file under the 'path' key, which is the same as what the
      // TypeScript compiler does. Make it relative so that the files are
      // movable. Not strictly required but looks better.
      references: references?.map(p => ({ path: p })),
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
        throw new Error(`A '${this.configPath}' file that was not generated by jsii is in ${this.options.projectInfo.projectRoot}. Aborting instead of overwriting.`);
      }
    }
    LOG.debug(`Creating or updating ${colors.blue(this.configPath)}`);
    await fs.writeJson(this.configPath, this.typescriptConfig, { encoding: 'utf8', spaces: 2 });
  }

  /**
   * Find all dependencies that look like TypeScript projects.
   *
   * Enumerate all dependencies, if they have a tsconfig.json file with
   * "composite: true" we consider them project references.
   *
   * (Note: TypeScript seems to only correctly find transitive project references
   * if there's an "index" tsconfig.json of all projects somewhere up the directory
   * tree)
   */
  private async findProjectReferences(): Promise<string[]> {
    const pkg = this.options.projectInfo.packageJson;

    const ret = new Array<string>();

    const dependencyNames = new Set<string>();
    for (const dependencyMap of [pkg.dependencies, pkg.devDependencies, pkg.peerDependencies]) {
      if (dependencyMap === undefined) { continue; }
      Object.keys(dependencyMap).forEach(dependencyNames.add.bind(dependencyNames));
    }

    for (const tsconfigFile of await Promise.all(Array.from(dependencyNames).map(depName => this.findMonorepoPeerTsconfig(depName)))) {
      if (!tsconfigFile) { continue; }

      // eslint-disable-next-line @typescript-eslint/no-var-requires, @typescript-eslint/no-require-imports
      const tsconfig = require(tsconfigFile);

      // Add references to any TypeScript package we find that is 'composite' enabled.
      // Make it relative.
      if (tsconfig.compilerOptions?.composite) {
        ret.push(path.relative(this.options.projectInfo.projectRoot, path.dirname(tsconfigFile)));
      } else {
        // Not a composite package--if this package is in a node_modules directory, that is most
        // likely correct, otherwise it is most likely an error (heuristic here, I don't know how to
        // properly check this).
        if (tsconfigFile.includes('node_modules')) {
          LOG.warn('%s: not a composite TypeScript package, but it probably should be', path.dirname(tsconfigFile));
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
  private determineSources(files: string[]): string[] {
    const ret = new Array<string>();

    if (files.length > 0) {
      ret.push(...files);
    } else {
      const parseConfigHost = parseConfigHostFromCompilerHost(this.compilerHost);
      const parsed = ts.parseJsonConfigFileContent(this.typescriptConfig, parseConfigHost, this.options.projectInfo.projectRoot);
      ret.push(...parsed.fileNames);
    }

    return ret;
  }

  /**
   * Resolve the given dependency name from the current package, and find the associated tsconfig.json location
   *
   * Because we have the following potential directory layout:
   *
   *   package/node_modules/some_dependency
   *   package/tsconfig.json
   *
   * We resolve symlinks and only find a "TypeScript" dependency if doesn't have 'node_modules' in
   * the path after resolving symlinks (i.e., if it's a peer package in the same monorepo).
   *
   * Returns undefined if no such tsconfig could be found.
   */
  private async findMonorepoPeerTsconfig(depName: string): Promise<string | undefined> {
    const paths = nodeJsCompatibleSearchPaths(this.options.projectInfo.projectRoot);

    let dep;
    try {
      dep = require.resolve(`${depName}/tsconfig.json`, { paths });
    } catch {
      // Package does not have a tsconfig.json
      return undefined;
    }

    // Resolve symlinks, to check if this is a monorepo peer
    const dependencyRealPath = await fs.realpath(dep);
    if (dependencyRealPath.split(path.sep).includes('node_modules')) { return undefined; }

    return dependencyRealPath;
  }
}

/**
 * A handle to a watch-mode operation.
 */
export interface Watch {
  /**
   * Terminates the watch process.
   */
  close(): void;
}

function _pathOfLibraries(host: ts.CompilerHost | ts.WatchCompilerHost<any>): string[] {
  if (!COMPILER_OPTIONS.lib || COMPILER_OPTIONS.lib.length === 0) { return []; }
  const lib = host.getDefaultLibLocation?.();
  if (!lib) {
    throw new Error(`Compiler host doesn't have a default library directory available for ${COMPILER_OPTIONS.lib.join(', ')}`);
  }
  return COMPILER_OPTIONS.lib.map(name => path.join(lib, name));
}

/**
 * Return all possible 'node_modules' directories from a given starting directory.
 */
function nodeJsCompatibleSearchPaths(dir: string): string[] {
  const ret = new Array<string>();

  let lastDir;
  do {
    ret.push(path.join(dir, 'node_modules'));
    lastDir = dir;
    dir = path.dirname(dir);
  } while (dir !== lastDir); // path.dirname('/') === '/', also works on Windows

  return ret;
}

function parseConfigHostFromCompilerHost(host: ts.CompilerHost): ts.ParseConfigHost {
  // Copied from upstream
  // https://github.com/Microsoft/TypeScript/blob/9e05abcfd3f8bb3d6775144ede807daceab2e321/src/compiler/program.ts#L3105
  return {
    fileExists: f => host.fileExists(f),
    readDirectory(root, extensions, excludes, includes, depth) {
      if (host.readDirectory === undefined) {
        throw new Error("'CompilerHost.readDirectory' must be implemented to correctly process 'projectReferences'");
      }
      return host.readDirectory(root, extensions, excludes, includes, depth);
    },
    readFile: f => host.readFile(f),
    useCaseSensitiveFileNames: host.useCaseSensitiveFileNames(),
    trace: host.trace ? (s) => host.trace!(s) : undefined
  };
}

function emitHasErrors(result: ts.EmitResult, includeWarnings?: boolean) {
  return result.diagnostics.some(d =>
    d.category === ts.DiagnosticCategory.Error
        || (includeWarnings && d.category === ts.DiagnosticCategory.Warning)
  ) || result.emitSkipped;
}
