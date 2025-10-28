import { Method, ClassType, Initializer, Docs } from 'jsii-reflect';

import { jsiiToPascalCase } from '../../../naming-util';
import * as comparators from '../comparators';
import { SpecialDependencies } from '../dependencies';
import { EmitContext } from '../emit-context';
import { Package } from '../package';
import {
  ClassConstructor,
  JSII_RT_ALIAS,
  MethodCall,
  slugify,
} from '../runtime';
import { ParameterValidator } from '../runtime/runtime-type-checking';
import { getMemberDependencies, getParamDependencies } from '../util';
import { GoType } from './go-type';
import { GoTypeRef } from './go-type-reference';
import { GoInterface } from './interface';
import { GoMethod, GoProperty, GoTypeMember } from './type-member';

/*
 * GoClass wraps a Typescript class as a Go custom struct type
 */
export class GoClass extends GoType<ClassType> {
  public readonly methods: ClassMethod[];
  public readonly staticMethods: StaticMethod[];
  public readonly properties: GoProperty[];
  public readonly staticProperties: GoProperty[];

  private _extends?: GoClass | null;
  private _implements?: readonly GoInterface[];

  private readonly initializer?: GoClassConstructor;
  #parameterValidators?: ParameterValidator[];

  public constructor(pkg: Package, type: ClassType) {
    super(pkg, type);

    const methods = new Array<ClassMethod>();
    const staticMethods = new Array<StaticMethod>();
    for (const method of type.allMethods) {
      if (method.static) {
        staticMethods.push(new StaticMethod(this, method));
      } else {
        methods.push(new ClassMethod(this, method));
      }
    }
    // Ensure consistent order, mostly cosmetic.
    this.methods = methods.sort(comparators.byName);
    this.staticMethods = staticMethods.sort(comparators.byName);

    const properties = new Array<GoProperty>();
    const staticProperties = new Array<GoProperty>();
    for (const prop of type.allProperties) {
      if (prop.static) {
        staticProperties.push(new GoProperty(this, prop));
      } else {
        properties.push(new GoProperty(this, prop));
      }
    }
    // Ensure consistent order, mostly cosmetic.
    this.properties = properties.sort(comparators.byName);
    this.staticProperties = staticProperties.sort(comparators.byName);

    if (type.initializer) {
      this.initializer = new GoClassConstructor(this, type.initializer);
    }
  }

