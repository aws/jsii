import { CodeMaker } from 'codemaker';
import * as fs from 'fs-extra';
import { Assembly } from 'jsii-reflect';
import { Rosetta } from 'jsii-rosetta';
import * as path from 'path';

import { IGenerator } from '../generator';
import * as logging from '../logging';
import { findLocalBuildDirs, Target, TargetOptions } from '../target';
import { shell } from '../util';
import { Documentation } from './go/documentation';
import { GOMOD_FILENAME, RootPackage } from './go/package';
import { JSII_INIT_PACKAGE } from './go/runtime';
import { JSII_RT_MODULE_NAME } from './go/runtime/constants';
import { goPackageName } from './go/util';

export class Golang extends Target {
  private readonly goGenerator: GoGenerator;

  public constructor(options: TargetOptions) {
    super(options);
    this.goGenerator = new GoGenerator(options.rosetta);
  }

  public get generator() {
    return this.goGenerator;
  }

  /**
   * Generates a publishable artifact in `outDir`.
   *
   * @param sourceDir the directory where the generated source is located.
   * @param outDir    the directory where the publishable artifact should be placed.
   */
  public async build(sourceDir: string, outDir: string): Promise<void> {
    // copy generated sources to the output directory
    await this.copyFiles(sourceDir, outDir);

    const pkgDir = path.join(outDir, goPackageName(this.assembly.name));

    // write `local.go.mod` with "replace" directives for local modules
    const localGoMod = await this.writeLocalGoMod(pkgDir);

    // run `go build` with local.go.mod
    await go('build', ['-modfile', localGoMod], { cwd: pkgDir });

    // delete local.go.mod from the output directory so it doesn't get published
    await fs.unlink(path.join(pkgDir, localGoMod));
  }

  /**
   * Creates a copy of the `go.mod` file called `local.go.mod` with added
   * `replace` directives for local mono-repo dependencies. This is required in
   * order to run `go fmt` and `go build`.
   *
   * @param pkgDir The directory which contains the generated go code
   */
  private async writeLocalGoMod(pkgDir: string) {
    const replace: Record<string, string> = {};

    // find local deps by check if `<jsii.outdir>/go` exists for dependencies
    // and also consider `outDir` in case pacmak is executed using `--outdir
    // --recurse` (in which case all go code will be generated there).
    const dirs = [
      path.dirname(pkgDir),
      ...(await findLocalBuildDirs(this.packageDir, 'go')),
    ];

    // try to resolve @jsii/go-runtime (only exists as a devDependency)
    const jsiiRuntimeDir = tryFindLocalRuntime();
    if (jsiiRuntimeDir) {
      replace[JSII_RT_MODULE_NAME] = jsiiRuntimeDir;
    }

    // iterate (recursively) on all package dependencies and check if we have a
    // local build directory for this module. if
    // we do, add a "replace" directive to point to it instead of download from
    // the network.
    const visit = (pkg: RootPackage) => {
      for (const dep of pkg.packageDependencies) {
        for (const baseDir of dirs) {
          const moduleDir = tryFindLocalModule(baseDir, dep);
          if (moduleDir) {
            replace[dep.goModuleName] = moduleDir;
          }
        }

        // recurse to transitive deps ("replace" is only considered at the top level go.mod)
        visit(dep);
      }
    };

    visit(this.goGenerator.rootPackage);

    // write `local.go.mod`

    // read existing content
    const goMod = path.join(pkgDir, GOMOD_FILENAME);
    const lines = (await fs.readFile(goMod, 'utf-8')).split('\n');

    for (const [from, to] of Object.entries(replace)) {
      logging.info(`Local replace: ${from} => ${to}`);
      lines.push(`replace ${from} => ${to}`);
    }

    const localGoMod = `local.${GOMOD_FILENAME}`;
    await fs.writeFile(path.join(pkgDir, localGoMod), lines.join('\n'));
    return localGoMod;
  }
}

class GoGenerator implements IGenerator {
  private assembly!: Assembly;
  public rootPackage!: RootPackage;

  private readonly code = new CodeMaker({
    indentCharacter: '\t',
    indentationLevel: 1,
  });

  private readonly documenter: Documentation;

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
 * Checks if `buildDir` includes a local go build version (with "replace"
 * directives).
 * @param baseDir the `dist/go` directory
 * @returns `undefined` if not or the module directory otherwise.
 */
function tryFindLocalModule(baseDir: string, pkg: RootPackage) {
  const gomodPath = path.join(baseDir, pkg.packageName, GOMOD_FILENAME);
  if (!fs.pathExistsSync(gomodPath)) {
    return undefined;
  }

  // read `go.mod` and check that it is for the correct module
  const gomod = fs.readFileSync(gomodPath, 'utf-8').split('\n');
  const isExpectedModule = gomod.find(
    (line) => line.trim() === `module ${pkg.goModuleName}`,
  );

  if (!isExpectedModule) {
    return undefined;
  }

  return path.resolve(path.dirname(gomodPath));
}

/**
 * Check if we are running from inside the jsii repository, and then we want to
 * use the local runtime instead of download from a released version.
 */
function tryFindLocalRuntime() {
  try {
    const p = require.resolve('@jsii/go-runtime/jsii-runtime-go/go.mod');
    const dir = path.dirname(p);
    logging.debug(`Using @jsii/go-runtime from ${dir}`);
    return dir;
  } catch {
    return undefined;
  }
}

/**
 * Executes a go CLI command against a `local.go.mod` file.
 *
 * Since not all `go` commands support specifying an alternative `go.mod` file,
 * we will copy `local.go.mod` over it and then restore the original version
 * after execution.
 *
 * @param command The `go` command to execute (e.g. `build`)
 * @param args Additional args
 * @param options Options
 */
async function go(command: string, args: string[], options: { cwd: string }) {
  const { cwd } = options;
  return shell('go', [command, ...args], { cwd });
}
