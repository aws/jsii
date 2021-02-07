import { CodeMaker, toPascalCase } from 'codemaker';
import { EnumMember, EnumType } from 'jsii-reflect';

import { EmitContext } from '../emit-context';
import { Package } from '../package';
import { GoType } from './go-type';

export class Enum extends GoType {
  public readonly usesInitPackage = false;
  public readonly usesRuntimePackage = false;
  public readonly usesReflectionPackage = false;

  public constructor(pkg: Package, public type: EnumType) {
    super(pkg, type);

    this.stdImports.add('encoding/json');
    this.stdImports.add('fmt');
    this.stdImports.add('errors');
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
    for (const member of this.type.members) {
      const enumKey = this.constSymbolForMember(member);
      const enumType = this.name;
      code.line(`${enumKey} ${enumType} = "${member.name}"`);
    }

    code.close(`)`);
    code.line();

    this.emitMarshal(code);
    this.emitUnmarshal(code);
  }

  public get dependencies(): Package[] {
    return [];
  }

  /**
   * @returns the name of the const symbol which represents one of the members
   * of this enum
   */
  private constSymbolForMember(member: EnumMember) {
    return this.name + toPascalCase(member.name);
  }

  /**
   * Emits a MarshalJSON() method for this enum type.
   */
  private emitMarshal(code: CodeMaker) {
    code.openBlock(`func (member ${this.name}) MarshalJSON() ([]byte, error)`);
    code.line(`fqn := fmt.Sprintf("${this.fqn}/%s", member)`);
    code.line('return json.Marshal(_jsii_.EnumRef{MemberFqn: fqn})');
    code.closeBlock();
    code.line();
  }

  /**
   * Emits UnmarshalJSON() method for this enum type. It maps from `{
   * "$jsii.enum": "MEMBER-FQN" }` to the Go enum const.
   */
  private emitUnmarshal(code: CodeMaker) {
    // generate custom unmarshal code
    code.openBlock(`func (s *${this.name}) UnmarshalJSON(data []byte) error`);
    code.line('var ref _jsii_.EnumRef');
    code.line('err := json.Unmarshal(data, &ref)');
    code.openBlock('if err != nil');
    code.line('return err');
    code.closeBlock();

    code.line('switch ref.MemberFqn {');

    for (const member of this.type.members) {
      code.open(`case "${this.fqn}/${member.name}":`);
      code.line(`*s = ${this.constSymbolForMember(member)}`);
      code.line('return nil');
      code.close();
    }

    code.line('}');
    code.line(
      `return errors.New(fmt.Sprintf("Invalid enum member FQN '%s' for enum '${this.fqn}'", ref.MemberFqn))`,
    );
    code.closeBlock();
    code.line();
  }
}
