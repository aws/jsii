///!MATCH_ERROR: jsii.Implementor#property changes optionality of property when overriding jsii.ParentClass

// Attempt to change optionality of method parameter
export class ParentClass {
  public property?: string = undefined;
}

export class Implementor extends ParentClass {
  public property: string;

  constructor() {
    super();
    this.property = 'Bazinga!';
  }
}
