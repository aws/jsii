import * as chalk from 'chalk';
import * as fs from 'fs-extra';
import * as log4js from 'log4js';
import * as path from 'path';
import * as ts from 'typescript';

import { Assembler } from './assembler';
import * as Case from './case';
import { Emitter } from './emitter';
import { JsiiDiagnostic } from './jsii-diagnostic';
import { ProjectInfo } from './project-info';
import { WARNINGSCODE_FILE_NAME } from './transforms/deprecation-warnings';
import * as utils from './utils';

const BASE_COMPILER_OPTIONS: ts.CompilerOptions = {
  alwaysStrict: true,
  charset: 'utf8',
  declaration: true,
  experimentalDecorators: true,
  incremental: true,
  lib: ['lib.es2020.d.ts'],
  module: ts.ModuleKind.CommonJS,
  newLine: ts.NewLineKind.LineFeed,
  noEmitOnError: true,
  noFallthroughCasesInSwitch: true,
  noImplicitAny: true,
  noImplicitReturns: true,
  noImplicitThis: true,
  noUnusedLocals: true,
  noUnusedParameters: true,
  resolveJsonModule: true,
  skipLibCheck: true,
  strict: true,
  strictNullChecks: true,
  strictPropertyInitialization: true,
  stripInternal: false,
  target: ts.ScriptTarget.ES2020,
};

const LOG = log4js.getLogger('jsii/compiler');
export const DIAGNOSTICS = 'diagnostics';
export const JSII_DIAGNOSTICS_CODE = 9999;

export interface CompilerOptions {
  /** The information about the project to be built */
  projectInfo: ProjectInfo;
  /** Whether the compiler should watch for changes or just compile once */
  watch?: boolean;
  /** Whether to detect and generate TypeScript project references */
  projectReferences?: boolean;
  /** Whether to fail when a warning is emitted */
  failOnWarnings?: boolean;
  /** Whether to strip deprecated members from emitted artifacts */
  stripDeprecated?: boolean;
  /** The path to an allowlist of FQNs to strip if stripDeprecated is set */
  stripDeprecatedAllowListFile?: string;
  /** Whether to add warnings for deprecated elements */
  addDeprecationWarnings?: boolean;
  /**
   * The name of the tsconfig file to generate
   * @default "tsconfig.json"
   */
  generateTypeScriptConfig?: string;
  /**
   * Whether to compress the assembly
   * @default false
   */
  compressAssembly?: boolean;
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

  public constructor(private readonly options: CompilerOptions) {
    this.compilerHost = ts.createIncrementalCompilerHost(
      BASE_COMPILER_OPTIONS,
      {
        ...ts.sys,
        getCurrentDirectory: () => this.options.projectInfo.projectRoot,
      },
    );

    const configFileName = options.generateTypeScriptConfig ?? 'tsconfig.json';

    this.configPath = path.join(
      this.options.projectInfo.projectRoot,
      configFileName,
    );

    this.projectReferences =
      options.projectReferences !== undefined
        ? options.projectReferences
        : options.projectInfo.projectReferences !== undefined
        ? options.projectInfo.projectReferences
        : false;
  }

  /**
   * Compiles the configured program.
   *
   * @param files can be specified to override the standard source code location logic. Useful for example when testing "negatives".
   */
  public emit(...files: string[]): ts.EmitResult {
    this._prepareForBuild(...files);
    return this._buildOnce();
  }

