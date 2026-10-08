# Enum-valued properties can be read and written

A property declared with an enum type MUST be readable and writable from the host. Reading MUST return the enum member
currently held in the kernel; writing MUST send the selected member so that subsequent reads, and kernel code that
consumes the property, observe the new member.

## Reference Implementation

```ts
// GIVEN
export namespace composition {
  export abstract class CompositeOperation {
    public stringStyle = CompositeOperation.CompositionStringStyle.NORMAL;
    public decorationPrefixes = ['<<[[{{'];
    public decorationPostfixes = ['}}]]>>'];

    public abstract readonly expression: { toString(): string };

    public toString() {
      switch (this.stringStyle) {
        case CompositeOperation.CompositionStringStyle.NORMAL:
          return this.expression.toString();
        case CompositeOperation.CompositionStringStyle.DECORATED:
          return this.decorationPrefixes.join('') + this.expression.toString() + this.decorationPostfixes.join('');
      }
    }
  }

  export namespace CompositeOperation {
    export enum CompositionStringStyle {
      NORMAL,
      DECORATED,
    }
  }
}

export class Calculator extends composition.CompositeOperation {
  // Maintains a current value; `add` and `pow` append operations to the expression.
  public add(_value: number): void {
    /* ... */
  }
  public pow(_value: number): void {
    /* ... */
  }
  public get expression() {
    /* ... */ return { toString: () => '(((1 * (0 + 9)) * (0 + 9)) * (0 + 9))' };
  }
}

// WHEN / THEN
const calc = new Calculator();
calc.add(9);
calc.pow(3);

expect(calc.stringStyle).toBe(composition.CompositeOperation.CompositionStringStyle.NORMAL);

calc.stringStyle = composition.CompositeOperation.CompositionStringStyle.DECORATED;
expect(calc.stringStyle).toBe(composition.CompositeOperation.CompositionStringStyle.DECORATED);

expect(calc.toString()).toBe('<<[[{{(((1 * (0 + 9)) * (0 + 9)) * (0 + 9))}}]]>>');
```
