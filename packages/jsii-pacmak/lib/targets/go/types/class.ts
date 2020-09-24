import { Method, ClassType, Initializer } from 'jsii-reflect';
import { toPascalCase } from 'codemaker';
import { GoTypeRef } from './go-type-reference';
import { GoStruct } from './go-type';
import { GoTypeMember } from './type-member';
import { getFieldDependencies, substituteReservedWords } from '../util';
import { Package } from '../package';
import { ClassConstructor, MethodCall } from '../runtime';
import { EmitContext } from '../emit-context';

/*
 * GoClass wraps a Typescript class as a Go custom struct type
 */
export class GoClass extends GoStruct {
  public readonly methods: ClassMethod[];
  private readonly initializer?: GoClassConstructor;

  public constructor(pkg: Package, public type: ClassType) {
    super(pkg, type);

    this.methods = Object.values(this.type.getMethods(true)).map(
      (method) => new ClassMethod(this, method),
    );

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
    return [...super.dependencies, ...getFieldDependencies(this.methods)];
  }
}

export class GoClassConstructor {
  private readonly constructorRuntimeCall: ClassConstructor;

  public constructor(
    public readonly parent: GoClass,
    private readonly type: Initializer,
  ) {
    this.constructorRuntimeCall = new ClassConstructor(this);
  }

  public emit(context: EmitContext) {
    const { code } = context;
    const constr = `New${this.parent.name}`;
    const params = this.type.parameters.map((x) => {
      const paramName = substituteReservedWords(x.name);
      const paramType = new GoTypeRef(this.parent.pkg.root, x.type).scopedName(
        this.parent.pkg,
      );
      return `${paramName} ${paramType}`;
    });

    const parameters = params.length === 0 ? '' : params.join(', ');

    let docstring = '';
    if (this.type.docs.summary) {
      docstring = this.type.docs.toString();
      code.line(`// ${docstring}`);
    }

    code.openBlock(
      `func ${constr}(${parameters}) ${this.parent.interfaceName}`,
    );

    this.constructorRuntimeCall.emit(code);
    code.closeBlock();
    code.line();
  }
}

export class ClassMethod implements GoTypeMember {
  public readonly name: string;
  public readonly reference?: GoTypeRef;
  public readonly runtimeCall: MethodCall;

  public constructor(
    public readonly parent: GoClass,
    public readonly method: Method,
  ) {
    this.name = toPascalCase(this.method.name);
    this.runtimeCall = new MethodCall(this);

    if (method.returns.type) {
      this.reference = new GoTypeRef(parent.pkg.root, method.returns.type);
    }
  }

  /* emit generates method implementation on the class */
  public emit({ code }: EmitContext) {
    const name = this.name;

    const instanceArg = this.parent.name.substring(0, 1).toLowerCase();
    const returnTypeString = this.reference?.void ? '' : ` ${this.returnType}`;

    code.openBlock(
      `func (${instanceArg} *${this.parent.name}) ${name}()${returnTypeString}`,
    );

    this.runtimeCall.emit(code);

    code.closeBlock();
    code.line();
  }

  /* emitDecl generates method declaration in the class interface */
  public emitDecl(context: EmitContext) {
    const { code } = context;
    const returnTypeString = this.reference?.void ? '' : ` ${this.returnType}`;
    code.line(`${this.name}()${returnTypeString}`);
  }

  public get returnType(): string {
    return (
      this.reference?.scopedName(this.parent.pkg) ?? this.method.toString()
    );
  }
}
