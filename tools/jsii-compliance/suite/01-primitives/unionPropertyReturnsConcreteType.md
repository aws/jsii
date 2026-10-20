# A union property returns the concrete type that was set

When the host assigns an object reference to a property declared as a union of class types, reading the property back
MUST return a reference of the same concrete type, so the host can distinguish which member of the union it holds. Kernel
code that consumes the property MUST observe the value that was most recently set.

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
export class Multiply {
  public constructor(public readonly lhs: Number, public readonly rhs: Number) {}
  public get value() {
    return this.lhs.value * this.rhs.value;
  }
}
export class Power {
  public constructor(public readonly base: Number, public readonly pow: Number) {}
  public get value() {
    return this.base.value ** this.pow.value;
  }
}

export class Calculator {
  /** A property that accepts a union of class types. */
  public unionProperty?: Add | Multiply | Power;

  /** Returns the value of the union property (if defined), read from within the kernel. */
  public readUnionValue() {
    return this.unionProperty ? this.unionProperty.value : 0;
  }
}

// WHEN / THEN
const calc = new Calculator();

calc.unionProperty = new Multiply(new Number(9), new Number(3));
expect(calc.unionProperty instanceof Multiply).toBe(true);
expect(calc.readUnionValue()).toBe(27);

calc.unionProperty = new Power(new Number(10), new Number(3));
expect(calc.unionProperty instanceof Power).toBe(true);
```
