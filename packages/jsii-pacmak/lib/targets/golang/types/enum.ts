import { CodeMaker } from 'codemaker';
import { EnumType } from 'jsii-reflect';
import { GoType } from './go-type';

export class Enum extends GoType {
  public constructor(public type: EnumType) {
    super(type);
  }

  public emit(code: CodeMaker): void {
    // TODO figure out the value type -- probably a string in most cases
    const valueType = 'string';
    code.line(`type ${this.localName} ${valueType}`);
    code.line();
    code.open(`const (`);

    // Const values are prefixed by the wrapped value type
    for (const member of this.type.members) {
      const enumKey = this.localName + code.toPascalCase(member.name);
      const enumType = this.localName;
      code.line(`${enumKey} ${enumType} = "${member.name}"`);
    }

    code.close(`)`);
    code.line();
  }
}
