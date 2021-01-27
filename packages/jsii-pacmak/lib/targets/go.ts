import { CodeMaker } from 'codemaker';
import * as fs from 'fs-extra';
import { Assembly } from 'jsii-reflect';
import { Rosetta } from 'jsii-rosetta';
import * as path from 'path';

import { IGenerator } from '../generator';
import * as logging from '../logging';
import { Target, TargetOptions } from '../target';
import { Scratch, shell } from '../util';
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
    await this.goBuild(sourceDir);
    await this.copyFiles(sourceDir, outDir);
  }

  /**
   * Copies the sources to a scratch directory and runs `go build` in there to ensure
   * generated code compiles successfully.
   */
  private async goBuild(sourceDir: string) {
    const buildScratch = await Scratch.make(async (buildDir) => {
      buildDir = await fs.realpath(buildDir); // resolve symlinks
      await this.copyFiles(sourceDir, buildDir);

      // resolve symlinks
      const pkgout = path.resolve(buildDir, this.goPackageName);

      // append a "replace" directive for local dependencies to `go.mod`.
      await this.replaceLocalDeps(buildDir);

      // run `go build` to make sure the generated code compiles
      await shell('go', ['build'], { cwd: pkgout });
    });

    await buildScratch.cleanup();
  }

  /**
   * Appends a `replace` directive in the generated `go.mod` for local
   * dependencies.
   * @param outDir The dist output directory (e.g. `<packageRoot>/dist/go`).
   * @returns the name of an alternative `go.mod` file which includes `replace`
   * directives. This files should be later erased from the output directory. If
   * `undefined` is returned, use the original `go.mod` file.
   */
  private async replaceLocalDeps(outDir: string) {
    const rootPackage = this.goGenerator.rootPackage;
    if (!rootPackage) {
      throw new Error(`assertion failed: "rootPackage" is undefined`);
    }

    // map of "replace" directives
    const replace: { [from: string]: string } = {};

    // find local deps by check if `<jsii.outdir>/go` exists for dependencies
    // and also consider _out_ output directory in case pacmak is executed using
    // `--outdir` (in which case all go code will be generated there).
    const distDirs = [
      outDir,
      ...(await this.findLocalDepsOutput(this.packageDir)),
    ];

    // try to resolve @jsii/go-runtime (only exists as a devDependency)
    const localRuntime = tryFindLocalRuntime();
    if (localRuntime) {
      replace[JSII_RT_MODULE_NAME] = localRuntime;
    }

    // iterate over all local directories and try to match them with one this
    // module's deps.
    for (const distgo of distDirs) {
      for (const dep of rootPackage.packageDependencies) {
        const localdir = isLocalModule(distgo, dep);
        if (localdir) {
          replace[dep.goModuleName] = localdir;
        }
      }
    }

    // emit "replace" directive (if relevant)
    if (Object.keys(replace).length === 0) {
      return;
    }

    const pkgOut = path.join(outDir, this.goPackageName);
    const lines: string[] = [];

    lines.push();
    lines.push('replace (');

    for (const [from, to] of Object.entries(replace)) {
      const rel = path.relative(pkgOut, to);
      logging.info(`Local dependency: ${from} => ${rel} (${to})`);
      lines.push(`\t${from} => ${rel}`);
    }

    lines.push(')');

    logging.debug(
      `Appending "replace" directives for local deps to "go.mod" (original saved under "go.mod.orig")`,
    );

    await fs.appendFile(
      path.join(pkgOut, GOMOD_FILENAME),
      `\n${lines.join('\n')}`,
    );
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
 * Checks if `distdir` includes generated go code for the specified `pkg`.
 * @returns `undefined` if not or the module directory otherwise.
 */
function isLocalModule(distdir: string, pkg: RootPackage) {
  const gomodCandidate = path.join(distdir, pkg.packageName, GOMOD_FILENAME);
  if (!fs.pathExistsSync(gomodCandidate)) {
    return undefined;
  }

  const lines = fs.readFileSync(gomodCandidate, 'utf-8').split('\n');
  const isModule = lines.find(
    (line) => line.trim() === `module ${pkg.goModuleName}`,
  );

  if (!isModule) {
    return undefined;
  }

  return path.dirname(gomodCandidate);
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
