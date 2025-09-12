/**
 * This module demonstrates covariant overrides support in jsii.
 *
 * Covariant overrides allow derived classes to override methods with more specific return types.
 * This was previously not supported because C# didn't allow it, but newer versions of C# (9.0+) do.
 */

/** Base class in the inheritance hierarchy */
export class ASuperclass {}

/** Derived class that extends Superclass */
export class BSubclass extends ASuperclass {}

/** Further derived class that extends Subclass */
export class CSubSubclass extends BSubclass {}

export interface IBase {
  readonly something: ASuperclass;
}

/** Base class with methods and properties that will be overridden with covariant return types */
export class OriginalBase implements IBase {
  public readonly something: ASuperclass = new ASuperclass();
  public createSomething(): ASuperclass {
    return new ASuperclass();
  }
}

/** Middle class in the inheritance chain - doesn't override anything */
export class SomethingInTheMiddle extends OriginalBase {
  public addUnrelatedMember = 3;
}

/**
 * Derived class that demonstrates covariant overrides.
 *
 * Both property and method overrides are covariant and will work in C# 9.0+
 * when the covariant-overrides feature is enabled.
 */
export class TheEnd extends SomethingInTheMiddle {
  // This property override is covariant (SubSubclass extends Superclass)
  public readonly something: CSubSubclass = new CSubSubclass();

  // This method override is covariant and will work in C# 9.0+
  public createSomething(): CSubSubclass {
    return new CSubSubclass();
  }
}
