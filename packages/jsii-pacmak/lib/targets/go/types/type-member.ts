import {
  Callable,
  MemberKind,
  Method,
  Parameter,
  Property,
  TypeReference,
} from 'jsii-reflect';
import { ApiLocation } from 'jsii-rosetta';

import { jsiiToPascalCase } from '../../../naming-util';
import { SpecialDependencies } from '../dependencies';
import { EmitContext } from '../emit-context';
import { Package } from '../package';
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
  public readonly immutable: boolean;
  protected readonly apiLocation: ApiLocation;

  public constructor(
    public parent: GoType,
    public readonly property: Property,
  ) {
    this.name = jsiiToPascalCase(this.property.name);
    this.immutable = property.immutable;
    this.apiLocation = {
      api: 'member',
      fqn: this.parent.fqn,
      memberName: this.property.name,
    };
  }

  public get reference(): GoTypeRef {
    return new GoTypeRef(this.parent.pkg.root, this.property.type);
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
    documenter.emit(this.property.docs, this.apiLocation);
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

  public emitGetterDecl({ code, documenter }: EmitContext) {
    documenter.emit(this.property.docs, this.apiLocation);
    code.line(`${this.name}() ${this.returnType}`);
  }

  public emitGetter({ code }: EmitContext): void {
    const receiver = this.parent.name;
    const instanceArg = receiver.substring(0, 1).toLowerCase();

    code.openBlock(
      `func (${instanceArg} *${receiver}) Get${this.name}() ${this.returnType}`,
    );
    code.line(`return ${instanceArg}.${this.name}`);
    code.closeBlock();
  }

  public emitSetterDecl({ code, documenter }: EmitContext) {
    if (!this.immutable) {
      // For setters, only emit the stability. Copying the documentation from
      // the getter might result in confusing documentation. This is an "okay"
      // middle-ground.
      documenter.emitStability(this.property.docs);
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
  public readonly parameters: GoParameter[];
  protected readonly apiLocation: ApiLocation;

  public constructor(
    public readonly parent: GoClass | GoInterface,
    public readonly method: Callable,
  ) {
    this.name = jsiiToPascalCase(method.name);
    this.parameters = this.method.parameters.map(
      (param) => new GoParameter(parent, param),
    );

    this.apiLocation =
      method.kind === MemberKind.Initializer
        ? { api: 'initializer', fqn: parent.fqn }
        : { api: 'member', fqn: parent.fqn, memberName: method.name };
  }

  public abstract emit(context: EmitContext): void;

  public abstract get specialDependencies(): SpecialDependencies;

  public get reference(): GoTypeRef | undefined {
    if (Method.isMethod(this.method) && this.method.returns.type) {
      return new GoTypeRef(this.parent.pkg.root, this.method.returns.type);
    }
    return undefined;
  }

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
  public readonly isVariadic: boolean;
  private readonly type: TypeReference;
  private readonly pkg: Package;

  public constructor(parent: GoClass | GoInterface, parameter: Parameter) {
    this.name = substituteReservedWords(parameter.name);
    this.isVariadic = parameter.variadic;
    this.type = parameter.type;
    this.pkg = parent.pkg;
  }

  public get reference(): GoTypeRef {
    return new GoTypeRef(this.pkg.root, this.type);
  }

  public toString(): string {
    const paramType = this.reference.scopedReference(this.pkg);
    return `${this.name} ${this.isVariadic ? '...' : ''}${paramType}`;
  }
}
