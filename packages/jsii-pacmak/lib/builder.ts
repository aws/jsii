import { Rosetta } from 'jsii-rosetta';
import * as path from 'path';

import * as logging from './logging';
import { JsiiModule } from './packaging';
import { TargetConstructor, Target } from './target';
import { TargetName } from './targets';
import { Scratch } from './util';

export interface BuildOptions {
  /**
   * Whether to fingerprint the produced artifacts.
   * @default true
   */
  fingerprint?: boolean;

  /**
   * Whether artifacts should be re-build even if their fingerprints look up-to-date.
   * @default false
   */
  force?: boolean;

  /**
   * Arguments provided by the user (how they are used is target-dependent)
   */
  arguments: { readonly [name: string]: any };

  /**
   * Only generate code, don't build
   */
  codeOnly?: boolean;

  /**
   * Whether or not to clean
   */
  clean?: boolean;

  /**
   * Whether to add an additional subdirectory for the target language
   */
  languageSubdirectory?: boolean;

  /**
   * The Rosetta instance to load examples from
   */
  rosetta: Rosetta;
}

/**
 * Interface for classes that can build language targets
 *
 * Building can happen one target at a time, or multiple targets at a time.
 */
export interface TargetBuilder {
  buildModules(): Promise<void>;
}

/**
 * Builds the targets for the given language sequentially
 */
export class OneByOneBuilder implements TargetBuilder {
  public constructor(
    private readonly targetName: TargetName,
    private readonly targetConstructor: TargetConstructor,
    private readonly modules: readonly JsiiModule[],
    private readonly options: BuildOptions,
  ) {}

  public async buildModules(): Promise<void> {
    const promises = this.modules.map((module) =>
      this.options.codeOnly
        ? this.generateModuleCode(module, this.options)
        : this.buildModule(module, this.options),
    );
    await Promise.all(promises);
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
      return Promise.reject(err);
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
      targetName: this.targetName,
      packageDir: module.moduleDirectory,
      assembly: module.assembly,
      fingerprint: options.fingerprint,
      force: options.force,
      arguments: options.arguments,
      rosetta: options.rosetta,
    });
  }

  private finalOutputDir(module: JsiiModule, options: BuildOptions): string {
    if (options.languageSubdirectory) {
      return path.join(module.outputDirectory, this.targetName);
    }
    return module.outputDirectory;
  }
}