  public get parameterValidators(): readonly ParameterValidator[] {
    if (this.#parameterValidators === undefined) {
      this.#parameterValidators = [
        ...this.methods.map((m) => m.validator!).filter((v) => v != null),
        ...this.staticMethods.map((m) => m.validator!).filter((v) => v != null),
        ...this.properties.map((m) => m.validator!).filter((v) => v != null),
        ...this.staticProperties
          .map((m) => m.validator!)
          .filter((v) => v != null),
        ...(this.initializer?.validator ? [this.initializer.validator] : []),
      ];
    }
    return this.#parameterValidators;
  }

  public get extends(): GoClass | undefined {
    // Cannot compute in constructor, as dependencies may not have finished
    // resolving just yet.
    if (this._extends === undefined) {
      this._extends = this.type.base
        ? (this.pkg.root.findType(this.type.base.fqn) as GoClass)
        : null;
    }
    return this._extends ?? undefined;
  }

  public get implements(): readonly GoInterface[] {
    // Cannot compute in constructor, as dependencies may not have finished
    // resolving just yet.
    this._implements ??= this.type.interfaces
      .map((iface) => this.pkg.root.findType(iface.fqn) as GoInterface)
      // Ensure consistent order, mostly cosmetic.
      .sort((l, r) => l.fqn.localeCompare(r.fqn));
    return this._implements;
  }

  public get baseTypes(): ReadonlyArray<GoClass | GoInterface> {
    return [...(this.extends ? [this.extends] : []), ...this.implements];
  }

  public emit(context: EmitContext): void {
    this.emitInterface(context);
    this.emitStruct(context);
    this.emitGetters(context);

    if (this.initializer) {
      this.initializer.emit(context);
    }

    this.emitSetters(context);

    for (const method of this.staticMethods) {
      method.emit(context);
    }

    for (const prop of this.staticProperties) {
      prop.emitGetterProxy(context);
      prop.emitSetterProxy(context);
    }

    for (const method of this.methods) {
      method.emit(context);
    }
  }

  public emitRegistration({ code }: EmitContext): void {
    code.open(`${JSII_RT_ALIAS}.RegisterClass(`);
    code.line(`"${this.fqn}",`);
    code.line(`reflect.TypeOf((*${this.name})(nil)).Elem(),`);

    const allMembers = [
      ...this.type.allMethods
        .filter((method) => !method.static)
        .map((method) => new ClassMethod(this, method)),
      ...this.type.allProperties
        .filter((property) => !property.static)
        .map((property) => new GoProperty(this, property)),
    ].sort(comparators.byName);
    if (allMembers.length === 0) {
      code.line('nil, // no members');
    } else {
      code.open(`[]${JSII_RT_ALIAS}.Member{`);
      for (const member of allMembers) {
        code.line(`${member.override},`);
      }
      code.close('},');
    }

    this.emitProxyMakerFunction(code, this.baseTypes);
    code.close(')');
  }

  public get members(): GoTypeMember[] {
    return [
      ...(this.initializer ? [this.initializer] : []),
      ...this.methods,
      ...this.properties,
      ...this.staticMethods,
      ...this.staticProperties,
    ];
  }

  public get specialDependencies(): SpecialDependencies {
    return {
      fmt: false,
      init:
        this.initializer != null ||
        this.members.some((m) => m.specialDependencies.init),
      internal: this.baseTypes.some((base) => this.pkg.isExternalType(base)),
      runtime: this.initializer != null || this.members.length > 0,
      time:
        !!this.initializer?.specialDependencies.time ||
        this.members.some((m) => m.specialDependencies.time),
    };
  }

  protected emitInterface(context: EmitContext): void {
    const { code, documenter } = context;
    documenter.emit(this.type.docs, this.apiLocation);
    code.openBlock(`type ${this.name} interface`);

    // embed extended interfaces
    if (this.extends) {
      code.line(
        new GoTypeRef(this.pkg.root, this.extends.type.reference).scopedName(
          this.pkg,
        ),
      );
    }
    for (const iface of this.implements) {
      code.line(
        new GoTypeRef(this.pkg.root, iface.type.reference).scopedName(this.pkg),
      );
    }

    for (const property of this.properties) {
      property.emitGetterDecl(context);
      property.emitSetterDecl(context);
    }

    for (const method of this.methods) {
      method.emitDecl(context);
    }

    code.closeBlock();
    code.line();
  }

  private emitGetters(context: EmitContext) {
    if (this.properties.length === 0) {
      return;
    }
    for (const property of this.properties) {
      property.emitGetterProxy(context);
    }
    context.code.line();
  }

  private emitStruct({ code }: EmitContext): void {
    code.line(`// The jsii proxy struct for ${this.name}`);
    code.openBlock(`type ${this.proxyName} struct`);

    // Make sure this is not 0-width
    if (this.baseTypes.length === 0) {
      code.line('_ byte // padding');
    } else {
      for (const base of this.baseTypes) {
        code.line(this.pkg.resolveEmbeddedType(base).embed);
      }
    }

    code.closeBlock();
    code.line();
  }

  // emits the implementation of the setters for the struct
  private emitSetters(context: EmitContext): void {
    for (const property of this.properties) {
      property.emitSetterProxy(context);
    }
  }

  public get dependencies(): Package[] {
    // need to add dependencies of method arguments and constructor arguments
    return [
      ...this.baseTypes.map((ref) => ref.pkg),
      ...getMemberDependencies(this.members),
      ...getParamDependencies(this.members.filter(isGoMethod)),
    ];
  }

  /*
   * Get fqns of interfaces the class implements
   */
  public get interfaces(): string[] {
    return this.type.interfaces.map((iFace) => iFace.fqn);
  }
}

export class GoClassConstructor extends GoMethod {
  private readonly constructorRuntimeCall: ClassConstructor;
  #validator: ParameterValidator | undefined | null = null;

  public constructor(
    public readonly parent: GoClass,
    private readonly type: Initializer,
  ) {
    super(parent, type);
    this.constructorRuntimeCall = new ClassConstructor(this);
  }

  public get validator() {
    if (this.#validator === null) {
      this.#validator = ParameterValidator.forConstructor(this);
    }
    return this.#validator;
  }

  public get specialDependencies(): SpecialDependencies {
    return {
      fmt: false,
      init: true,
      internal: false,
      runtime: true,
      time: this.parameters.some((p) => p.reference.specialDependencies.time),
    };
  }

