export class Superclass {}
export class Subclass extends Superclass {}

export class SomethingBase {
  public something: Superclass = new Superclass();
}

export class SomethingElse extends SomethingBase {
  public addUnrelatedMember = 3;
}

// Should still fail even though 2-level inheritance
export class SomethingDifferent extends SomethingElse {
  public something: Subclass = new Subclass();
  public addUnrelatedMember = 1;
}
