import * as jsii from '@jsii/spec';

import { Assembly } from './assembly';
import { Docs, Documentable } from './docs';
import { Type } from './type';
import { TypeSystem } from './type-system';

export class EnumType extends Type {
  public constructor(
    public system: TypeSystem,
    public assembly: Assembly,
    public readonly spec: jsii.EnumType,
  ) {
    super(system, assembly, spec);
  }

  public get members() {
    return this.spec.members.map((m) => new EnumMember(this, m));
  }

  public isEnumType(): this is EnumType {
    return true;
  }
}

export class EnumMember implements Documentable {
  public readonly name: string;
  public readonly docs: Docs;

  public constructor(
    public readonly enumType: EnumType,
    memberSpec: jsii.EnumMember,
  ) {
    this.name = memberSpec.name;
    this.docs = new Docs(
      this.system,
      this,
      memberSpec.docs ?? {},
      this.enumType.docs,
    );
  }

  public get system(): TypeSystem {
    return this.enumType.system;
  }
  public get assembly(): Assembly {
    return this.enumType.assembly;
  }
}
