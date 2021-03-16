import { BaseProps } from '@scope/jsii-calc-base';
import { Number as NumberClass } from '@scope/jsii-calc-lib';

export interface MyStruct {
  readonly numbers: NumberClass[];
  readonly baseMap: { [key: string]: BaseProps };
}
