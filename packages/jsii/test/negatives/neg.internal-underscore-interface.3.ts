///!MATCH_ERROR: the name of members marked as @internal must begin with an underscore

export interface IMyInterface {
  /** @internal */
  methodWithInternalButNoUnderscore(): string;
}
