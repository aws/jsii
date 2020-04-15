import { Assembly } from 'jsii-reflect';
import { join } from 'path';
import { EmitContext } from './emit-context';
import { ReadmeFile } from './readme-file';

export class Package {
  public readonly packageName: string;

  public constructor(private readonly assembly: Assembly) {
    this.packageName = this.assembly.name
      .replace('@', '')
      .replace(/\//g, '.')
      .replace(/[^a-z0-9_.]/ig, '_');
  }

  public emit({ code }: EmitContext): void {
    if (this.assembly.readme?.markdown) {
      new ReadmeFile(this.packageName, this.assembly.readme.markdown);
    }

    const packageFile = `${join(...this.packageName.split('.'))}.go`;
    code.openFile(packageFile);
    code.line(`package ${this.packageName}`);
    code.line();

    // TODO: Code for the contents of the package, sub-packages, etc...

    code.closeFile(packageFile);
  }
}
