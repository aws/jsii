import { EnumType, EnumMember, Docs } from 'jsii-reflect';
import { ApiLocation } from 'jsii-rosetta';

import { SpecialDependencies } from '../dependencies';
import { EmitContext } from '../emit-context';
import { Package } from '../package';
import { JSII_RT_ALIAS } from '../runtime';
import { GoType } from './go-type';

export class Enum extends GoType<EnumType> {
  private readonly members: readonly GoEnumMember[];

  public constructor(pkg: Package, type: EnumType) {
    super(pkg, type);

    this.members = type.members.map((mem) => new GoEnumMember(this, mem));
  }

  public get parameterValidators() {
    return [];
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
      member.emit(context);
    }

    code.close(`)`);
    code.line();
  }

  public emitRegistration({ code }: EmitContext): void {
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

  public get specialDependencies(): SpecialDependencies {
    return {
      fmt: false,
      init: false,
      internal: false,
      runtime: false,
      time: false,
    };
  }
}

class GoEnumMember {
  public readonly name: string;
  public readonly rawValue: string;
  private readonly docs: Docs;
  private readonly apiLocation: ApiLocation;

  public constructor(
    private readonly parent: Enum,
    entry: EnumMember,
  ) {
    this.name = `${parent.name}_${entry.name}`;
    this.rawValue = entry.name;
    this.docs = entry.docs;

    this.apiLocation = {
      api: 'member',
      fqn: this.parent.fqn,
      memberName: entry.name,
    };
  }

  public emit({ code, documenter }: EmitContext) {
    documenter.emit(this.docs, this.apiLocation);
    code.line(`${this.name} ${this.parent.name} = "${this.rawValue}"`);
  }
}
