// @see https://github.com/aws/jsii/issues/2617

export class OnlyStatics {
  public static foo() {
    return;
  }
  public static bar() {
    return;
  }
  private constructor() {}
}
