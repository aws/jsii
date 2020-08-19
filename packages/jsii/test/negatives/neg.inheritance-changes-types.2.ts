export class Superclass {}
export class Subclass extends Superclass {}

export class Something {
  public returnSomething(): Superclass {
    return new Superclass();
  }
}

export class SomethingSpecific extends Something {
  public returnSomething(): Subclass {
    return new Subclass();
  }
}
