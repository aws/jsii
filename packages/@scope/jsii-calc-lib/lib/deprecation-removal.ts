export interface IInterface {
  method(): void;
}

/** @deprecated do not use me! */
export class DeprecatedImplementation implements IInterface {
  public method(): void { }
}

export class InterfaceFactory {
  public static create(): IInterface {
    return new DeprecatedImplementation();
  }

  private constructor() { }
}
