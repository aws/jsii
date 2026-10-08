# A returned struct can be received as a parent struct type

The kernel may return the same struct value through methods that declare different return types, where one struct type
extends another. The host MUST accept the value under each declared struct type, including a parent type that declares
only a subset of the properties. Receiving the value MUST succeed in both cases, whether the declared type is the full
(child) struct or the narrower (parent) struct.

## Reference Implementation

```ts
// GIVEN
export interface ParentStruct982 {
  readonly foo: string;
}
export interface ChildStruct982 extends ParentStruct982 {
  readonly bar: number;
}

export class Demonstrate982 {
  // The same underlying value is handed out as a child and as a parent struct.
  private static readonly value = { foo: 'foo', bar: 1337 };

  public static takeThis(): ChildStruct982 {
    return this.value;
  }
  public static takeThisToo(): ParentStruct982 {
    return this.value;
  }
}

// WHEN
const asChild = Demonstrate982.takeThis();
const asParent = Demonstrate982.takeThisToo();

// THEN
expect(asChild).toBeDefined();
expect(asParent).toBeDefined();
```
