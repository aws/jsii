# A map stored in an instance property can be read

When a map is passed to a constructor and stored in an instance property, the host MUST be able to read that property
back from the kernel and observe the same key/value pairs.

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

// THEN
expect(subject.map).toEqual({ key: 'value' });
expect(Object.keys(subject.map)).toHaveLength(1);
```
