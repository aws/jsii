///!MATCH_ERROR: Attempted to implement a struct from class Illegal

// Attempt to implement a Struct (aka data type) will fail.
export interface Struct {
  readonly field: string;
}

export class Illegal implements Struct {
  public readonly field: string = 'foo';

  public method(): void {
    return;
  }
}
