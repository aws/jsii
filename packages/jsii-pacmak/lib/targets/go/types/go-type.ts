import { toPascalCase } from 'codemaker';
import { ClassType, InterfaceType, Type } from 'jsii-reflect';

import { EmitContext } from '../emit-context';
import { Package } from '../package';
import { getFieldDependencies } from '../util';
import { GoTypeRef } from './go-type-reference';
import { GoProperty } from './type-member';

// String appended to all go GoStruct Interfaces
const STRUCT_INTERFACE_SUFFIX = 'Iface';

export abstract class GoType {
  public readonly name: string;
  public readonly fqn: string;

  public constructor(public pkg: Package, public type: Type) {
    this.name = toPascalCase(type.name);
    this.fqn = type.fqn;
  }

  public abstract emit(context: EmitContext): void;
  public abstract get dependencies(): Package[];

  public get namespace() {
    return this.pkg.packageName;
  }

  public emitDocs(context: EmitContext): void {
    context.documenter.emit(this.type.docs);
  }

  protected emitStability(context: EmitContext): void {
    context.documenter.emitStability(this.type.docs);
  }
}

export abstract class GoStruct extends GoType {
  public readonly properties: GoProperty[];
  public readonly interfaceName: string;

  public constructor(pkg: Package, public type: ClassType | InterfaceType) {
    super(pkg, type);

    // Flatten any inherited properties on the struct
    this.properties = Object.values(this.type.getProperties(true)).map(
      (prop) => new GoProperty(this, prop),
    );

    this.interfaceName = `${this.name}${STRUCT_INTERFACE_SUFFIX}`;
  }

  // `emit` needs to generate both a Go interface and a struct, as well as the Getter methods on the struct
  public emit(context: EmitContext): void {
    this.emitInterface(context);
    this.emitStruct(context);
    this.emitGetters(context);
  }

  protected emitInterface(context: EmitContext): void {
    const { code } = context;
    code.line(
      `// ${this.interfaceName} is the public interface for the custom type ${this.name}`,
    );
    this.emitStability(context);

    code.openBlock(`type ${this.interfaceName} interface`);

    for (const property of this.properties) {
      property.emitGetterDecl(context);
    }

    code.closeBlock();
    code.line();
  }

  private emitStruct(context: EmitContext): void {
    this.emitDocs(context);
    const { code } = context;
    code.line('// Struct proxy'); // FIXME for debugging
    code.openBlock(`type ${this.name} struct`);

    for (const property of this.properties) {
      property.emitStructMember(context);
    }

    code.closeBlock();
    code.line();
  }

  // emits the implementation of the getters for the struct
  private emitGetters(context: EmitContext): void {
    const { code } = context;
    if (this.properties.length !== 0) {
      for (const property of this.properties) {
        property.emitGetterImpl(context);
      }

      code.line();
    }
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
      ...getFieldDependencies(this.properties),
    ];
  }
}
