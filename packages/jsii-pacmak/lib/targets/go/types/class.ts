import { CodeMaker } from 'codemaker';
import { Method, ClassType, Initializer } from 'jsii-reflect';

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
  StaticGetProperty,
  StaticSetProperty,
} from '../runtime';
import { getMemberDependencies, getParamDependencies } from '../util';
import { GoType } from './go-type';
import { GoTypeRef } from './go-type-reference';
import { GoInterface } from './interface';
import { GoMethod, GoProperty, GoTypeMember } from './type-member';

/*
 * GoClass wraps a Typescript class as a Go custom struct type
 */
export class GoClass extends GoType {
  public readonly methods: ClassMethod[];
  public readonly staticMethods: StaticMethod[];
  public readonly properties: GoProperty[];
  public readonly staticProperties: GoProperty[];

  private _extends?: GoClass | null;
  private _implements?: readonly GoInterface[];

  private readonly initializer?: GoClassConstructor;

  public constructor(pkg: Package, public type: ClassType) {
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

  public get extends(): GoClass | undefined {
    // Cannot compute in constructor, as dependencies may not have finished
    // resolving just yet.
    if (this._extends === undefined) {
      this._extends = this.type.base
        ? (this.pkg.root.findType(this.type.base.fqn) as GoClass)
        : null;
    }
    return this._extends == null ? undefined : this._extends;
  }

  public get implements(): readonly GoInterface[] {
    // Cannot compute in constructor, as dependencies may not have finished
    // resolving just yet.
    if (this._implements === undefined) {
      this._implements = this.type.interfaces
        .map((iface) => this.pkg.root.findType(iface.fqn) as GoInterface)
        // Ensure consistent order, mostly cosmetic.
        .sort((l, r) => l.fqn.localeCompare(r.fqn));
    }
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
      this.emitStaticProperty(context, prop);
    }

    for (const method of this.methods) {
      method.emit(context);
    }
  }

  public emitRegistration(code: CodeMaker): void {
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
      runtime: this.initializer != null || this.members.length > 0,
      init:
        this.initializer != null ||
        this.members.some((m) => m.specialDependencies.init),
      internal: this.baseTypes.some((base) => this.pkg.isExternalType(base)),
      time:
        !!this.initializer?.specialDependencies.time ||
        this.members.some((m) => m.specialDependencies.time),
    };
  }

  protected emitInterface(context: EmitContext): void {
    const { code, documenter } = context;
    documenter.emit(this.type.docs);
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

  private emitStaticProperty({ code }: EmitContext, prop: GoProperty): void {
    const getCaller = new StaticGetProperty(prop);

    const propertyName = jsiiToPascalCase(prop.name);
    const name = `${this.name}_${propertyName}`;

    code.openBlock(`func ${name}() ${prop.returnType}`);
    getCaller.emit(code);

    code.closeBlock();
    code.line();

    if (!prop.immutable) {
      const setCaller = new StaticSetProperty(prop);
      const name = `${this.name}_Set${propertyName}`;
      code.openBlock(`func ${name}(val ${prop.returnType})`);
      setCaller.emit(code);

      code.closeBlock();
      code.line();
    }
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

  public constructor(
    public readonly parent: GoClass,
    private readonly type: Initializer,
  ) {
    super(parent, type);
    this.constructorRuntimeCall = new ClassConstructor(this);
  }

  public get specialDependencies(): SpecialDependencies {
    return {
      runtime: true,
      init: true,
      internal: false,
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

  private emitNew({ code, documenter }: EmitContext) {
    const constr = `New${this.parent.name}`;
    const paramString =
      this.parameters.length === 0
        ? ''
        : this.parameters.map((p) => p.toString()).join(', ');

    documenter.emit(this.type.docs);
    code.openBlock(`func ${constr}(${paramString}) ${this.parent.name}`);
    this.constructorRuntimeCall.emit(code);
    code.closeBlock();

    code.line();
  }

  private emitOverride({ code, documenter }: EmitContext) {
    const constr = `New${this.parent.name}_Override`;
    const params = this.parameters.map((p) => p.toString());

    const instanceVar = slugify(this.parent.name[0].toLowerCase(), params);
    params.unshift(`${instanceVar} ${this.parent.name}`);

    documenter.emit(this.type.docs);
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
  public emit({ code, documenter }: EmitContext) {
    const name = this.name;
    const returnTypeString = this.reference?.void ? '' : ` ${this.returnType}`;

    documenter.emit(this.method.docs);
    code.openBlock(
      `func (${this.instanceArg} *${
        this.parent.proxyName
      }) ${name}(${this.paramString()})${returnTypeString}`,
    );

    this.runtimeCall.emit(code);

    code.closeBlock();
    code.line();
  }

  /* emitDecl generates method declaration in the class interface */
  public emitDecl(context: EmitContext) {
    const { code } = context;
    const returnTypeString = this.reference?.void ? '' : ` ${this.returnType}`;
    code.line(`${this.name}(${this.paramString()})${returnTypeString}`);
  }

  public get instanceArg(): string {
    return this.parent.name.substring(0, 1).toLowerCase();
  }

  public get specialDependencies(): SpecialDependencies {
    return {
      runtime: true,
      init: this.method.static,
      internal: false,
      time:
        !!this.parameters.some((p) => p.reference.specialDependencies.time) ||
        !!this.reference?.specialDependencies.time,
    };
  }
}

export class StaticMethod extends ClassMethod {
  public constructor(
    public readonly parent: GoClass,
    public readonly method: Method,
  ) {
    super(parent, method);
  }

  public emit({ code, documenter }: EmitContext) {
    const name = `${this.parent.name}_${this.name}`;
    const returnTypeString = this.reference?.void ? '' : ` ${this.returnType}`;

    documenter.emit(this.method.docs);
    code.openBlock(`func ${name}(${this.paramString()})${returnTypeString}`);

    this.runtimeCall.emit(code);

    code.closeBlock();
    code.line();
  }
}

function isGoMethod(m: GoTypeMember): m is GoMethod {
  return m instanceof GoMethod;
}