  /**
   * Watches for file-system changes and dynamically recompiles the project as needed. In non-blocking mode, this
   * returns the TypeScript watch handle for the application to use.
   *
   * @internal
   */
  public async watch(
    opts: NonBlockingWatchOptions,
  ): Promise<ts.Watch<ts.BuilderProgram>>;
  /**
   * Watches for file-system changes and dynamically recompiles the project as needed. In blocking mode, this results
   * in a never-resolving promise.
   */
  public async watch(): Promise<never>;
  public async watch(
    opts?: NonBlockingWatchOptions,
  ): Promise<ts.Watch<ts.BuilderProgram> | never> {
    this._prepareForBuild();

    const pi = this.options.projectInfo;
    const projectRoot = pi.projectRoot;
    const host = ts.createWatchCompilerHost(
      this.configPath,
      {
        ...pi.tsc,
        ...BASE_COMPILER_OPTIONS,
        noEmitOnError: false,
      },
      {
        ...ts.sys,
        getCurrentDirectory() {
          return projectRoot;
        },
      },
      ts.createEmitAndSemanticDiagnosticsBuilderProgram,
      opts?.reportDiagnostics,
      opts?.reportWatchStatus,
    );
    if (!host.getDefaultLibLocation) {
      throw new Error(
        'No default library location was found on the TypeScript compiler host!',
      );
    }
    const orig = host.afterProgramCreate;
    // This is a callback cascade, so it's "okay" to return an unhandled promise there. This may
    // cause an unhandled promise rejection warning, but that's not a big deal.
    //
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    host.afterProgramCreate = (builderProgram) => {
      const emitResult = this._consumeProgram(
        builderProgram.getProgram(),
        host.getDefaultLibLocation!(),
      );

      for (const diag of emitResult.diagnostics.filter(
        (d) => d.code === JSII_DIAGNOSTICS_CODE,
      )) {
        utils.logDiagnostic(diag, projectRoot);
      }

      if (orig) {
        orig.call(host, builderProgram);
      }
      if (opts?.compilationComplete) {
        opts.compilationComplete(emitResult);
      }
    };
    const watch = ts.createWatchProgram(host);

    if (opts?.nonBlocking) {
      // In non-blocking mode, returns the handle to the TypeScript watch interface.
      return watch;
    }
    // In blocking mode, returns a never-resolving promise.
    return new Promise<never>(() => null);
  }

  /**
   * Prepares the project for build, by creating the necessary configuration
   * file(s), and assigning the relevant root file(s).
   *
   * @param files the files that were specified as input in the CLI invocation.
   */
  private _prepareForBuild(...files: string[]) {
    this.buildTypeScriptConfig();
    this.writeTypeScriptConfig();
    this.rootFiles = this.determineSources(files);
  }

  /**
   * Do a single build
   */
  private _buildOnce(): ts.EmitResult {
    if (!this.compilerHost.getDefaultLibLocation) {
      throw new Error(
        'No default library location was found on the TypeScript compiler host!',
      );
    }

    const tsconf = this.typescriptConfig!;
    const pi = this.options.projectInfo;

    const prog = ts.createIncrementalProgram({
      rootNames: this.rootFiles.concat(_pathOfLibraries(this.compilerHost)),
      options: {
        ...pi.tsc,
        ...(tsconf?.compilerOptions ?? BASE_COMPILER_OPTIONS),
      },
      // Make the references absolute for the compiler
      projectReferences: tsconf.references?.map((ref) => ({
        path: path.resolve(path.dirname(this.configPath), ref.path),
      })),
      host: this.compilerHost,
    });

    return this._consumeProgram(
      prog.getProgram(),
      this.compilerHost.getDefaultLibLocation(),
    );
  }

