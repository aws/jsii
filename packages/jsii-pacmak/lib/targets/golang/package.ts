import { Assembly } from 'jsii-reflect';
import { join } from 'path';
import { EmitContext } from './emit-context';
import { ReadmeFile } from './readme-file';
import { Module } from './module';
import { goModuleName } from './util';

/*
 * A go JSII Package
 *
 * Extends `Module` for root source package emit logic
 */
export class Package extends Module {
  public readonly assembly: Assembly;

  public constructor(assembly: Assembly) {
    const moduleName = goModuleName(assembly.name);
    const filePath = join(...moduleName.split('.'));

    super(
      Object.values(assembly.types),
      assembly.submodules,
      moduleName,
      filePath,
    );

    this.assembly = assembly;
  }

  public emit(context: EmitContext): void {
    super.emit(context);

    if (this.assembly.readme?.markdown) {
      new ReadmeFile(this.moduleName, this.assembly.readme.markdown);
    }
  }
}
