/**
 * Verifies a method with parameters "_" can be generated.
 * @see https://github.com/aws/jsii/issues/2530
 */
export class MyClass {
  public static bar(_: boolean) {
    return;
  }

  public constructor(_: number) {
    return;
  }

  public foo(_: string) {
    return;
  }

  public multipleUnderscores(_: string, __: string, ___: string) {
    return;
  }
}
