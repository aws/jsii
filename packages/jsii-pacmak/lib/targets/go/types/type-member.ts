import { Callable, Method, Parameter, Property } from 'jsii-reflect';

import { jsiiToPascalCase } from '../../../naming-util';
import { SpecialDependencies } from '../dependencies';
import { EmitContext } from '../emit-context';
import { GetProperty, JSII_RT_ALIAS, SetProperty } from '../runtime';
import { substituteReservedWords } from '../util';

import { GoClass, GoType, GoInterface, GoTypeRef } from './index';

/*
 * Structure for Class and Interface methods. Useful for sharing logic for dependency resolution
 */
export interface GoTypeMember {
  name: string;
  parent: GoType;
  reference?: GoTypeRef;
  returnType: string;

  specialDependencies: SpecialDependencies;
}

/*
 * GoProperty encapsulates logic for public properties on a concrete struct, which could represent
 either a JSII class proxy or datatype interface proxy
*/
export class GoProperty implements GoTypeMember {
  public readonly name: string;
  public readonly reference?: GoTypeRef;
  public readonly immutable: boolean;

  public constructor(
    public parent: GoType,
    public readonly property: Property,
  ) {
    this.name = jsiiToPascalCase(this.property.name);
    this.immutable = property.immutable;

    if (property.type) {
      this.reference = new GoTypeRef(parent.pkg.root, property.type);
    }
  }

  public get specialDependencies(): SpecialDependencies {
    return {
      runtime: true,
      init: this.static,
      internal: false,
      time: !!this.reference?.specialDependencies.time,
    };
  }

  public get static(): boolean {
    return !!this.property.static;
  }

  public get returnType(): string {
    return (
      this.reference?.scopedReference(this.parent.pkg) ??
      this.property.type.toString()
    );
  }

  public get instanceArg(): string {
    return this.parent.proxyName.substring(0, 1).toLowerCase();
  }

  public get override(): string {
    return `${JSII_RT_ALIAS}.MemberProperty{JsiiProperty: "${this.property.name}", GoGetter: "${this.name}"}`;
  }

  public emitStructMember({ code, documenter }: EmitContext) {
    documenter.emit(this.property.docs);
    const memberType =
      this.reference?.type?.name === this.parent.name
        ? `*${this.returnType}`
        : this.returnType;

    // Adds json and yaml tags for easy deserialization
    code.line(
      `${this.name} ${memberType} \`json:"${this.property.name}" yaml:"${this.property.name}"\``,
    );
    // TODO add newline if not the last member
  }

  public emitGetterDecl(context: EmitContext) {
    const { code } = context;
    code.line(`${this.name}() ${this.returnType}`);
  }

  public emitGetter({ code, documenter }: EmitContext): void {
    const receiver = this.parent.name;
    const instanceArg = receiver.substring(0, 1).toLowerCase();

    documenter.emit(this.property.docs);
    code.openBlock(
      `func (${instanceArg} *${receiver}) Get${this.name}() ${this.returnType}`,
    );
    code.line(`return ${instanceArg}.${this.name}`);
    code.closeBlock();
  }

  public emitSetterDecl(context: EmitContext) {
    const { code } = context;
    if (!this.immutable) {
      code.line(`Set${this.name}(val ${this.returnType})`);
    }
  }

  // Emits getter methods on the struct for each property
  public emitGetterProxy(context: EmitContext) {
    const { code } = context;
    const receiver = this.parent.proxyName;
    const instanceArg = receiver.substring(0, 1).toLowerCase();

    code.openBlock(
      `func (${instanceArg} *${receiver}) ${this.name}() ${this.returnType}`,
    );

    new GetProperty(this).emit(code);

    code.closeBlock();
    code.line();
  }

  public emitSetterProxy(context: EmitContext) {
    if (!this.immutable) {
      const { code } = context;
      const receiver = this.parent.proxyName;
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
    public readonly parent: GoClass | GoInterface,
    public readonly method: Callable,
  ) {
    this.name = jsiiToPascalCase(method.name);
    if (Method.isMethod(method) && method.returns.type) {
      this.reference = new GoTypeRef(parent.pkg.root, method.returns.type);
    }
    this.parameters = this.method.parameters.map(
      (param) => new GoParameter(parent, param),
    );
  }

  public abstract emit(context: EmitContext): void;

  public abstract get specialDependencies(): SpecialDependencies;

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
      this.reference?.scopedReference(this.parent.pkg) ?? this.method.toString()
    );
  }

  public get instanceArg(): string {
    return this.parent.name.substring(0, 1).toLowerCase();
  }

  public get override(): string {
    return `${JSII_RT_ALIAS}.MemberMethod{JsiiMethod: "${this.method.name}", GoMethod: "${this.name}"}`;
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
    public parent: GoClass | GoInterface,
    public readonly parameter: Parameter,
  ) {
    this.name = substituteReservedWords(parameter.name);
    this.reference = new GoTypeRef(parent.pkg.root, parameter.type);
  }

  public toString(): string {
    const paramType = this.reference.scopedReference(this.parent.pkg);
    return `${this.name} ${this.parameter.variadic ? '...' : ''}${paramType}`;
  }
}
