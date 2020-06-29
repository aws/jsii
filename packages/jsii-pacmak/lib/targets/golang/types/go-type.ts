import { Type } from 'jsii-reflect';
import { goNameFromJs } from '../util';

export class GoType {
  private readonly name: string;

  public constructor(public type: Type) {
    this.name = type.name;
  }

  public get localName() {
    return goNameFromJs(this.name);
  }
}
