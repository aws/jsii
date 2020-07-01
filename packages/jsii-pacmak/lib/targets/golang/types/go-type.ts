import { Type } from 'jsii-reflect';

export class GoType {
  private readonly name: string;

  public constructor(public type: Type) {
    this.name = type.name;
  }

  public get localName() {
    return this.name;
  }
}
