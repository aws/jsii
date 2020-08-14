import { CodeMaker } from 'codemaker';
import { Type } from 'jsii-reflect';
import { Module } from '../module';

export interface GoEmitter {
  emit(code: CodeMaker): void;
}

export class GoType {
  public constructor(public parent: Module, public type: Type) {}

  public get name() {
    return this.type.name;
  }

  public get namespace() {
    return this.parent.packageName;
  }
}
