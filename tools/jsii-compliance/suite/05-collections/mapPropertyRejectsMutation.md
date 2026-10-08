# A map read from an instance property rejects mutation

A map the host reads from an instance property is a snapshot of the value in JavaScript, not a live view of it. The host
MUST present such a returned map as read-only, so that attempting to add, remove, or replace entries is rejected
rather than silently mutating a copy that JavaScript will never see.

## Reference Implementation

```ts
// GIVEN
export class ClassWithCollections {
  public map: { [key: string]: string };
  public array: string[];

  public constructor(map: { [key: string]: string }, array: string[]) {
    this.map = map;
    this.array = array;
  }
}

// WHEN
const subject = new ClassWithCollections({ key: 'value' }, []);
const map = subject.map;

// THEN
expect(() => {
  (map as Readonly<Record<string, string>> as Record<string, string>)['keyTwo'] = 'valueTwo';
}).toThrow();
```
