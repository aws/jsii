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

export class ConsumesUnion {
  public static unionType(param: IResolvable | Resolvable | IFriendly) {
    void param;
  }

  private constructor() {}
}
