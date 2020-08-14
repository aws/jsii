import { Assembly } from 'jsii-reflect';
import { EmitContext } from './emit-context';
import { ReadmeFile } from './readme-file';
import { RootModule } from './module';

export class Package {
  public readonly packageName: string;
  public readonly rootModule: RootModule;

  public constructor(public readonly assembly: Assembly) {
    this.packageName = this.assembly.name
      .replace('@', '')
      .replace(/[^a-z0-9_.]/gi, '');
    this.rootModule = new RootModule(assembly);
  }

  public emit({ code }: EmitContext): void {
    if (this.assembly.readme?.markdown) {
      new ReadmeFile(this.packageName, this.assembly.readme.markdown);
    }

    this.rootModule.emit(code);
  }
}
