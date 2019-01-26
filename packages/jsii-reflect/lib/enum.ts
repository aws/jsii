import jsii = require('jsii-spec');
import { Assembly } from './assembly';
import { Type } from './type';
import { TypeSystem } from './type-system';

export class EnumType extends Type {
  constructor(
    public system: TypeSystem,
    public assembly: Assembly,
    private enumSpec: jsii.EnumType) {
    super(system, assembly, enumSpec);
  }

  public get members() {
    return this.enumSpec.members;
  }
}