  private _consumeProgram(program: ts.Program, stdlib: string): ts.EmitResult {
    const diagnostics = [...ts.getPreEmitDiagnostics(program)];
    let hasErrors = false;

    if (!hasErrors && this.diagsHaveAbortableErrors(diagnostics)) {
      hasErrors = true;
      LOG.error(
        'Compilation errors prevented the JSII assembly from being created',
      );
    }

    // Do the "Assembler" part first because we need some of the analysis done in there
    // to post-process the AST
    const assembler = new Assembler(this.options.projectInfo, program, stdlib, {
      stripDeprecated: this.options.stripDeprecated,
      stripDeprecatedAllowListFile: this.options.stripDeprecatedAllowListFile,
      addDeprecationWarnings: this.options.addDeprecationWarnings,
      compressAssembly: this.options.compressAssembly,
    });

    try {
      const assmEmit = assembler.emit();
      if (
        !hasErrors &&
        (assmEmit.emitSkipped ||
          this.diagsHaveAbortableErrors(assmEmit.diagnostics))
      ) {
        hasErrors = true;
        LOG.error(
          'Type model errors prevented the JSII assembly from being created',
        );
      }

      diagnostics.push(...assmEmit.diagnostics);
    } catch (e: any) {
      diagnostics.push(
        JsiiDiagnostic.JSII_9997_UNKNOWN_ERROR.createDetached(e),
      );
      hasErrors = true;
    }

    // Do the emit, but add in transformers which are going to replace real
    // comments with synthetic ones.
    const emit = program.emit(
      undefined, // targetSourceFile
      undefined, // writeFile
      undefined, // cancellationToken
      undefined, // emitOnlyDtsFiles
      assembler.customTransformers,
    );
    diagnostics.push(...emit.diagnostics);

    if (
      !hasErrors &&
      (emit.emitSkipped || this.diagsHaveAbortableErrors(emit.diagnostics))
    ) {
      hasErrors = true;
      LOG.error(
        'Compilation errors prevented the JSII assembly from being created',
      );
    }

    // Some extra validation on the config.
    // Make sure that { "./.warnings.jsii.js": "./.warnings.jsii.js" } is in the set of
    // exports, if they are specified.
    if (
      this.options.addDeprecationWarnings &&
      this.options.projectInfo.exports !== undefined
    ) {
      const expected = `./${WARNINGSCODE_FILE_NAME}`;
      const warningsExport = Object.entries(
        this.options.projectInfo.exports,
      ).filter(([k, v]) => k === expected && v === expected);

      if (warningsExport.length === 0) {
        hasErrors = true;
        diagnostics.push(
          JsiiDiagnostic.JSII_0007_MISSING_WARNINGS_EXPORT.createDetached(),
        );
      }
    }

    return {
      emitSkipped: hasErrors,
      diagnostics: ts.sortAndDeduplicateDiagnostics(diagnostics),
      emittedFiles: emit.emittedFiles,
    };
  }

  /**
   * Build the TypeScript config object
   *
   * This is the object that will be written to disk.
   */
  private buildTypeScriptConfig() {
    let references: string[] | undefined;
    if (this.projectReferences) {
      references = this.findProjectReferences();
    }

    const pi = this.options.projectInfo;

    this.typescriptConfig = {
      compilerOptions: {
        ...pi.tsc,
        ...BASE_COMPILER_OPTIONS,
        // Enable composite mode if project references are enabled
        composite: this.projectReferences,
        // When incremental, configure a tsbuildinfo file
        tsBuildInfoFile: path.join(
          pi.tsc?.outDir ?? '.',
          'tsconfig.tsbuildinfo',
        ),
      },
      include: [
        pi.tsc?.rootDir != null
          ? path.join(pi.tsc.rootDir, '**', '*.ts')
          : path.join('**', '*.ts'),
      ],
      exclude: [
        'node_modules',
        ...(pi.excludeTypescript ?? []),
        ...(pi.tsc?.outDir != null &&
        (pi.tsc?.rootDir == null ||
          path
            .resolve(pi.tsc.outDir)
            .startsWith(path.resolve(pi.tsc.rootDir) + path.sep))
          ? [path.join(pi.tsc.outDir, '**', '*.ts')]
          : []),
      ],
      // Change the references a little. We write 'originalpath' to the
      // file under the 'path' key, which is the same as what the
      // TypeScript compiler does. Make it relative so that the files are
      // movable. Not strictly required but looks better.
      references: references?.map((p) => ({ path: p })),
    };
  }

