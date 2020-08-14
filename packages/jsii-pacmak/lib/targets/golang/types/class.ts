import { Method, Property, ClassType } from 'jsii-reflect';
import { CodeMaker } from 'codemaker';
import { GoTypeRef } from './go-type-reference';
import { GoType, GoEmitter } from './go-type';
import { Module } from '../module';

export class ClassField {
  public constructor(public readonly parent: GoClass) {}
}

export class ClassProperty extends ClassField {
  public readonly references?: GoTypeRef;
  public constructor(parent: GoClass, public readonly property: Property) {
    super(parent);

    if (property.type) {
      this.references = new GoTypeRef(parent.parent.root, property.type);
    }
  }

  public emit(code: CodeMaker) {
    const name = code.toPascalCase(this.property.name);
    const type =
      this.references?.scopedName(this.parent.parent) ??
      this.property.toString();

    code.line(`${name} ${type}`);
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

export class ClassMethod extends ClassField {
  public readonly references?: GoTypeRef;
  public constructor(parent: GoClass, public readonly method: Method) {
    super(parent);

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
      `func (${instanceArg} *${code.toPascalCase(
        this.parent.name,
      )}) ${name}() ${type}`,
    );
    code.line(`// jsiiruntime.methodcall(${instanceArg})`);
    code.closeBlock();
    code.line();
  }

  public emitForInterface(code: CodeMaker) {
    const name = code.toPascalCase(this.method.name);
    const type =
      this.references?.scopedName(this.parent.parent) ?? this.method.toString();

    code.line(`${name}() ${type}`);
  }
}

const CLASS_INTERFACE_SUFFIX = 'Iface';
/*
 * Class wraps a Typescript class as a Go custom struct type  TODO rename?
 */
export class GoClass extends GoType implements GoEmitter {
  public readonly properties: ClassProperty[];
  public readonly methods: ClassMethod[];
  public readonly interfaceName: string;

  public constructor(parent: Module, public type: ClassType) {
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

    this.properties.forEach((property) => property.emit(code));

    code.closeBlock();
    code.line();

    this.methods.forEach((method) => method.emit(code));
  }

  // Generate interface that defines getters for public properties and any method signatures
  private emitClassInterface(code: CodeMaker) {
    code.openBlock(`type ${this.interfaceName} interface`);

    this.properties.forEach((property) => property.emitForInterface(code));
    this.methods.forEach((method) => method.emitForInterface(code));

    code.closeBlock();
    code.line();
  }

  public get dependencies(): Module[] {
    return [
      ...this.properties.reduce((accum: Module[], property) => {
        return property.references?.type?.parent
          ? [...accum, property.references?.type.parent]
          : accum;
      }, []),
      ...this.methods.reduce((accum: Module[], method) => {
        return method.references?.type?.parent
          ? [...accum, method.references?.type.parent]
          : accum;
      }, []),
    ];
  }
}
