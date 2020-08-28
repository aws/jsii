import { Method, ClassType } from 'jsii-reflect';
import { CodeMaker } from 'codemaker';
import { GoTypeRef } from './go-type-reference';
import { GoStruct } from './go-type';
import { TypeField } from './type-field';
import { Package } from '../package';

/*
 * GoClass wraps a Typescript class as a Go custom struct type
 */
export class GoClass extends GoStruct {
  public readonly methods: ClassMethod[];

  public constructor(parent: Package, public type: ClassType) {
    super(parent, type);

    this.methods = Object.values(this.type.getMethods(true)).map(
      (method) => new ClassMethod(this, method),
    );
  }

  public emit(code: CodeMaker): void {
    // emits interface, struct proxy, and instance methods
    super.emit(code);

    this.emitConstructor(code);
    this.emitSetters(code);

    for (const method of this.methods) {
      method.emit(code);
    }
  }

  protected emitInterface(code: CodeMaker): void {
    code.line('// Class interface'); // FIXME for debugging
    code.openBlock(`type ${this.interfaceName} interface`);

    const extended = this.type.getInterfaces(true);

    // embed extended interfaces
    if (extended.length !== 0) {
      for (const iface of extended) {
        code.line(iface.fqn);
      }
    }

    for (const property of this.properties) {
      property.emitGetterDecl(code);
      property.emitSetterDecl(code);
    }

    for (const method of this.methods) {
      method.emitSignature(code);
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

  private emitConstructor(code: CodeMaker): void {
    const initializer = this.type.initializer;
    if (initializer) {
      const constr = `New${this.name}`;

      let params: string[] = [];
      if (initializer.parameters) {
        params = initializer.parameters.map(
          // TODO: resolve types for parameters
          (x) => `${x.name} ${x.type.toString()}`,
        );
      }
      const parameters = params.length === 0 ? '' : params.join(', ');

      let docstring = '';
      if (initializer.docs.summary) {
        docstring = initializer.docs.toString();
        code.line(`// ${docstring}`);
      }

      code.openBlock(`func ${constr}(${parameters}) ${this.interfaceName}`);

      // FIXME placeholder
      code.open(`jsii.NoOpRequest(jsii.NoOpApiRequest {`);
      code.line(`Class: "${this.name}",`);
      code.line(`Method: "${constr}",`);
      code.line(`Parameters: []string{${parameters}}`);
      code.close(`})`);

      code.line();

      // Return value
      code.line(`return &${this.name}{`);
      code.line(` // props`);
      code.line(`}`);
      code.closeBlock();
      code.line();
    }
  }
}

export class ClassMethod implements TypeField {
  public readonly name: string;
  public readonly references?: GoTypeRef;

  private readonly NOOP_RETURN_MAP: { [type: string]: string } = {
    float64: '0.0',
    string: '"NOOP_RETURN_STRING"',
    bool: 'true',
  };

  public constructor(
    public readonly parent: GoClass,
    public readonly method: Method,
  ) {
    this.name = this.method.name;

    if (method.returns.type) {
      this.references = new GoTypeRef(parent.parent.root, method.returns.type);
    }
  }

  /* emit generates method on the class */
  public emit(code: CodeMaker) {
    const name = code.toPascalCase(this.method.name);
    const returnType = `${this.returnType ? `${this.returnType} ` : ''}`;
    const instanceArg = this.parent.name.substring(0, 1).toLowerCase();

    let params: string[] = [];
    if (this.method.parameters) {
      params = this.method.parameters.map(
        // TODO: resolve types for parameters
        (x) => `"${x.name} ${x.type.toString()}"`,
      );
    }
    const parameters = params.length === 0 ? '' : params.join(', ');

    code.openBlock(
      `func (${instanceArg} *${this.parent.name}) ${name}() ${returnType}`,
    );

    // FIXME Placeholder
    code.open(`jsii.NoOpRequest(jsii.NoOpApiRequest {`);
    code.line(`Class: "${this.parent.name}",`);
    code.line(`Method: "${name}",`);
    code.line(`Parameters: []string{${parameters}}`);
    code.close(`})`);

    const ret = this.references;
    if (ret?.type?.type.isClassType()) {
      code.line(`return ${this.returnType}{}`);
    } else if (ret?.type?.type.isEnumType()) {
      code.line(`return "ENUM_DUMMY"`);
    } else {
      code.line(`return ${this.getDummyReturn(this.returnType)}`);
    }

    code.closeBlock();
    code.line();
  }

  public emitSignature(code: CodeMaker) {
    const name = code.toPascalCase(this.method.name);
    code.line(`${name}() ${this.returnType}`);
  }

  private getDummyReturn(type: string): string {
    return this.NOOP_RETURN_MAP[type] || 'nil';
  }

  public get returnType(): string {
    return (
      this.references?.scopedName(this.parent.parent) ?? this.method.toString()
    );
  }
}
