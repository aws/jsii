export interface IA {
  foo(): void;
}

export interface IB extends IA {
  bar(): void;
}

export interface IC extends IB {
  foo(): void;
}
