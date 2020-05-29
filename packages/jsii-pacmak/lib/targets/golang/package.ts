import { Assembly } from 'jsii-reflect';
import { join } from 'path';
import { EmitContext } from './emit-context';
import { ReadmeFile } from './readme-file';

export class Package {
  public readonly packageName: string;
  public readonly submodules: string[];

  public constructor(private readonly assembly: Assembly) {
    this.submodules = [];
    this.packageName = this.assembly.name
      .replace('@', '')
      .replace(/[^a-z0-9_.]/gi, '');
  }

  public emit({ code }: EmitContext): void{
    if (this.assembly.readme?.markdown) {
      new ReadmeFile(this.packageName, this.assembly.readme.markdown);
    }

    const packageFile = `${join(...this.packageName.split('.'))}.go`;
    code.openFile(packageFile);
    code.line(`package ${this.packageName}`);
    code.line();
    code.closeFile(packageFile);

    // TODO: Code for the contents of the package, sub-packages, etc...
    const submodules = this.assembly.submodules
    if (submodules.length > 0) {
      for (const s of submodules) {
        const submodule =
        s.fqn
          .replace('@', '')
          .replace('.', '/')
          .replace(/[^a-z0-9_.]/gi, '');

        this.submodules.push(submodule);
        const submoduleFile = submodule + '.go';
        code.openFile(submoduleFile);
        code.line();
        code.closeFile(submoduleFile);
      }
    }
  }
}
