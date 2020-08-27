export class Superclass {}
export class Subclass extends Superclass {}

export interface ISomething {
  something: Superclass;
}

export class SomethingImpl implements ISomething {
  public something: Subclass = new Subclass();
}