  public emit(context: EmitContext) {
    // Abstract classes cannot be directly created
    if (!this.parent.type.abstract) {
      this.emitNew(context);
    }
    // Subclassable classes (the default) get an _Overrides constructor
    if (this.parent.type.spec.docs?.subclassable ?? true) {
      this.emitOverride(context);
    }
  }

  private emitNew(context: EmitContext) {
    const { code, documenter } = context;

    const constr = `New${this.parent.name}`;
    const paramString =
      this.parameters.length === 0
        ? ''
        : this.parameters.map((p) => p.toString()).join(', ');

    documenter.emit(this.type.docs, this.apiLocation);
    code.openBlock(`func ${constr}(${paramString}) ${this.parent.name}`);
    this.constructorRuntimeCall.emit(context);
    code.closeBlock();

    code.line();
  }

  private emitOverride({ code, documenter }: EmitContext) {
    const constr = `New${this.parent.name}_Override`;
    const params = this.parameters.map((p) => p.toString());

    const instanceVar = slugify(this.parent.name[0].toLowerCase(), params);
    params.unshift(`${instanceVar} ${this.parent.name}`);

    documenter.emit(this.type.docs, this.apiLocation);
    code.openBlock(`func ${constr}(${params.join(', ')})`);
    this.constructorRuntimeCall.emitOverride(code, instanceVar);
    code.closeBlock();
    code.line();
  }
}

export class ClassMethod extends GoMethod {
  public readonly runtimeCall: MethodCall;

  public constructor(
    public readonly parent: GoClass,
    public readonly method: Method,
  ) {
    super(parent, method);
    this.runtimeCall = new MethodCall(this);
  }

  /* emit generates method implementation on the class */
  public emit(context: EmitContext) {
    const name = this.name;
    const returnTypeString = this.reference?.void ? '' : ` ${this.returnType}`;
    const { code } = context;

    code.openBlock(
      `func (${this.instanceArg} *${
        this.parent.proxyName
      }) ${name}(${this.paramString()})${returnTypeString}`,
    );

    this.runtimeCall.emit(context);

    code.closeBlock();
    code.line();
  }

  /* emitDecl generates method declaration in the class interface */
  public emitDecl({ code, documenter }: EmitContext) {
    const returnTypeString = this.reference?.void ? '' : ` ${this.returnType}`;
    documenter.emit(this.method.docs, this.apiLocation);
    // Document the actual return type
    if (this.returnTypeForDocs !== this.returnType) {
      documenter.emit(
        new Docs(this.method.system, this.method, {
          summary: `Returns \`${this.returnTypeForDocs}\`, use interface conversion if needed`,
        }),
        this.apiLocation,
      );
    }
    code.line(`${this.name}(${this.paramString()})${returnTypeString}`);
  }

  private get returnTypeForDocs(): string {
    if (Method.isMethod(this.method) && this.method.returns.type) {
      return new GoTypeRef(
        this.parent.pkg.root,
        this.method.returns.type,
      ).scopedReference(this.parent.pkg);
    }
    return this.method.toString();
  }

  public get instanceArg(): string {
    return this.parent.name.substring(0, 1).toLowerCase();
  }

  public get static(): boolean {
    return !!this.method.spec.static;
  }

  public get specialDependencies(): SpecialDependencies {
    return {
      fmt: false,
      init: this.method.static,
      internal: false,
      runtime: true,
      time:
        !!this.parameters.some((p) => p.reference.specialDependencies.time) ||
        !!this.reference?.specialDependencies.time,
    };
  }
}

export class StaticMethod extends ClassMethod {
  public readonly name: string;

  public constructor(
    public readonly parent: GoClass,
    public readonly method: Method,
  ) {
    super(parent, method);

    this.name = `${this.parent.name}_${jsiiToPascalCase(method.name)}`;
  }

  public emit(context: EmitContext) {
    const returnTypeString = this.reference?.void ? '' : ` ${this.returnType}`;
    const { code, documenter } = context;

    documenter.emit(this.method.docs, this.apiLocation);
    code.openBlock(
      `func ${this.name}(${this.paramString()})${returnTypeString}`,
    );

    this.runtimeCall.emit(context);

    code.closeBlock();
    code.line();
  }
}

function isGoMethod(m: GoTypeMember): m is GoMethod {
  return m instanceof GoMethod;
}
