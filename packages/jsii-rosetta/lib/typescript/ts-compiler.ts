import * as ts from 'typescript';

export class TypeScriptCompiler {
  private readonly realHost = ts.createCompilerHost(STANDARD_COMPILER_OPTIONS, true);

  /**
   * A compiler-scoped cache to avoid having to re-parse the same library files for every compilation
   */
  private readonly fileCache = new Map<string, ts.SourceFile | undefined>();

  public createInMemoryCompilerHost(
    sourcePath: string,
    sourceContents: string,
    currentDirectory?: string,
  ): ts.CompilerHost {
    const realHost = this.realHost;
    const sourceFile = ts.createSourceFile(sourcePath, sourceContents, ts.ScriptTarget.Latest);

    return {
      ...realHost,
      fileExists: (filePath) =>
        filePath === sourcePath || this.fileCache.has(filePath) || realHost.fileExists(filePath),
      getCurrentDirectory: currentDirectory != null ? () => currentDirectory : realHost.getCurrentDirectory,
      getSourceFile: (fileName, languageVersion, onError, shouldCreateNewSourceFile) => {
        if (fileName === sourcePath) {
          return sourceFile;
        }

        const existing = this.fileCache.get(fileName);
        if (existing) {
          return existing;
        }

        const parsed = realHost.getSourceFile(fileName, languageVersion, onError, shouldCreateNewSourceFile);
        this.fileCache.set(fileName, parsed);
        return parsed;
      },
      readFile: (filePath) => (filePath === sourcePath ? sourceContents : realHost.readFile(filePath)),
      writeFile: () => void undefined,
    };
  }

  public compileInMemory(filename: string, contents: string, currentDirectory?: string): CompilationResult {
    if (!filename.endsWith('.ts')) {
      // Necessary or the TypeScript compiler won't compile the file.
      filename += '.ts';
    }

    const program = ts.createProgram({
      rootNames: [filename],
      options: STANDARD_COMPILER_OPTIONS,
      host: this.createInMemoryCompilerHost(filename, contents, currentDirectory),
    });

    const rootFile = program.getSourceFile(filename);
    if (rootFile == null) {
      throw new Error(`Oopsie -- couldn't find root file back: ${filename}`);
    }

    return { program, rootFile };
  }
}

export interface CompilationResult {
  program: ts.Program;
  rootFile: ts.SourceFile;
}

export const STANDARD_COMPILER_OPTIONS: ts.CompilerOptions = {
  alwaysStrict: true,
  charset: 'utf8',
  declaration: true,
  experimentalDecorators: true,
  inlineSourceMap: true,
  inlineSources: true,
  lib: ['lib.es2016.d.ts', 'lib.es2017.object.d.ts', 'lib.es2017.string.d.ts'],
  module: ts.ModuleKind.CommonJS,
  noEmitOnError: true,
  noFallthroughCasesInSwitch: true,
  noImplicitAny: true,
  noImplicitReturns: true,
  noImplicitThis: true,
  noUnusedLocals: false, // Important, becomes super annoying without this
  noUnusedParameters: false, // Important, becomes super annoying without this
  resolveJsonModule: true,
  strict: true,
  strictNullChecks: true,
  strictPropertyInitialization: true,
  stripInternal: true,
  target: ts.ScriptTarget.ES2019,
  // Incremental builds
  incremental: true,
  tsBuildInfoFile: '.tsbuildinfo',
};
