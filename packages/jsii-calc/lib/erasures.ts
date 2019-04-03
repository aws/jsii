//
// Un-exported base classes are erased
// https://github.com/awslabs/jsii/issues/417
//
class JSII417PrivateRoot {
  public readonly hasRoot = true;
}
export class JSII417PublicBaseOfBase extends JSII417PrivateRoot {
  public static makeInstance(): JSII417PublicBaseOfBase {
    return new JSII417PrivateBase("TEST");
  }
  public foo() { return; }
}
class JSII417PrivateBase extends JSII417PublicBaseOfBase {
  constructor(protected readonly property: string) {
    super();
  }
  public bar() { return; }
}
export class JSII417Derived extends JSII417PrivateBase {
  public bar() {
    return super.bar();
  }
  public baz() { return; }
}
