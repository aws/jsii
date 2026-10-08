# Values of a returned map of interfaces are usable through the interface

When a method returns a map (keyed by string) whose declared value type is a behavioral interface, the host MUST receive
each value typed as that interface and MUST be able to invoke the interface's members on it. Calls on a value MUST be
dispatched across the boundary to its JavaScript implementation.

## Reference Implementation

```ts
// GIVEN
export interface IBell {
  ring(): void;
}

export class InterfaceCollections {
  public static mapOfInterfaces(): { [name: string]: IBell } {
    return {
      A: {
        ring: () => {
          return;
        },
      },
    };
  }

  private constructor() {}
}

// WHEN
const items = InterfaceCollections.mapOfInterfaces();

// THEN
expect(Object.keys(items)).toHaveLength(1);
for (const item of Object.values(items)) {
  // Each value is received typed as IBell, so its members can be invoked.
  expect(() => item.ring()).not.toThrow();
}
```
