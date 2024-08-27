//
// Un-exported base classes are erased
// https://github.com/aws/jsii/issues/417
//
class JSII417PrivateRoot {
  public readonly hasRoot = true;
}
export class JSII417PublicBaseOfBase extends JSII417PrivateRoot {
  public static makeInstance(): JSII417PublicBaseOfBase {
    return new JSII417PrivateBase('TEST');
  }
  public foo(): void {
    return;
  }
}
class JSII417PrivateBase extends JSII417PublicBaseOfBase {
  public constructor(protected readonly property: string) {
    super();
  }
  public bar() {
    return;
  }
}
export class JSII417Derived extends JSII417PrivateBase {
  public bar(): void {
    return super.bar();
  }
  public baz(): void {
    return;
  }
}
// Same thing with interfaces
interface IJSII417PrivateRoot {
  readonly hasRoot: boolean;
}
export interface IJSII417PublicBaseOfBase extends IJSII417PrivateRoot {
  foo(): void;
}
interface IJSII417PrivateBase extends IJSII417PublicBaseOfBase {
  readonly property: string;
  bar(): void;
}
export interface IJSII417Derived extends IJSII417PrivateBase {
  baz(): void;
}

//
// Interfaces should be copied from erased classes to public classes
// https://github.com/aws/jsii/issues/487
//
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface IJsii487External {}
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface IJsii487External2 {}
class Jsii487Internal implements IJsii487External {}
export class Jsii487Derived
  extends Jsii487Internal
  implements IJsii487External2 {}

//
// Deduplicate interfaces that come from different declaration sites
// https://github.com/aws/jsii/issues/496
//
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface IJsii496 {}
class Jsii496Base implements IJsii496 {}
export class Jsii496Derived extends Jsii496Base implements IJsii496 {}
