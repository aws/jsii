///!MATCH_ERROR: member 'funFunction' of class 'TheClass' cannot be declared both statically and non-statically

export class TheClass {
  public static funFunction() {
    // Empty
  }

  public funFunction() {
    // Empty
  }
}