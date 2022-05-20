/**
 * Helper routines for use with the jsii compiler
 *
 * These are mostly used for testing, but all projects that need to exercise
 * the JSII compiler to test something need to share this code, so might as
 * well put it in one reusable place.
 */

import * as spec from '@jsii/spec';
import { PackageJson } from '@jsii/spec';
import * as fs from 'fs-extra';
import * as os from 'os';
import * as path from 'path';
import { DiagnosticCategory } from 'typescript';

import { Compiler, CompilerOptions } from './compiler';
import { loadProjectInfo, ProjectInfo } from './project-info';
import { formatDiagnostic, loadJsiiFile } from './utils';

/**
 * A set of source files for `sourceToAssemblyHelper`, at least containing 'index.ts'
 */
export type MultipleSourceFiles = {
  'index.ts': string;
  [name: string]: string;
};

/**
 * Compile a piece of source and return the JSII assembly for it
 *
 * Only usable for trivial cases and tests.
 *
 * @param source can either be a single `string` (the content of `index.ts`), or
 *               a map of fileName to content, which *must* include `index.ts`.
 * @param options accepts a callback for historical reasons but really expects to
 *                take an options object.
 */
export function sourceToAssemblyHelper(
  source: string | MultipleSourceFiles,
  options?: TestCompilationOptions | ((obj: PackageJson) => void),
): spec.Assembly {
  return compileJsiiForTest(source, options).assembly;
}

export interface HelperCompilationResult {
  /**
   * The generated assembly
   */
  readonly assembly: spec.Assembly;
  /**
   * Generated .js/.d.ts file(s)
   */
  readonly files: Record<string, string>;

  /**
   * The packageInfo used
   */
  readonly packageJson: PackageJson;
}

/**
 * Compile a piece of source and return the assembly and compiled sources for it
 *
 * Only usable for trivial cases and tests.
 *
 * @param source can either be a single `string` (the content of `index.ts`), or
 *               a map of fileName to content, which *must* include `index.ts`.
 * @param options accepts a callback for historical reasons but really expects to
 *                take an options object.
 */
export function compileJsiiForTest(
  source: string | { 'index.ts': string; [name: string]: string },
  options?: TestCompilationOptions | ((obj: PackageJson) => void),
  compilerOptions?: Omit<CompilerOptions, 'projectInfo' | 'watch'>,
): HelperCompilationResult {
  if (typeof source === 'string') {
    source = { 'index.ts': source };
  }

  const inSomeLocation =
    isOptionsObject(options) && options.compilationDirectory
      ? inOtherDir(options.compilationDirectory)
      : inTempDir;

  // Easiest way to get the source into the compiler is to write it to disk somewhere.
  // I guess we could make an in-memory compiler host but that seems like work...
  return inSomeLocation(() => {
    Object.entries(source).forEach(([fileName, content]) => {
      fs.mkdirpSync(path.dirname(fileName));
      fs.writeFileSync(fileName, content, { encoding: 'utf-8' });
    });
    const { projectInfo, packageJson } = makeProjectInfo(
      'index.ts',
      typeof options === 'function'
        ? options
        : (pi) => {
            Object.assign(
              pi,
              options?.packageJson ?? options?.projectInfo ?? {},
            );
          },
    );
    const compiler = new Compiler({
      projectInfo,
      ...compilerOptions,
    });
    const emitResult = compiler.emit();

    const errors = emitResult.diagnostics.filter(
      (d) => d.category === DiagnosticCategory.Error,
    );
    for (const error of errors) {
      console.error(formatDiagnostic(error, projectInfo.projectRoot));
      // logDiagnostic() doesn't work out of the box, so console.error() it is.
    }
    if (errors.length > 0 || emitResult.emitSkipped) {
      throw new Error('There were compiler errors');
    }
    const assembly = loadJsiiFile('');
    const files: Record<string, string> = {};

    for (const filename of Object.keys(source)) {
      let jsFile = filename.replace(/\.ts$/, '.js');
      let dtsFile = filename.replace(/\.ts$/, '.d.ts');
      if (projectInfo.tsc?.outDir && filename !== 'README.md') {
        jsFile = path.join(projectInfo.tsc.outDir, jsFile);
        dtsFile = path.join(projectInfo.tsc.outDir, dtsFile);
      }

      // eslint-disable-next-line no-await-in-loop
      files[jsFile] = fs.readFileSync(jsFile, { encoding: 'utf-8' });
      // eslint-disable-next-line no-await-in-loop
      files[dtsFile] = fs.readFileSync(dtsFile, { encoding: 'utf-8' });

      const warningsFileName = '.warnings.jsii.js';
      if (fs.existsSync(warningsFileName)) {
        // eslint-disable-next-line no-await-in-loop
        files[warningsFileName] = fs.readFileSync(warningsFileName, {
          encoding: 'utf-8',
        });
      }
    }

    return { assembly, files, packageJson } as HelperCompilationResult;
  });
}

