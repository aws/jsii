// Attempt to change optionality of method parameter
export interface IInterface {
  method(required: string, optional?: number): void;
}

export class Implementor implements IInterface {
  public method(_required: string, _optional: number): void {
    // ...
  }
}
