import { Rosetta } from 'jsii-rosetta';
import { ListrDefaultRenderer, ListrTaskWrapper } from 'listr2';
import * as path from 'path';

import * as logging from './logging';
import { JsiiModule } from './packaging';
import { TargetConstructor, Target } from './target';
import { TargetName } from './targets';
import { Toposorted } from './toposort';
import { Scratch, flatten } from './util';

export interface BuildOptions {
  /**
   * Whether to fingerprint the produced artifacts.
   * @default true
   */
  readonly fingerprint?: boolean;

  /**
   * Whether artifacts should be re-build even if their fingerprints look up-to-date.
   * @default false
   */
  readonly force?: boolean;

  /**
   * Arguments provided by the user (how they are used is target-dependent)
   */
  readonly arguments: { readonly [name: string]: any };

  /**
   * Only generate code, don't build
   */
  readonly codeOnly?: boolean;

  /**
   * Whether or not to clean
   */
  readonly clean?: boolean;

  /**
   * Whether to add an additional subdirectory for the target language
   */
  readonly languageSubdirectory?: boolean;

  /**
   * The Rosetta instance to load examples from
   */
  readonly rosetta: Rosetta;

  /**
   * Whether to generate runtime type checking code in places where compile-time
   * type checking is not possible.
   */
  readonly runtimeTypeChecking: boolean;
}

/**
 * Interface for classes that can build language targets
 *
 * Building can happen one target at a time, or multiple targets at a time.
 */
export interface TargetBuilder {
  buildModules(
    task: ListrTaskWrapper<unknown, ListrDefaultRenderer>,
  ): Promise<void>;
}

/**
 * Base implementation, building the package targets for the given language independently of each other
 *
 * Some languages can gain substantial speedup in preparing an "uber project" for all packages
 * and compiling them all in one go (Those will be implementing a custom Builder).
 *
 * For languages where it doesn't matter--or where we haven't figured out how to
 * do that yet--this class can serve as a base class: it will build each package
 * independently, taking care to build them in the right order.
 */
export class IndependentPackageBuilder implements TargetBuilder {
  public constructor(
    private readonly targetName: TargetName,
    private readonly targetConstructor: TargetConstructor,
    private readonly modules: Toposorted<JsiiModule>,
    private readonly options: BuildOptions,
  ) {}

  public async buildModules(
    task: ListrTaskWrapper<unknown, ListrDefaultRenderer>,
  ): Promise<void> {
    await task
      .newListr<BuildOptions>(
        this.modules.flatMap((modules) =>
          modules.map((module) => ({
            title: module.name,
            task: async (options, _task) => {
              if (options.codeOnly) {
                return this.generateModuleCode(module, options);
              }
              return this.buildModule(module, options);
            },
          })),
        ),
        { ctx: this.options },
      )
      .run();

    if (this.options.codeOnly) {
      await Promise.all(
        flatten(this.modules).map((module) =>
          this.generateModuleCode(module, this.options),
        ),
      );
      return;
    }

    for (const modules of this.modules) {
      // eslint-disable-next-line no-await-in-loop
      await Promise.all(
        modules.map((module) => this.buildModule(module, this.options)),
      );
    }
  }

  private async generateModuleCode(module: JsiiModule, options: BuildOptions) {
    const outputDir = this.finalOutputDir(module, options);
    logging.debug(`Generating ${this.targetName} code into ${outputDir}`);
    await this.makeTarget(module, options).generateCode(
      outputDir,
      module.tarball,
    );
  }

  private async buildModule(module: JsiiModule, options: BuildOptions) {
    const target = this.makeTarget(module, options);
    const outputDir = this.finalOutputDir(module, options);

    const src = await Scratch.make((tmpdir) => {
      logging.debug(`Generating ${this.targetName} code into ${tmpdir}`);
      return target.generateCode(tmpdir, module.tarball);
    });

    try {
      logging.debug(`Building ${src.directory} into ${outputDir}`);
      return await target.build(src.directory, outputDir);
    } catch (err) {
      logging.warn(`Failed building ${this.targetName}`);
      return await Promise.reject(err);
    } finally {
      if (options.clean) {
        logging.debug(`Cleaning ${src.directory}`);
        await src.cleanup();
      } else {
        logging.info(
          `Generated code for ${this.targetName} retained at ${src.directory}`,
        );
      }
    }
  }

  private makeTarget(module: JsiiModule, options: BuildOptions): Target {
    return new this.targetConstructor({
      arguments: options.arguments,
      assembly: module.assembly,
      fingerprint: options.fingerprint,
      force: options.force,
      packageDir: module.moduleDirectory,
      rosetta: options.rosetta,
      runtimeTypeChecking: options.runtimeTypeChecking,
      targetName: this.targetName,
    });
  }

  private finalOutputDir(module: JsiiModule, options: BuildOptions): string {
    if (options.languageSubdirectory) {
      return path.join(module.outputDirectory, this.targetName);
    }
    return module.outputDirectory;
  }
}
