# Union-typed properties accept and return each member type

A property declared as a union of types MUST accept a value of any member of the union and return it with that member's
type and value. This applies to scalar unions as well as to unions nested inside list- and map-typed properties: each
element MUST retain its concrete type across the boundary, so the host can tell which member of the union it received.

## Reference Implementation

```ts
// GIVEN
export class Number {
  public constructor(public readonly value: number) {}
}

export class Multiply {
  public constructor(public readonly lhs: Number, public readonly rhs: Number) {}
  public get value() {
    return this.lhs.value * this.rhs.value;
  }
}

export class AllTypes {
  public unionProperty: string | number | Number | Multiply = 'foo';
  public unionArrayProperty: Array<Number | number> = [];
  public unionMapProperty: { [key: string]: Number | number | string } = {};
}

// WHEN / THEN
const types = new AllTypes();

types.unionProperty = 1234;
expect(types.unionProperty).toBe(1234);

types.unionProperty = 'Hello';
expect(types.unionProperty).toBe('Hello');

types.unionProperty = new Multiply(new Number(2), new Number(12));
expect((types.unionProperty as Multiply).value).toBe(24);

types.unionMapProperty = { Foo: new Number(99) };
types.unionArrayProperty = [123, new Number(33)];
expect((types.unionArrayProperty[1] as Number).value).toBe(33);
```
