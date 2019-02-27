///!MATCH_ERROR: Interface declares same member as inherited interface: foo

export interface A {
  foo: number;
}
export interface B extends A {
  foo: number;
}
