import { CodeMaker, toPascalCase } from 'codemaker';
import { ClassType, InterfaceType, Property, Type } from 'jsii-reflect';
import { Package } from '../package';
import { GoTypeRef } from './go-type-reference';
import { TypeField } from './type-field';
import { getFieldDependencies } from '../util';

// String appended to all go GoStruct Interfaces
const STRUCT_INTERFACE_SUFFIX = 'Iface';

export interface GoEmitter {
  emit(code: CodeMaker): void;
}

export class GoType {
  public constructor(public parent: Package, public type: Type) {}

  public get name() {
    return this.type.name;
  }

  public get namespace() {
    return this.parent.moduleName;
  }
}

/*
 * GoProperty encapsulates logic for public properties on a concrete struct, which could represent
 either a JSII class proxy or datatype interface proxy
*/
export class GoProperty implements TypeField {
  public readonly name: string;
  public readonly getter: string;
  public readonly references?: GoTypeRef;

  public constructor(
    public parent: GoStruct,
    public readonly property: Property,
  ) {
    this.name = toPascalCase(this.property.name);
    this.getter = `Get${this.name}`;

    if (property.type) {
      this.references = new GoTypeRef(parent.parent.root, property.type);
    }
  }

  public emitProperty(code: CodeMaker) {
    // If struct property is type of parent struct, use a pointer as type to avoid recursive struct type error
    if (this.references?.type?.name === this.parent.name) {
      code.line(`${this.name} *${this.returnType}`);
    } else {
      code.line(`${this.name} ${this.returnType}`);
    }
  }

  public emitGetter(code: CodeMaker) {
    code.line(`${this.getter}() ${this.returnType}`);
  }

  public emitSetter(code: CodeMaker) {
    if (!this.property.protected) {
      code.line(`Set${this.name}()`);
    }
  }

  // TODO use pointer receiver?
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

export abstract class GoStruct extends GoType implements GoEmitter {
  public readonly properties: GoProperty[];
  public readonly interfaceName: string;

  public constructor(parent: Package, public type: ClassType | InterfaceType) {
    super(parent, type);

    this.properties = Object.values(this.type.getProperties()).map(
      (prop) => new GoProperty(this, prop),
    );

    this.interfaceName = `${this.name}${STRUCT_INTERFACE_SUFFIX}`;
  }

  // `emit` needs to generate both a Go interface and a struct, as well as the methods on the struct
  public emit(code: CodeMaker): void {
    this.emitInterface(code);
    this.emitStruct(code);
    this.generateImpl(code);
  }

  protected emitInterface(code: CodeMaker): void {
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

  // generates the implementation of the interface methods for the struct
  private generateImpl(code: CodeMaker): void {
    if (this.properties.length !== 0) {
      code.line();

      for (const property of this.properties) {
        property.emitMethod(code);
      }

      code.line();
    }
  }

  public get dependencies(): Package[] {
    return [...getFieldDependencies(this.properties)];
  }
}
