# Values of a returned map of structs have the struct's apparent type

When a method returns a map (keyed by string) whose declared value type is a struct, the host MUST deserialize each
value as an instance of that struct type. The host MUST present every value with the struct's apparent type, so that the
host's idiomatic type checks recognize it as that struct and the struct's properties are accessible. This matters for
hosts that reify the value type of a map, where a value of the wrong type would be unusable.

## Reference Implementation

```ts
// GIVEN
export interface StructA {
  readonly requiredString: string;
  readonly optionalString?: string;
  readonly optionalNumber?: number;
}

export class InterfaceCollections {
  public static mapOfStructs(): { [name: string]: StructA } {
    return {
      A: { requiredString: "Hello, I'm String!" },
    };
  }

  private constructor() {}
}

// WHEN
const items = InterfaceCollections.mapOfStructs();

// THEN
expect(Object.keys(items)).toHaveLength(1);
for (const item of Object.values(items)) {
  // Each value is received with the apparent type StructA, so its properties are accessible.
  expect(item.requiredString).toBe("Hello, I'm String!");
}
```
