# Untyped (any) values preserve their runtime type

A property declared with a free-form (`any`) type MUST carry a value's runtime type across the boundary unchanged.
Booleans, strings, numbers and dates MUST be received as the corresponding host type; arrays and objects MUST be
received as the host's list and map types, including when nested; and an object reference assigned through an untyped
property MUST be returned as the same reference, so the host can recover its concrete type. A plain object MUST NOT be
auto-detected as a date, even when its contents resemble one.

## Reference Implementation

```ts
// GIVEN
export class AllTypes {
  public anyProperty: any;
  public anyArrayProperty: any[] = [];
  public anyMapProperty: { [key: string]: any } = {};
}

export class Number {
  public constructor(public readonly value: number) {}
}

export class Multiply {
  public constructor(public readonly lhs: Number, public readonly rhs: Number) {}
  public get value() {
    return this.lhs.value * this.rhs.value;
  }
}

// WHEN / THEN
const types = new AllTypes();

types.anyProperty = false;
expect(types.anyProperty).toBe(false);

types.anyProperty = 'String';
expect(types.anyProperty).toBe('String');

types.anyProperty = 12;
expect(types.anyProperty).toBe(12);

types.anyProperty = new Date(1_234_000);
expect(types.anyProperty).toEqual(new Date(1_234_000));

// nested object/array structure is received as nested maps/lists
types.anyProperty = { Goo: ['Hello', { World: 123 }] };
expect(types.anyProperty.Goo[1].World).toBe(123);

types.anyProperty = ['Hello', 'World'];
expect(types.anyProperty[0]).toBe('Hello');
expect(types.anyProperty[1]).toBe('World');

types.anyArrayProperty = ['Hybrid', new Number(12), 123, false];
expect(types.anyArrayProperty[2]).toBe(123);

types.anyMapProperty = { MapKey: 'MapValue' };
expect(types.anyMapProperty.MapKey).toBe('MapValue');

// object references round-trip by reference, keeping their concrete type
const mult = new Multiply(new Number(10), new Number(20));
types.anyProperty = mult;
expect(types.anyProperty).toBe(mult);
expect(types.anyProperty instanceof Multiply).toBe(true);
expect((types.anyProperty as Multiply).value).toBe(200);
```
