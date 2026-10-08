# Primitive values round-trip with their declared type

A property declared with a primitive type MUST accept a value of that type from the host, send it to the kernel on
assignment, and return an equal value of the same type when read back. This applies to booleans, strings, numbers, dates
and free-form JSON objects. The host MUST serialize each value using the wire representation the kernel expects for that
type &mdash; in particular, a date MUST be sent using the protocol's dedicated date encoding, and MUST NOT be sent as a
plain string or number &mdash; and MUST deserialize reads back into the corresponding host type.

## Reference Implementation

```ts
// GIVEN
export class AllTypes {
  private boolValue = false;
  public get booleanProperty() {
    return this.boolValue;
  }
  public set booleanProperty(value: boolean) {
    if (typeof value !== 'boolean') {
      throw new Error('not a boolean');
    }
    this.boolValue = value;
  }

  // stringProperty and numberProperty are declared the same way, guarding `typeof value`.
  public stringProperty = '';
  public numberProperty = 0;

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

  private jsonValue: object = {};
  public get jsonProperty(): object {
    return this.jsonValue;
  }
  public set jsonProperty(value: object) {
    if (typeof value !== 'object') {
      throw new Error('not an object');
    }
    this.jsonValue = value;
  }
}

// WHEN
const types = new AllTypes();
types.booleanProperty = true;
types.stringProperty = 'foo';
types.numberProperty = 1234;
types.dateProperty = new Date(123);
types.jsonProperty = { Foo: { Bar: 123 } };

// THEN
expect(types.booleanProperty).toBe(true);
expect(types.stringProperty).toBe('foo');
expect(types.numberProperty).toBe(1234);
expect(types.dateProperty).toEqual(new Date(123));
expect((types.jsonProperty as any).Foo.Bar).toBe(123);
```
