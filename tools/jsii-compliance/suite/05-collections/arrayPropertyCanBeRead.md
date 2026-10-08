# An array stored in an instance property can be read

When an array is passed to a constructor and stored in an instance property, the host MUST be able to read that property
back from the kernel and observe the same elements, in order.

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
const subject = new ClassWithCollections({}, ['one', 'two']);

// THEN
expect(subject.array).toEqual(['one', 'two']);
```
