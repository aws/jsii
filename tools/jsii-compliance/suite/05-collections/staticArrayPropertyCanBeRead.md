# A static array property can be read

The host MUST be able to read a static property whose declared type is an array, without creating an instance of the
class. The returned array MUST contain exactly the elements initialized in JavaScript, in order.

## Reference Implementation

```ts
// GIVEN
export class ClassWithCollections {
  public static staticArray: string[] = ['one', 'two'];
}

// WHEN
const list = ClassWithCollections.staticArray;

// THEN
expect(list).toEqual(['one', 'two']);
```
