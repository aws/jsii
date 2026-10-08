# Elements of a returned list of structs have the struct's apparent type

When a method returns a list whose declared element type is a struct, the host MUST deserialize each element as a value
of that struct type. The host MUST present every element with the struct's apparent type, so that the host's idiomatic
type checks recognize it as that struct and the struct's properties are accessible. This matters for hosts that reify
the element type of a list, where an element of the wrong type would be unusable.

## Reference Implementation

```ts
// GIVEN
export interface StructA {
  readonly requiredString: string;
  readonly optionalString?: string;
  readonly optionalNumber?: number;
}

export class InterfaceCollections {
  public static listOfStructs(): StructA[] {
    return [{ requiredString: "Hello, I'm String!" }];
  }

  private constructor() {}
}

// WHEN
const items = InterfaceCollections.listOfStructs();

// THEN
expect(items).toHaveLength(1);
for (const item of items) {
  // Each element is received with the apparent type StructA, so its properties are accessible.
  expect(item.requiredString).toBe("Hello, I'm String!");
}
```
