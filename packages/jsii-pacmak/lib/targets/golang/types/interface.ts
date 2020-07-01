import { goNameFromJs } from '../util';
import { GoType } from './go-type';
import { InterfaceType, Method, Property, TypeReference } from 'jsii-reflect';
import { CodeMaker } from 'codemaker';

export class TypeMapper {
  public constructor(public value: TypeReference) {}

  public mapType() {
    if (this.value.type) {
      const type = new GoType(this.value.type);
      return type.localName;
    }

    return this.value.toString();
  }
}

export class Interface extends GoType {
  public constructor(public type: InterfaceType) {
    super(type);
  }

  public emit(code: CodeMaker): void {
    code.openBlock(`type ${this.localName} interface`);
    Object.values(this.type.getMethods()).forEach((method) =>
      this.emitInterfaceMethod(code, method),
    );

    Object.values(this.type.getProperties()).forEach((property) =>
      this.emitInterfaceProperty(code, property),
    );
    code.closeBlock();
    code.line();
  }

  private emitInterfaceProperty(code: CodeMaker, property: Property) {
    const name = goNameFromJs(property.name);
    const type = new TypeMapper(property.type).mapType();

    code.line(`get${name}() ${type}`);
    if (!property.protected) {
      code.line(`set${name}()`);
    }
  }

  private emitInterfaceMethod(code: CodeMaker, method: Method) {
    const returns = method.returns.type.void
      ? ''
      : ` ${new TypeMapper(method.returns.type).mapType()}`;
    code.line(`${goNameFromJs(method.name)}()${returns}`);
  }
}
