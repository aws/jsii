import { CodeMaker } from 'codemaker';
import { Type } from 'jsii-reflect';
import { BasePackage } from '../base-package';

export interface GoEmitter {
  emit(code: CodeMaker): void;
}

export class GoType {
  public constructor(public parent: BasePackage, public type: Type) {}

  public get name() {
    return this.type.name;
  }

  public get namespace() {
    return this.parent.moduleName;
  }
}
