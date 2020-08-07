// Attempt to return "this" from a hidden base class

abstract class HiddenBaseClass {
  public returnsThis() {
    return this;
  }
}

export class PublicClass extends HiddenBaseClass {
  public constructor(public readonly boolean = true) {
    super();
  }
}
