import { GoType } from './go-type';
import { TypeMapper } from './interface'; // TODO replace with GoTypeRef
import { InterfaceType, Property } from 'jsii-reflect';
import { CodeMaker } from 'codemaker';

// JSII datatype interfaces, aka structs
export class Struct extends GoType {
  public readonly properties: StructProperty[];

  public constructor(public type: InterfaceType) {
    super(type);

    // TODO check if datatype? (isDataType() on jsii-reflect seems wrong)
    this.properties = Object.values(this.type.getProperties()).map(
      (prop) => new StructProperty(prop),
    );
  }

  // needs to generate both a Go interface and a struct
  public emit(code: CodeMaker): void {
    this.generateInterface(code);
    this.generateStruct(code);
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
}

// StructProperty encapsulates logic for public properties on the concrete struct
export class StructProperty {
  public readonly name: string;
  public readonly returnType: string;

  public constructor(public readonly property: Property) {
    this.name = this.property.name;
    const returnType = new TypeMapper(property.type).mapType(); // TODO replace with GoTypeRef
    this.returnType = returnType;
  }

  public emitProperty(code: CodeMaker) {
    const propName = code.toPascalCase(this.name);
    code.line(`${propName} ${this.returnType}`); // TODO figure out gofmt for indentation?
  }

  public emitGetter(code: CodeMaker) {
    const propName = code.toPascalCase(this.name);
    code.line(`Get${propName}() ${this.returnType}`);
  }
}
