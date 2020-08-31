import { Method, ClassType, Initializer } from 'jsii-reflect';
import { CodeMaker, toPascalCase } from 'codemaker';
import { GoTypeRef } from './go-type-reference';
import { GoStruct } from './go-type';
import { TypeField } from './type-field';
import { getFieldDependencies, substituteReservedWords } from '../util';
import { Package } from '../package';
import { ClassConstructor, MethodCall } from '../runtime';

export class GoClassConstructor {
  private readonly constructorRuntimeCall: ClassConstructor;

  public constructor(
    public readonly parent: GoClass,
    private readonly type: Initializer,
  ) {
    this.constructorRuntimeCall = new ClassConstructor(this);
  }

  public emit(code: CodeMaker) {
    const constr = `New${this.parent.name}`;
    const params = this.type.parameters.map((x) => {
      const paramName = substituteReservedWords(x.name);
      const paramType = new GoTypeRef(
        this.parent.parent.root,
        x.type,
      ).scopedName(this.parent.parent);
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

/*
 * GoClass wraps a Typescript class as a Go custom struct type
 */
export class GoClass extends GoStruct {
  public readonly methods: ClassMethod[];
  private readonly initializer?: GoClassConstructor;

  public constructor(parent: Package, public type: ClassType) {
    super(parent, type);

    this.methods = Object.values(this.type.getMethods(true)).map(
      (method) => new ClassMethod(this, method),
    );

    if (this.type.initializer) {
      this.initializer = new GoClassConstructor(this, this.type.initializer);
    }
  }

  public emit(code: CodeMaker): void {
    // emits interface, struct proxy, and instance methods
    super.emit(code);

    if (this.initializer) {
      this.initializer.emit(code);
    }
    this.emitSetters(code);

    for (const method of this.methods) {
      method.emit(code);
    }
  }

  protected emitInterface(code: CodeMaker): void {
    code.line('// Class interface'); // FIXME for debugging
    code.openBlock(`type ${this.interfaceName} interface`);

    // embed extended interfaces
    for (const iface of this.extends) {
      code.line(iface.scopedName(this.parent));
    }

    for (const property of this.properties) {
      property.emitGetterDecl(code);
      property.emitSetterDecl(code);
    }

    for (const method of this.methods) {
      method.emitDecl(code);
    }

    code.closeBlock();
    code.line();
  }

  // emits the implementation of the getters for the struct
  private emitSetters(code: CodeMaker): void {
    if (this.properties.length !== 0) {
      for (const property of this.properties) {
        property.emitSetterImpl(code);
      }
    }
  }

  public get dependencies(): Package[] {
    return [...super.dependencies, ...getFieldDependencies(this.methods)];
  }
}

export class ClassMethod implements TypeField {
  public readonly name: string;
  public readonly references?: GoTypeRef;
  public readonly runtimeCall: MethodCall;

  public constructor(
    public readonly parent: GoClass,
    public readonly method: Method,
  ) {
    this.name = toPascalCase(this.method.name);
    this.runtimeCall = new MethodCall(this);

    if (method.returns.type) {
      this.references = new GoTypeRef(parent.parent.root, method.returns.type);
    }
  }

  /* emit generates method on the class */
  public emit(code: CodeMaker) {
    const name = this.name;
    const returnType = `${
      this.returnTypeString ? `${this.returnTypeString} ` : ''
    }`;
    const instanceArg = this.parent.name.substring(0, 1).toLowerCase();

    code.openBlock(
      `func (${instanceArg} *${this.parent.name}) ${name}() ${returnType}`,
    );

    this.runtimeCall.emit(code);

    code.closeBlock();
    code.line();
  }

  public emitDecl(code: CodeMaker) {
    const name = this.name;
    code.line(`${name}() ${this.returnTypeString}`);
  }

  public get returnTypeString(): string {
    return (
      this.references?.scopedName(this.parent.parent) ?? this.method.toString()
    );
  }
}
