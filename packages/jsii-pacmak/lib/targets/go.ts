import { CodeMaker } from 'codemaker';
import * as fs from 'fs-extra';
import { Assembly } from 'jsii-reflect';
import { Rosetta } from 'jsii-rosetta';
import * as path from 'path';

import { IGenerator } from '../generator';
import * as logging from '../logging';
import { Target, TargetOptions } from '../target';
import { shell } from '../util';
import { Documentation } from './go/documentation';
import { GOMOD_FILENAME, RootPackage } from './go/package';
import { JSII_INIT_PACKAGE } from './go/runtime';
import { JSII_RT_MODULE_NAME } from './go/runtime/constants';
import { goPackageName } from './go/util';

export class Golang extends Target {
  private readonly goGenerator: GoGenerator;

  private readonly goPackageName: string;

  public constructor(options: TargetOptions) {
    super(options);

    this.goPackageName = goPackageName(this.assembly.name);
    this.goGenerator = new GoGenerator(options.rosetta);
  }

  public get generator(): IGenerator {
    return this.goGenerator;
  }

  /**
   * Generates a publishable artifact in `outDir`.
   *
   * @param sourceDir the directory where the generated source is located.
   * @param outDir    the directory where the publishable artifact should be placed.
   */
  public async build(sourceDir: string, outDir: string): Promise<void> {
    await this.copyFiles(sourceDir, outDir);

    // resolve symlinks
    outDir = await fs.realpath(outDir);

    // append a "replace" directive for local dependencies
    await this.replaceLocalDeps(outDir);

    // run `go fmt` and `go build` in outdir to format and compile
    const pkgout = path.resolve(outDir, this.goPackageName);
    await shell('go', ['fmt'], { cwd: pkgout });
    await shell('go', ['build'], { cwd: pkgout });
  }

  /**
   * Appends a `replace` directive in the generated `go.mod` for local
   * dependencies.
   * @param outDir The dist output directory (e.g. `<packageRoot>/dist/go`).
   */
  private async replaceLocalDeps(outDir: string) {
    const rootPackage = this.goGenerator.rootPackage;
    if (!rootPackage) {
      throw new Error(`assertion failed: "rootPackage" is undefined`);
    }

    // find local deps by check if `<jsii.outdir>/go` exists for dependencies
    // and also consider _out_ output directory in case pacmak is executed using
    // `--outdir` (in which case all go code will be generated there).
    const localDeps = [
      outDir,
      ...(await this.findLocalDepsOutput(this.packageDir)),
    ];

    const replace: { [from: string]: string } = {};

    // try to resolve @jsii/go-runtime (only exists as a devDependency)
    const localRuntime = tryFindLocalRuntime();
    if (localRuntime) {
      replace[JSII_RT_MODULE_NAME] = localRuntime;
    }

    // iterate over all local directories and try to match them with one this
    // module's deps.
    for (const localDep of localDeps) {
      for (const dep of rootPackage.packageDependencies) {
        const localpath = path.join(localDep, goPackageName(dep.packageName));
        if (fs.existsSync(localpath)) {
          replace[dep.goModuleName] = localpath;
        }
      }
    }

    // emit "replace" directive (if relevant)
    if (Object.keys(replace).length > 0) {
      const pkgOut = path.join(outDir, this.goPackageName);
      const lines = new Array<string>();

      lines.push('replace (');

      for (const [from, to] of Object.entries(replace)) {
        const rel = path.relative(pkgOut, to);
        logging.debug(`Local dependency: ${from} => ${rel} (${to})`);
        lines.push(`\t${from} => ${rel}`);
      }

      lines.push(')');

      await fs.appendFile(
        path.join(pkgOut, GOMOD_FILENAME),
        `\n${lines.join('\n')}`,
      );
    }
  }
}

class GoGenerator implements IGenerator {
  private assembly!: Assembly;
  private readonly code = new CodeMaker({
    indentCharacter: '\t',
    indentationLevel: 1,
  });
  private readonly documenter: Documentation;

  public rootPackage: RootPackage | undefined;

  public constructor(private readonly rosetta: Rosetta) {
    this.documenter = new Documentation(this.code, this.rosetta);
  }

  public async load(_: string, assembly: Assembly): Promise<void> {
    this.assembly = assembly;
    return Promise.resolve();
  }

  public async upToDate(_outDir: string) {
    return Promise.resolve(false);
  }

  public generate(): void {
    this.rootPackage = new RootPackage(this.assembly);

    return this.rootPackage.emit({
      code: this.code,
      documenter: this.documenter,
    });
  }

  public async save(outDir: string, tarball: string): Promise<any> {
    await this.embedTarball(tarball);

    const output = path.join(outDir, goPackageName(this.assembly.name));
    await this.code.save(output);
  }

  private async embedTarball(source: string) {
    const data = await fs.readFile(source);
    const bytesPerLine = 16;

    const file = path.join(JSII_INIT_PACKAGE, 'tarball.embedded.go');
    this.code.openFile(file);
    this.code.line(`package ${JSII_INIT_PACKAGE}`);
    this.code.line();
    this.code.open('var tarball = []byte{');
    for (let i = 0; i < data.byteLength; i += bytesPerLine) {
      const encoded = Array.from(data.slice(i, i + bytesPerLine))
        .map((byte) => `0x${byte.toString(16).padStart(2, '0')}`)
        .join(', ');
      this.code.line(`${encoded},`);
    }
    this.code.close('}');
    this.code.line();
    // Check the byte slice has the expect size
    this.code.open('func init() {');
    this.code.open(`if len(tarball) != ${data.byteLength} {`);
    this.code.line(
      `panic("Tarball data does not have expected length (${data.byteLength} bytes)")`,
    );
    this.code.close('}');
    this.code.close('}');
    this.code.closeFile(file);
  }
}

/**
 * Check if we are running from inside the jsii repository, and then we want to
 * use the local runtime instead of download from a released version.
 */
function tryFindLocalRuntime() {
  try {
    const p = require.resolve('@jsii/go-runtime/jsii-experimental/go.mod');
    const dir = path.dirname(p);
    logging.debug(`Using @jsii/go-runtime from ${dir}`);
    return dir;
  } catch {
    return undefined;
  }
}
