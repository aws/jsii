import * as fs from 'fs';
import type { Assembly, TypeSystem } from 'jsii-reflect';
import * as os from 'os';
import * as path from 'path';

import * as logging from '../lib/logging';
import { Scratch, shell } from './util';

export const DEFAULT_PACK_COMMAND = 'npm pack';

export interface JsiiModuleOptions {
  /**
   * Name of the module
   */
  name: string;

  /**
   * The module directory
   */
  moduleDirectory: string;

  /**
   * Identifier of the targets to build
   */
  availableTargets: string[];

  /**
   * Output directory where to package everything
   */
  defaultOutputDirectory: string;

  /**
   * Names of packages this package depends on, if any
   */
  dependencyNames?: string[];
}
export class JsiiModule {
  public readonly name: string;
  public readonly dependencyNames: string[];
  public readonly moduleDirectory: string;
  public readonly availableTargets: string[];
  public outputDirectory: string;

  private _tarball?: Scratch<string>;
  public _assembly?: Assembly;

  public constructor(options: JsiiModuleOptions) {
    this.name = options.name;
    this.moduleDirectory = options.moduleDirectory;
    this.availableTargets = options.availableTargets;
    this.outputDirectory = options.defaultOutputDirectory;
    this.dependencyNames = options.dependencyNames ?? [];
  }

  /**
   * Prepare an NPM package from this source module
   */
  public async npmPack(packCommand = DEFAULT_PACK_COMMAND) {
    this._tarball = await Scratch.make(async (tmpdir) => {
      const args = [];

      // If using the default command, optimize by packing directly into the tmp dir to allow unit tests to run in parallel
      if (packCommand === DEFAULT_PACK_COMMAND) {
        args.push('--pack-destination', tmpdir);

        if (logging.level >= logging.LEVEL_VERBOSE) {
          args.push('--loglevel=verbose');
        }
      }
      const out = await shell(packCommand, args, {
        cwd: this.moduleDirectory,
      });
      // Take only the last line of npm pack which should contain the
      // tarball name. otherwise, there can be a lot of extra noise there
      // from scripts that emit to STDOUT.
      const lines = out.trim().split(os.EOL);
      const lastLine = lines[lines.length - 1].trim();

      if (!lastLine.endsWith('.tgz') && !lastLine.endsWith('.tar.gz')) {
        throw new Error(
          `npm pack did not produce tarball from ${
            this.moduleDirectory
          } into ${tmpdir} (output was ${JSON.stringify(lines)})`,
        );
      }

      // move the tarball from the module dir to temp if using a custom command
      if (packCommand !== DEFAULT_PACK_COMMAND) {
        fs.renameSync(
          path.resolve(this.moduleDirectory, lastLine),
          path.resolve(tmpdir, lastLine),
        );
      }

      return path.resolve(tmpdir, lastLine);
    });
  }

  public get tarball(): string {
    if (!this._tarball) {
      throw new Error('Tarball not available yet, call npmPack() first');
    }
    return this._tarball.object;
  }

  public async load(system: TypeSystem, validate = true) {
    return system
      .loadModule(this.moduleDirectory, { validate })
      .then((assembly) => (this._assembly = assembly));
  }

  public get assembly(): Assembly {
    if (!this._assembly) {
      throw new Error('Assembly not available yet, call load() first');
    }
    return this._assembly;
  }

  public async cleanup() {
    if (this._tarball) {
      await this._tarball.cleanup();
    }
  }
}
