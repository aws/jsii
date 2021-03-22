import { CodeMaker } from 'codemaker';
import { InterfaceType, Method, Property } from 'jsii-reflect';

import * as comparators from '../comparators';
import { SpecialDependencies } from '../dependencies';
import { EmitContext } from '../emit-context';
import { Package } from '../package';
import { JSII_RT_ALIAS, MethodCall } from '../runtime';
import { getMemberDependencies, getParamDependencies } from '../util';
import { GoType } from './go-type';
import { GoTypeRef } from './go-type-reference';
import { GoMethod, GoProperty } from './type-member';

export class GoInterface extends GoType {
  public readonly methods: InterfaceMethod[];
  public readonly reimplementedMethods?: readonly InterfaceMethod[];
  public readonly properties: InterfaceProperty[];
  public readonly reimplementedProperties?: readonly InterfaceProperty[];

  public constructor(pkg: Package, public type: InterfaceType) {
    super(pkg, type);

    this.methods = type.ownMethods
      .map((method) => new InterfaceMethod(this, method))
      .sort(comparators.byName);

    this.properties = type.ownProperties
      .map((prop) => new InterfaceProperty(this, prop))
      .sort(comparators.byName);

    // If there is more than one base, and any ancestor (including transitive)
    // comes from a different assembly, we will re-implement all members on the
    // proxy struct, as otherwise we run the risk of un-promotable methods
    // caused by inheriting the same interface via multiple paths (since we have
    // to represent those as embedded types).
    if (
      type.interfaces.length > 1 &&
      type
        .getInterfaces(true)
        .some((ancestor) => ancestor.assembly.fqn !== type.assembly.fqn)
    ) {
      this.reimplementedMethods = type.allMethods
        .filter((method) => !method.static && method.definingType !== type)
        .map((method) => new InterfaceMethod(this, method))
        .sort(comparators.byName);

      this.reimplementedProperties = type.allProperties
        .filter(
          (property) => !property.static && property.definingType !== type,
        )
        .map((property) => new InterfaceProperty(this, property))
        .sort(comparators.byName);
    }
  }

  public emit(context: EmitContext) {
    this.emitDocs(context);

    const { code } = context;
    code.openBlock(`type ${this.name} interface`);

    // embed extended interfaces
    for (const iface of this.extends) {
      code.line(
        new GoTypeRef(this.pkg.root, iface.type.reference).scopedName(this.pkg),
      );
    }

    for (const method of this.methods) {
      method.emitDecl(context);
    }

    for (const prop of this.properties) {
      prop.emit(context);
    }

    code.closeBlock();
    code.line();

    code.line(`// The jsii proxy for ${this.name}`);
    code.openBlock(`type ${this.proxyName} struct`);
    if (this.extends.length === 0) {
      // Ensure this is not 0-width
      code.line('_ byte // padding');
    } else {
      for (const base of this.extends) {
        code.line(this.pkg.resolveEmbeddedType(base).embed);
      }
    }
    code.closeBlock();
    code.line();

    for (const method of this.methods) {
      method.emit(context);
    }

    for (const method of this.reimplementedMethods ?? []) {
      method.emit(context);
    }

    for (const prop of this.properties) {
      prop.emitGetterProxy(context);

      if (!prop.immutable) {
        prop.emitSetterProxy(context);
      }
    }

    for (const prop of this.reimplementedProperties ?? []) {
      prop.emitGetterProxy(context);

      if (!prop.immutable) {
        prop.emitSetterProxy(context);
      }
    }
  }

  public emitRegistration(code: CodeMaker): void {
    code.open(`${JSII_RT_ALIAS}.RegisterInterface(`);
    code.line(`"${this.fqn}",`);
    code.line(`reflect.TypeOf((*${this.name})(nil)).Elem(),`);

    const allMembers = [
      ...this.type.allMethods
        .filter((method) => !method.static)
        .map((method) => new InterfaceMethod(this, method)),
      ...this.type.allProperties
        .filter((property) => !property.static)
        .map((property) => new GoProperty(this, property)),
    ].sort(comparators.byName);
    if (allMembers.length === 0) {
      code.line('nil, // no members');
    } else {
      code.open(`[]${JSII_RT_ALIAS}.Member{`);
      for (const member of allMembers) {
        code.line(`${member.override},`);
      }
      code.close('},');
    }

    this.emitProxyMakerFunction(code, this.extends);
    code.close(')');
  }

  public get specialDependencies(): SpecialDependencies {
    return [
      ...this.properties.map((p) => p.specialDependencies),
      ...this.methods.map((m) => m.specialDependencies),
    ].reduce(
      (acc, elt) => ({
        runtime: acc.runtime || elt.runtime,
        init: acc.init || elt.init,
        internal: acc.internal,
        time: acc.time || elt.time,
      }),
      {
        runtime: false,
        init: false,
        internal: this.extends.some((base) => this.pkg.isExternalType(base)),
        time: false,
      },
    );
  }

  public get extends(): GoInterface[] {
    return this.type.interfaces
      .map((iface) => this.pkg.root.findType(iface.fqn) as GoInterface)
      .sort(comparators.byName);
  }

  public get extendsDependencies(): Package[] {
    const packages: Package[] = [];
    for (const ifaceRef of this.extends) {
      const pkg = ifaceRef.pkg;
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
    public readonly parent: GoInterface,
    public readonly property: Property,
  ) {
    super(parent, property);
  }

  public get returnType(): string {
    return (
      this.reference?.scopedReference(this.parent.pkg) ??
      this.property.type.toString()
    );
  }

  public emit({ code, documenter }: EmitContext) {
    documenter.emit(this.property.docs);
    code.line(`${this.name}() ${this.returnType}`);
  }
}

class InterfaceMethod extends GoMethod {
  public readonly runtimeCall: MethodCall;

  public constructor(
    public readonly parent: GoInterface,
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
        this.parent.proxyName
      }) ${name}(${this.paramString()})${this.returnTypeString}`,
    );

    this.runtimeCall.emit(code);

    code.closeBlock();
    code.line();
  }

  public get specialDependencies(): SpecialDependencies {
    return {
      runtime: true,
      init: false,
      internal: false,
      time:
        this.parameters.some((p) => p.reference.specialDependencies.time) ||
        !!this.reference?.specialDependencies.time,
    };
  }

  private get returnTypeString(): string {
    return this.reference?.void ? '' : ` ${this.returnType}`;
  }
}
