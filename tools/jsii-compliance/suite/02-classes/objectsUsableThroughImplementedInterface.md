# An object is usable through the interface it implements

When the kernel returns an object reference, the host MUST be able to use the object through any interface the object
implements, by reading the interface's members with the corresponding `get` or `invoke` request, and the values returned
MUST be the ones computed by the object. This MUST hold when the concrete class is defined privately inside the kernel
and is never exported, and when the declared return type is the interface itself as well as when it is `any`.

## Reference Implementation

```ts
// GIVEN
export interface IReturnJsii976 {
  readonly foo: number;
}

export class BaseJsii976 {}

export class SomeTypeJsii976 {
  public static returnReturn(): IReturnJsii976 {
    class Derived extends BaseJsii976 implements IReturnJsii976 {
      public readonly foo = 333;
    }
    return new Derived();
  }

  public static returnAnonymous(): any {
    class Derived implements IReturnJsii976 {
      public readonly foo = 1337;
    }
    return new Derived();
  }
}

// WHEN
const declaredAsInterface = SomeTypeJsii976.returnReturn();
const declaredAsAny: IReturnJsii976 = SomeTypeJsii976.returnAnonymous();

// THEN
expect(declaredAsInterface.foo).toBe(333);
expect(declaredAsAny.foo).toBe(1337);
```
