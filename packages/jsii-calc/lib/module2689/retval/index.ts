import { BaseProps } from '@scope/jsii-calc-base';
import { Number as NumberClass } from '@scope/jsii-calc-lib';

export class MyClass {
  public foo(): NumberClass[] {
    return [];
  }

  public bar(): { [k: string]: BaseProps } {
    return {};
  }
}
