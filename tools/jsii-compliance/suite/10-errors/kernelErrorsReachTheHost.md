# Errors thrown by the kernel surface to the host

When a method or constructor the host invoked throws an error in the kernel, that error MUST be surfaced to the host as
an error raised at the call site, interrupting the call. Once the condition that caused the error no longer holds,
subsequent calls MUST succeed normally.

## Reference Implementation

```ts
// GIVEN
export class Number {
  public constructor(public readonly value: number) {}
}
export class Add {
  public constructor(public readonly lhs: Number, public readonly rhs: Number) {}
  public get value() {
    return this.lhs.value + this.rhs.value;
  }
}

export interface CalculatorProps {
  readonly initialValue?: number;
  readonly maximumValue?: number;
}

export class Calculator {
  public curr: Number;
  public maxValue?: number;

  public constructor(props: CalculatorProps = {}) {
    this.curr = new Number(props.initialValue ?? 0);
    this.maxValue = props.maximumValue;
  }

  public add(value: number) {
    const result = new Add(this.curr, new Number(value));
    if (this.maxValue && result.value > this.maxValue) {
      throw new Error(`Operation ${result.value} exceeded maximum value ${this.maxValue}`);
    }
    this.curr = new Number(result.value);
  }

  public get value() {
    return this.curr.value;
  }
}

// WHEN / THEN
const calc = new Calculator({ initialValue: 20, maximumValue: 30 });
calc.add(3);
expect(calc.value).toBe(23);

// exceeding the maximum throws in the kernel, surfacing as an error to the host
expect(() => calc.add(10)).toThrow();

// after raising the limit, the same call succeeds
calc.maxValue = 40;
calc.add(10);
expect(calc.value).toBe(33);
```
