export class Superclass {}
export class Subclass extends Superclass {}

export class Something {
  public something: Superclass = new Superclass();
}

export class SomethingElse extends Something {
  public addUnrelatedMember: number = 3;
}

// Should still fail even though 2-level inheritance
export class SomethingDifferent extends SomethingElse {
  public something: Subclass = new Subclass();
  public addUnrelatedMember: number = 1;
}
