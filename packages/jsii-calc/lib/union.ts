import { IFriendly } from '@scope/jsii-calc-lib';

export interface IResolvable {
  resolve(): any;
}

export class Resolvable implements IResolvable {
  private constructor() {}

  public resolve(): any {
    return false;
  }
}

export interface UnionResolvableStruct {
  readonly value: string;
}

export class ConsumesUnion {
  public static unionType(param: IResolvable | Resolvable | IFriendly) {
    void param;
  }

  public unionProperty?: IResolvable | UnionResolvableStruct;

  private constructor() {}
}
