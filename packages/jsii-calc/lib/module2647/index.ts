import { IFriendly, BaseFor2647 } from '@scope/jsii-calc-lib';

/**
 * This class falls into the category of "multiple bases" from a different
 * module from a go code gen perspective.
 *
 * @see https://github.com/aws/jsii/issues/2647
 */
export class ExtendAndImplement extends BaseFor2647 implements IFriendly {
  public localMethod() {
    return 'hi';
  }

  public hello() {
    return 'extends and implements';
  }
}
