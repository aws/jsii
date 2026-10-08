# A static array property rejects mutation

An array the host reads from a static property is a snapshot of the value in JavaScript, not a live view of it. The host
MUST present such a returned array as read-only, so that attempting to add, remove, or replace elements is rejected
rather than silently mutating a copy that JavaScript will never see.

## Reference Implementation

```ts
// GIVEN
export class ClassWithCollections {
  public static staticArray: string[] = ['one', 'two'];
}

// WHEN
const list = ClassWithCollections.staticArray;

// THEN
expect(() => (list as readonly string[] as string[]).push('three')).toThrow();
```
