import { Method, ClassType, Initializer } from 'jsii-reflect';

import { EmitContext } from '../emit-context';
import { Package } from '../package';
import { ClassConstructor, MethodCall } from '../runtime';
import { getFieldDependencies } from '../util';
import { GoStruct } from './go-type';
import { GoParameter, GoMethod } from './type-member';

/*
 * GoClass wraps a Typescript class as a Go custom struct type
 */
export class GoClass extends GoStruct {
  public readonly methods: ClassMethod[] = [];
  public readonly staticMethods: StaticMethod[] = [];

  private readonly initializer?: GoClassConstructor;

  public constructor(pkg: Package, public type: ClassType) {
    super(pkg, type);

    for (const method of Object.values(this.type.getMethods(true))) {
      if (method.static) {
        this.staticMethods.push(new StaticMethod(this, method));
      } else {
        this.methods.push(new ClassMethod(this, method));
      }
    }

    if (this.type.initializer) {
      this.initializer = new GoClassConstructor(this, this.type.initializer);
    }
  }

  public emit(context: EmitContext): void {
    // emits interface, struct proxy, and instance methods
    super.emit(context);

    if (this.initializer) {
      this.initializer.emit(context);
    }

    this.emitSetters(context);

    for (const method of this.staticMethods) {
      method.emit(context);
    }

    for (const method of this.methods) {
      method.emit(context);
    }
  }

  protected emitInterface(context: EmitContext): void {
    const { code } = context;
    code.line('// Class interface'); // FIXME for debugging
    code.openBlock(`type ${this.interfaceName} interface`);

    // embed extended interfaces
    for (const iface of this.extends) {
      code.line(iface.scopedName(this.pkg));
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

  // emits the implementation of the getters for the struct
  private emitSetters(context: EmitContext): void {
    if (this.properties.length !== 0) {
      for (const property of this.properties) {
        property.emitSetterImpl(context);
      }
    }
  }

  public get dependencies(): Package[] {
    // need to add dependencies of method arguments and constructor arguments
    return [...super.dependencies, ...getFieldDependencies(this.methods)];
  }

  /*
   * Get fqns of interfaces the class implements
   */
  public get interfaces(): string[] {
    return this.type.interfaces.map((iFace) => iFace.fqn);
  }
}

export class GoClassConstructor {
  private readonly constructorRuntimeCall: ClassConstructor;
  public readonly parameters: GoParameter[];

  public constructor(
    public readonly parent: GoClass,
    private readonly type: Initializer,
  ) {
    this.constructorRuntimeCall = new ClassConstructor(this);
    this.parameters = Object.values(this.type.parameters).map(
      (param) => new GoParameter(parent, param),
    );
  }

  public emit(context: EmitContext) {
    const { code } = context;
    const constr = `New${this.parent.name}`;
    const paramString =
      this.parameters.length === 0
        ? ''
        : this.parameters.map((p) => p.toString()).join(', ');

    let docstring = '';
    if (this.type.docs.summary) {
      docstring = this.type.docs.toString();
      code.line(`// ${docstring}`);
    }

    code.openBlock(
      `func ${constr}(${paramString}) ${this.parent.interfaceName}`,
    );

    this.constructorRuntimeCall.emit(code);
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
    this.runtimeCall = new MethodCall(this, this.method.static);
  }

  /* emit generates method implementation on the class */
  public emit({ code }: EmitContext) {
    const name = this.name;
    const instanceArg = this.parent.name.substring(0, 1).toLowerCase();
    const returnTypeString = this.reference?.void ? '' : ` ${this.returnType}`;

    code.openBlock(
      `func (${instanceArg} *${
        this.parent.name
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

  public get returnType(): string {
    return (
      this.reference?.scopedName(this.parent.pkg) ?? this.method.toString()
    );
  }
}

export class StaticMethod extends ClassMethod {
  public constructor(
    public readonly parent: GoClass,
    public readonly method: Method,
  ) {
    super(parent, method);
  }

  public emit({ code }: EmitContext) {
    const name = `${this.parent.name}_${this.name}`;
    const returnTypeString = this.reference?.void ? '' : ` ${this.returnType}`;

    code.openBlock(`func ${name}(${this.paramString()})${returnTypeString}`);

    this.runtimeCall.emit(code);

    code.closeBlock();
    code.line();
  }
}
