# Maps of object references can be read from the kernel

The host MUST be able to read a property or method result whose declared type is a map (keyed by string) whose values
are arrays of object references. The host MUST observe every key present in the map, and MUST be able to read each nested
array and the members of its elements.

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
  public operationsMap: { [op: string]: NumericValue[] } = {};
  private curr: NumericValue = new Number(0);

  public add(value: number): void {
    this.curr = new Number(this.curr.value + value);
    this.record('add', this.curr);
  }

  public mul(value: number): void {
    this.curr = new Number(this.curr.value * value);
    this.record('mul', this.curr);
  }

  private record(op: string, result: NumericValue): void {
    const list = (this.operationsMap[op] ??= []);
    list.push(result);
  }
}

// WHEN
const calc = new Calculator();
calc.add(10);
calc.add(20);
calc.mul(2);

// THEN
expect(calc.operationsMap['add'].length).toBe(2);
expect(calc.operationsMap['mul'].length).toBe(1);
expect(calc.operationsMap['add'][1].value).toBe(30);
```
