# An undefined optional list reads as absent, not empty

A property whose declared type is an optional list and whose value is `undefined` in the kernel MUST be read by the host
as absent (the host's representation of "no value"). The host MUST NOT substitute an empty list for the missing value.

## Reference Implementation

```ts
// GIVEN
export class DisappointingCollectionSource {
  /** Some list of strings, maybe? (Nah, just undefined.) */
  public static readonly maybeList?: string[] = undefined;

  private constructor() {}
}

// WHEN
const list = DisappointingCollectionSource.maybeList;

// THEN
expect(list).toBeUndefined();
```
