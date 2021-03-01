import { DiamondLeft, DiamondRight } from '@scope/jsii-calc-lib';

// This is half of the contraption, the rest is in @scope/jsii-calc-lib.
//
// @see https://github.com/aws/jsii/issues/2256

export interface DiamondBottom extends DiamondLeft, DiamondRight {
  readonly bottom?: Date;
}
