# Elements of a returned list of interfaces are usable through the interface

When a method returns a list whose declared element type is a behavioral interface, the host MUST receive each element
typed as that interface and MUST be able to invoke the interface's members on it. Calls on an element MUST be dispatched
across the boundary to its JavaScript implementation.

## Reference Implementation

```ts
// GIVEN
export interface IBell {
  ring(): void;
}

export class InterfaceCollections {
  public static listOfInterfaces(): IBell[] {
    return [
      {
        ring: () => {
          return;
        },
      },
    ];
  }

  private constructor() {}
}

// WHEN
const items = InterfaceCollections.listOfInterfaces();

// THEN
expect(items).toHaveLength(1);
for (const item of items) {
  // Each element is received typed as IBell, so its members can be invoked.
  expect(() => item.ring()).not.toThrow();
}
```
