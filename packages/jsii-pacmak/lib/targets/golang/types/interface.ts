import { toPascalCase } from 'codemaker';
import { EmitContext } from '../emit-context';
import { InterfaceType, Method, Property } from 'jsii-reflect';
import { GoType } from './go-type';
import { GoTypeRef } from './go-type-reference';
import { Package } from '../package';
import { TypeField } from './type-field';
import { getFieldDependencies } from '../util';

class InterfaceProperty implements TypeField {
  public readonly name: string;
  public readonly reference?: GoTypeRef;

  public constructor(
    public readonly parent: Interface,
    private readonly property: Property,
  ) {
    this.name = toPascalCase(property.name);

    if (property.type) {
      this.reference = new GoTypeRef(parent.parent.root, property.type);
    }
  }

  public emit(context: EmitContext) {
    const docs = this.property.docs;
    if (docs) {
      context.documenter.emit(docs);
    }

    const { code } = context;
    const propName = this.name;
    const type = new GoTypeRef(
      this.parent.parent.root,
      this.property.type,
    ).scopedName(this.parent.parent);

    code.line(`Get${propName}() ${type}`);
  }
}

class InterfaceMethod implements TypeField {
  public readonly name: string;
  public readonly reference?: GoTypeRef;

  public constructor(
    public readonly parent: Interface,
    private readonly method: Method,
  ) {
    this.name = toPascalCase(method.name);

    if (method.returns.type) {
      this.reference = new GoTypeRef(parent.parent.root, method.returns.type);
    }
  }

  public emit(context: EmitContext) {
    const docs = this.method.docs;
    if (docs) {
      context.documenter.emit(docs);
    }
    const { code } = context;
    const returns = this.method.returns.type.void
      ? ''
      : ` ${new GoTypeRef(
          this.parent.parent.root,
          this.method.returns.type,
        ).scopedName(this.parent.parent)}`;

    const methodName = this.name;

    code.line(`${methodName}()${returns}`);
  }

  public get returnTypeString(): string {
    return (
      this.reference?.scopedName(this.parent.parent) ?? this.method.toString()
    );
  }
}

export class Interface extends GoType {
  public readonly methods: InterfaceMethod[];
  public readonly properties: InterfaceProperty[];

  public constructor(parent: Package, public type: InterfaceType) {
    super(parent, type);
    this.methods = Object.values(type.getMethods()).map(
      (method) => new InterfaceMethod(this, method),
    );
    this.properties = Object.values(type.getProperties()).map(
      (prop) => new InterfaceProperty(this, prop),
    );
  }

  public emit(context: EmitContext) {
    this.emitDocs(context);

    const { code } = context;
    code.openBlock(`type ${code.toPascalCase(this.name)} interface`);

    // embed extended interfaces
    for (const iface of this.extends) {
      code.line(iface.scopedName(this.parent));
    }

    for (const method of this.methods) {
      method.emit(context);
    }

    for (const prop of this.properties) {
      prop.emit(context);
    }

    code.closeBlock();
    code.line();
  }

  public get extends(): GoTypeRef[] {
    return this.type.getInterfaces(true).map((iface) => {
      return new GoTypeRef(this.parent.root, iface.reference);
    });
  }

  public get extendsDependencies(): Package[] {
    const packages: Package[] = [];
    for (const ifaceRef of this.extends) {
      const pack = ifaceRef.type?.parent;
      if (pack) {
        packages.push(pack);
      }
    }

    return packages;
  }

  public get dependencies(): Package[] {
    return [
      ...this.extendsDependencies,
      ...getFieldDependencies(this.methods),
      ...getFieldDependencies(this.properties),
    ];
  }
}
