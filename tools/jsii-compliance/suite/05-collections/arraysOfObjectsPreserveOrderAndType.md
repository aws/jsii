# Arrays of object references cross the boundary preserving order and type

The host MUST be able to assign an array of object references to a property and read it back from the kernel. The array
MUST preserve the order of its elements, and each element MUST be returned as a reference to the same object that was
sent, so that the host can invoke its members and observe the correct declared type.

## Reference Implementation

```ts
// GIVEN
export abstract class NumericValue {
  public abstract readonly value: number;
  public abstract toString(): string;
}

export class Number extends NumericValue {
  public constructor(public readonly value: number) {
    super();
  }
  public toString() {
    return `${this.value}`;
  }
}

abstract class BinaryOperation extends NumericValue {
  public constructor(public readonly lhs: NumericValue, public readonly rhs: NumericValue) {
    super();
  }
}

export class Add extends BinaryOperation {
  public get value() {
    return this.lhs.value + this.rhs.value;
  }
  public toString() {
    return `(${this.lhs} + ${this.rhs})`;
  }
}

export class Multiply extends BinaryOperation {
  public get value() {
    return this.lhs.value * this.rhs.value;
  }
  public toString() {
    return `(${this.lhs} * ${this.rhs})`;
  }
}

export class Sum extends NumericValue {
  public parts: NumericValue[] = [];

  public get expression(): NumericValue {
    let curr: NumericValue = new Number(0);
    for (const part of this.parts) {
      curr = new Add(curr, part);
    }
    return curr;
  }

  public get value() {
    return this.expression.value;
  }

  public toString() {
    return this.expression.toString();
  }
}

// WHEN
const sum = new Sum();
sum.parts = [new Number(5), new Number(10), new Multiply(new Number(2), new Number(3))];

// THEN
expect(sum.value).toBe(10 + 5 + 2 * 3);
expect(sum.parts[0].value).toBe(5);
expect(sum.parts[2].value).toBe(6);
expect(sum.toString()).toBe('(((0 + 5) + 10) + (2 * 3))');
```
