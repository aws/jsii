export interface Lyrics {
  readonly dontWorry: string;
  readonly beHappy: string;
}

export class MyClass {
  // Can't have an argument name 'dontWorry' if the last parameter is a datatype
  // which also has a field 'dontWorry'--that will give errors if the datatype
  // argument fields are lifted to keyword arguments.
  public dance(dontWorry: string, lyrics: Lyrics) {
    return `${dontWorry}: ${lyrics.beHappy}`;
  }
}
