///!MATCH_ERROR:Prohibited member name: equals

export class SomeClass {
  public equals(): boolean {
    return true;
  }
}
