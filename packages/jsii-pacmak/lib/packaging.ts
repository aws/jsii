import { Scratch, shell } from './util';
import logging = require('../lib/logging');
import reflect = require('jsii-reflect');
import os = require('os');
import path = require('path');

const SHARED_TS = new reflect.TypeSystem();

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
}
export class JsiiModule {
  public readonly name: string;
  public readonly moduleDirectory: string;
  public readonly availableTargets: string[];
  public outputDirectory: string;

  private _tarball?: Scratch<string>;
  public _assembly?: reflect.Assembly;

  public constructor(options: JsiiModuleOptions) {
    this.name = options.name;
    this.moduleDirectory = options.moduleDirectory;
    this.availableTargets = options.availableTargets;
    this.outputDirectory = options.defaultOutputDirectory;
  }

  /**
   * Prepare an NPM package from this source module
   */
  public async npmPack() {
    this._tarball = await Scratch.make(async tmpdir => {
      logging.debug(`Running "npm pack ${this.moduleDirectory}" in ${tmpdir}`);
      const args = ['pack', this.moduleDirectory];
      if (logging.level >= logging.LEVEL_VERBOSE) {
        args.push('--loglevel=verbose');
      }
      const out = await shell('npm', args, { cwd: tmpdir });
      // Take only the last line of npm pack which should contain the
      // tarball name. otherwise, there can be a lot of extra noise there
      // from scripts that emit to STDOUT.
      const lines = out.trim().split(os.EOL);
      return path.resolve(tmpdir, lines[lines.length - 1].trim());
    });
  }

  public get tarball(): string {
    if (!this._tarball) {
      throw new Error('Tarball not available yet, call npmPack() first');
    }
    return this._tarball.object;
  }

  public async load() {
    this._assembly = await SHARED_TS.loadModule(this.moduleDirectory);
  }

  public get assembly(): reflect.Assembly {
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