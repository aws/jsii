# An array returned by a method can be read

When a method returns an array, the host MUST be able to read its contents. The returned array MUST contain exactly the
elements produced in JavaScript, in the same order.

## Reference Implementation

```ts
// GIVEN
export class ClassWithCollections {
  public static createAList(): string[] {
    return ['one', 'two'];
  }
}

// WHEN
const list = ClassWithCollections.createAList();

// THEN
expect(list).toEqual(['one', 'two']);
```
