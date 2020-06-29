import { CodeMaker } from 'codemaker';
import { EnumType } from 'jsii-reflect';
import { GoType } from './go-type';

export class Enum extends GoType {
  public constructor(public type: EnumType) {
    super(type);
  }

  public emit(_code: CodeMaker) {}
}
