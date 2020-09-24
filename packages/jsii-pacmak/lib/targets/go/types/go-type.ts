import { toPascalCase } from 'codemaker';
import { EmitContext } from '../emit-context';
import { ClassType, InterfaceType, Property, Type } from 'jsii-reflect';
import { Package } from '../package';
import { GoTypeRef } from './go-type-reference';
import { GoTypeMember } from './type-member';
import { getFieldDependencies } from '../util';

// String appended to all go GoStruct Interfaces
const STRUCT_INTERFACE_SUFFIX = 'Iface';

export abstract class GoType {
  public readonly name: string;

  public constructor(public pkg: Package, public type: Type) {
    this.name = toPascalCase(type.name);
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

/*
 * GoProperty encapsulates logic for public properties on a concrete struct, which could represent
 either a JSII class proxy or datatype interface proxy
*/
export class GoProperty implements GoTypeMember {
  public readonly name: string;
  public readonly getter: string;
  public readonly reference?: GoTypeRef;

  public constructor(
    public parent: GoStruct,
    public readonly property: Property,
  ) {
    this.name = toPascalCase(this.property.name);
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

  public emitStructMember(context: EmitContext) {
    const docs = this.property.docs;
    if (docs) {
      context.documenter.emit(docs);
    }
    const { code } = context;
    // If struct property is type of parent struct, use a pointer as type to avoid recursive struct type error
    if (this.reference?.type?.name === this.parent.name) {
      code.line(`${this.name} *${this.returnType}`);
    } else {
      code.line(`${this.name} ${this.returnType}`);
    }
    // TODO add newline if not the last member
  }

  public emitGetterDecl(context: EmitContext) {
    const { code } = context;
    code.line(`${this.getter}() ${this.returnType}`);
  }

  public emitSetterDecl(context: EmitContext) {
    const { code } = context;
    if (!this.property.protected) {
      code.line(`Set${this.name}(val ${this.returnType})`);
    }
  }

  // Emits getter methods on the struct for each property
  public emitGetterImpl(context: EmitContext) {
    const { code } = context;
    const receiver = this.parent.name;
    const instanceArg = receiver.substring(0, 1).toLowerCase();

    code.openBlock(
      `func (${instanceArg} *${receiver}) ${
        this.getter
      }()${` ${this.returnType}`}`,
    );

    if (this.parent.name === this.returnType) {
      code.line(`return *${instanceArg}.${this.name}`);
    } else {
      code.line(`return ${instanceArg}.${this.name}`);
    }
    code.closeBlock();
    code.line();
  }

  public emitSetterImpl(context: EmitContext) {
    const { code } = context;
    const receiver = this.parent.name;
    const instanceArg = receiver.substring(0, 1).toLowerCase();

    code.openBlock(
      `func (${instanceArg} *${receiver}) Set${this.name}(val ${this.returnType})`,
    );

    if (this.parent.name === this.returnType) {
      code.line(`${instanceArg}.${this.name} = &val`);
    } else {
      code.line(`${instanceArg}.${this.name} = val`);
    }
    code.closeBlock();
    code.line();
  }
}
