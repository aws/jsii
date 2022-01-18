export interface IHasOptionalProperty {
  readonly optionalProperty?: number;
}

export abstract class HasRequiredPropertyBase {
  readonly optionalProperty: number; // Does not implement IHasOptionalProperty.optionalProperty

  protected constructor(value: number) {
    this.optionalProperty = value;
  }
}

export class HasRequiredProperty extends HasRequiredPropertyBase implements IHasOptionalProperty {
  // Inherits optionalProperty from HasRequiredPropertyBase, but does not implement IHasOptionalProperty correctly.
}
