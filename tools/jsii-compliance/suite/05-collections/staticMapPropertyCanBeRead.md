# A static map property can be read

The host MUST be able to read a static property whose declared type is a map (keyed by string), without creating an
instance of the class. The returned map MUST contain exactly the key/value pairs initialized in JavaScript.

## Reference Implementation

```ts
// GIVEN
export class ClassWithCollections {
  public static staticMap: { [key: string]: string } = {
    key1: 'value1',
    key2: 'value2',
  };
}

// WHEN
const map = ClassWithCollections.staticMap;

// THEN
expect(map).toEqual({ key1: 'value1', key2: 'value2' });
expect(Object.keys(map)).toHaveLength(2);
```
