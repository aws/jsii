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

  public get returnType(): string {
    return (
      this.references?.scopedName(this.parent.parent) ??
      this.property.type.toString()
    );
  }

  public emitStructMember(code: CodeMaker) {
    // If struct property is type of parent struct, use a pointer as type to avoid recursive struct type error
    if (this.references?.type?.name === this.parent.name) {
      code.line(`${this.name} *${this.returnType}`);
    } else {
      code.line(`${this.name} ${this.returnType}`);
    }
  }

  public emitGetterDecl(code: CodeMaker) {
    code.line(`${this.getter}() ${this.returnType}`);
  }

  public emitSetterDecl(code: CodeMaker) {
    if (!this.property.protected) {
      code.line(`Set${this.name}()`);
    }
  }

  // TODO use pointer receiver?
  // Emits getter methods on the struct for each property
  public emitGetterImpl(code: CodeMaker) {
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

  public emitSetterImpl(code: CodeMaker) {
    const receiver = this.parent.name;
    const instanceArg = receiver.substring(0, 1).toLowerCase();

    code.openBlock(
      `func (${instanceArg} ${receiver}) Set${this.name}(val ${this.returnType})`,
    );
    code.line(`${instanceArg}.${this.name} = val`);
    code.closeBlock();
    code.line();
  }
}

export abstract class GoStruct extends GoType implements GoEmitter {
  public readonly properties: GoProperty[];
  public readonly interfaceName: string;

  public constructor(parent: Package, public type: ClassType | InterfaceType) {
    super(parent, type);

    // Flatten any inherited properties on the struct
    this.properties = Object.values(this.type.getProperties(true)).map(
      (prop) => new GoProperty(this, prop),
    );

    this.interfaceName = `${this.name}${STRUCT_INTERFACE_SUFFIX}`;
  }

  // `emit` needs to generate both a Go interface and a struct, as well as the Getter methods on the struct
  public emit(code: CodeMaker): void {
    this.emitInterface(code);
    this.emitStruct(code);
    this.emitGetters(code);
  }

  protected emitInterface(code: CodeMaker): void {
    code.line('// Struct interface'); // FIXME for debugging
    code.openBlock(`type ${this.interfaceName} interface`);

    const extended = this.type.getInterfaces(true);

    // embed extended interfaces
    if (extended.length !== 0) {
      for (const iface of extended) {
        code.line(iface.fqn);
      }
    }

    for (const property of this.properties) {
      property.emitGetterDecl(code);
    }

    code.closeBlock();
    code.line();
  }

  private emitStruct(code: CodeMaker): void {
    code.line('// Struct proxy'); // FIXME for debugging
    code.openBlock(`type ${this.name} struct`);

    for (const property of this.properties) {
      property.emitStructMember(code);
    }

    code.closeBlock();
    code.line();
  }

  // emits the implementation of the getters for the struct
  private emitGetters(code: CodeMaker): void {
    if (this.properties.length !== 0) {
      for (const property of this.properties) {
        property.emitGetterImpl(code);
      }

      code.line();
    }
  }

  public get dependencies(): Package[] {
    return [...getFieldDependencies(this.properties)];
  }
}
