/**
 * Helper routines for use with the jsii compiler
 *
 * These are mostly used for testing, but all projects that need to exercise
 * the JSII compiler to test something need to share this code, so might as
 * well put it in one reusable place.
 */

import * as spec from '@jsii/spec';
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
 */
export async function sourceToAssemblyHelper(
  source: string | MultipleSourceFiles,
  cb?: (obj: PackageInfo) => void,
): Promise<spec.Assembly> {
  return (await compileJsiiForTest(source, cb)).assembly;
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
}

/**
 * Compile a piece of source and return the assembly and compiled sources for it
 *
 * Only usable for trivial cases and tests.
 *
 * @param source can either be a single `string` (the content of `index.ts`), or
 *               a map of fileName to content, which *must* include `index.ts`.
 */
export async function compileJsiiForTest(
  source: string | { 'index.ts': string; [name: string]: string },
  cb?: (obj: PackageInfo) => void,
  compilerOptions?: Omit<CompilerOptions, 'projectInfo' | 'watch'>,
): Promise<HelperCompilationResult> {
  if (typeof source === 'string') {
    source = { 'index.ts': source };
  }

  // Easiest way to get the source into the compiler is to write it to disk somewhere.
  // I guess we could make an in-memory compiler host but that seems like work...
  return inTempDir(async () => {
    await Promise.all(
      Object.entries(source).map(async ([fileName, content]) => {
        await fs.mkdirp(path.dirname(fileName));
        return fs.writeFile(fileName, content, { encoding: 'utf-8' });
      }),
    );
    const projectInfo = await makeProjectInfo('index.ts', cb);
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
      const jsFile = filename.replace(/\.ts$/, '.js');
      const dtsFile = filename.replace(/\.ts$/, '.d.ts');

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

    return { assembly, files };
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
  cb?: (obj: PackageInfo) => Promise<void> | void,
): Promise<ProjectInfo> {
  const packageInfo: PackageInfo = {
    types,
    main: types.replace(/(?:\.d)?\.ts(x?)/, '.js$1'),
    name: 'testpkg', // That's what package.json would tell if we look up...
    version: '0.0.1',
    license: 'Apache-2.0',
    author: { name: 'John Doe', roles: ['author'] },
    repository: { type: 'git', url: 'https://github.com/aws/jsii.git' },
    jsii: {},
  };
  if (cb) {
    await cb(packageInfo);
  }

  await fs.writeJson('package.json', packageInfo, {
    encoding: 'utf-8',
    replacer: (_: string, v: any) => v,
    spaces: 2,
  });

  const { projectInfo } = await loadProjectInfo(
    path.resolve(process.cwd(), '.'),
  );
  return projectInfo;
}

export type PackageInfo = {
  name: string;
  version: string;
  license: string;
  types: string;
  author: {
    name: string;
    roles: string[];
    [key: string]: any;
  };
  repository: {
    type?: string;
    url: string;
    directory?: string;
    [key: string]: any;
  };
  jsii: {
    [key: string]: any;
  };
  [key: string]: any;
};
