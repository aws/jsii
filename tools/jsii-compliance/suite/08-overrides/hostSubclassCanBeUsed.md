# A host subclass of a jsii class can be used across the boundary

The host MUST be able to declare a subclass of a jsii class and create instances of it. Such an instance MUST be passed
to the kernel by reference, as the base type, so that the kernel operates on the very same object. When the subclass adds
no overrides and only supplies constructor arguments to the base class, every member the kernel invokes MUST behave
exactly as it does for a directly instantiated base class, including members inherited from the base.

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

export abstract class BinaryOperation extends NumericValue {
  public constructor(public readonly lhs: NumericValue, public readonly rhs: NumericValue) {
    super();
  }
}

export class Add extends BinaryOperation {
  public get value() {
    return this.lhs.value + this.rhs.value;
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

export class Calculator extends NumericValue {
  public curr: NumericValue = new Number(0);
  public get value() {
    return this.curr.value;
  }
  public neg() {
    this.curr = new Negate(this.curr);
  }
}

// Host subclass that adds no overrides; it only fixes the constructor arguments of the base class.
class AddTen extends Add {
  public constructor(value: number) {
    super(new Number(value), new Number(10));
  }
}

// WHEN
const calc = new Calculator();
calc.curr = new AddTen(33);
calc.neg();

// THEN
expect(calc.value).toBe(-43);
```
