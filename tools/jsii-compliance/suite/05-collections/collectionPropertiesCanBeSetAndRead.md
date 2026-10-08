# Array- and map-typed properties can be set and read

The host MUST be able to assign to a property whose declared type is an array of primitives, and to a property whose
declared type is a map of object references, and then read those values back from the kernel. The host MUST observe the
elements it assigned, in order for the array, and by key for the map.

## Reference Implementation

```ts
// GIVEN
export class Number {
  public constructor(public readonly value: number) {}
}

export class AllTypes {
  private arrayValue: string[] = [];
  private mapValue: { [key: string]: Number } = {};

  public get arrayProperty(): string[] {
    return this.arrayValue;
  }
  public set arrayProperty(value: string[]) {
    this.arrayValue = value;
  }

  public get mapProperty(): { [key: string]: Number } {
    return this.mapValue;
  }
  public set mapProperty(value: { [key: string]: Number }) {
    this.mapValue = value;
  }
}

// WHEN
const types = new AllTypes();
types.arrayProperty = ['Hello', 'World'];
types.mapProperty = { Foo: new Number(123) };

// THEN
expect(types.arrayProperty[1]).toBe('World');
expect(types.mapProperty['Foo'].value).toBe(123);
```
