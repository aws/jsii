# A static map property rejects mutation

A map the host reads from a static property is a snapshot of the value in JavaScript, not a live view of it. The host
MUST present such a returned map as read-only, so that attempting to add, remove, or replace entries is rejected
rather than silently mutating a copy that JavaScript will never see.

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
expect(() => {
  (map as Readonly<Record<string, string>> as Record<string, string>)['keyTwo'] = 'valueTwo';
}).toThrow();
```
