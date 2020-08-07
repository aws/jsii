// Attempt to change optionality of method parameter
export interface IInterface {
  property?: string;
}

export class Implementor implements IInterface {
  public property: string;

  constructor() {
    this.property = 'Bazinga!';
  }
}
