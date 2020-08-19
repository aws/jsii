import { GoType } from './go-type';
import { GoTypeRef } from './go-type-reference';
import { Module } from '../module';
import { InterfaceType, Property } from 'jsii-reflect';
import { CodeMaker, toPascalCase } from 'codemaker';

const STRUCT_INTERFACE_SUFFIX = 'Iface';

// JSII datatype interfaces, aka structs
export class Struct extends GoType {
  public readonly properties: StructProperty[];
  public readonly dependencies: Module[] = [];

  public constructor(parent: Module, public type: InterfaceType) {
    super(parent, type);

    // TODO check if datatype? (isDataType() on jsii-reflect seems wrong)
    this.properties = Object.values(this.type.getProperties()).map(
      (prop) => new StructProperty(this, prop),
    );
  }

  // needs to generate both a Go interface and a struct, as well as the methods on the struct
  public emit(code: CodeMaker): void {
    this.generateInterface(code);
    this.generateStruct(code);
    this.generateImpl(code);
  }

  private generateInterface(code: CodeMaker): void {
    const interfaceName = `${this.name}${STRUCT_INTERFACE_SUFFIX}`;
    code.openBlock(`type ${interfaceName} interface`);

    this.properties.forEach((property) => property.emitGetter(code));

    code.closeBlock();
    code.line();
  }

  private generateStruct(code: CodeMaker): void {
    code.openBlock(`type ${this.name} struct`);

    this.properties.forEach((property) => property.emitProperty(code));

    code.closeBlock();
    code.line();
  }

  private generateImpl(code: CodeMaker): void {
    code.line();
    this.properties.forEach((property) => property.emitMethod(code));
    code.line();
  }
}

// StructProperty encapsulates logic for public properties on the concrete struct
export class StructProperty {
  public readonly name: string;
  public readonly getter: string;
  public readonly references?: GoTypeRef;

  public constructor(
    public readonly parent: Struct,
    public readonly property: Property,
  ) {
    if (property.type) {
      this.references = new GoTypeRef(parent.parent.root, property.type);
    }

    this.name = toPascalCase(this.property.name);
    this.getter = `Get${this.name}`;
  }

  public emitProperty(code: CodeMaker) {
    code.line(`${this.name} ${this.returnType}`); // TODO figure out gofmt for indentation?
  }

  public emitGetter(code: CodeMaker) {
    code.line(`${this.getter}() ${this.returnType}`);
  }

  public emitMethod(code: CodeMaker) {
    const receiver = this.parent.name;
    const instanceArg = receiver.substring(0, 1).toLowerCase();

    code.openBlock(
      `func (${instanceArg} ${receiver}) ${
        this.getter
      }()${` ${this.returnType}`}`,
    );
    code.line(`return ${instanceArg}.${this.name}`);
    code.closeBlock();
    code.line();
  }

  public get returnType(): string {
    return (
      this.references?.scopedName(this.parent.parent) ??
      this.property.type.toString()
    );
  }
}
