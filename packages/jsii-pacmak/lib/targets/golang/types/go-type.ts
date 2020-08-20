import { CodeMaker, toPascalCase } from 'codemaker';
import { Property, Type } from 'jsii-reflect';
import { Package } from '../package';
import { GoTypeRef } from './go-type-reference';
import { GoClass, Struct } from './index';
import { TypeField } from './type-field';

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
    public parent: GoClass | Struct,
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
