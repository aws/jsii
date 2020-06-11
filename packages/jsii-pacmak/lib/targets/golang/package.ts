import { Assembly, InterfaceType, Method, Property, Type } from 'jsii-reflect';
import { join } from 'path';
import { EmitContext } from './emit-context';
import { ReadmeFile } from './readme-file';
import { CodeMaker } from 'codemaker';
import { Interface, Class } from './interface';

export class Package {
  public readonly packageName: string;
  public readonly submodules: string[];

  public constructor(private readonly assembly: Assembly) {
    this.submodules = [];
    this.packageName = this.assembly.name
      .replace('@', '')
      .replace(/[^a-z0-9_.]/gi, '');
  }

  public emit({ code }: EmitContext): void {
    if (this.assembly.readme?.markdown) {
      new ReadmeFile(this.packageName, this.assembly.readme.markdown);
    }

    const packageFile = `${join(...this.packageName.split('.'))}.go`;
    code.openFile(packageFile);
    code.line(`package ${this.packageName}`);
    code.line();

    this.emitRootModule(code);

    code.closeFile(packageFile);

    this.generateSubmoduleFiles(code);
    // TODO: Code for the contents of the package, sub-packages, etc...
  }

  private emitRootModule(code: CodeMaker) {
    this.assembly.types.forEach((type: Type) => {
      this.emitType(code, type);
    });
  }

  private emitType(code: CodeMaker, type: Type): void {
    if (type.isInterfaceType()) {
      new Interface(code, type).emit();
    } else if (type.isClassType()) {
      new Class(code, type).emit();
    }

    if (type.isInterfaceType()) {
      return this.emitInterface(code, type);
    }
  }

  // TODO fix - account for exported methods? all classes/interfaces are public?
  private goNameFromJs(name: string): string {
    return name.replace(/[^a-z0-9_.]/gi, '').toLowerCase();
  }

  private emitInterface(code: CodeMaker, type: InterfaceType): void {
    const fqn = type.fqn.split('.');
    const goInterfaceName = fqn[fqn.length - 1];
    code.openBlock(`type ${goInterfaceName} interface`);
    Object.values(type.getMethods()).forEach((method) =>
      this.emitInterfaceMethod(code, method),
    );
    Object.values(type.getProperties()).forEach((prop) =>
      this.emitInterfaceProperty(code, prop),
    );

    code.closeBlock();
  }

  private emitInterfaceMethod(code: CodeMaker, method: Method) {
    const returns =
      method.returns.toString() === 'void'
        ? ''
        : ` ${method.returns.toString()}`;
    code.line(`${this.goNameFromJs(method.name)}()${returns}`);
    code.line();
  }

  // TODO: would have to be a getter/setter method?
  private emitInterfaceProperty(code: CodeMaker, prop: Property) {
    const propType = "" // TODO
    code.line(`${this.goNameFromJs(prop.name)}()${propType}`);
    code.line();
  }

  private generateSubmoduleFiles(code: CodeMaker) {
    const submodules = this.assembly.submodules;
    if (submodules.length > 0) {
      for (const s of submodules) {
        const submodule = s.fqn
          .replace('@', '')
          .replace('.', '/')
          .replace(/[^a-z0-9_.]/gi, '');

        this.submodules.push(submodule);
        const submoduleFile = `${submodule}.go`;
        code.openFile(submoduleFile);
        code.line();
        code.closeFile(submoduleFile);
      }
    }
  }
}
