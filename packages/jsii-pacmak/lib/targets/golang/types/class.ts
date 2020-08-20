import { Method, Property, ClassType } from 'jsii-reflect';
import { CodeMaker } from 'codemaker';
import { GoTypeRef } from './go-type-reference';
import { GoType, GoEmitter } from './go-type';
import { TypeField } from './type-field';
import { Package } from '../package';
import { getFieldDependencies } from '../util';

// String appended to all go Class Interfaces
const CLASS_INTERFACE_SUFFIX = 'Iface';

export class ClassProperty implements TypeField {
  public readonly name: string;
  public readonly references?: GoTypeRef;

  public constructor(
    public parent: GoClass,
    public readonly property: Property,
  ) {
    this.name = this.property.name;

    if (property.type) {
      this.references = new GoTypeRef(parent.parent.root, property.type);
    }
  }

  public emit(code: CodeMaker) {
    const name = code.toPascalCase(this.property.name);
    const type =
      this.references?.scopedName(this.parent.parent) ??
      this.property.toString();

    // If struct property is type of parent struct, use a pointer as type to avoid recursive struct type error
    if (this.references?.type?.name === this.parent.name) {
      code.line(`${name} *${type}`);
    } else {
      code.line(`${name} ${type}`);
    }
  }

  public emitForInterface(code: CodeMaker) {
    const name = code.toPascalCase(this.property.name);
    const type =
      this.references?.scopedName(this.parent.parent) ??
      this.property.toString();

    code.line(`Get${name}() ${type}`);
    if (!this.property.protected) {
      code.line(`Set${name}()`);
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

/*
 * Class wraps a Typescript class as a Go custom struct type  TODO rename?
 */
export class GoClass extends GoType implements GoEmitter {
  public readonly properties: ClassProperty[];
  public readonly methods: ClassMethod[];
  public readonly interfaceName: string;

  public constructor(parent: Package, public type: ClassType) {
    super(parent, type);

    this.properties = Object.values(this.type.getProperties()).map(
      (prop) => new ClassProperty(this, prop),
    );

    this.methods = Object.values(this.type.getMethods()).map(
      (method) => new ClassMethod(this, method),
    );

    this.interfaceName = `${this.type.name}${CLASS_INTERFACE_SUFFIX}`;
  }

  public emit(code: CodeMaker): void {
    this.emitClassInterface(code);

    code.openBlock(`type ${this.name} struct`);

    for (const property of this.properties) {
      property.emit(code);
    }

    code.closeBlock();
    code.line();

    for (const method of this.methods) {
      method.emit(code);
    }
  }

  // Generate interface that defines getters for public properties and any method signatures
  private emitClassInterface(code: CodeMaker) {
    code.openBlock(`type ${this.interfaceName} interface`);

    for (const property of this.properties) {
      property.emitForInterface(code);
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
