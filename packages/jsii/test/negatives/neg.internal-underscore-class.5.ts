///!MATCH_ERROR: the name of members marked as @internal must begin with an underscore

export class MyClass {
  /** @internal */
  public propertyWithInternalButNotUnderscorePrefix?: string;
}
