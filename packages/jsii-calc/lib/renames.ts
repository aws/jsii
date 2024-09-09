export interface IAdder {
  add(a: number, b: number): number;
}

export class Adder implements IAdder {
  public add(a1: number, b1: number): number {
    return a1 + b1;
  }
}
