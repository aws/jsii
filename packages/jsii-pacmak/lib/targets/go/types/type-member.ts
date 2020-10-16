import { toPascalCase } from 'codemaker';
import { Method, Parameter, Property } from 'jsii-reflect';

import { EmitContext } from '../emit-context';
import { emitInitialization } from '../runtime';
import { substituteReservedWords } from '../util';

import { GoClass, GoStruct, Interface, Struct, GoTypeRef } from './index';

/*
 * Structure for Class and Interface methods. Useful for sharing logic for dependency resolution
 */
export interface GoTypeMember {
  name: string;
  parent: GoClass | Interface | Struct;
  reference?: GoTypeRef;
  returnType: string;
}

/*
 * GoProperty encapsulates logic for public properties on a concrete struct, which could represent
 either a JSII class proxy or datatype interface proxy
*/
export class GoProperty implements GoTypeMember {
  public readonly name: string;
  public readonly getter: string;
  public readonly reference?: GoTypeRef;

  public constructor(
    public parent: GoStruct,
    public readonly property: Property,
  ) {
    this.name = toPascalCase(this.property.name);
    this.getter = `Get${this.name}`;

    if (property.type) {
      this.reference = new GoTypeRef(parent.pkg.root, property.type);
    }
  }

  public get returnType(): string {
    return (
      this.reference?.scopedName(this.parent.pkg) ??
      this.property.type.toString()
    );
  }

  public emitStructMember(context: EmitContext) {
    const docs = this.property.docs;
    if (docs) {
      context.documenter.emit(docs);
    }
    const { code } = context;
    // If struct property is type of parent struct, use a pointer as type to avoid recursive struct type error
    if (this.reference?.type?.name === this.parent.name) {
      code.line(`${this.name} *${this.returnType}`);
    } else {
      code.line(`${this.name} ${this.returnType}`);
    }
    // TODO add newline if not the last member
  }

  public emitGetterDecl(context: EmitContext) {
    const { code } = context;
    code.line(`${this.getter}() ${this.returnType}`);
  }

  public emitSetterDecl(context: EmitContext) {
    const { code } = context;
    if (!this.property.protected) {
      code.line(`Set${this.name}(val ${this.returnType})`);
    }
  }

  // Emits getter methods on the struct for each property
  public emitGetterImpl(context: EmitContext) {
    const { code } = context;
    const receiver = this.parent.name;
    const instanceArg = receiver.substring(0, 1).toLowerCase();

    code.openBlock(
      `func (${instanceArg} *${receiver}) ${
        this.getter
      }()${` ${this.returnType}`}`,
    );

    if (this.property.static) {
      emitInitialization(code);
    }

    if (this.parent.name === this.returnType) {
      code.line(`return *${instanceArg}.${this.name}`);
    } else {
      code.line(`return ${instanceArg}.${this.name}`);
    }
    code.closeBlock();
    code.line();
  }

  public emitSetterImpl(context: EmitContext) {
    const { code } = context;
    const receiver = this.parent.name;
    const instanceArg = receiver.substring(0, 1).toLowerCase();

    code.openBlock(
      `func (${instanceArg} *${receiver}) Set${this.name}(val ${this.returnType})`,
    );

    if (this.property.static) {
      emitInitialization(code);
    }

    if (this.parent.name === this.returnType) {
      code.line(`${instanceArg}.${this.name} = &val`);
    } else {
      code.line(`${instanceArg}.${this.name} = val`);
    }
    code.closeBlock();
    code.line();
  }
}

export abstract class GoMethod implements GoTypeMember {
  public readonly name: string;
  public readonly reference?: GoTypeRef;
  public readonly parameters: GoParameter[];

  public constructor(
    public readonly parent: GoClass | Interface,
    public readonly method: Method,
  ) {
    this.name = toPascalCase(method.name);

    if (method.returns.type) {
      this.reference = new GoTypeRef(parent.pkg.root, method.returns.type);
    }
    this.parameters = Object.values(this.method.parameters).map(
      (param) => new GoParameter(parent, param),
    );
  }

  public abstract emit(context: EmitContext): void;

  public get returnType(): string {
    const ret = this.method.returns.type.void
      ? ''
      : this.reference?.scopedName(this.parent.pkg) ?? this.method.toString();
    if (ret !== '') {
      return ` ${ret}`;
    }
    return ret;
  }

  public paramString(): string {
    return this.parameters.length === 0
      ? ''
      : this.parameters.map((p) => p.toString()).join(', ');
  }
}

export class GoParameter {
  public readonly name: string;
  public readonly reference: GoTypeRef;

  public constructor(
    public parent: GoClass | Interface,
    public readonly parameter: Parameter,
  ) {
    this.name = substituteReservedWords(parameter.name);
    this.reference = new GoTypeRef(parent.pkg.root, parameter.type);
  }

  public toString(): string {
    const paramType = this.reference.scopedName(this.parent.pkg);
    return `${this.name} ${paramType}`;
  }
}
