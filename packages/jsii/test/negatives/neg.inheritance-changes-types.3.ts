export class Superclass {}
export class Subclass extends Superclass {}

export class Something {
  public takeSomething(_argument: Superclass): void {
    // Nothing
  }
}

export class SomethingSpecific extends Something {
  public takeSomething(_argument: Subclass): void {
    // Nothing
  }
}
