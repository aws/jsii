/**
 * This module demonstrates covariant overrides support in jsii.
 *
 * Covariant overrides allow derived classes to override methods with more specific return types.
 * This was previously not supported because C# didn't allow it, but newer versions of C# (9.0+) do.
 */

/** Base class in the inheritance hierarchy */
export class Superclass {
  public name = 'Superclass';
  public sayHello(): string {
    return 'Hello Superclass';
  }
}

/** Derived class that extends Superclass */
export class Subclass extends Superclass {
  public name = 'Subclass';
  public sayHello(): string {
    return 'Hello Subclass';
  }
}

/** Further derived class that extends Subclass */
export class SubSubclass extends Subclass {
  /**
   * Ensures this class is different than its parent.
   */
  public unique = 'yes';

  public name = 'SubSubclass';
  public sayHello(): string {
    return 'Hello SubSubclass';
  }
}

export interface IBase {
  readonly something: Superclass;
}

/** Base class with methods and properties that will be overridden with covariant return types */
export class Base implements IBase {
  public readonly something: Superclass = new Superclass();
  public readonly list: Superclass[] = new Array<Superclass>();

  public createSomething(): Superclass {
    return new Superclass();
  }
}

/** Middle class in the inheritance chain - doesn't override anything */
export class Middle extends Base {
  public addUnrelatedMember = 3;
}

/**
 * Derived class that demonstrates covariant overrides.
 *
 * Both property and method overrides are covariant and will work in C# 9.0+
 * when the covariant-overrides feature is enabled.
 */
export class Derived extends Middle {
  // This property override is covariant (SubSubclass extends Superclass)
  public readonly something: SubSubclass = new SubSubclass();
  public readonly list: Superclass[] = new Array<SubSubclass>();

  // This method override is covariant and will work in C# 9.0+
  public createSomething(): SubSubclass {
    return new SubSubclass();
  }
}
