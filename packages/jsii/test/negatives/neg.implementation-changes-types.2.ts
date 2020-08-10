export class Superclass {}
export class Subclass extends Superclass {}

export interface ISomething {
  returnSomething(): Superclass;
}

export class ISomethingElse implements ISomething {
  public returnSomething(): Subclass {
    return new Subclass();
  }
}
