# Inherited properties are usable on host subclasses

When the host declares a subclass of a jsii class, the host MUST be able to assign and read the properties the subclass
inherits from its base class. Assigning an inherited property MUST send a `set` request against the subclass instance,
and reading it MUST return the value most recently assigned.

## Reference Implementation

```ts
// GIVEN
export class AllTypes {
  private stringValue = 'first value';
  private numberValue = 0;

  public get stringProperty() {
    return this.stringValue;
  }
  public set stringProperty(value: string) {
    this.stringValue = value;
  }

  public get numberProperty() {
    return this.numberValue;
  }
  public set numberProperty(value: number) {
    this.numberValue = value;
  }
}

// WHEN
class DerivedFromAllTypes extends AllTypes {}

const obj = new DerivedFromAllTypes();
obj.stringProperty = 'Hello';
obj.numberProperty = 12;

// THEN
expect(obj.stringProperty).toBe('Hello');
expect(obj.numberProperty).toBe(12);
```
