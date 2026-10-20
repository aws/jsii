# Object-valued properties can be read and assigned

The host MUST be able to read a property whose declared type is a class, receiving an object reference from the kernel,
and MUST be able to assign such a property by sending an object reference back to the kernel. A reference that the host
obtained from a previous read MUST remain usable as an argument in a later request, and the kernel MUST resolve it to the
same underlying object. The effect of the assignment MUST be observable through later reads.

## Reference Implementation

```ts
// GIVEN
export abstract class NumericValue {
  public abstract readonly value: number;
}

export class Number extends NumericValue {
  public constructor(public readonly value: number) {
    super();
  }
}

export class Multiply extends NumericValue {
  public constructor(public readonly lhs: NumericValue, public readonly rhs: NumericValue) {
    super();
  }
  public get value() {
    return this.lhs.value * this.rhs.value;
  }
}

export class Calculator {
  public curr: NumericValue = new Number(0);

  public add(value: number) {
    this.curr = new Number(this.curr.value + value);
  }
  public neg() {
    this.curr = new Number(-this.curr.value);
  }
  public get value() {
    return this.curr.value;
  }
}

// WHEN
const calc = new Calculator();
calc.add(3200000);
calc.neg();
const previous = calc.curr; // an object reference read from the kernel
calc.curr = new Multiply(new Number(2), previous); // sent back as an argument

// THEN
expect(calc.value).toBe(-6400000);
```
