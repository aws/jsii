///!STRICT!
///!MATCH_ERROR: 'None' is a reserved word in Python.
///!MATCH_ERROR: 'assert' is a reserved word in Java, Python.
///!MATCH_ERROR: 'do' is a reserved word in C#, Java.
///!MATCH_ERROR: 'internal' is a reserved word in C#.

export class None {
  public readonly do: boolean = true;

  public assert(internal: boolean): void {
    throw new Error();
  }
}
