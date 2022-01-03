/// !hide
/// fake-from-jsii
interface IResolvable {
  resolve(): any;
}
/// !show

class MyClass implements IResolvable {
  public resolve(): any {
    return 42;
  }
}