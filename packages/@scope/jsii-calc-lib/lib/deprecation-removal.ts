export class VisibleBaseClass {
  public readonly propertyPresent: boolean;

  public constructor() {
    this.propertyPresent = true;
  }
}

export interface IInterface {
  method(): void;
}

/** @deprecated do not use me! */
export class DeprecatedImplementation
  extends VisibleBaseClass
  implements IInterface
{
  public method(): void {
    /** NOOP */
  }
}

export class InterfaceFactory {
  public static create(): IInterface {
    return new DeprecatedImplementation();
  }

  private constructor() {}
}
