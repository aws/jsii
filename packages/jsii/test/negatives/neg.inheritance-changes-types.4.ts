export class Superclass {}
export class Subclass extends Superclass {}

export class SomethingUnspecific {
  public something = new Superclass();
}

export class SomethingSpecific extends SomethingUnspecific {
  public something: Subclass = new Subclass();
}
