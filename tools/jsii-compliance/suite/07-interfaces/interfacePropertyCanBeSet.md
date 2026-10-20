# A read-write property on an interface can be set from the host

When a behavioral interface declares a read-write property, the host MUST be able to assign a new value to that property
through a value typed as the interface. The assignment MUST reach the property's setter in the kernel implementation,
and any side effects of that setter MUST be observable afterwards.

## Reference Implementation

```ts
// GIVEN
export interface IObjectWithProperty {
  property: string;
  wasSet(): boolean;
}

export class ObjectWithPropertyProvider {
  public static provide(): IObjectWithProperty {
    class Impl implements IObjectWithProperty {
      private _property = '';
      private _wasSet = false;

      public get property() {
        return this._property;
      }
      public set property(value: string) {
        this._property = value;
        this._wasSet = true;
      }

      public wasSet() {
        return this._wasSet;
      }
    }
    return new Impl();
  }

  private constructor() {}
}

// WHEN
const obj = ObjectWithPropertyProvider.provide();
obj.property = 'New Value';

// THEN
expect(obj.wasSet()).toBe(true);
```
