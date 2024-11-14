export interface Structure {
  readonly bool: boolean;
}

export enum Goodness {
  /** It's pretty good */
  PRETTY_GOOD,
  /** It's really good */
  REALLY_GOOD,
  /** It's amazingly good */
  AMAZINGLY_GOOD,
}

// There's only one way around these woods...
export enum Awesomeness {
  /** It was awesome! */
  AWESOME,
}

/**
 * Checks that classes can self-reference during initialization.
 * @see https://github.com/aws/jsii/pull/1706
 */
export class OuterClass {
  public readonly innerClass: InnerClass;

  public constructor() {
    this.innerClass = new InnerClass();
  }
}
export enum SomeEnum {
  SOME = 'SOME',
}
export interface SomeStruct {
  readonly prop: SomeEnum;
}
export class InnerClass {
  public static readonly staticProp: SomeStruct = { prop: SomeEnum.SOME };
}

export interface KwargsProps extends SomeStruct {
  readonly extra?: string;
}
