// Attempt to extend a Struct (aka data type) from a regular interface will fail.
export interface Struct {
  readonly field: string;
}

export interface IIllegal extends Struct {
  method(): void;
}
