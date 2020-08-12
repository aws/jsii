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
  public constructor(readonlyString: string, mutableNumber?: number) {
    this.readonlyProperty = readonlyString;
    this.mutableProperty = mutableNumber;
  }

  /** @experimental */
  public method(): void {
    return;
  }
}
/** @experimental */
export enum ExperimentalEnum {
  /** @experimental */
  OPTION_A,
  /** @experimental */
  OPTION_B,
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
  public constructor(readonlyString: string, mutableNumber?: number) {
    this.readonlyProperty = readonlyString;
    this.mutableProperty = mutableNumber;
  }
  /** @stable */
  public method(): void {
    return;
  }
}
/** @stable */
export enum StableEnum {
  /** @stable */
  OPTION_A,
  /** @stable */
  OPTION_B,
}

/** @deprecated it just wraps a string */
export interface DeprecatedStruct {
  /** @deprecated well, yeah */
  readonly readonlyProperty: string;
}
/** @deprecated useless interface */
export interface IDeprecatedInterface {
  /** @deprecated could be better */
  mutableProperty?: number;
  /** @deprecated services no purpose */
  method(): void;
}
/** @deprecated a pretty boring class */
export class DeprecatedClass {
  /** @deprecated this is not always "wazoo", be ready to be disappointed */
  public readonly readonlyProperty: string;
  /** @deprecated shouldn't have been mutable */
  public mutableProperty?: number;
  /** @deprecated this constructor is "just" okay */
  public constructor(readonlyString: string, mutableNumber?: number) {
    this.readonlyProperty = readonlyString;
    this.mutableProperty = mutableNumber;
  }
  /** @deprecated it was a bad idea */
  public method(): void {
    return;
  }
}
/** @deprecated your deprecated selection of bad options */
export enum DeprecatedEnum {
  /** @deprecated option A is not great */
  OPTION_A,
  /** @deprecated option B is kinda bad, too */
  OPTION_B,
}

/** @external */
export interface ExternalStruct {
  /** @external */
  readonly readonlyProperty: string;
}
/** @external */
export interface IExternalInterface {
  /** @external */
  mutableProperty?: number;
  /** @external */
  method(): void;
}
/** @external */
export class ExternalClass {
  /** @external */
  public readonly readonlyProperty: string = 'wazoo';
  /** @external */
  public mutableProperty?: number;
  /** @external */
  public constructor(readonlyString: string, mutableNumber?: number) {
    this.readonlyProperty = readonlyString;
    this.mutableProperty = mutableNumber;
  }
  /** @external */
  public method(): void {
    return;
  }
}
/** @external */
export enum ExternalEnum {
  /** @external */
  OPTION_A,
  /** @external */
  OPTION_B,
}
