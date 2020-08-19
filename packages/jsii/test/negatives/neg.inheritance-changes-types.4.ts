export class Superclass {}
export class Subclass extends Superclass {}

export class Something {
  public something = new Superclass();
}

export class SomethingSpecific extends Something {
  public something: Subclass = new Subclass();
}
