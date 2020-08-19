// Note: not testing "public -> protected" because this is invalid TypeScript,
//       so the type checker will already have caught it for us.

export class BaseClass {
  protected readonly property?: string;

  protected method() {
    return;
  }
}

export class ChildClass extends BaseClass {
  // This property cannot be public as it overrides the one on BaseClass which is protected
  public readonly property?: string;

  // This method cannot be public as it overrides the one on BaseClass which is protected
  public method() {
    throw new Error('Not Implemented');
  }
}
