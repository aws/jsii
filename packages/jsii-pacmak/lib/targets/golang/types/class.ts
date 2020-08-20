import { Method, ClassType } from 'jsii-reflect';
import { CodeMaker } from 'codemaker';
import { GoTypeRef } from './go-type-reference';
import { GoProperty, GoType, GoEmitter } from './go-type';
// import { Struct } from './struct';
import { TypeField } from './type-field';
import { Package } from '../package';
import { getFieldDependencies } from '../util';

const CLASS_INTERFACE_SUFFIX = 'Iface';
/*
 * GoClass wraps a Typescript class as a Go custom struct type
 */
export class GoClass extends GoType implements GoEmitter {
  public readonly properties: GoProperty[];
  public readonly interfaceName: string;
  public readonly methods: ClassMethod[];

  public constructor(parent: Package, public type: ClassType) {
    super(parent, type);

    this.properties = Object.values(this.type.getProperties()).map(
      (prop) => new GoProperty(this, prop),
    );

    this.methods = Object.values(this.type.getMethods()).map(
      (method) => new ClassMethod(this, method),
    );

    this.interfaceName = `${this.name}${CLASS_INTERFACE_SUFFIX}`;
  }

  public emit(code: CodeMaker): void {
    this.emitInterface(code);
    this.emitStruct(code);
    // TODO: this.generateImpl

    for (const method of this.methods) {
      method.emit(code);
    }
  }

  private emitStruct(code: CodeMaker): void {
    code.openBlock(`type ${this.name} struct`);

    for (const property of this.properties) {
      property.emitProperty(code);
    }

    code.closeBlock();
    code.line();
  }

  // Generate interface that defines getters for public properties and any method signatures
  private emitInterface(code: CodeMaker) {
    code.openBlock(`type ${this.interfaceName} interface`);

    for (const property of this.properties) {
      property.emitGetter(code);
      property.emitSetter(code); // TODO might not need
    }

    for (const method of this.methods) {
      method.emitForInterface(code);
    }

    code.closeBlock();
    code.line();
  }

  public get dependencies(): Package[] {
    return [
      ...getFieldDependencies(this.properties),
      ...getFieldDependencies(this.methods),
    ];
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

  public emit(code: CodeMaker) {
    const name = code.toPascalCase(this.method.name);
    const type =
      this.references?.scopedName(this.parent.parent) ?? this.method.toString();

    const instanceArg = this.parent.name.substring(0, 1).toLowerCase();

    // TODO: Method Arguments
    code.openBlock(
      `func (${instanceArg} *${this.parent.name}) ${name}() ${
        type ? `${type} ` : ''
      }`,
    );

    code.line(`jsii.NoOpRequest(jsii.NoOpApiRequest {`);
    code.indent();
    code.line(`Class: "${this.parent.name}",`);
    code.line(`Method: "${name}",`);
    code.line(
      `Args: []string{${this.method.parameters.reduce((accum: string, p, i) => {
        const prefix = i === 0 ? '' : ' ';
        return `${accum}${prefix}"${p.type.toString()}",`;
      }, '')}},`,
    );
    code.unindent();
    code.line(`})`);

    const ret = this.references;
    if (ret?.type?.type.isClassType()) {
      code.line(`return ${type}{}`);
    } else if (ret?.type?.type.isEnumType()) {
      code.line(`return "ENUM_DUMMY"`);
    } else {
      code.line(`return ${this.getDummyReturn(type)}`);
    }

    code.closeBlock();
    code.line();
  }

  public emitForInterface(code: CodeMaker) {
    const name = code.toPascalCase(this.method.name);
    const type =
      this.references?.scopedName(this.parent.parent) ?? this.method.toString();

    code.line(`${name}() ${type}`);
  }

  private getDummyReturn(type: string): string {
    return this.NOOP_RETURN_MAP[type] || 'nil';
  }
}
