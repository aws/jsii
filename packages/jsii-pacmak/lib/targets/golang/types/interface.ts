import { toPascalCase } from 'codemaker';
import { EmitContext } from '../emit-context';
import { InterfaceType, Method, Property } from 'jsii-reflect';
import { GoType } from './go-type';
import { GoTypeRef } from './go-type-reference';
import { Package } from '../package';
import { TypeFieldBase, TypeField } from './type-field';
import { getFieldDependencies } from '../util';

export class Interface extends GoType {
  public readonly methods: InterfaceMethod[];
  public readonly properties: InterfaceProperty[];

  public constructor(pkg: Package, public type: InterfaceType) {
    super(pkg, type);
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
      code.line(iface.scopedName(this.pkg));
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
      return new GoTypeRef(this.pkg.root, iface.reference);
    });
  }

  public get extendsDependencies(): Package[] {
    const packages: Package[] = [];
    for (const ifaceRef of this.extends) {
      const pkg = ifaceRef.type?.pkg;
      if (pkg) {
        packages.push(pkg);
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

class InterfaceProperty extends TypeFieldBase implements TypeField {
  public readonly name: string;
  public readonly getter: string;
  public readonly reference?: GoTypeRef;

  public constructor(
    public readonly parent: Interface,
    private readonly property: Property,
  ) {
    super();
    this.name = toPascalCase(property.name);
    this.getter = `Get${this.name}`;

    if (property.type) {
      this.reference = new GoTypeRef(parent.pkg.root, property.type);
    }
  }

  public get returnType(): string {
    return (
      this.reference?.scopedName(this.parent.pkg) ??
      this.property.type.toString()
    );
  }

  public emit(context: EmitContext) {
    const docs = this.property.docs;
    if (docs) {
      context.documenter.emit(docs);
    }

    const { code } = context;
    code.line(`${this.getter}() ${this.returnType}`);
  }
}

class InterfaceMethod extends TypeFieldBase implements TypeField {
  public readonly name: string;
  public readonly reference?: GoTypeRef;

  public constructor(
    public readonly parent: Interface,
    private readonly method: Method,
  ) {
    super();
    this.name = toPascalCase(method.name);

    if (method.returns.type) {
      this.reference = new GoTypeRef(parent.pkg.root, method.returns.type);
    }
  }

  public emit(context: EmitContext) {
    const docs = this.method.docs;
    if (docs) {
      context.documenter.emit(docs);
    }
    const { code } = context;
    code.line(`${this.name}()${this.returnType}`);
  }

  public get returnType(): string {
    const ret = this.method.returns.type.void
      ? ''
      : this.reference?.scopedName(this.parent.pkg) ?? this.method.toString();
    if (ret !== '') {
      return ` ${ret}`;
    }
    return ret;
  }
}
