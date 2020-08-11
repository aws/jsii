// Attempt to change optionality of method parameter
export class ParentClass {
  public method(_required: string, _optional?: number): void {
    // ...
  }
}

export class Implementor extends ParentClass {
  public method(_required: string, _optional: number): void {
    // ...
  }
}
