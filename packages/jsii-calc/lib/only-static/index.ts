/**
 * Test for https://github.com/aws/jsii/issues/2617
 */
export class OnlyStaticMethods {
  public static staticMethod() {
    return 'hello';
  }

  private constructor() {}
}
