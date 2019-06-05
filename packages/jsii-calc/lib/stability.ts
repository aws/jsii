// The following tests validate emission of stability markers

/** @experimental */
export interface ExperimentalStruct {
  /** @experimental */
  readonly readonlyProperty: string;
}
/** @experimental */
export interface IExperimentalInterface {
  /** @experimental */
  mutableProperty?: number;
  /** @experimental */
  method(): void;
}
/** @experimental */
export class ExperimentalClass {
  /** @experimental */
  public readonly readonlyProperty: string;
  /** @experimental */
  public mutableProperty?: number;
  /** @experimental */
  constructor(readonlyString: string, mutableNumber?: number) {
    this.readonlyProperty = readonlyString;
    this.mutableProperty = mutableNumber;
  }

  /** @experimental */
  public method(): void { return; }
}
/** @experimental */
export enum ExperimentalEnum {
  /** @experimental */
  OptionA,
  /** @experimental */
  OptionB
}

/** @stable */
export interface StableStruct {
  /** @stable */
  readonly readonlyProperty: string;
}
/** @stable */
export interface IStableInterface {
  /** @stable */
  mutableProperty?: number;
  /** @stable */
  method(): void;
}
/** @stable */
export class StableClass {
  /** @stable */
  public readonly readonlyProperty: string = 'wazoo';
  /** @stable */
  public mutableProperty?: number;
  /** @stable */
  constructor(readonlyString: string, mutableNumber?: number) {
    this.readonlyProperty = readonlyString;
    this.mutableProperty = mutableNumber;
  }
  /** @stable */
  public method(): void { return; }
}
/** @stable */
export enum StableEnum {
  /** @stable */
  OptionA,
  /** @stable */
  OptionB
}

/** @deprecated for the show */
export interface DeprecatedStruct {
  /** @deprecated for the show */
  readonly readonlyProperty: string;
}
/** @deprecated for the show */
export interface IDeprecatedInterface {
  /** @deprecated for the show */
  mutableProperty?: number;
  /** @deprecated for the show */
  method(): void;
}
/** @deprecated for the show */
export class DeprecatedClass {
  /** @deprecated for the show */
  public readonly readonlyProperty: string = 'wazoo';
  /** @deprecated for the show */
  public mutableProperty?: number;
  /** @deprecated for the show */
  constructor(readonlyString: string, mutableNumber?: number) {
    this.readonlyProperty = readonlyString;
    this.mutableProperty = mutableNumber;
  }
  /** @deprecated for the show */
  public method(): void { return; }
}
/** @deprecated for the show */
export enum DeprecatedEnum {
  /** @deprecated for the show */
  OptionA,
  /** @deprecated for the show */
  OptionB
}
