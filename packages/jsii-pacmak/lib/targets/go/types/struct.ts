import * as assert from 'assert';
import { CodeMaker } from 'codemaker';
import { InterfaceType } from 'jsii-reflect';

import { EmitContext } from '../emit-context';
import { Package } from '../package';
import { JSII_RT_ALIAS } from '../runtime';
import { getMemberDependencies } from '../util';
import { GoType } from './go-type';
import { GoTypeRef } from './go-type-reference';
import { GoProperty } from './type-member';

/*
 * Struct wraps a JSII datatype interface aka, structs
 */
export class Struct extends GoType {
  private readonly properties: readonly GoProperty[];

  public constructor(parent: Package, public readonly type: InterfaceType) {
    super(parent, type);

    assert(
      type.isDataType(),
      `The provided interface ${type.fqn} is not a struct!`,
    );

    this.properties = type.allProperties.map(
      (prop) => new GoProperty(this, prop),
    );
  }

  public get dependencies(): Package[] {
    return getMemberDependencies(this.properties);
  }

  public get usesRuntimePackage(): boolean {
    return false;
  }

  public get usesInitPackage(): boolean {
    return false;
  }

  public emit(context: EmitContext): void {
    const { code, documenter } = context;
    documenter.emit(this.type.docs);
    code.openBlock(`type ${this.name} struct`);
    for (const property of this.properties) {
      documenter.emit(property.property.docs);
      property.emitStructMember(context);
    }
    code.closeBlock();
    code.line();

    this.emitBaseConversions(context);
  }

  public emitRegistration(code: CodeMaker): void {
    code.open(`${JSII_RT_ALIAS}.RegisterStruct(`);
    code.line(`"${this.fqn}",`);
    code.line(`reflect.TypeOf((*${this.name})(nil)).Elem(),`);
    code.close(')');
  }

  private emitBaseConversions({ code }: EmitContext) {
    for (const base of this.type.getInterfaces(true)) {
      const baseType = this.pkg.root.findType(base.fqn) as Struct;
      const funcName = `To${baseType.name}`;
      const instanceVar = this.name[0].toLowerCase();
      const valType = new GoTypeRef(this.pkg.root, base.reference).scopedName(
        this.pkg,
      );

      code.line(
        `// ${funcName} is a convenience function to obtain a new ${valType} from this ${this.name}.`,
      );
      // Note - using a pointer receiver here as a convenience, as otherwise
      // user code that somehow has only a pointer would need to first
      // dereference it, which tends to be a code smell.
      code.openBlock(
        `func (${instanceVar} *${this.name}) ${funcName}() ${valType}`,
      );

      code.openBlock(`return ${valType}`);
      for (const prop of baseType.properties) {
        code.line(`${prop.name}: ${instanceVar}.${prop.name},`);
      }
      code.closeBlock();

      code.closeBlock();
      code.line();
    }
  }
}
