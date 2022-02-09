export interface IIndirectlyImplemented {
  readonly property: string;
  method(): number;
}

export abstract class BaseClass {
  public readonly property = 'YES';

  protected constructor() {}

  public method(): number {
    return 1337;
  }
}

export class FullCombo extends BaseClass implements IIndirectlyImplemented {
  private constructor() {
    super();
  }

  // Obtains implementation of IIndirectlyImplemented from BaseClass
}
