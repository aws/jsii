import { GoType } from './go-type';
import { TypeMapper } from './interface'; // TODO replace with GoTypeRef
import { InterfaceType, Property } from 'jsii-reflect';
import { CodeMaker, toPascalCase } from 'codemaker';

// JSII datatype interfaces, aka structs
export class Struct extends GoType {
  public readonly properties: StructProperty[];

  public constructor(public type: InterfaceType) {
    super(type);

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
    code.openBlock(`type ${this.localName} interface`);

    this.properties.forEach((property) => property.emitGetter(code));

    code.closeBlock();
    code.line();
  }

  private generateStruct(code: CodeMaker): void {
    code.openBlock(`type ${this.localName} struct`);

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
  public readonly returnType: string;

  public constructor(
    public readonly parent: Struct,
    public readonly property: Property,
  ) {
    this.name = toPascalCase(this.property.name);
    this.getter = `Get${this.name}`;
    const returnType = new TypeMapper(property.type).mapType(); // TODO replace with GoTypeRef
    this.returnType = returnType;
  }

  public emitProperty(code: CodeMaker) {
    code.line(`${this.name} ${this.returnType}`); // TODO figure out gofmt for indentation?
  }

  public emitGetter(code: CodeMaker) {
    code.line(`${this.getter}() ${this.returnType}`);
  }

  public emitMethod(code: CodeMaker) {
    const receiver = this.parent.localName;
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
}
