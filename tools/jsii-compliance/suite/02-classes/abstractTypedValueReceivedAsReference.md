# Values of an abstract declared type are received as references

When the host reads a property or return value whose declared type is an abstract class, the kernel returns an object
reference. The host MUST represent that value using the declared abstract type and MUST be able to invoke the abstract
type's members on it, even though the host cannot know the concrete runtime type of the object.

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

export class Calculator {
  public curr: NumericValue = new Number(0);

  public add(value: number) {
    this.curr = new Number(this.curr.value + value);
  }
}

// WHEN
const calc = new Calculator();
calc.add(120);
const value: NumericValue = calc.curr;

// THEN
expect(value.value).toBe(120);
```