function inTempDir<T>(block: () => T): T {
  const origDir = process.cwd();
  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'jsii'));
  process.chdir(tmpDir);
  const ret = block();
  process.chdir(origDir);
  fs.removeSync(tmpDir);
  return ret;
}

function inOtherDir(dir: string) {
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-constraint
  return <T extends unknown>(block: () => T): T => {
    const origDir = process.cwd();
    process.chdir(dir);
    try {
      return block();
    } finally {
      process.chdir(origDir);
    }
  };
}

/**
 * Obtain project info so we can call the compiler
 *
 * Creating this directly in-memory leads to slightly different behavior from calling
 * jsii from the command-line, and I don't want to figure out right now.
 *
 * Most consistent behavior seems to be to write a package.json to disk and
 * then calling the same functions as the CLI would.
 */
function makeProjectInfo(
  types: string,
  cb?: (obj: PackageJson) => void,
): { projectInfo: ProjectInfo; packageJson: PackageJson } {
  const packageJson: PackageJson = {
    types,
    main: types.replace(/(?:\.d)?\.ts(x?)/, '.js$1'),
    name: 'testpkg', // That's what package.json would tell if we look up...
    version: '0.0.1',
    license: 'Apache-2.0',
    author: { name: 'John Doe' },
    repository: { type: 'git', url: 'https://github.com/aws/jsii.git' },
    jsii: {},
  };

  if (cb) {
    cb(packageJson);
  }

  fs.writeJsonSync('package.json', packageJson, {
    encoding: 'utf-8',
    replacer: (_: string, v: any) => v,
    spaces: 2,
  });

  const { projectInfo } = loadProjectInfo(path.resolve(process.cwd(), '.'));
  return { projectInfo, packageJson };
}
export interface TestCompilationOptions {
  /**
   * The directory in which we write and compile the files
   */
  readonly compilationDirectory?: string;

  /**
   * Parts of projectInfo to override (package name etc)
   *
   * @deprecated Prefer using `packageJson` instead.
   */
  readonly projectInfo?: Partial<PackageJson>;

  /**
   * Parts of projectInfo to override (package name etc)
   *
   * @default - Use some default values
   */
  readonly packageJson?: Partial<PackageJson>;
}

function isOptionsObject(
  x: TestCompilationOptions | ((obj: PackageJson) => void) | undefined,
): x is TestCompilationOptions {
  return x ? typeof x === 'object' : false;
}

/**
 * An NPM-ready workspace where we can install test-compile dependencies and compile new assemblies
 */
export class TestWorkspace {
  /**
   * Create a new workspace.
   *
   * Creates a temporary directory, don't forget to call cleanUp
   */
  public static create(): TestWorkspace {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'jsii-testworkspace'));
    fs.ensureDirSync(tmpDir);
    return new TestWorkspace(tmpDir);
  }

  /**
   * Execute a block with a temporary workspace
   */
  public static withWorkspace<A>(block: (ws: TestWorkspace) => A): A {
    const ws = TestWorkspace.create();
    try {
      return block(ws);
    } finally {
      ws.cleanup();
    }
  }

  private readonly installed = new Set<string>();

  private constructor(public readonly rootDirectory: string) {}

  /**
   * Add a test-compiled jsii assembly as a dependency
   */
  public addDependency(dependencyAssembly: HelperCompilationResult) {
    if (this.installed.has(dependencyAssembly.assembly.name)) {
      throw new Error(
        `A dependency with name '${dependencyAssembly.assembly.name}' was already installed. Give one a different name.`,
      );
    }
    this.installed.add(dependencyAssembly.assembly.name);

    // The following is silly, however: the helper has compiled the given source to
    // an assembly, and output files, and then removed their traces from disk.
    // We need those files back on disk, so write them back out again.
    //
    // We will drop them in 'node_modules/<name>' so they can be imported
    // as if they were installed.
    const modDir = path.join(
      this.rootDirectory,
      'node_modules',
      dependencyAssembly.assembly.name,
    );
    fs.ensureDirSync(modDir);

    fs.writeJsonSync(path.join(modDir, '.jsii'), dependencyAssembly.assembly);
    fs.writeJsonSync(
      path.join(modDir, 'package.json'),
      dependencyAssembly.packageJson,
    );

    for (const [fileName, fileContents] of Object.entries(
      dependencyAssembly.files,
    )) {
      // eslint-disable-next-line no-await-in-loop
      fs.ensureDirSync(path.dirname(path.join(modDir, fileName)));
      // eslint-disable-next-line no-await-in-loop
      fs.writeFileSync(path.join(modDir, fileName), fileContents);
    }
  }

  public dependencyDir(name: string) {
    if (!this.installed.has(name)) {
      throw new Error(`No dependency with name '${name}' has been installed`);
    }
    return path.join(this.rootDirectory, 'node_modules', name);
  }

  public cleanup() {
    fs.removeSync(this.rootDirectory);
  }
}

// Alias for backwards compatibility
export type PackageInfo = PackageJson;
