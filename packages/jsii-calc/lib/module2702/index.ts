// member has the same name as a base class
// @see https://github.com/aws/jsii/issues/2702

import { Base, IBaseInterface } from '@scope/jsii-calc-base';

export class Class1 extends Base {
  public base() {
    return;
  }
}

export class Class2 extends Base {
  public readonly base = 'hello';
}

export class Class3 implements IBaseInterface {
  public bar(): void {
    return;
  }

  public foo(): void {
    return;
  }

  public iBaseInterface() {
    return;
  }
}

export interface IFoo extends IBaseInterface {
  readonly iBaseInterface: string;
}