  /**
   * Creates a `tsconfig.json` file to improve the IDE experience.
   *
   * @return the fully qualified path to the `tsconfig.json` file
   */
  private writeTypeScriptConfig(): void {
    const commentKey = '_generated_by_jsii_';
    const commentValue =
      'Generated by jsii - safe to delete, and ideally should be in .gitignore';

    (this.typescriptConfig as any)[commentKey] = commentValue;

    if (fs.pathExistsSync(this.configPath)) {
      const currentConfig = fs.readJsonSync(this.configPath);
      if (!(commentKey in currentConfig)) {
        throw new Error(
          `A '${this.configPath}' file that was not generated by jsii is in ${this.options.projectInfo.projectRoot}. Aborting instead of overwriting.`,
        );
      }
    }

    const outputConfig = {
      ...this.typescriptConfig,
      compilerOptions: {
        ...this.typescriptConfig?.compilerOptions,
        lib: this.typescriptConfig?.compilerOptions?.lib?.map((lib) =>
          // Drop the "lib." prefix and ".d.ts" suffix before writing up the tsconfig.json file
          lib.slice(4, lib.length - 5),
        ),
        // Re-write the module, targets & jsx to be the JSON format instead of Programmatic API
        module: (this.typescriptConfig?.compilerOptions?.module &&
          ts.ModuleKind[this.typescriptConfig.compilerOptions.module]) as any,
        newLine: newLineForTsconfigJson(
          this.typescriptConfig?.compilerOptions.newLine,
        ),
        target: (this.typescriptConfig?.compilerOptions?.target &&
          ts.ScriptTarget[this.typescriptConfig.compilerOptions.target]) as any,
        jsx: (this.typescriptConfig?.compilerOptions?.jsx &&
          Case.snake(
            ts.JsxEmit[this.typescriptConfig.compilerOptions.jsx],
          )) as any,
      },
    };

    LOG.debug(`Creating or updating ${chalk.blue(this.configPath)}`);
    fs.writeJsonSync(this.configPath, outputConfig, {
      encoding: 'utf8',
      spaces: 2,
    });

    /**
     * This is annoying - the values expected in the tsconfig.json file are not
     * the same as the enum constant names, or their values. So we need this
     * function to map the "compiler API version" to the "tsconfig.json version"
     *
     * @param newLine the compiler form of the new line configuration
     *
     * @return the requivalent value to put in tsconfig.json
     */
    function newLineForTsconfigJson(newLine: ts.NewLineKind | undefined) {
      switch (newLine) {
        case ts.NewLineKind.CarriageReturnLineFeed:
          return 'crlf';
        case ts.NewLineKind.LineFeed:
          return 'lf';
        default:
          return undefined;
      }
    }
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
  private findProjectReferences(): string[] {
    const pkg = this.options.projectInfo.packageJson;

    const ret = new Array<string>();

    const dependencyNames = new Set<string>();
    for (const dependencyMap of [
      pkg.dependencies,
      pkg.devDependencies,
      pkg.peerDependencies,
    ]) {
      if (dependencyMap === undefined) {
        continue;
      }
      Object.keys(dependencyMap).forEach(
        dependencyNames.add.bind(dependencyNames),
      );
    }

    for (const tsconfigFile of Array.from(dependencyNames).map((depName) =>
      this.findMonorepoPeerTsconfig(depName),
    )) {
      if (!tsconfigFile) {
        continue;
      }

      const { config: tsconfig } = ts.readConfigFile(
        tsconfigFile,
        ts.sys.readFile,
      );

      // Add references to any TypeScript package we find that is 'composite' enabled.
      // Make it relative.
      if (tsconfig.compilerOptions?.composite) {
        ret.push(
          path.relative(
            this.options.projectInfo.projectRoot,
            path.dirname(tsconfigFile),
          ),
        );
      } else {
        // Not a composite package--if this package is in a node_modules directory, that is most
        // likely correct, otherwise it is most likely an error (heuristic here, I don't know how to
        // properly check this).
        if (tsconfigFile.includes('node_modules')) {
          LOG.warn(
            '%s: not a composite TypeScript package, but it probably should be',
            path.dirname(tsconfigFile),
          );
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
   * This makes it so that running 'typescript' and running 'jsii' has the same behavior.
   */
  private determineSources(files: string[]): string[] {
    const ret = new Array<string>();

    if (files.length > 0) {
      ret.push(...files);
    } else {
      const parseConfigHost = parseConfigHostFromCompilerHost(
        this.compilerHost,
      );
      const parsed = ts.parseJsonConfigFileContent(
        this.typescriptConfig,
        parseConfigHost,
        this.options.projectInfo.projectRoot,
      );
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
  private findMonorepoPeerTsconfig(depName: string): string | undefined {
    // eslint-disable-next-line @typescript-eslint/no-require-imports,@typescript-eslint/no-var-requires
    const { builtinModules } = require('module');
    if ((builtinModules ?? []).includes(depName)) {
      // Can happen for modules like 'punycode' which are declared as dependency for polyfill purposes
      return undefined;
    }

    try {
      const depDir = utils.findDependencyDirectory(
        depName,
        this.options.projectInfo.projectRoot,
      );

      const dep = path.join(depDir, 'tsconfig.json');
      if (!fs.pathExistsSync(dep)) {
        return undefined;
      }

      // Resolve symlinks, to check if this is a monorepo peer
      const dependencyRealPath = fs.realpathSync(dep);
      if (dependencyRealPath.split(path.sep).includes('node_modules')) {
        return undefined;
      }

      return dependencyRealPath;
    } catch (e: any) {
      // @types modules cannot be required, for example
      if (
        ['MODULE_NOT_FOUND', 'ERR_PACKAGE_PATH_NOT_EXPORTED'].includes(e.code)
      ) {
        return undefined;
      }
      throw e;
    }
  }

  private diagsHaveAbortableErrors(diags: readonly ts.Diagnostic[]) {
    return diags.some(
      (d) =>
        d.category === ts.DiagnosticCategory.Error ||
        (this.options.failOnWarnings &&
          d.category === ts.DiagnosticCategory.Warning),
    );
  }
}

/**
 * Options for Watch in non-blocking mode.
 *
 * @internal
 */
export interface NonBlockingWatchOptions {
  /**
   * Signals non-blocking execution
   */
  readonly nonBlocking: true;

  /**
   * Configures the diagnostics reporter
   */
  readonly reportDiagnostics: ts.DiagnosticReporter;

  /**
   * Configures the watch status reporter
   */
  readonly reportWatchStatus: ts.WatchStatusReporter;

  /**
   * This hook gets invoked when a compilation cycle (complete with Assembler execution) completes.
   */
  readonly compilationComplete: (emitResult: ts.EmitResult) => void;
}

function _pathOfLibraries(
  host: ts.CompilerHost | ts.WatchCompilerHost<any>,
): string[] {
  if (!BASE_COMPILER_OPTIONS.lib || BASE_COMPILER_OPTIONS.lib.length === 0) {
    return [];
  }
  const lib = host.getDefaultLibLocation?.();
  if (!lib) {
    throw new Error(
      `Compiler host doesn't have a default library directory available for ${BASE_COMPILER_OPTIONS.lib.join(
        ', ',
      )}`,
    );
  }
  return BASE_COMPILER_OPTIONS.lib.map((name) => path.join(lib, name));
}

function parseConfigHostFromCompilerHost(
  host: ts.CompilerHost,
): ts.ParseConfigHost {
  // Copied from upstream
  // https://github.com/Microsoft/TypeScript/blob/9e05abcfd3f8bb3d6775144ede807daceab2e321/src/compiler/program.ts#L3105
  return {
    fileExists: (f) => host.fileExists(f),
    readDirectory(root, extensions, excludes, includes, depth) {
      if (host.readDirectory === undefined) {
        throw new Error(
          "'CompilerHost.readDirectory' must be implemented to correctly process 'projectReferences'",
        );
      }
      return host.readDirectory(root, extensions, excludes, includes, depth);
    },
    readFile: (f) => host.readFile(f),
    useCaseSensitiveFileNames: host.useCaseSensitiveFileNames(),
    trace: host.trace ? (s) => host.trace!(s) : undefined,
  };
}
