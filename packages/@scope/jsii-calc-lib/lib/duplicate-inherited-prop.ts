// This is half of the contraption, the rest is in jsii-calc
//
// @see https://github.com/aws/jsii/issues/2256

/**
 * This struct is intentionally private. Any type that implements it will get
 * a copy of it's properties hoisted in by jsii.
 */
interface InternalDiamondTip {
  readonly hoistedTop?: string;
}

export interface DiamondLeft extends InternalDiamondTip {
  readonly left?: number;
}

export interface DiamondRight extends InternalDiamondTip {
  readonly right?: boolean;
}
