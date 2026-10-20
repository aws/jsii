# Instance methods can be invoked and mutate kernel state

The host MUST be able to invoke an instance method on an object reference by sending an `invoke` request to the kernel,
forwarding the arguments it was given. When a method mutates the object's state, that effect MUST be observable through
subsequent property reads on the same reference. Each call MUST operate on the state left by the previous call.

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

export class Calculator {
  public curr: NumericValue = new Number(0);

  public add(value: number) {
    this.curr = new Add(this.curr, new Number(value));
  }
  public mul(value: number) {
    this.curr = new Multiply(this.curr, new Number(value));
  }
  public get value() {
    return this.curr.value;
  }
}

// WHEN
const calc = new Calculator();
calc.add(10);
const afterAdd = calc.value;
calc.mul(2);
const afterMul = calc.value;

// THEN
expect(afterAdd).toBe(10);
expect(afterMul).toBe(20);
```
