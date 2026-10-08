# A map returned by a method can be read

When a method returns a map (keyed by string), the host MUST be able to read its contents. The returned map MUST contain
exactly the key/value pairs produced in JavaScript.

## Reference Implementation

```ts
// GIVEN
export class ClassWithCollections {
  public static createAMap(): { [key: string]: string } {
    return { key1: 'value1', key2: 'value2' };
  }
}

// WHEN
const map = ClassWithCollections.createAMap();

// THEN
expect(map).toEqual({ key1: 'value1', key2: 'value2' });
expect(Object.keys(map)).toHaveLength(2);
```
