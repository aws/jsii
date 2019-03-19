///!MATCH_ERROR: the name of members marked as @internal must begin with an underscore

export interface IMyInterface {
  /** @internal */
  propertyWithInternalButNotUnderscorePrefix: string;
}
