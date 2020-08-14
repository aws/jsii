import { Method, Property, ClassType } from 'jsii-reflect';
import { CodeMaker } from 'codemaker';
import { TypeMapper } from './interface';
import { GoType } from './go-type';

const CLASS_INTERFACE_SUFFIX = 'Iface';

export class GoClass extends GoType {
  public constructor(public type: ClassType) {
    super(type);
  }

  public emit(code: CodeMaker): void {
    this.emitClassInterface(code);

    code.openBlock(`type ${this.localName} struct`);

    Object.values(this.type.getProperties()).forEach((property) =>
      this.emitClassProperty(code, property),
    );

    code.closeBlock();
    code.line();

    Object.values(this.type.getMethods()).forEach((method) =>
      this.emitClassMethod(code, method),
    );
  }

  // TODO deal with immutability?
  //
  private emitClassProperty(code: CodeMaker, property: Property) {
    const type = new TypeMapper(property.type).mapType();
    const propName = code.toPascalCase(property.name);

    code.line(`${propName} ${type}`);
  }

  private emitClassMethod(code: CodeMaker, method: Method) {
    const returnType = method.returns.type.void
      ? ''
      : ` ${new TypeMapper(method.returns.type).mapType()}`; // TODO typemapper needs to handle cthings like Array etc

    const instanceArg = this.localName.substring(0, 1).toLowerCase();
    const methodName = code.toPascalCase(method.name);

    // TODO: Method Arguments
    code.openBlock(
      `func (${instanceArg} *${this.localName}) ${methodName}()${returnType}`,
    );
    code.line(`// jsiiruntime.methodcall(${instanceArg})`);
    code.closeBlock();
    code.line();
  }

  // Generate interface that defines getters for public properties and any method signatures
  private emitClassInterface(code: CodeMaker) {
    const interfaceName = this.localName + CLASS_INTERFACE_SUFFIX;
    code.openBlock(`type ${interfaceName} interface`);
    code.closeBlock();
    code.line();
  }
}
