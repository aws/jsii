import { CodeMaker } from 'codemaker';
import { Type } from 'jsii-reflect';
import { Package } from '../package';

export interface GoEmitter {
  emit(code: CodeMaker): void;
}

export class GoType {
  public constructor(public parent: Package, public type: Type) {}

  public get name() {
    return this.type.name;
  }

  public get namespace() {
    return this.parent.moduleName;
  }
}
