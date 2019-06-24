///!MATCH_ERROR: jsii.Implementor#method changes the optionality of paramerter _optional when overriding jsii.AbstractClass (expected true, found false)

// Attempt to change optionality of method parameter
export abstract class AbstractClass {
  public abstract method(required: string, optional?: number): void;
}

export class Implementor extends AbstractClass {
  public method(_required: string, _optional: number): void {
    // ...
  }
}
