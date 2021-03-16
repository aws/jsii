import { BaseProps } from '@scope/jsii-calc-base';
import { Number as NumberClass } from '@scope/jsii-calc-lib';

export class MyClass {
  public foo(_values: NumberClass[]) {
    return;
  }

  public bar(_bar: { [k: string]: BaseProps }) {
    return;
  }
}
