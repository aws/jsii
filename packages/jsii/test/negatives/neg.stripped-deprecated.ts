///!STRIP_DEPRECATED!

/** @deprecated just don't use this! */
export interface DeprecatedInterface {}

export class LeftoverUsage {
  public ouch?: DeprecatedInterface;

  public constructor(public readonly no: DeprecatedInterface) {}

  public bad(parameter: DeprecatedInterface): DeprecatedInterface {
    return parameter;
  }
}
