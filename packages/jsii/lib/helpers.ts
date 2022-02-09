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
import { formatDiagnostic } from './utils';

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
export async function sourceToAssemblyHelper(
  source: string | MultipleSourceFiles,
  options?: TestCompilationOptions | ((obj: PackageJson) => void),
): Promise<spec.Assembly> {
  return (await compileJsiiForTest(source, options)).assembly;
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
export async function compileJsiiForTest(
  source: string | { 'index.ts': string; [name: string]: string },
  options?: TestCompilationOptions | ((obj: PackageJson) => void),
  compilerOptions?: Omit<CompilerOptions, 'projectInfo' | 'watch'>,
): Promise<HelperCompilationResult> {
  if (typeof source === 'string') {
    source = { 'index.ts': source };
  }

  const inSomeLocation =
    isOptionsObject(options) && options.compilationDirectory
      ? inOtherDir(options.compilationDirectory)
      : inTempDir;

  // Easiest way to get the source into the compiler is to write it to disk somewhere.
  // I guess we could make an in-memory compiler host but that seems like work...
  return inSomeLocation(async () => {
    await Promise.all(
      Object.entries(source).map(async ([fileName, content]) => {
        await fs.mkdirp(path.dirname(fileName));
        return fs.writeFile(fileName, content, { encoding: 'utf-8' });
      }),
    );
    const { projectInfo, packageJson } = await makeProjectInfo(
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
    const emitResult = await compiler.emit();

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
    const assembly = await fs.readJSON('.jsii', { encoding: 'utf-8' });
    const files: Record<string, string> = {};

    for (const filename of Object.keys(source)) {
      let jsFile = filename.replace(/\.ts$/, '.js');
      let dtsFile = filename.replace(/\.ts$/, '.d.ts');
      if (projectInfo.tsc?.outDir && filename !== 'README.md') {
        jsFile = path.join(projectInfo.tsc.outDir, jsFile);
        dtsFile = path.join(projectInfo.tsc.outDir, dtsFile);
      }

      // eslint-disable-next-line no-await-in-loop
      files[jsFile] = await fs.readFile(jsFile, { encoding: 'utf-8' });
      // eslint-disable-next-line no-await-in-loop
      files[dtsFile] = await fs.readFile(dtsFile, { encoding: 'utf-8' });

      const warningsFileName = '.warnings.jsii.js';
      if (fs.existsSync(warningsFileName)) {
        // eslint-disable-next-line no-await-in-loop
        files[warningsFileName] = await fs.readFile(warningsFileName, {
          encoding: 'utf-8',
        });
      }
    }

    return { assembly, files, packageJson } as HelperCompilationResult;
  });
}

async function inTempDir<T>(block: () => Promise<T>): Promise<T> {
  const origDir = process.cwd();
  const tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), 'jsii'));
  process.chdir(tmpDir);
  const ret = await block();
  process.chdir(origDir);
  await fs.remove(tmpDir);
  return ret;
}

function inOtherDir(dir: string) {
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-constraint
  return async <T extends unknown>(block: () => Promise<T>): Promise<T> => {
    const origDir = process.cwd();
    process.chdir(dir);
    try {
      return await block();
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
async function makeProjectInfo(
  types: string,
  cb?: (obj: PackageJson) => Promise<void> | void,
): Promise<{ projectInfo: ProjectInfo; packageJson: PackageJson }> {
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
    await cb(packageJson);
  }

  await fs.writeJson('package.json', packageJson, {
    encoding: 'utf-8',
    replacer: (_: string, v: any) => v,
    spaces: 2,
  });

  const { projectInfo } = await loadProjectInfo(
    path.resolve(process.cwd(), '.'),
  );
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
  public static async create(): Promise<TestWorkspace> {
    const tmpDir = await fs.mkdtemp(
      path.join(os.tmpdir(), 'jsii-testworkspace'),
    );
    await fs.ensureDir(tmpDir);
    return new TestWorkspace(tmpDir);
  }

  /**
   * Execute a block with a temporary workspace
   */
  public static async withWorkspace<A>(
    block: (ws: TestWorkspace) => A | Promise<A>,
  ): Promise<A> {
    const ws = await TestWorkspace.create();
    try {
      return await block(ws);
    } finally {
      await ws.cleanup();
    }
  }

  private readonly installed = new Set<string>();

  private constructor(public readonly rootDirectory: string) {}

  /**
   * Add a test-compiled jsii assembly as a dependency
   */
  public async addDependency(dependencyAssembly: HelperCompilationResult) {
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
    await fs.ensureDir(modDir);

    await fs.writeJSON(path.join(modDir, '.jsii'), dependencyAssembly.assembly);
    await fs.writeJSON(
      path.join(modDir, 'package.json'),
      dependencyAssembly.packageJson,
    );

    for (const [fileName, fileContents] of Object.entries(
      dependencyAssembly.files,
    )) {
      // eslint-disable-next-line no-await-in-loop
      await fs.ensureDir(path.dirname(path.join(modDir, fileName)));
      // eslint-disable-next-line no-await-in-loop
      await fs.writeFile(path.join(modDir, fileName), fileContents);
    }
  }

  public dependencyDir(name: string) {
    if (!this.installed.has(name)) {
      throw new Error(`No dependency with name '${name}' has been installed`);
    }
    return path.join(this.rootDirectory, 'node_modules', name);
  }

  public async cleanup() {
    await fs.remove(this.rootDirectory);
  }
}

// Alias for backwards compatibility
export type PackageInfo = PackageJson;
