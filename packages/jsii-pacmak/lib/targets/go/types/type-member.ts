import { toPascalCase } from 'codemaker';
import { Method, Parameter, Property } from 'jsii-reflect';

import { EmitContext } from '../emit-context';
import { GetProperty, SetProperty, slugify } from '../runtime';
import { substituteReservedWords } from '../util';

import { GoClass, GoType, Interface, GoTypeRef } from './index';

/*
 * Structure for Class and Interface methods. Useful for sharing logic for dependency resolution
 */
export interface GoTypeMember {
  name: string;
  parent: GoType;
  reference?: GoTypeRef;
  returnType: string;

  usesInitPackage: boolean;
  usesRuntimePackage: boolean;
}

/*
 * GoProperty encapsulates logic for public properties on a concrete struct, which could represent
 either a JSII class proxy or datatype interface proxy
*/
export class GoProperty implements GoTypeMember {
  public readonly name: string;
  public readonly getter: string;
  public readonly reference?: GoTypeRef;
  public readonly immutable: boolean;

  public constructor(
    public parent: GoType,
    public readonly property: Property,
  ) {
    this.name = toPascalCase(this.property.name);
    this.getter = `Get${this.name}`;
    this.immutable = property.immutable;

    if (property.type) {
      this.reference = new GoTypeRef(parent.pkg.root, property.type);
    }
  }

  public get usesInitPackage() {
    return this.static;
  }

  public get usesRuntimePackage() {
    return true;
  }

  public get static(): boolean {
    return !!this.property.static;
  }

  public get returnType(): string {
    return (
      this.reference?.scopedInterfaceName(this.parent.pkg) ??
      this.property.type.toString()
    );
  }

  public get instanceArg(): string {
    return this.parent.name.substring(0, 1).toLowerCase();
  }

  public emitStructMember(context: EmitContext) {
    const docs = this.property.docs;
    if (docs) {
      context.documenter.emit(docs);
    }
    const { code } = context;
    const memberType =
      this.reference?.type?.name === this.parent.name
        ? `*${this.returnType}`
        : this.returnType;

    // Adds json tags for easy deserialization
    code.line(`${this.name} ${memberType} \`json:"${this.property.name}"\``);
    // TODO add newline if not the last member
  }

  public emitGetterDecl(context: EmitContext) {
    const { code } = context;
    code.line(`${this.getter}() ${this.returnType}`);
  }

  public emitSetterDecl(context: EmitContext) {
    const { code } = context;
    if (!this.property.protected && !this.immutable) {
      code.line(`Set${this.name}(val ${this.returnType})`);
    }
  }

  // Emits getter methods on the struct for each property
  public emitGetterImpl(context: EmitContext) {
    const { code } = context;
    const receiver = this.parent.name;
    const instanceArg = receiver.substring(0, 1).toLowerCase();
    const resultVar = slugify('r', [instanceArg]);

    code.openBlock(
      `func (${instanceArg} *${receiver}) ${
        this.getter
      }()${` (${resultVar} ${this.returnType})`}`,
    );

    new GetProperty(this).emit(code, resultVar);

    code.closeBlock();
    code.line();
  }

  public emitSetterImpl(context: EmitContext) {
    if (!this.immutable) {
      const { code } = context;
      const receiver = this.parent.name;
      const instanceArg = receiver.substring(0, 1).toLowerCase();

      code.openBlock(
        `func (${instanceArg} *${receiver}) Set${this.name}(val ${this.returnType})`,
      );

      new SetProperty(this).emit(code);

      code.closeBlock();
      code.line();
    }
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
  public abstract get usesInitPackage(): boolean;
  public abstract get usesRuntimePackage(): boolean;

  public get returnsRef(): boolean {
    if (
      this.reference?.type?.type.isClassType() ||
      this.reference?.type?.type.isInterfaceType()
    ) {
      return true;
    }

    return false;
  }

  public get returnType(): string {
    return (
      this.reference?.scopedInterfaceName(this.parent.pkg) ??
      this.method.toString()
    );
  }

  public get concreteReturnType(): string {
    if (this.returnsRef) {
      return (
        this.reference?.scopedReferenceName(this.parent.pkg) ??
        this.method.toString()
      );
    }

    return (
      this.reference?.scopedInterfaceName(this.parent.pkg) ??
      this.method.toString()
    );
  }

  public get instanceArg(): string {
    return this.parent.name.substring(0, 1).toLowerCase();
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
    const paramType = this.reference.scopedInterfaceName(this.parent.pkg);
    return `${this.name} ${paramType}`;
  }
}
