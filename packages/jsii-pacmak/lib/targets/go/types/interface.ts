import { toPascalCase } from 'codemaker';
import { InterfaceType, Method, Property } from 'jsii-reflect';

import { EmitContext } from '../emit-context';
import { Package } from '../package';
import { getMemberDependencies, getParamDependencies } from '../util';
import { GoType } from './go-type';
import { GoTypeRef } from './go-type-reference';
import { GoMethod, GoTypeMember } from './type-member';

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

  public get usesInitPackage() {
    return (
      this.properties.some((p) => p.usesInitPackage) ||
      this.methods.some((m) => m.usesInitPackage)
    );
  }

  public get usesRuntimePackage() {
    return (
      this.properties.some((p) => p.usesRuntimePackage) ||
      this.methods.some((m) => m.usesRuntimePackage)
    );
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
      ...getMemberDependencies(this.methods),
      ...getParamDependencies(this.methods),
      ...getMemberDependencies(this.properties),
    ];
  }
}

class InterfaceProperty implements GoTypeMember {
  public readonly name: string;
  public readonly getter: string;
  public readonly reference?: GoTypeRef;

  public readonly usesInitPackage = false;
  public readonly usesRuntimePackage = false;

  public constructor(
    public readonly parent: Interface,
    private readonly property: Property,
  ) {
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

class InterfaceMethod extends GoMethod {
  public readonly usesInitPackage = false;
  public readonly usesRuntimePackage = false;

  public constructor(
    public readonly parent: Interface,
    public readonly method: Method,
  ) {
    super(parent, method);
  }

  public emit(context: EmitContext) {
    const docs = this.method.docs;
    if (docs) {
      context.documenter.emit(docs);
    }
    const { code } = context;
    code.line(`${this.name}(${this.paramString()})${this.returnType}`);
  }
}
