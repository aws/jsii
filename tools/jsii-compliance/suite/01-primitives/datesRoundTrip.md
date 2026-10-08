# Date values round-trip through typed and untyped properties

A date value MUST cross the boundary as a date, both when the receiving property is declared with a date type and when
it is declared with a free-form (`any`) type. The host MUST send a date using the protocol's dedicated date encoding and
MUST deserialize it back into the host's date type, preserving the exact instant. A date MUST NOT be transmitted as a
plain string or number.

## Reference Implementation

```ts
// GIVEN
export class AllTypes {
  private dateValue = new Date();
  public get dateProperty(): Date {
    return this.dateValue;
  }
  public set dateProperty(value: Date) {
    if (Object.prototype.toString.call(value) !== '[object Date]') {
      throw new Error('not a date');
    }
    this.dateValue = value;
  }

  public anyProperty: any;
}

// WHEN
const types = new AllTypes();

// strongly-typed date property
types.dateProperty = new Date(123);

// weakly-typed (any) property
types.anyProperty = new Date(999_000);

// THEN
expect(types.dateProperty).toEqual(new Date(123));
expect(types.anyProperty).toEqual(new Date(999_000));
```
