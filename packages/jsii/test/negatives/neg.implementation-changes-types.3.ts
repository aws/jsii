export class Superclass {}
export class Subclass extends Superclass {}

export interface ISomething {
  takeSomething(argument: Superclass): void;
}

export class Something implements ISomething {
  public takeSomething(_argument: Subclass): void {
    // Nothing
  }
}
