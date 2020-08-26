import { CodeMaker } from 'codemaker';
import { InterfaceType, Method, Property } from 'jsii-reflect';
import { GoType } from './go-type';
import { GoTypeRef } from './go-type-reference';
import { Package } from '../package';

export class Interface extends GoType {
  public readonly dependencies: Package[] = [];

  public constructor(parent: Package, public type: InterfaceType) {
    super(parent, type);
  }

  public emit(code: CodeMaker): void {
    const extended = this.type.getInterfaces(true);

    code.line('// Behaviorial interface'); // FIXME for debugging
    code.openBlock(`type ${this.name} interface`);

    // embed extended interfaces
    if (extended.length !== 0) {
      for (const iface of extended) {
        code.line(iface.fqn);
      }
      code.line();
    }

    Object.values(this.type.getMethods()).forEach((method) =>
      this.emitInterfaceMethod(code, method),
    );

    // TODO remove?
    Object.values(this.type.getProperties()).forEach((property) =>
      this.emitInterfaceProperty(code, property),
    );

    code.closeBlock();
    code.line();
  }

  private emitInterfaceProperty(code: CodeMaker, property: Property) {
    const propName = code.toPascalCase(property.name);
    const type = new GoTypeRef(this.parent.root, property.type).scopedName(
      this.parent,
    );

    code.line(`Get${propName}() ${type}`);
    // if (!property.protected) {
    //   code.line(`set${name}()`);
    // }
  }

  private emitInterfaceMethod(code: CodeMaker, method: Method) {
    const returns = method.returns.type.void
      ? ''
      : ` ${new GoTypeRef(this.parent.root, method.returns.type).scopedName(
          this.parent,
        )}`;

    const methodName = code.toPascalCase(method.name);

    code.line(`${methodName}()${returns}`);
  }
}
