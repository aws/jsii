import ts = require('typescript');

export class TypeScriptCompiler {
  private readonly realHost: ts.CompilerHost;

  constructor() {
    this.realHost = ts.createCompilerHost(STANDARD_COMPILER_OPTIONS, true);
  }

  public createInMemoryCompilerHost(sourcePath: string, sourceContents: string): ts.CompilerHost {
    const realHost = this.realHost;
    const sourceFile = ts.createSourceFile(sourcePath, sourceContents, ts.ScriptTarget.Latest);

    return {
      fileExists: filePath => filePath === sourcePath || realHost.fileExists(filePath),
      directoryExists: realHost.directoryExists && realHost.directoryExists.bind(realHost),
      getCurrentDirectory: realHost.getCurrentDirectory.bind(realHost),
      getDirectories: realHost.getDirectories && realHost.getDirectories.bind(realHost),
      getCanonicalFileName: fileName => realHost.getCanonicalFileName(fileName),
      getNewLine: realHost.getNewLine.bind(realHost),
      getDefaultLibFileName: realHost.getDefaultLibFileName.bind(realHost),
      getSourceFile: (fileName, languageVersion, onError, shouldCreateNewSourceFile) => fileName === sourcePath
          ? sourceFile
          : realHost.getSourceFile(fileName, languageVersion, onError, shouldCreateNewSourceFile),
      readFile: filePath => filePath === sourcePath
          ? sourceContents
          : realHost.readFile(filePath),
      useCaseSensitiveFileNames: () => realHost.useCaseSensitiveFileNames(),
      writeFile(_fileName, _data) { /* nothing */ }
    };
  }

  public compileInMemory(filename: string, contents: string): CompilationResult {
    if (!filename.endsWith('.ts')) {
      // Necessary or the TypeScript compiler won't compile the file.
      filename += '.ts';
    }

    const program = ts.createProgram({
      rootNames: [filename],
      options: STANDARD_COMPILER_OPTIONS,
      host: this.createInMemoryCompilerHost(filename, contents),
    });

    const rootFiles = program.getSourceFiles().filter(f => f.fileName === filename);
    if (rootFiles.length === 0) {
      throw new Error(`Oopsie -- couldn't find root file back`);
    }
    const rootFile = rootFiles[0];

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
  noUnusedLocals: true,
  noUnusedParameters: true,
  resolveJsonModule: true,
  strict: true,
  strictNullChecks: true,
  strictPropertyInitialization: true,
  stripInternal: true,
  target: ts.ScriptTarget.ES2018,
  // Incremental builds
  incremental: true,
  tsBuildInfoFile: '.tsbuildinfo',
};