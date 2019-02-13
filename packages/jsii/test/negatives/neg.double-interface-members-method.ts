///!MATCH_ERROR: Interface declares same member as inherited interface: foo

export interface IA {
  foo(): void;
}
export interface IB extends IA {
  foo(): void;
}

