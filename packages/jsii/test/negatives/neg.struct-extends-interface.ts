// Attempt to extend an interface from a struct (aka data type)
export interface IInterface {
  readonly field: string;
}

export interface Struct extends IInterface {
  readonly another: number;
}
