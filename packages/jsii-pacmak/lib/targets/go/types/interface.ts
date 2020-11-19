import { InterfaceType, Method, Property } from 'jsii-reflect';

import { EmitContext } from '../emit-context';
import { Package } from '../package';
import { MethodCall } from '../runtime';
import { getMemberDependencies, getParamDependencies } from '../util';
import { GoType, INTERFACE_TYPE_SUFFIX } from './go-type';
import { GoTypeRef } from './go-type-reference';
import { GoMethod, GoProperty } from './type-member';

export class Interface extends GoType {
  public readonly methods: InterfaceMethod[];
  public readonly inheritedMethods: InterfaceMethod[];
  public readonly properties: InterfaceProperty[];
  public readonly inheritedProperties: InterfaceProperty[];
  public readonly interfaceName: string;

  public constructor(pkg: Package, public type: InterfaceType) {
    super(pkg, type);
    this.methods = Object.values(type.getMethods()).map(
      (method) => new InterfaceMethod(this, method),
    );

    this.inheritedMethods = Object.values(type.getMethods(true)).map(
      (method) => new InterfaceMethod(this, method),
    );

    this.properties = Object.values(type.getProperties()).map(
      (prop) => new InterfaceProperty(this, prop),
    );

    this.inheritedProperties = Object.values(type.getProperties(true)).map(
      (prop) => new InterfaceProperty(this, prop),
    );

    this.interfaceName = `${this.name}${INTERFACE_TYPE_SUFFIX}`;
  }

  public emit(context: EmitContext) {
    this.emitDocs(context);

    const { code } = context;
    code.openBlock(`type ${this.interfaceName} interface`);

    // embed extended interfaces
    for (const iface of this.extends) {
      code.line(iface.scopedInterfaceName(this.pkg));
    }

    for (const method of this.methods) {
      method.emitDecl(context);
    }

    for (const prop of this.properties) {
      prop.emit(context);
    }

    code.closeBlock();
    code.line();

    code.line(`type ${this.name} struct {}`);
    code.line();

    for (const method of this.inheritedMethods) {
      method.emit(context);
    }

    for (const prop of this.inheritedProperties) {
      prop.emitGetterImpl(context);

      if (!prop.immutable) {
        prop.emitSetterImpl(context);
      }
    }
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

  public get usesReflectionPackage() {
    return (
      this.properties.some((p) => p.usesReflectionPackage) ||
      this.methods.some((m) => m.usesReflectionPackage)
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

class InterfaceProperty extends GoProperty {
  public readonly reference?: GoTypeRef;

  public constructor(
    public readonly parent: Interface,
    public readonly property: Property,
  ) {
    super(parent, property);
  }

  public get returnType(): string {
    return (
      this.reference?.scopedInterfaceName(this.parent.pkg) ??
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
  public readonly runtimeCall: MethodCall;
  public readonly usesInitPackage = false;
  public readonly usesRuntimePackage = true;

  public constructor(
    public readonly parent: Interface,
    public readonly method: Method,
  ) {
    super(parent, method);
    this.runtimeCall = new MethodCall(this);
  }

  public emitDecl(context: EmitContext) {
    const docs = this.method.docs;
    if (docs) {
      context.documenter.emit(docs);
    }
    const { code } = context;
    code.line(`${this.name}(${this.paramString()})${this.returnTypeString}`);
  }

  public emit({ code }: EmitContext) {
    const name = this.name;
    code.openBlock(
      `func (${this.instanceArg} *${
        this.parent.name
      }) ${name}(${this.paramString()})${this.returnTypeString}`,
    );

    this.runtimeCall.emit(code);

    code.closeBlock();
    code.line();
  }

  private get returnTypeString(): string {
    return this.reference?.void ? '' : ` ${this.returnType}`;
  }

  public get usesReflectionPackage() {
    return Boolean(this.reference?.scopedImplMap(this.parent.pkg).length);
  }
}
