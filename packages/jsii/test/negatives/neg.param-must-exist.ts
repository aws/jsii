///!MATCH_ERROR: In doc block of 'helpMe', '@param benKenobi' refers to a nonexistent parameter.

export class Foo {
  /**
   * Ask for help
   *
   * @param benKenobi The person you want to ask for help
   */
  public helpMe(obiWanKenobi: string) {
    Array.isArray(obiWanKenobi);
  }
}