///!MATCH_ERROR: jsii.Implementor#property changes optionality of property when overriding jsii.AbstractClass

// Attempt to change optionality of method parameter
export abstract class AbstractClass {
  public abstract property?: string;
}

export class Implementor extends AbstractClass {
  public property: string;

  constructor() {
    super();
    this.property = 'Bazinga!';
  }
}
