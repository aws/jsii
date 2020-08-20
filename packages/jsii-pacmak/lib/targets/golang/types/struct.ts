import { GoProperty, GoType, GoEmitter } from './go-type';
import { Package } from '../package';
import { InterfaceType } from 'jsii-reflect';
import { CodeMaker } from 'codemaker';
import { getFieldDependencies } from '../util';

// String appended to all go Struct Interfaces
const STRUCT_INTERFACE_SUFFIX = 'Iface';

/*
 * Struct wraps a JSII datatype interface aka, structs
 */
export class Struct extends GoType implements GoEmitter {
  public readonly properties: GoProperty[];
  public readonly interfaceName: string;

  public constructor(parent: Package, public type: InterfaceType) {
    super(parent, type);

    this.properties = Object.values(this.type.getProperties()).map(
      (prop) => new GoProperty(this, prop),
    );

    this.interfaceName = `${this.name}${STRUCT_INTERFACE_SUFFIX}`;

    // TODO check if datatype? (isDataType() on jsii-reflect seems wrong)
  }

  // needs to generate both a Go interface and a struct, as well as the methods on the struct
  public emit(code: CodeMaker): void {
    this.emitInterface(code);
    this.emitStruct(code);
    this.generateImpl(code);
  }

  private emitInterface(code: CodeMaker): void {
    code.openBlock(`type ${this.interfaceName} interface`);

    for (const property of this.properties) {
      property.emitGetter(code);
    }

    code.closeBlock();
    code.line();
  }

  private emitStruct(code: CodeMaker): void {
    code.openBlock(`type ${this.name} struct`);

    for (const property of this.properties) {
      property.emitProperty(code);
    }

    code.closeBlock();
    code.line();
  }

  private generateImpl(code: CodeMaker): void {
    code.line();

    for (const property of this.properties) {
      property.emitMethod(code);
    }

    code.line();
  }

  public get dependencies(): Package[] {
    return [...getFieldDependencies(this.properties)];
  }
}
