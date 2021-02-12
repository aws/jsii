import { CodeMaker, toPascalCase } from 'codemaker';
import { EnumType, EnumMember } from 'jsii-reflect';

import { EmitContext } from '../emit-context';
import { Package } from '../package';
import { JSII_RT_ALIAS } from '../runtime';
import { GoType } from './go-type';

export class Enum extends GoType {
  public readonly usesInitPackage = false;
  public readonly usesRuntimePackage = false;

  private readonly members: readonly GoEnumMember[];

  public constructor(pkg: Package, public type: EnumType) {
    super(pkg, type);

    this.members = type.members.map((mem) => new GoEnumMember(this, mem));
  }

  public emit(context: EmitContext) {
    this.emitDocs(context);

    const { code } = context;
    // TODO figure out the value type -- probably a string in most cases
    const valueType = 'string';
    code.line(`type ${this.name} ${valueType}`);
    code.line();
    code.open(`const (`);

    // Const values are prefixed by the wrapped value type
    for (const member of this.members) {
      member.emit(code);
    }

    code.close(`)`);
    code.line();
  }

  public emitRegistration(code: CodeMaker): void {
    code.open(`${JSII_RT_ALIAS}.RegisterEnum(`);
    code.line(`"${this.fqn}",`);
    code.line(`reflect.TypeOf((*${this.name})(nil)).Elem(),`);
    code.open(`map[string]interface{}{`);
    for (const member of this.members) {
      code.line(`"${member.rawValue}": ${member.name},`);
    }
    code.close(`},`);
    code.close(')');
  }

  public get dependencies(): Package[] {
    return [];
  }
}

class GoEnumMember {
  public readonly name: string;
  public readonly rawValue: string;

  public constructor(private readonly parent: Enum, entry: EnumMember) {
    this.name = `${parent.name}${toPascalCase(entry.name)}`;
    this.rawValue = entry.name;
  }

  public emit(code: CodeMaker) {
    code.line(`${this.name} ${this.parent.name} = "${this.rawValue}"`);
  }
}
