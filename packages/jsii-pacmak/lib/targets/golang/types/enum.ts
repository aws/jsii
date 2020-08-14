import { CodeMaker } from 'codemaker';
import { EnumType } from 'jsii-reflect';
import { GoType } from './go-type';
import { Module } from '../module';

// TODO: This whole thing
export class Enum extends GoType {
  public constructor(parent: Module, public type: EnumType) {
    super(parent, type);
  }

  public emit(code: CodeMaker) {
    // TODO figure out the value type -- probably a string in most cases
    const valueType = 'string';
    code.line(`type ${this.name} ${valueType}`);
    code.line();
    code.open(`const (`);

    // Const values are prefixed by the wrapped value type
    for (const member of this.type.members) {
      const enumKey = this.name + code.toPascalCase(member.name);
      const enumType = this.name;
      code.line(`${enumKey} ${enumType} = "${member.name}"`);
    }

    code.close(`)`);
    code.line();
  }

  public get dependencies(): Module[] {
    return [];
  }
}
