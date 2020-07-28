import { goNameFromJs } from './util';
import {
  InterfaceType,
  Method,
  Property,
  TypeReference,
  ClassType,
} from 'jsii-reflect';
import { CodeMaker } from 'codemaker';

// enum Primitive {
//   STRING,
//   NONE,
//   NUMBER,
// }

// FIXME - will be replaced by AST/symbol table for streamlined lookup of
// references to imported objects
export class TypeMapper {
  public constructor(public value: TypeReference) {}

  public mapType() {
    if (this.value.type) {
      const type = new BaseGoType(this.value.type.fqn);
      return type.localName;
    }

    const typeString = this.value.toString();
    return typeString;
  }
}

/*
 * BaseGoType provides the base constructor for Go types, namely custom struct types (representing classes) and interfaces.
 */
export class BaseGoType {
  // private readonly scopes: string[];
  private readonly name: string;

  public constructor(public fqn: string) {
    const path = this.fqn.split('.');
    this.name = path.pop()!;
    // this.scopes = path;
  }

  public get localName() {
    return this.name;
  }
}

/*
 * Interface wraps a Typescript interface in a Go interface
 */
export class Interface extends BaseGoType {
  public constructor(public code: CodeMaker, public type: InterfaceType) {
    super(type.fqn);
  }

  public emit(): void {
    this.code.openBlock(`type ${this.localName} interface`);
    Object.values(this.type.getMethods()).forEach((method) =>
      this.emitInterfaceMethod(method),
    );

    Object.values(this.type.getProperties()).forEach((property) =>
      this.emitInterfaceProperty(property),
    );
    this.code.closeBlock();
    this.code.line();
  }

  private emitInterfaceProperty(property: Property) {
    const name = property.name;
    const propertyType = new TypeMapper(property.type).mapType();

    this.code.line(`get${name}() ${propertyType}`);
    if (!property.protected) {
      this.code.line(`set${name}()`);
    }
  }

  private emitInterfaceMethod(method: Method) {
    // const returns = method.returns.toString() === 'void'
    //   ? ''
    //   : ` ${method.returns.toString()}`;
    const returns = method.returns.type.void
      ? ''
      : ` ${new TypeMapper(method.returns.type).mapType()}`;
    this.code.line(`${goNameFromJs(method.name)}()${returns}`);
  }
}

/*
 * Class wraps a Typescript class as a Go custom struct type  TODO rename?
 */
export class Class extends BaseGoType {
  public constructor(public code: CodeMaker, public type: ClassType) {
    super(type.fqn);
  }

  public emit(): void {
    this.code.openBlock(`type ${this.localName} struct`);

    Object.values(this.type.getProperties()).forEach((property) =>
      this.emitClassProperty(property),
    );

    this.code.closeBlock();
    this.code.line();

    Object.values(this.type.getMethods()).forEach((method) =>
      this.emitClassMethod(method),
    );
  }

  private emitClassProperty(property: Property) {
    const name = goNameFromJs(property.name);
    const type = new TypeMapper(property.type).mapType();

    this.code.line(`${name} ${type}`);
  }

  private emitClassMethod(method: Method) {
    const name = goNameFromJs(method.name);
    const returns = method.returns.type.void
      ? ''
      : ` ${new TypeMapper(method.returns.type).mapType()}`;
    const instanceArg = this.localName.substring(0, 1).toLowerCase();

    // TODO: Method Arguments
    this.code.openBlock(
      `func (${instanceArg} *${this.localName}) ${name}()${returns}`,
    );
    this.code.line(`// jsiiruntime.methodcall(${instanceArg})`);
    this.code.closeBlock();
    this.code.line();
  }
}
