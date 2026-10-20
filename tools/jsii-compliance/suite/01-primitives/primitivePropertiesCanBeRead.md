# Primitive properties of objects can be read

The host MUST be able to read a primitive-typed property (such as a number) of an object reference it created or
received, receiving the value the kernel computed for it. When the host creates an object, it MUST pass any jsii object
instances given as constructor arguments to the kernel by reference, so that properties derived from them are computed in
the kernel and read back with the correct value.

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
  public get doubleValue() {
    return 2 * this.value;
  }
}

export class Add extends NumericValue {
  public constructor(public readonly lhs: NumericValue, public readonly rhs: NumericValue) {
    super();
  }
  public get value() {
    return this.lhs.value + this.rhs.value;
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

export class Negate extends NumericValue {
  public constructor(public readonly operand: NumericValue) {
    super();
  }
  public get value() {
    return -1 * this.operand.value;
  }
}

export class Power extends NumericValue {
  public constructor(public readonly base: NumericValue, public readonly pow: NumericValue) {
    super();
  }
  public get value() {
    let result = 1;
    for (let i = 0; i < this.pow.value; ++i) {
      result *= this.base.value;
    }
    return result;
  }
}

// WHEN
const number = new Number(20);

// THEN
expect(number.value).toBe(20);
expect(number.doubleValue).toBe(40);
expect(new Negate(new Add(new Number(20), new Number(10))).value).toBe(-30);
expect(new Multiply(new Add(new Number(5), new Number(5)), new Number(2)).value).toBe(20);
expect(new Power(new Number(3), new Number(4)).value).toBe(81);
expect(new Power(new Number(999), new Number(1)).value).toBe(999);
expect(new Power(new Number(999), new Number(0)).value).toBe(1);
```
