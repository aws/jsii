import { Method, Property, ClassType } from 'jsii-reflect';
import { CodeMaker } from 'codemaker';
import { TypeMapper } from './interface';
import { GoType } from './go-type';

export class GoClass extends GoType {
  public constructor(public type: ClassType) {
    super(type);
  }

  public emit(code: CodeMaker): void {
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

  private emitClassProperty(code: CodeMaker, property: Property) {
    const type = new TypeMapper(property.type).mapType();

    code.line(`${property.name} ${type}`);
  }

  private emitClassMethod(code: CodeMaker, method: Method) {
    const returns = method.returns.type.void
      ? ''
      : ` ${new TypeMapper(method.returns.type).mapType()}`;
    const instanceArg = this.localName.substring(0, 1);

    // TODO: Method Arguments
    // NOTE: May need to capitalize method name
    code.openBlock(
      `func (${instanceArg} *${this.localName}) ${method.name}()${returns}`,
    );
    code.line(`// jsiiruntime.methodcall(${instanceArg})`);
    code.closeBlock();
    code.line();
  }
}
